import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import User from "../components/User";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SellerProfile() {
  const data = [
    {
      _id: "bcsha54484",
      // TODO: in orgina : seller Id
      seller: {
        userId: "1",
        userName: "Ram",
      },
      // TODO: in orgina : customer Id
      customer: {
        userId: "2",
      },
      amount: -200,
      createdAt: "05-07-2024",
    },
    {
      _id: "sdfsjfo87844",
      seller: {
        userId: "1",
        userName: "Ram",
      },
      customer: {
        userId: "2",
      },
      borrow: false, // you will get
      amount: 1500,
      createdAt: "2-07-2024",
    },
  ];

  return (
    <>
      <div className="w-full h-full px-5 ">
        <div className="w-full flex justify-end items-center h-12 pt-1 ">
          <div className="w-32  text-center text-zinc-400 font-mono">
            you got
          </div>
          <div className="w-32 text-center text-zinc-400 font-mono">
            you gave
          </div>
        </div>

        <ScrollArea className="w-full">
          {data.map((data) => (
            <Link href={`/seller/${data._id}`}>
              <User
                key={data._id}
                userName={data.seller.userName}
                date={data.createdAt}
                amount={data.amount}
              ></User>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}

export default SellerProfile;
