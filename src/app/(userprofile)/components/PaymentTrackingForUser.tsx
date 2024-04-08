"use client";
import React from "react";

function PaymentTrackingForUser() {
  return (
    <div className="w-full   h-[5.1rem] px-5">
      <div
        className={` flex bg-white border-2 border-sky-900  justify-around items-center w-full h-full   rounded-xl`}
      >
        <div className=" w-full  rounded-s-xl border-r-2 border-zinc-300 h-full flex flex-col gap-1  justify-center items-center">
          <span className="font-medium text-sky-900 text-xl">you will pay</span>
          {/* <span className="text-sm  text-zinc-400"></span> */}
        </div>
        <div className=" w-full rounded-e-xl  h-full flex flex-col gap-1  justify-center items-center">
          <span className="font-semibold text-red-500 text-muted-foreground  text-3xl">
            ₹ 100
          </span>
          {/* <span className="text-sm  text-zinc-400">you will get</span> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentTrackingForUser;
