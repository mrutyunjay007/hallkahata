"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import india from "@/../public/india.png";
import { userPhoneNumber } from "@/schema/userSchema";
import Backbtn from "@/components/Backbtn";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";

function Addphonenumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  return (
    <div className="w-full flex justify-center items-center h-screen  ">
      <div className="w-full fixed p-5 top-0 left-0 ">
        <Backbtn color="#ffc300"></Backbtn>

        <div className="w-full mt-3 text-5xl p-5 font-bold text-primary">
          <span>Sign</span>
          <span className="text-[#ffc300]">up</span>
        </div>
      </div>

      <div className="w-full p-10 flex flex-col gap-10 justify-center items-center">
        <div className=" w-full flex justify-center items-center gap-2  ">
          <div className="h-9 w-1/2 py-8 rounded-lg  bg-white flex justify-center items-center gap-2 border-2 border-primary ">
            <Image className="size-5" src={india} alt="" />
            <span className="bg-white">+91</span>
          </div>
          <Input
            placeholder="phone number"
            className=" border-2 border-primary px-4 py-8"
            onChange={(e) => {
              e?.preventDefault();
              setPhoneNumber(e.target.value);
            }}
          ></Input>
        </div>
        <Button className=" w-full py-8 bg-primary hover:bg-[#ffc300] font-bold text-white hover:text-primary">
          Next
        </Button>
      </div>
      {/* <div className="w-full h-32 relative flex justify-center items-center">
        <div
          className="w-16 h-32 flex justify-center items-center top-0 right-0 drop-shadow-md absolute bg-[#ffc300] rounded-l-full cursor-pointer"
          // onClick={() => {
          //   const name = userFullName.safeParse(fullName);
          //   !name.success
          //     ? setFullNameError(name.error.errors[0].message)
          //     : setFullNameError("");

          //   const validatePassword = userPassword.safeParse(password);
          //   !validatePassword.success
          //     ? setPasswordError(validatePassword.error.errors[0].message)
          //     : setPasswordError("");
          // }}
        >
          <IoIosArrowRoundForward className="size-7" />
        </div>
      </div> */}
    </div>
  );
}

export default Addphonenumber;
