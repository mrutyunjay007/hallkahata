import Connection from "@/components/Connection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

interface IConnectionSeller {
  _id: string;
  customerNumber: string;
  amount: number;
  seller: {
    _id: string;
    userName: string;
    phoneNumber: string;
  };
}

async function Sellers() {
  const response = await fetch(
    "http://localhost:3000/api/sellers?number=8777761380",

    { cache: "no-store" }
  );
  const result = await response.json();
  console.log(result.data);
  

  return (
    <div className="w-full h-full p-3">
      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-100">
        {result.data.map((data: IConnectionSeller) => (
          <Connection
            key={data._id}
            customerNumber={data.customerNumber}
            sellerNumber={data.seller.phoneNumber}
            connectionUserName={data.seller.userName}
            isSeller={true}
            amount={data.amount}
          ></Connection>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Sellers;
