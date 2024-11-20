"use client";
import React from "react";

function PaymentTrackingForUser({ amount }: { amount: number }) {
  return (
    <div className="w-full   h-[4.1rem] px-5 ">
      <div className={` flex justify-between items-center w-full h-full `}>
        <div className=" w-full  h-full flex justify-center items-center">
          <span className="font-semibold  text-primary text-xl font-poppins">{`${
            amount < 0 ? "you will pay" : "you will get"
          }`}</span>
          {/* <span className="text-sm  text-zinc-400"></span> */}
        </div>
        <div className=" w-full h-9 flex justify-center items-center border-l-2  border-[#ffc300]">
          <div
            className={`font-semibold ${
              amount < 0
                ? "text-red-500 text-muted-foreground"
                : "text-green-500"
            }    text-3xl flex justify-center items-center font-poppins`}
          >
            <div className="text-sm h-9 flex justify-center items-start">₹</div>
            <div>{Math.abs(amount)}</div>
          </div>
          {/* <span className="text-sm  text-zinc-400">you will get</span> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentTrackingForUser;
