"use client";
import React from "react";

function PaymentTrackingForUser({ amount }: { amount: number }) {
  return (
    <div className="w-full   h-[4.1rem] px-5 ">
      <div
        className={` flex bg-white drop-shadow-md  justify-around items-center w-full h-full rounded-xl`}
      >
        <div className=" w-full  rounded-s-xl border-2 bg-[#ffc300] border-[#ffc300] h-full flex flex-col gap-1  justify-center items-center">
          <span className="font-bold  text-primary text-xl">{`${
            amount < 0 ? "you will pay" : "you will get"
          }`}</span>
          {/* <span className="text-sm  text-zinc-400"></span> */}
        </div>
        <div className=" w-full rounded-e-xl  h-full flex flex-col gap-1  justify-center items-center">
          <span
            className={`font-semibold ${
              amount < 0 ? "text-red-500" : "text-green-500"
            }  text-muted-foreground  text-3xl`}
          >
            ₹ {Math.abs(amount)}
          </span>
          {/* <span className="text-sm  text-zinc-400">you will get</span> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentTrackingForUser;
