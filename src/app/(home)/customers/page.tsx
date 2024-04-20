import React from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { ScrollArea } from "@/components/ui/scroll-area";
import Connection from "@/components/Connection";
import Link from "next/link";

function Customers() {
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
    {
      seller: {
        userId: "1",
        userName: "Ram",
        profilePic: "",
      },
      customer: {
        userId: "3",
        userName: "hyari",
        profilePic: "",
      },
      amount: 100, // you will get
    },
  ];

  return (
    <div className="relative w-full h-full p-3">
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

      <Link href="/addnewcutomer">
        <RiAddCircleFill className="size-16 absolute bottom-10 right-10 text-[#ffc300]  rounded-full hover:text-[#ffa600] hover:scale-110 hover:rotate-180 hover:ease-linear hover:duration-75 cursor-pointer " />
      </Link>
    </div>
  );
}

export default Customers;
