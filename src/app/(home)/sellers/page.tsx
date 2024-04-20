import Connection from "@/components/Connection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

function Sellers() {
  // Sample Data
  const data = [
    {
      seller: {
        userId: "1",
        userName: "Ram",
        profilePic: "",
      },
      customer: {
        userId: "2",
        userName: "Sam",
        profilePic: "",
      },
      amount: -100, // you will pay
    },
  ];
  return (
    <div className="w-full h-full p-3">
      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-100">
        {data.map((data) => (
          <Connection
            key={data.customer.userId}
            curtomerProfilePic={data.customer.profilePic}
            cutomerUserId={data.customer.userId}
            customerUserName={data.customer.userName}
            amount={data.amount}
          ></Connection>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Sellers;
