"use client";
import React, { useEffect, useState } from "react";
import User from "../../../components/User";

import DataSetter from "../../../components/DataSetter";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";
import DataLoader from "@/components/Loaders/DataLoader";
import { useAppSelector } from "@/lib/store/hooks/hooks";

function CustomerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = React.useState<ITanctionWithConnection>();

  const billId = useAppSelector((state) => state.connection.billId);

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

  // get the data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/connections?customer=${customerNumber}&seller=${sellerNumber}`
        );

        if (data.success) {
          console.log(data.data);

          setData(data.data);
          setLoading(false);
        }
      } catch (error) {}
    })();
  }, []);

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

      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
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
        </ScrollArea>
      </div>
      <div className=" w-full h-[6.5rem] flex gap-2 font-poppins justify-end p-3 items-center fixed bottom-0">
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
    </>
  );
}

export default CustomerProfile;
