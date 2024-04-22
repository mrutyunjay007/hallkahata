import React from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { ScrollArea } from "@/components/ui/scroll-area";
import Connection from "@/components/Connection";
import Link from "next/link";

interface IConnectionCustomer {
  _id: string;
  sellerNumber: string;
  amount: number;
  customer: {
    _id?: string;
    userName: string;
    phoneNumber: string;
  };
}

async function Customers() {
  const response = await fetch(
    "http://localhost:3000/api/customers?number=8777761380",

    { cache: "no-store" }
  );
  const result = await response.json();

  return (
    <div className="relative w-full h-full p-3">
      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-100">
        {result.data.map((data: IConnectionCustomer) => (
          <Connection
            key={data._id}
            customerNumber={data.customer.phoneNumber}
            sellerNumber={data.sellerNumber}
            connectionUserName={data.customer.userName}
            isSeller={false}
            amount={data.amount}
          ></Connection>
        ))}
      </ScrollArea>

      <Link href="/addnewcutomer">
        <RiAddCircleFill className="size-16 absolute bottom-10 right-10 text-[#ffc300]  rounded-full hover:text-[#ffa600] hover:scale-110 hover:rotate-180 hover:ease-linear hover:duration-75 cursor-pointer " />
      </Link>
    </div>
  );
}

export default Customers;
