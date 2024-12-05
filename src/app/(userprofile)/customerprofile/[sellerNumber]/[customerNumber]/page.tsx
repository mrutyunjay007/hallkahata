"use client";
import React, { useEffect, useRef, useState } from "react";
import User from "../../../components/User";

import DataSetter from "../../../components/DataSetter";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";
import DataLoader from "@/components/Loaders/DataLoader";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import Filter from "@/app/(userprofile)/components/Filter";
import BallBounce from "@/components/Loaders/BallBounce";
import { searching } from "@/lib/store/features/filter/filterSlice";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";
import { set } from "mongoose";

function CustomerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const { color, date, searchLoading } = useAppSelector(
    (state) => state.filter
  );
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState<ITanctionWithConnection>();

  const billId = useAppSelector((state) => state.connection.billId);

  // infinite scrolling
  const [page, setPage] = useState(1);
  const [intersectionLoading, setIntersectionLoading] = useState(false);

  const { More, HaseMore, intersectionObserverRef } = useInfiniteScrolling(
    fetchConnectionDataWithInfiniteScrolling,
    data
  );

  // get the data and add infinite scrolling
  async function fetchConnectionDataWithInfiniteScrolling(
    cb: (more: boolean) => void
  ) {
    page > 1 ? setIntersectionLoading(true) : setLoading(!searchLoading);
    try {
      const { data } = await axios.get(
        `/api/connections?customer=${customerNumber}&seller=${sellerNumber}&color=${
          color === "" ? "white" : color
        }&date=${date}&limit=${10}&page=${page}`
      );

      if (data.success) {
        // check if the data is less than 10 then disable haseMore
        if (data.data.transectionHistory.length < 10) {
          cb(false);
        }

        setData((pre) => {
          if (!pre) {
            return {
              ...data.data,
            };
          }
          return {
            ...pre!,
            transectionHistory: [
              ...pre?.transectionHistory,
              ...data.data.transectionHistory,
            ],
          };
        });
        page > 1
          ? setIntersectionLoading(false)
          : !searchLoading
          ? setLoading(false)
          : dispatch(searching(false));
        setPage((pre) => pre + 1);
      }
    } catch (error) {}
  }

  // filter out the deleted bill
  useEffect(() => {
    if (billId !== "") {
      setData((pre) => ({
        ...pre!,
        transectionHistory: pre?.transectionHistory.filter(
          (item) => item._id !== billId
        )!,
      }));
    }
  }, [billId]);

  if (isLoading) {
    return (
      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
        <div className="h-[calc(100%-6rem)] py-2 px-2 rounded-xl bg-slate-100 w-full">
          <DataLoader numberOfItems={3}></DataLoader>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataSetter
        userName={data?.connection.customer.userName!}
        amount={data?.connection.amount!}
        phoneNumber={data?.connection.customer.userName!}
        connectionId={data?.connection._id!}
        userType="customer"
      ></DataSetter>

      <div className="w-full h-full flex flex-col  gap-5 px-5 py-3 rounded-t-2xl">
        {/* filter */}
        <Filter
          sellerNumber={sellerNumber}
          customerNumber={customerNumber}
          HaseMore={HaseMore}
          handlePage={() => {
            setPage(2);
          }}
          handleData={(data) => {
            setData({ ...data });
          }}
        ></Filter>

        {searchLoading ? (
          <div className="h-[calc(100%-6rem)] py-2 px-2 rounded-xl bg-slate-100 w-full">
            <DataLoader numberOfItems={3}></DataLoader>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-6rem)] py-2 px-2 rounded-xl bg-slate-100 w-full  ">
            {data?.transectionHistory.map((bill: any) => (
              <User
                key={bill._id}
                billId={bill._id}
                connectionId={data.connection._id}
                createdAt={bill.createdAt}
                amount={bill.amount}
                aprooved={bill.aprooved}
                amISeller={true} // authed user is not seller
                amICreated={bill.seller.phoneNumber === bill.createdBy} // check if authed user created the bill or not
                cancelled={bill.cancelled}
              ></User>
            ))}
            {More && (
              <div
                ref={intersectionObserverRef}
                className="w-full h-[5.1rem] flex justify-center items-center"
              >
                {intersectionLoading && (
                  <BallBounce size={"size-4"} bg={"bg-slate-300"}></BallBounce>
                )}
              </div>
            )}
          </ScrollArea>
        )}

        {/*  buttons */}
        <div className=" w-full  h-[6.5rem] flex gap-2 font-poppins justify-end px-3 items-center ">
          <Link
            href={`/createnewbill/customer/${data?.connection.customer.userName}/${data?.connection._id}/given`}
            className="w-full cursor-pointer flex justify-center items-center text-red-500 text-muted-foreground  bg-slate-100 rounded-l font-bold text-xl h-full"
          >
            <span className="hover:scale-110 hover:ease-in-out hover:duration-100">
              you gave
            </span>
          </Link>
          <div className=" h-[5rem] border-l-2 border-[#ffc300]"></div>
          <Link
            href={`/createnewbill/customer/${data?.connection.customer.userName}/${data?.connection._id}/gotten`}
            className="w-full cursor-pointer flex justify-center items-center text-green-500 bg-slate-100 rounded-r font-bold text-xl h-full"
          >
            <span className="hover:scale-110 hover:ease-in-out hover:duration-100">
              you got
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;
