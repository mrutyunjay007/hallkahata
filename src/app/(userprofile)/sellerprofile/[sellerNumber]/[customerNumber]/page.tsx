"use client";
import React, { useEffect } from "react";
import User from "../../../components/User";
import Link from "next/link";
import DataSetter from "../../../components/DataSetter";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";

function SellerProfile({
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
          `/api/connections?seller=${sellerNumber}&customer=${customerNumber}`
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
        userName={data?.connection.seller.userName!}
        amount={data?.connection.amount!}
        phoneNumber={data?.connection.seller.phoneNumber!}
        connectionId={data?.connection._id!}
        userType="seller"
      ></DataSetter>

      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
        <ScrollArea className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full  ">
          {data?.transectionHistory.map((bill: any) => (
            <Link key={bill._id} href={`/seller/${bill._id}`}>
              <User
                key={bill._id}
                createdAt={bill.createdAt}
                amount={bill.amount}
                aprooved={bill.aprooved}
                amISeller={false}
              ></User>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}

export default SellerProfile;
