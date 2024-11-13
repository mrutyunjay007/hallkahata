"use client";
import React, { useState } from "react";
import Sellers from "./components/Sellers";
import Customers from "./components/Customers";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { AmICustomerOrSeller } from "@/lib/store/features/auth/authSlice";

function DashBoard() {
  const [isCustomer, setIsCustomer] = useState(true);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex justify-center items-center font-semibold font-poppins">
        <span
          className={`w-full border-b-2 ${
            isCustomer ? " border-[#ffc300]" : "border-transparent"
          } p-5 flex justify-center items-center cursor-pointer`}
          onClick={() => {
            dispatch(AmICustomerOrSeller(false));
            setIsCustomer(true);
          }}
        >
          customers
        </span>
        <span
          className={`w-full border-b-2  ${
            !isCustomer ? " border-[#ffc300]" : "border-transparent"
          } p-5 flex justify-center items-center cursor-pointer`}
          onClick={() => {
            dispatch(AmICustomerOrSeller(true));
            setIsCustomer(false);
          }}
        >
          sellers
        </span>
      </div>
      {isCustomer ? <Customers></Customers> : <Sellers></Sellers>}
    </div>
  );
}

export default DashBoard;
