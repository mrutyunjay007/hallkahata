"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";
import DataSetter from "../../../components/DataSetter";
import { ScrollArea } from "@/components/ui/scroll-area";
import User from "../../../components/User";
import DataLoader from "@/components/Loaders/DataLoader";
import Filter from "@/app/(userprofile)/components/Filter";
import { searching } from "@/lib/store/features/filter/filterSlice";
import BallBounce from "@/components/Loaders/BallBounce";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";

function SellerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const { color, date, searchLoading } = useAppSelector(
    (state) => state.filter
  );

  const dispatch = useAppDispatch();

  const [data, setData] = useState<ITanctionWithConnection>();

  const [isLoading, setLoading] = useState(false);

  const billId = useAppSelector((state) => state.connection.billId);

  // infinite scrolling
  const [intersectionLoading, setIntersectionLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { More, HaseMore, intersectionObserverRef } = useInfiniteScrolling(
    fetchConnectionDataWithInfiniteScrolling,
    data
  );

  async function fetchConnectionDataWithInfiniteScrolling(
    cb: (more: boolean) => void
  ) {
    page > 1 ? setIntersectionLoading(true) : setLoading(!searchLoading);
    try {
      const { data } = await axios.get(
        `/api/connections?seller=${sellerNumber}&customer=${customerNumber}&color=${
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

  // Loader
  if (isLoading) {
    return (
      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
        <div className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full">
          <DataLoader numberOfItems={3}></DataLoader>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataSetter
        userName={data?.connection.seller.userName!}
        amount={data?.connection.amount!}
        phoneNumber={data?.connection.seller.phoneNumber!}
        connectionId={data?.connection._id!}
        userType="seller"
      ></DataSetter>

      <div className="w-full h-full flex flex-col  gap-5 px-5 py-3 rounded-t-2xl">
        {/* filter */}
        <Filter
          sellerNumber={sellerNumber}
          customerNumber={customerNumber}
          HaseMore={HaseMore}
          handlePage={() => {
            setPage((pre) => {
              return 1 + 1;
            });
          }}
          handleData={(data) => {
            setData({ ...data });
          }}
        ></Filter>

        {searchLoading ? (
          <div className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full">
            <DataLoader numberOfItems={3}></DataLoader>
          </div>
        ) : (
          <ScrollArea className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full  ">
            {data?.transectionHistory.map((bill: any) => (
              <User
                key={bill._id}
                billId={bill._id}
                connectionId={data.connection._id}
                createdAt={bill.createdAt}
                amount={bill.amount}
                aprooved={bill.aprooved}
                amISeller={false} // authed user is not seller
                amICreated={bill.customer.phoneNumber === bill.createdBy} // check if authed user created the bill or not
                cancelled={bill.cancelled}
              ></User>
            ))}
            {More && (
              <div ref={intersectionObserverRef}>
                {intersectionLoading && (
                  <BallBounce size={"size-4"} bg={"bg-slate-300"}></BallBounce>
                )}
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </>
  );
}

export default SellerProfile;
