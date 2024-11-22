"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { amountOfBill } from "@/schema/amountSchema";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import MethordsToPay from "../../../components/MethordsToPay";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { add } from "@/lib/store/features/connectionName/connectionNameSlice";
import { useRouter } from "next/navigation";
import BallBounce from "@/components/Loaders/BallBounce";

function Pay({
  params,
}: {
  params: { connectionId: string; sellerName: string };
}) {
  const { connectionId, sellerName } = params;

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [isLoading, setLoading] = useState(false);
  const [isPaid, setPaid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isPaid) {
      return;
    }

    const timeOut = setInterval(() => {
      router.back();
    }, 4000);

    return () => {
      clearInterval(timeOut);
    };
  }, [isPaid]);

  useEffect(() => {
    dispatch(add({ userName: sellerName, userType: "seller" }));
  }, [connectionId]);

  const createNewBillhandel = async (
    connectionId: string,
    amount: number,
    paymentType: string
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/bill",
        {
          connectionId,
          amount,
          paymentType,
          paid: true,
          refBillId: "",
          refCreatedAt: "",
          bySeller: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        const { sellerNumber, customerNumber } = data.data;
        toast({
          title: `₹ ${data.data.amount} bill created successfully`,
          variant: "default",
        });

        setPaid(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentType = (ptype: string) => {
    setPaymentType(ptype);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[270px] h-[270px]  flex  justify-center items-center">
          <BallBounce size={"size-6"} bg={"bg-slate-200"}></BallBounce>
        </div>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[270px] h-[270px]  flex flex-col justify-center items-center gap-2">
          <div className="w-24 h-24 rounded-full font-poppins font-bold text-xl text-prime bg-[#ffc300] flex justify-center items-center">
            <Confetti gravity={0.15} />
            {amount ? <span>{parseInt(amount)}</span> : <span>0</span>}
          </div>
          <span className="font-bold font-poppins ">
            {" Payment Successful!"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full  flex flex-col gap-7  items-center py-2 ">
      <div className=" w-full px-5">
        <div className=" w-full flex justify-center items-center border-2 border-primary gap-2 py-5 px-4 rounded-xl  ">
          <span className=" text-3xl font-nunito flex justify-end items-center font-bold pl-3 h-full">
            {"₹"}
          </span>

          <Input
            type="number"
            placeholder="Enter amount"
            className="  px-4 border-none outline-none w-full font-poppins font-semibold"
            onChange={(e) => {
              e?.preventDefault();
              setAmount(e.target.value);
            }}
          ></Input>
        </div>
      </div>

      <div className=" w-full px-5">
        <MethordsToPay
          handlePaymentType={handlePaymentType}
          give={false}
        ></MethordsToPay>
      </div>

      <div className="fixed bottom-3 left-0 px-3  w-full ">
        <Button
          className="  py-9 w-full text-lg font-bold bg-[#ffc300] text-primary"
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
          Pay
        </Button>
      </div>
    </div>
  );
}

export default Pay;
