import React from "react";
import { PiMoneyWavyBold } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import PaySingleBill from "./components/paysinglebill";

const SellerBill = async ({ params }: { params: { billId: string } }) => {
  const { billId } = params;

  const respons = await fetch(`http://localhost:3000/api/bill?bill=${billId}`, {
    cache: "no-store",
  });
  const { data } = await respons.json();

  return (
    <div className="w-full md:w-1/2 h-full flex md:flex-row flex-col items-center justify-between  p-7">
      {/* bill */}
      <div className="relative flex flex-col justify-center   items-center w-full h-full  ">
        <CardHeader className=" w-full">
          <CardTitle>
            <div className="w-full text-primary flex justify-between items-center">
              <span className="tag  ">Bill</span>
              <span className="val  font-normal text-muted-foreground">
                {billId}
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

        <CardContent className="w-full rounded-b-xl font-mono font-bold">
          {/* cutomer */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag">customer :</span>
            <span className="val">{data.customer.userName}</span>
          </div>
          {/* seller */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag ">seller :</span>
            <span className="val">{data.seller.userName}</span>
          </div>
          {/* date */}
          <div className="w-full py-2 flex justify-between items-center text-primary">
            <span className="tag ">date :</span>
            <span className="val">{data.createdAt}</span>
          </div>
        </CardContent>
        <CardFooter className="mt-2 w-full">
          {/* amount */}
          <div className="w-full py-2 flex justify-between items-center ">
            <span className={` tag  font-bold`}>Total amount :</span>
            <span
              className={`${
                data.amount > 0 ? "text-green-400" : "text-red-400"
              } val font-bold text-3xl`}
            >
              ₹ {Math.abs(data.amount)}
            </span>
          </div>
        </CardFooter>
      </div>

      {/* payment */}
      {!data.paid && (
        <PaySingleBill
          amount={data.amount}
          connectionId={data.connectionId}
          billId={billId}
          createdAt={data.createdAt}
        ></PaySingleBill>
      )}
    </div>
  );
};

export default SellerBill;
