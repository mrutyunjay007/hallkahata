import React from "react";
import User from "../../../components/User";
import Link from "next/link";
import DataSetter from "../../../components/DataSetter";
import { ScrollArea } from "@/components/ui/scroll-area";

async function SellerProfile({
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
        userName={data.connection.seller.userName}
        amount={data.connection.amount}
        phoneNumber={data.connection.seller.phoneNumber}
      ></DataSetter>

      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
        <ScrollArea className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full  ">
          {data.transectionHistory.map((bill: any) => (
            <Link key={bill._id} href={`/seller/${bill._id}`}>
              <User
                key={bill._id}
                createdAt={bill.createdAt}
                amount={bill.amount}
              ></User>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}

export default SellerProfile;
