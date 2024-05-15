"use client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePayment } from "react-icons/md";
import { PiMoneyWavyBold } from "react-icons/pi";
import { set } from "mongoose";

function PaySingleBill() {
  const [paymentType, setPaymentType] = useState(true);

  const data = { amount: -1 };

  return (
    <div className="w-full md:relative md:w-1/2 h-full flex flex-col  items-center justify-between md:justify-center">
      {/* paymentType */}
      <div className="w-full flex flex-col justify-between gap-3 items-center">
        <Card
          className={`w-full h-full p-6  flex  justify-start items-center gap-4 md:drop-shadow-none drop-shadow-lg ${
            paymentType && "bg-[#ffc300]"
          }`}
        >
          <Checkbox
            className="border-2 border-primary"
            onClick={() => {
              setPaymentType(!paymentType);
            }}
            checked={paymentType && true}
          />

          <PiMoneyWavyBold className="size-9" />
          <span className="text-primary font-bold text-2xl">Cash</span>
        </Card>

        <Card
          className={`w-full h-full p-6  flex  justify-start items-center gap-4 md:drop-shadow-none  drop-shadow-lg ${
            !paymentType && "bg-[#ffc300]"
          }`}
        >
          <Checkbox
            className="border-2 border-primary"
            onClick={() => {
              setPaymentType(!paymentType);
            }}
            checked={!paymentType && true}
          />
          <MdOutlinePayment className="size-9" />
          <span className="text-primary font-bold text-2xl">Online</span>
        </Card>
      </div>

      {/* pay btn */}
      <div className="w-full">
        {" "}
        {data.amount < 0 && (
          <span className="w-full  md:absolute bottom-0">
            <Button className="w-full py-10 bg-[#ffc300] text-primary text-xl hover:text-white font-black rounded-md">
              Pay
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

export default PaySingleBill;
