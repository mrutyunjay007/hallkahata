"use client";
import React from "react";
import ProfilePic from "@/components/ProfilePic";
import { RiCheckDoubleFill } from "react-icons/ri";
import { dateConverter } from "@/util/dateConverter";

export default function User({
  amount,
  createdAt,
  aprooved,
  amISeller,
}: {
  amount: number;
  createdAt: number;
  aprooved: boolean;
  amISeller: boolean;
}) {
  return (
    <div
      className={`w-full h-[5.1rem] my-2  flex justify-between items-center  rounded-xl cursor-pointer `}
    >
      {/* date */}
      <div className=" w-full h-full flex rounded-s-xl flex-col justify-center bg-[#ffc300] items-center">
        <span className="w-full text-sm md:text-xl font-mono text-center ">
          {dateConverter(createdAt.toString())}
        </span>
      </div>

      {/* give status */}
      <div className="w-full flex bg-white h-full justify-center items-center">
        <span
          className={`font-mono text-muted-foreground text-sm ${
            amount > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount > 0
            ? amISeller
              ? "you got"
              : "you gave"
            : amISeller
            ? "you gave"
            : "you got"}
        </span>
      </div>

      {/* amount */}
      <div className=" relative flex h-full justify-between rounded-e-xl items-center w-full ">
        <span>
          <RiCheckDoubleFill
            className={`size-5 absolute bottom-2 right-3 ${
              aprooved ? "text-teal-400" : "text-slate-400"
            } `}
          />
        </span>

        {amount < 0 && (
          <span className=" h-full w-full  flex justify-center items-center bg-red-100 rounded-e-xl ">
            {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

            <span className="font-bold text-wrap  text-red-500 rounded-e-xl">
              ₹ {Math.abs(amount)}
            </span>
          </span>
        )}

        {amount > 0 && (
          <span className="h-full  w-full flex rounded-e-lg  justify-center items-center bg-green-100">
            {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

            <span className="font-bold rounded-e-lg text-wrap text-green-400 ">
              ₹ {Math.abs(amount)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
