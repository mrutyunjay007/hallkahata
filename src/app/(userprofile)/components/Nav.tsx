"use client";
import { RiSendPlane2Line } from "react-icons/ri";
import ProfilePic from "@/components/ProfilePic";
import React from "react";
import PaymentTrackingForUser from "./PaymentTrackingForUser";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import Backbtn from "@/components/Backbtn";
import nameTrimer from "@/util/nameTrimer";
import { TbReceiptRupee } from "react-icons/tb";
import { useRouter } from "next/navigation";

function Nav() {
  const connection = useAppSelector((state) => state.connection);

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
              {connection.userName !== undefined
                ? nameTrimer(connection?.userName!, 10)
                : "loding..."}
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
              <span>{"pay"}</span>
              <TbReceiptRupee className="size-7 " />
            </span>
          ) : (
            <span className="font-bold flex justify-center items-center font-nunito text-xl">
              <span>{"remaind"}</span>
              <RiSendPlane2Line className="size-7 " />
            </span>
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
