import React from "react";

function PaymentNotification() {
  return (
    <div className="w-full h-full flex cursor-pointer justify-between  items-center">
      <span className="text-xl w-full h-full px-5 flex items-center gap-2 bg-[#ffc300] rounded-l-xl">
        <span className="font-bold">Ramesh</span> paid{" "}
        <span className="font-bold">₹500</span> in{" "}
        <span className="font-bold">cash</span>
      </span>
      {/* btns */}
      <span className="px-3 w-full h-full flex justify-end items-center gap-2 text-white font-bold bg-slate-50 rounded-r-xl">
        <span className="px-5 py-2 bg-[#ffc300] rounded-lg text-black cursor-pointer">
          ok
        </span>
        <span className="px-5 py-2 bg-slate-300 rounded-lg cursor-pointer">
          canel
        </span>
      </span>
    </div>
  );
}

export default PaymentNotification;
