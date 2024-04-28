import Backbtn from "@/components/Backbtn";
import ProfilePic from "@/components/ProfilePic";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { SiGooglepay, SiPaytm, SiPhonepe } from "react-icons/si";

function Payment() {
  return (
    <div className="  w-full h-full">
      <div className="w-full fixed top-0 left-0 flex gap-3 justify-between items-center p-5 z-50">
        <Backbtn color="#ffff"></Backbtn>
        <span className="size-7">
          <ProfilePic url=""></ProfilePic>
        </span>
      </div>

      <div className="relative h-2/3 w-full bg-[#ffc300] rounded-bl-3xl  flex flex-col justify-center items-start gap-2 ">
        <div className="w-full flex items-center px-8 justify-start">
          <span className="font-bold text-white text-xl">{"₹"}</span>
          <span className=" font-bold text-6xl text-primary"> {" 2000"}</span>
        </div>

        <div className="px-8 font-medium text-white text-sm">
          <span>Paying</span>
          <span> Use name</span>
        </div>

        <div className="w-full absolute -bottom-14 px-5 flex justify-center items-center  gap-5">
          <Card className="w-[350px] h-28 p-5  flex justify-center items-center border-none drop-shadow">
            <SiPaytm className="size-10" />
          </Card>
          <Card className="w-[350px] h-28 p-5 flex justify-center items-center  border-none  drop-shadow">
            <SiPhonepe className="size-10" />
          </Card>
          <Card className="w-[350px] h-28 p-5 flex justify-center items-center border-none drop-shadow ">
            <SiGooglepay className="size-10" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Payment;
