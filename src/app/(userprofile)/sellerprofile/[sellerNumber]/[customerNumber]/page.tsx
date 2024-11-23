"use client";
import React, { useEffect, useState } from "react";
import User from "../../../components/User";
import Link from "next/link";
import DataSetter from "../../../components/DataSetter";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";
import DataLoader from "@/components/Loaders/DataLoader";
import { useAppSelector } from "@/lib/store/hooks/hooks";

function SellerProfile({
  params,
}: {
  params: { sellerNumber: string; customerNumber: string };
}) {
  const { sellerNumber, customerNumber } = params;

  const [data, setData] = useState<ITanctionWithConnection>();

  const [isLoading, setLoading] = useState(false);

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
          `/api/connections?seller=${sellerNumber}&customer=${customerNumber}`
        );

        if (data.success) {
          setData(data.data);

          setLoading(false);
        }
      } catch (error) {}
    })();
  }, []);

  // Loader
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
        userName={data?.connection.seller.userName!}
        amount={data?.connection.amount!}
        phoneNumber={data?.connection.seller.phoneNumber!}
        connectionId={data?.connection._id!}
        userType="seller"
      ></DataSetter>

      <div className="w-full h-full px-5 py-3 rounded-t-2xl">
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
        </ScrollArea>
      </div>
    </>
  );
}

export default SellerProfile;
