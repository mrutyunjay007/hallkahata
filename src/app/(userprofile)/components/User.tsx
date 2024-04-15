"use client";
import React from "react";
import ProfilePic from "@/components/ProfilePic";

export default function User({
  amount,
  createdAt,
}: {
  amount: number;
  createdAt: number;
}) {
  return (
    <div
      className={`w-full h-[5.1rem] mt-2 pl-6 flex justify-between items-center border-2 border-sky-900 rounded-lg cursor-pointer ${
        amount > 0 ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div className=" w-full flex flex-col justify-center items-start">
        <span className="flex gap-1 items-center font-bold">
          {/* <span>{userName}</span> */}
          <div className="  w-10 rounded-lg flex justify-center items-center   bg-sky-900 text-white text-[10px] font-bold">
            {/* <span className="rounded-lg">seller</span> */}
          </div>
        </span>
        <span className="text-sm font-mono font-light">{createdAt}</span>
      </div>

      <div className="w-full flex justify-center items-center">
        <span
          className={`font-mono text-muted-foreground text-sm ${
            amount > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount > 0 ? "you got" : "you gave"}
        </span>
      </div>

      <div className="flex h-full justify-between rounded-e-lg items-center w-full bg-slate-200">
        {amount < 0 && (
          <span className=" h-full w-full  flex justify-center items-center rounded-e-lg bg-red-50">
            {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

            <span className="font-bold text-3xl rounded-e-lg">
              ₹ {Math.abs(amount)}
            </span>
          </span>
        )}

        {amount > 0 && (
          <span className="h-full  w-full flex rounded-e-lg  justify-center items-center bg-green-50">
            {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

            <span className="font-bold rounded-e-lg text-3xl">
              ₹ {Math.abs(amount)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
