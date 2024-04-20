"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { amountOfBill } from "@/schema/amountSchema";
import React, { useEffect, useState } from "react";

import MethordsToPay from "../../../../components/MethordsToPay";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { add } from "@/lib/store/features/customerName/customerNameSlice";

function Gotten({
  params,
}: {
  params: { connectionId: string; customerName: string };
}) {
  const { connectionId, customerName } = params;

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  useEffect(() => {
    dispatch(add({ userName: customerName }));
  }, [connectionId]);

  const createNewBillhandel = async (
    connectionId: string,
    amount: number,
    paymentType: string
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/bill",
        {
          connectionId,
          amount,
          paymentType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentType = (ptype: string) => {
    setPaymentType(ptype);
  };

  return (
    <div className="w-full h-full  ">
      <div className=" w-full p-5">
        <Input
          type="number"
          placeholder="Enter amount"
          className="py-8  px-4 "
          onChange={(e) => {
            e?.preventDefault();
            setAmount(e.target.value);
          }}
        />
      </div>

      <div className=" w-full px-5">
        <MethordsToPay handlePaymentType={handlePaymentType}></MethordsToPay>
      </div>
      <div className="fixed bottom-3 left-0 px-3  w-full ">
        <Button
          className=" right-2 py-9 w-full text-lg"
          onClick={() => {
            const validateAmount = amountOfBill.safeParse(amount);

            if (!validateAmount.success) {
              toast({
                variant: "destructive",
                title: validateAmount.error.errors[0].message,
              });
            } else {
              const totalAmount: number = parseInt(amount);

              createNewBillhandel(connectionId, totalAmount, paymentType);
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Gotten;
