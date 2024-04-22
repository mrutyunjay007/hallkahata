"use client";
import ProfilePic from "@/components/ProfilePic";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaymentTracking from "./PaymentTracking";
import axios from "axios";

function Nav() {
  const [first, setfirst] = useState(true);
  const [youWillGet, setYouWillGet] = useState(0);
  const [youWillGive, setYouWillGive] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/user?userId=66b24d2e3978d838e2bf3950`
        );

        if (data.success) {
          setYouWillGet(data.data.youWillGet);
          setYouWillGive(data.data.youWillGive);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className=" flex gap-2 items-center w-full px-6 py-3 bg-[#ffc300]">
        <span className="size-10">
          <ProfilePic url=""></ProfilePic>
        </span>
        <span className="font-bold">
          {`I'm a ${first ? "Seller" : "Customer"}`}
        </span>
      </div>
      <div
        className={` relative flex flex-col  justify-end gap-3 w-full h-32 bg-[#ffc300]`}
      >
        <PaymentTracking
          youWillGet={youWillGet}
          youWillGive={youWillGive}
        ></PaymentTracking>

        <nav className="w-full flex justify-around px-10 pb-2 gap-4 font-bold">
          <span
            className={`cursor-pointer ${first && "text-slate-900"}`}
            onClick={() => {
              setfirst(!first);
            }}
          >
            <Link href="/customers">Customers</Link>
          </span>
          <span
            className={`cursor-pointer ${!first && "text-slate-900"}`}
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
          } w-1/2 h-[2px] bg-slate-900 rounded-lg`}
        ></div>
      </div>
    </>
  );
}

export default Nav;
