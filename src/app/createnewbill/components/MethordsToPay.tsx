"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

import { FaBoxOpen } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { PiMoneyWavyBold } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";

function MethordsToPay({
  handlePaymentType,
  give,
}: {
  handlePaymentType: (type: string) => void;
  give: boolean;
}) {
  const [cash, setCash] = useState(true);
  const [online, setOnline] = useState(false);
  const [product, setProduct] = useState(false);

  return (
    <div
      className={`w-full 
       md:relative md:w-1/2  flex flex-col  items-center justify-between md:justify-center`}
    >
      {/* paymentType */}
      <div className="w-full flex flex-col justify-between gap-2 items-center">
        {/* cash */}
        <Card
          className={`w-full p-5 flex  justify-start items-center gap-4  ${
            cash && "bg-[#ffc300]"
          }`}
        >
          <Checkbox
            className="border-2 border-primary"
            onClick={() => {
              if (!cash) {
                handlePaymentType("cash");
                setCash(true);
                setOnline(false);
                setProduct(false);
              }
            }}
            checked={cash && true}
          />

          <PiMoneyWavyBold className="size-6" />
          <span
            className={`text-primary ${
              cash ? "font-bold" : "font-semibold"
            }  text-lg`}
          >
            Cash
          </span>
        </Card>

        {/* online */}
        <Card
          className={`w-full  p-5  flex  justify-start items-center gap-4  ${
            online && "bg-[#ffc300]"
          }`}
        >
          <Checkbox
            className="border-2 border-primary"
            onClick={() => {
              if (!online) {
                handlePaymentType("online");
                setCash(false);
                setOnline(true);
                setProduct(false);
              }
            }}
            checked={online && true}
          />
          <MdOutlinePayment className="size-6" />
          <span
            className={`text-primary ${
              online ? "font-bold" : "font-semibold"
            }  text-lg`}
          >
            Online
          </span>
        </Card>

        {/* product */}
        <Card
          className={`w-full  p-5  flex  justify-start items-center gap-4   ${
            product && "bg-[#ffc300]"
          }  ${!give && "hidden"}`}
        >
          <Checkbox
            className="border-2 border-primary"
            onClick={() => {
              if (!product) {
                handlePaymentType("product");
                setCash(false);
                setOnline(false);
                setProduct(true);
              }
            }}
            checked={product && true}
          />

          <FaBoxOpen className="size-6 " />
          <span
            className={`text-primary ${
              product ? "font-bold" : "font-semibold"
            }  text-lg`}
          >
            Product
          </span>
        </Card>
      </div>
    </div>
  );
}

export default MethordsToPay;
