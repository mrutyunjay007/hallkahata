"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";

function MethordsToPay({
  handlePaymentType,
}: {
  handlePaymentType: (type: string) => void;
}) {
  const [cash, setCash] = useState(true);
  const [online, setOnline] = useState(false);
  const [product, setProduct] = useState(false);

  return (
    <div className="w-full flex justify-center mt-5 items-center gap-4">
      <Card
        className={`w-[350px] p-5 flex justify-center items-center cursor-pointer border-2 border-primary ${
          cash &&
          "bg-[#ffc300] scale-105 ease-in-out duration-200 border-[#ffc300]"
        }`}
        onClick={() => {
          if (!cash) {
            handlePaymentType("cash");
            setCash(true);
            setOnline(false);
            setProduct(false);
          }
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <span>
            <FaMoneyBillWave className="size-8 text-primary" />
          </span>
          <span className="font-bold text-primary">Cash</span>
        </div>
      </Card>

      <Card
        className={`w-[350px] p-5 flex justify-center items-center cursor-pointer border-2 border-primary ${
          online &&
          "bg-[#ffc300] scale-105 ease-in-out duration-200 border-[#ffc300]"
        }`}
        onClick={() => {
          if (!online) {
            handlePaymentType("online");
            setCash(false);
            setOnline(true);
            setProduct(false);
          }
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <span>
            <SiPhonepe className="size-8 text-primary" />
          </span>
          <span className="font-bold text-primary">Online</span>
        </div>
      </Card>

      <Card
        className={`w-[350px] p-5 flex justify-center items-center cursor-pointer border-2 border-primary ${
          product &&
          "bg-[#ffc300] scale-105 ease-in-out duration-200 border-[#ffc300]"
        }`}
        onClick={() => {
          if (!product) {
            handlePaymentType("product");
            setCash(false);
            setOnline(false);
            setProduct(true);
          }
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <span>
            <FaBoxOpen className="size-8 text-primary" />
          </span>
          <span className="font-bold  text-primary">Product</span>
        </div>
      </Card>
    </div>
  );
}

export default MethordsToPay;
