"use client";
import React from "react";
import ProfilePic from "@/components/ProfilePic";

export default function User({
  userName,
  date,
  amount,
}: {
  userName: string;
  date: string;
  amount: number;
}) {
  return (
    <div className="w-full h-[5.1rem] mt-2 pl-6 flex justify-between items-center border-2 border-zinc-600 rounded-lg cursor-pointer">
      <span className=" flex flex-col justify-center items-start">
        <span className="flex gap-1 items-center font-bold">
          <span>{userName}</span>
          <div className="  w-10 rounded-lg flex justify-center items-center   bg-purple-700 text-white text-[10px] font-bold">
            <span className="rounded-lg">seller</span>
          </div>
        </span>
        <span className="text-sm font-mono font-light">{date}</span>
      </span>
      <div className="flex h-full justify-between rounded-e-lg items-center w-64 bg-slate-200">
        <span className=" h-full w-full  flex justify-center items-center bg-red-100">
          {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}
          {amount < 0 && (
            <span className="font-bold text-3xl">₹ {Math.abs(amount)}</span>
          )}
        </span>
        <span className="h-full  w-full flex rounded-e-lg  justify-center items-center bg-green-100">
          {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}
          {amount > 0 && (
            <span className="font-bold rounded-e-lg text-3xl">
              ₹ {Math.abs(amount)}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
