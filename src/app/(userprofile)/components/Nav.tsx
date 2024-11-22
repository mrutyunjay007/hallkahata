"use client";
import { RiSendPlane2Line } from "react-icons/ri";
import ProfilePic from "@/components/ProfilePic";
import React, { useState } from "react";
import PaymentTrackingForUser from "./PaymentTrackingForUser";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import Backbtn from "@/components/Backbtn";
import nameTrimer from "@/util/nameTrimer";
import { TbReceiptRupee } from "react-icons/tb";
import { useRouter } from "next/navigation";
import BallBounce from "@/components/Loaders/BallBounce";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

function Nav() {
  const connection = useAppSelector((state) => state.connection);
  const [remainderSendingLoder, setRemainderSendingLoder] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="w-full flex justify-between items-center px-6 pt-4 pb-2">
        <Backbtn color="#ffc300"></Backbtn>
        <span className=" font-bold text-wrap font-poppins text-sm ">
          {`I'm a ${
            connection?.userType === "customer" ? "Seller" : "Customer"
          }`}
        </span>
      </div>
      <div className=" flex gap-2  justify-between items-center   w-full px-6  py-5">
        <span className="  flex gap-2 items-center size-10">
          <ProfilePic url=""></ProfilePic>
          <span className=" flex w-full flex-col justify-start items-start">
            <span className="text-lg font-bold font-poppins ">
              {connection.userName !== undefined ? (
                nameTrimer(connection?.userName!, 10)
              ) : (
                <div className=" py-4">
                  <BallBounce size="size-3" bg="bg-slate-300"></BallBounce>
                </div>
              )}
            </span>
            <span className=" w-40 text-[11px] -mt-1 font-normal font-mono opacity-85">
              {`${connection.userType}`}
            </span>
          </span>
        </span>
        <span className="flex justify-start items-center font-semibold text-primary cursor-pointer">
          {connection?.userType === "seller" ? (
            <span
              className="flex justify-center items-center font-bold font-nunito text-xl"
              onClick={() => {
                router.push(
                  `/createnewbill/seller/${connection.userName}/${connection.connectionId}`
                );
              }}
            >
              <span className="text-blue-700">{"pay"}</span>
              <TbReceiptRupee className="size-7 text-blue-700 animate-bounce" />
            </span>
          ) : !remainderSendingLoder ? (
            <span
              className="font-bold flex justify-center text-blue-700 items-center font-nunito text-xl"
              onClick={() => {
                (async () => {
                  setRemainderSendingLoder(true);
                  try {
                    const { data } = await axios.post(
                      `/api/remainder`,
                      {
                        connectionId: connection.connectionId,
                      },
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    );
                    if (data.success) {
                      toast({
                        variant: "default",
                        title: `₹ ${connection.amount} remainder sent successfully!🎉`,
                      });
                      setRemainderSendingLoder(false);
                    }
                  } catch (error) {}
                })();
              }}
            >
              <span>{"remaind"}</span>
              <RiSendPlane2Line className="size-7 animate-next" />
            </span>
          ) : (
            <BallBounce size="size-3" bg="bg-blue-700"></BallBounce>
            // <div className="relative w-9 h-9 font-bold rounded-full animate-spin  text-blue-700 ">
            //   <RiSendPlane2Line className="size-7 absolute -top-2 left-0 " />
            // </div>
          )}
        </span>
      </div>
      <span className={` flex  justify-center items-center  w-full pt-1 pb-4`}>
        <PaymentTrackingForUser
          amount={connection.amount}
        ></PaymentTrackingForUser>
      </span>
    </>
  );
}

export default Nav;
