"use client";
import React, { useEffect } from "react";
import User from "../../../components/User";

import DataSetter from "../../../components/DataSetter";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";

function CustomerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const [data, setData] = React.useState<ITanctionWithConnection>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/connections?customer=${customerNumber}&seller=${sellerNumber}`
        );

        if (data.success) {
          setData(data.data);
        }
      } catch (error) {}
    })();
  }, []);

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
            <Link key={bill._id} href={`/customer/${bill._id}`}>
              <User
                key={bill._id}
                // userName={bill.customer.userName}
                createdAt={bill.createdAt}
                amount={bill.amount}
                aprooved={bill.aprooved}
                amISeller={true}
              ></User>
            </Link>
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
