"use client";
import React from "react";
import ProfilePic from "./ProfilePic";
import Link from "next/link";

function Connection({
  customerNumber,
  sellerNumber,
  connectionUserName,
  amount,
  isSeller,
}: {
  customerNumber: string;
  sellerNumber: string;
  connectionUserName: string;
  amount: number;
  isSeller: boolean;
}) {
  return (
    <Link
      href={
        !isSeller
          ? `/customerprofile/${sellerNumber}/${customerNumber}`
          : `/sellerprofile/${sellerNumber}/${customerNumber}`
      }
    >
      <div className="w-full h-[5.1rem] my-2  flex justify-between items-center  rounded-xl cursor-pointer">
        <div className="w-full pl-5 h-full flex rounded-s-xl justify-start bg-[#ffc300] items-center gap-2">
          <span className="size-10">
            <ProfilePic url={""}></ProfilePic>
          </span>
          <span className="font-bold">{connectionUserName}</span>
        </div>

        <div className="w-full flex bg-white h-full justify-center items-center">
          <span
            className={`font-mono text-muted-foreground text-sm ${
              amount > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {amount > 0 ? "you will get" : "you will pay"}
          </span>
        </div>

        <div className="flex h-full justify-between rounded-e-xl items-center w-full ">
          {amount < 0 && (
            <span className=" h-full w-full  flex justify-center items-center bg-red-100 rounded-e-xl ">
              <span className="font-bold text-lg  text-red-500 rounded-e-xl">
                ₹ {Math.abs(amount)}
              </span>
            </span>
          )}

          {amount > 0 && (
            <span className="h-full  w-full flex rounded-e-lg  justify-center items-center bg-green-100">
              <span className="font-bold rounded-e-lg text-lg text-green-400 ">
                ₹ {Math.abs(amount)}
              </span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Connection;
