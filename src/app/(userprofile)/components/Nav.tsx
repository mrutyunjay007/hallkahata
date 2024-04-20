"use client";
import { RiSendPlane2Line } from "react-icons/ri";
import ProfilePic from "@/components/ProfilePic";
import React from "react";
import PaymentTrackingForUser from "./PaymentTrackingForUser";
import { useAppSelector } from "@/lib/store/hooks/hooks";

function Nav() {
  const connection = useAppSelector((state) => state.connection);

  return (
    <>
      <div className=" flex gap-2  justify-between items-center rounded-b-xl drop-shadow-lg w-full px-6 bg-[#ffc300] py-5">
        <span className="flex gap-2 items-center size-10">
          <ProfilePic url=""></ProfilePic>
          <div className="font-bold text-primary w-full">
            {connection.userName}
          </div>
        </span>
        <span className="flex gap-1 items-center font-semibold text-primary cursor-pointer">
          <span className=" ">{"remainder"}</span>
          <RiSendPlane2Line className="size-6" />
        </span>
      </div>
      <span
        className={` flex flex-col  justify-center items-center mt-2 w-full h-32`}
      >
        <PaymentTrackingForUser
          amount={connection.amount}
        ></PaymentTrackingForUser>
      </span>
    </>
  );
}

export default Nav;
