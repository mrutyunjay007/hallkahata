"use client";
import ProfilePic from "@/components/ProfilePic";
import Link from "next/link";
import { useState } from "react";
import PaymentTracking from "./PaymentTracking";

function Nav() {
  const [first, setfirst] = useState(true);
  console.log(first);

  return (
    <>
      <div className=" flex gap-2 items-center w-full px-6 py-3">
        <ProfilePic></ProfilePic>
        <span className="font-bold">
          {`I'm a ${first ? "Seller" : "Customer"}`}
        </span>
      </div>
      <div className={` relative flex flex-col  justify-end gap-3 w-full h-32`}>
        <PaymentTracking></PaymentTracking>
        <nav className="w-full flex justify-around px-10 pb-2 gap-4 font-bold">
          <span
            className={`cursor-pointer ${first && "text-purple-700"}`}
            onClick={() => {
              setfirst(!first);
            }}
          >
            <Link href="/customers">Customers</Link>
          </span>
          <span
            className={`cursor-pointer ${!first && "text-purple-700"}`}
            onClick={() => {
              setfirst(!first);
            }}
          >
            <Link href="/sellers">Sellers</Link>
          </span>
        </nav>
        <div
          className={` absolute bottom-0  ${
            !first ? "right-0" : "left-0"
          } w-1/2 h-1 bg-purple-700 rounded-lg`}
        ></div>
      </div>
    </>
  );
}

export default Nav;
