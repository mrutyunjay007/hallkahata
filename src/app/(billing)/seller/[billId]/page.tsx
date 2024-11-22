"use client";
import React, { useEffect, useState } from "react";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import IBill from "@/config/type/billType";
import { dateConverter } from "@/util/dateConverter";
import nameTrimer from "@/util/nameTrimer";
import BallBounce from "@/components/Loaders/BallBounce";

const SellerBill = ({ params }: { params: { billId: string } }) => {
  const { billId } = params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IBill>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/bill?bill=${billId}`);

        if (data.success) {
          setData(data.data);
          setLoading(false);
        }
      } catch (error) {}
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BallBounce size={"size-6"} bg={"bg-slate-200"}></BallBounce>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[550px] h-full flex md:flex-row flex-col items-center justify-between  p-7">
      {/* bill */}
      <div className="relative flex flex-col justify-center   items-center w-full h-full  ">
        <CardHeader className=" w-full font-poppins">
          <CardTitle>
            <div className="w-full text-primary flex justify-between items-center">
              <span className="tag w-full ">Bill</span>
              <span className="val  font-normal flex justify-end text-muted-foreground w-full">
                {nameTrimer(billId, 12)}
              </span>
            </div>
          </CardTitle>
          <CardDescription
            className={`font-mono font-semibold ${
              data?.paid && "text-[#ffc300]"
            } `}
          >
            <span className="text-sm">
              {`${data?.paid ? "paid" : "unpaid"}`}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full rounded-b-xl font-poppins  font-semibold">
          {/* cutomer */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag w-full flex justify-start">customer :</span>
            <span className="val font-normal text-wrap w-full flex justify-end">
              {data?.customer.userName}
            </span>
          </div>
          {/*  seller */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag w-full flex justify-start">seller :</span>
            <span className="val font-normal text-wrap w-full flex justify-end">
              {data?.seller.userName!}
            </span>
          </div>
          {/* date */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag w-full flex justify-start">date :</span>
            <span className="val font-normal w-full flex justify-end">
              {data?.createdAt !== undefined &&
                dateConverter(data?.createdAt.toString())}
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-2 w-full">
          {/* amount */}
          <div className="w-full py-2 flex justify-between font-poppins items-center ">
            <span
              className={` tag text-2xl font-semibold w-full flex justify-start`}
            >
              Total :
            </span>
            <span
              className={`${
                data?.amount! > 0 ? "text-green-400" : "text-red-400"
              } val font-bold text-3xl w-full flex justify-end gap-[0.1rem]`}
            >
              <span className="text-sm h-full flex justify-center items-start ">
                ₹
              </span>
              <span> {Math.abs(data?.amount!)}</span>
            </span>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default SellerBill;
