import React from "react";
import User from "../../../components/User";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import DataSetter from "../../../components/DataSetter";
import Link from "next/link";

async function CustomerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const respons = await fetch(
    `http://localhost:3000/api/connections?seller=${sellerNumber}&customer=${customerNumber}`,
    { cache: "no-store" }
  );
  const { data } = await respons.json();

  return (
    <>
      <DataSetter
        userName={data.connection.customer.userName}
        amount={data.connection.amount}
        phoneNumber={data.connection.customer.userName}
      ></DataSetter>

      <div className="w-full h-full p-5 rounded-t-2xl bg-slate-100 ">
        <ScrollArea className="w-full ">
          {data.transectionHistory.map((bill: any) => (
            <Link key={bill._id} href={`/customer/${bill._id}`}>
              <User
                key={bill._id}
                // userName={bill.customer.userName}
                createdAt={bill.createdAt}
                amount={bill.amount}
              ></User>
            </Link>
          ))}
        </ScrollArea>
      </div>
      <div className=" w-full h-[6.5rem] flex gap-3 justify-end p-3 items-center fixed bottom-0">
        <Link
          href={`/createnewbill/customer/${data.connection.customer.userName}/${data.connection._id}/given`}
          className="w-full cursor-pointer flex justify-center items-center bg-red-500 text-white font-bold text-xl h-full"
        >
          <span className="hover:scale-110 hover:ease-in-out hover:duration-100">
            you gave
          </span>
        </Link>

        <Link
          href={`/createnewbill/customer/${data.connection.customer.userName}/${data.connection._id}/gotten`}
          className="w-full cursor-pointer flex justify-center items-center bg-green-500 text-white font-bold text-xl h-full"
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
