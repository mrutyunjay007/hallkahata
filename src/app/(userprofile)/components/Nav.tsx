"use client";
import { RiSendPlane2Line } from "react-icons/ri";
import ProfilePic from "@/components/ProfilePic";
import React from "react";
import PaymentTrackingForUser from "./PaymentTrackingForUser";

function Nav() {
  return (
    <>
      <div className=" flex gap-2 bg-purple-700 justify-between items-center w-full px-6 py-3">
        <span className="flex gap-2 items-center">
          <ProfilePic></ProfilePic>
          <span className="font-bold text-white">userName</span>
        </span>
        <span className="flex gap-1 items-center font-semibold text-white cursor-pointer">
          <span className=" ">{"remainder"}</span>
          <RiSendPlane2Line className="size-6" />
        </span>
      </div>
      <span
        className={`bg-purple-700  flex flex-col  justify-center items-center w-full h-32`}
      >
        <PaymentTrackingForUser></PaymentTrackingForUser>
      </span>
    </>
  );
}

export default Nav;
