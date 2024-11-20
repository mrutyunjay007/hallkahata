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

const SellerBill = ({ params }: { params: { billId: string } }) => {
  const { billId } = params;

  const [data, setData] = useState<IBill>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/bill?bill=${billId}`);

        if (data.success) {
          setData(data.data);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="w-full md:w-1/2 h-full flex md:flex-row flex-col items-center justify-between  p-7">
      {/* bill */}
      <div className="relative flex flex-col justify-center   items-center w-full h-full  ">
        <CardHeader className=" w-full font-poppins">
          <CardTitle>
            <div className="w-full text-primary flex justify-between items-center">
              <span className="tag w-full ">Bill</span>
              <span className="val  font-normal text-muted-foreground w-full">
                {nameTrimer(billId, 12)}
              </span>
            </div>
          </CardTitle>
          <CardDescription
            className={`font-mono font-semibold ${
              data?.paid && "text-[ #ffc300]"
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
              {dateConverter(JSON.stringify(data?.createdAt!))}
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
              } val font-bold text-3xl w-full flex justify-end`}
            >
              ₹{Math.abs(data?.amount!)}
            </span>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default SellerBill;
