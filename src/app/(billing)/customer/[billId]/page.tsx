"use client";
import Backbtn from "@/components/Backbtn";
import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IBill from "@/config/type/billType";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const CustomerBill = ({ params }: { params: { billId: string } }) => {
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
    <>
      <div className="w-full fixed top-0 p-5  flex justify-start items-center ">
        <Backbtn color="white"></Backbtn>
      </div>
      <div className="w-full h-full flex items-end bg-[#ffc300]">
        <div className="w-full h-4/5 relative rounded-t-3xl bg-white  px-2">
          {/* profile */}
          <span className="absolute w-full h-48 -top-24 left-0 flex justify-center items-center  ">
            <span className="w-48 h-full rounded-full">
              <ProfilePic url=""></ProfilePic>
            </span>
          </span>

          {/* bill */}
          <Card className="w-full mt-28 border-none drop-shadow-none  ">
            <div className="w-full text-center text-lg font-bold flex justify-center items-center gap-1">
              <span>{data?.customer.userName}</span>
              <span className="text-[#ffc300]">{"is a customer"}</span>
            </div>
            <CardHeader className=" ">
              <CardTitle>
                <div className="w-full text-primary flex justify-between items-center">
                  <span className="tag  ">Bill</span>
                  <span className="val  font-normal text-muted-foreground">
                    {billId}
                  </span>
                </div>
              </CardTitle>
              <CardDescription
                className={`font-mono font-semibold text-[#ffc300] `}
              >
                <span className="text-sm">
                  {`${data?.amount! > 0 ? "paid" : "unpaid"}`}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className=" rounded-b-xl font-mono font-bold">
              {/* cutomer */}
              <div className="w-full py-2 flex justify-between items-center text-primary">
                <span className="tag">customer :</span>
                <span className="val">{data?.customer.userName}</span>
              </div>
              {/* seller */}
              <div className="w-full py-2 flex justify-between items-center text-primary">
                <span className="tag ">seller :</span>
                <span className="val">{data?.seller.userName}</span>
              </div>
              {/* date */}
              <div className="w-full py-2 flex justify-between items-center text-primary">
                <span className="tag ">date :</span>
                <span className="val">{JSON.stringify(data?.createdAt)}</span>
              </div>
            </CardContent>
            <CardFooter className="mt-2">
              {/* amount */}
              <div className="w-full py-2 flex justify-between items-center ">
                <span className={` tag  text-[#ffc300] font-bold`}>
                  Total amount :
                </span>
                <span
                  className={`${
                    data?.amount! > 0 ? "text-green-400" : "text-red-400"
                  } val font-bold text-3xl`}
                >
                  ₹ {Math.abs(data?.amount!)}
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {data?.amount! < 0 && (
        <span className="w-full fixed bottom-0 left-0 p-2 ">
          <Button className="w-full py-7  font-bold">Remainder</Button>
        </span>
      )}
    </>
  );
};

export default CustomerBill;
