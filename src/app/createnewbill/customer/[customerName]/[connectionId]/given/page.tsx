"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import TextArea from "@/components/TextArea";
import axios from "axios";
import { amountOfBill } from "@/schema/amountSchema";
import { toast } from "@/components/ui/use-toast";
import MethordsToPay from "../../../../components/MethordsToPay";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { add } from "@/lib/store/features/customerName/customerNameSlice";

// customer as borrower (I will get)
function Borrower({
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

  const handlePaymentType = (ptype: string) => {
    setPaymentType(ptype);
  };
  console.log(paymentType);

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
          paymentType, //" "for item , cash ,online
          paid: false,
          refBillId: "",
          refCreatedAt: "",
          bySeller: true,
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

  return (
    <div className="w-full h-full  flex flex-col gap-3 justify-center items-center py-2 ">
      <div className=" w-full px-5">
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
      <div className=" w-full px-5 ">
        <TextArea></TextArea>
      </div>
      <div className=" w-full px-5">
        <MethordsToPay
          handlePaymentType={handlePaymentType}
          give={true}
        ></MethordsToPay>
      </div>
      <div className=" w-full px-3 ">
        <Button
          className=" py-9 w-full text-lg font-bold bg-[#ffc300] text-primary "
          onClick={() => {
            const validateAmount = amountOfBill.safeParse(amount);

            if (!validateAmount.success) {
              toast({
                variant: "destructive",
                title: validateAmount.error.errors[0].message,
              });
            } else {
              const totalAmount: number = -parseInt(amount);

              createNewBillhandel(connectionId, totalAmount, paymentType);
            }
          }}
        >
          Gave
        </Button>
      </div>
    </div>
  );
}

export default Borrower;
