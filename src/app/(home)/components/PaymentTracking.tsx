import React from "react";

function PaymentTracking() {
  return (
    <div className="w-full h-[5.1rem] px-5">
      <div className=" flex justify-around items-center w-full h-full border-2 border-purple-600 rounded-xl">
        <div className=" w-full rounded-s-xl border-r-2 border-zinc-300 h-full flex flex-col gap-1  justify-center items-center">
          <span className="font-semibold text-red-600  text-3xl">$100</span>
          <span className="text-sm  text-zinc-400">you will pay</span>
        </div>
        <div className=" w-full rounded-e-xl  h-full flex flex-col gap-1  justify-center items-center">
          <span className="font-semibold text-green-600  text-3xl">$100</span>
          <span className="text-sm  text-zinc-400">you will get</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentTracking;
