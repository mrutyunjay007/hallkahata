import React from "react";

function RemaindingNotification() {
  return (
    <div className="w-full h-full flex cursor-pointer justify-between  items-center">
      <span className="text-xl w-full h-full px-5 flex items-center gap-2 bg-[#ffc300] rounded-l-xl">
        <span> You need to pay </span>
        <span className="font-bold">₹500</span> <span>to</span>to
        <span className="font-bold">Ramesh</span> <span>Seller </span>
      </span>
      {/* btns */}
      <span className="px-3 w-full h-full flex justify-end items-center gap-2 text-white font-bold bg-slate-50 rounded-r-xl">
        <span className="px-5 py-2 bg-[#ffc300] rounded-lg text-black cursor-pointer">
          ok
        </span>
      </span>
    </div>
  );
}

export default RemaindingNotification;
