"use client";
import React from "react";
import ProfilePic from "./ProfilePic";
import Link from "next/link";

function Connection({
  curtomerProfilePic,
  cutomerUserId,
  customerUserName,
  amount,
}: {
  curtomerProfilePic: string;
  cutomerUserId: string;
  customerUserName: string;

  amount: number;
}) {
  return (
    <Link href={"/customerprofile/66b24e9c3978d838e2bf395a"}>
      <div className="w-full h-[5.1rem] mt-2 px-3 flex justify-between items-center border-2 border-zinc-600 rounded-lg cursor-pointer">
        <span className="flex justify-center items-center gap-2">
          <span>
            <ProfilePic url={curtomerProfilePic}></ProfilePic>
          </span>
          <span className="font-bold">{customerUserName}</span>
        </span>
        <span
          className={`flex flex-col h-full px-5 gap-1 justify-center items-center ${
            amount < 0 ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <span
            className={`text-sm  font-light ${
              amount < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {amount < 0 ? "you will pay" : "you will get"}
          </span>
          <span className="font-bold text-3xl">₹ {Math.abs(amount)}</span>
        </span>
      </div>
    </Link>
  );
}

export default Connection;
