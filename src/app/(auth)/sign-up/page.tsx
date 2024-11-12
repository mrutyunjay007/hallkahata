"use client";
import React from "react";

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

import Link from "next/link";
import { userFullName, userPassword } from "@/schema/userSchema";

import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addUserNamePassword } from "@/lib/store/features/auth/authSlice";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Addnewphonenumber from "./components/AddnewNumber";
import Verification from "./components/Verification";
import { set } from "mongoose";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(false);
  const [verification, setVerification] = useState(false);

  const dispatch = useAppDispatch();

  const route = useRouter();

  if (newPhoneNumber) {
    return (
      <Addnewphonenumber
        transferToVerification={() => {
          setVerification(true);
          setNewPhoneNumber(false);
        }}
        backToSignUp={() => {
          setNewPhoneNumber(false);
        }}
      />
    );
  }

  if (verification) {
    return (
      <Verification
        backToAddPhoneNumber={() => {
          setVerification(false);
        }}
      />
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <Card className=" w-full md:w-96 flex flex-col justify-center items-center ">
        <div className="w-full px-10 pt-5 flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-start  gap-px  pt-5 pb-4   text-primary">
            <span className={`font-poppins font-bold text-4xl`}>
              Welcome!🎉
            </span>
            <span className="font-mono text-sm -mt-1 ml-[0.35rem]">
              {"create a new account"}
            </span>
          </div>
          <div className=" w-full flex flex-col justify-center items-center gap-5 ">
            <Input
              id="name"
              placeholder=" User Name"
              className=" py-8 px-5 border-2 border-primary"
              onChange={(e) => {
                e?.preventDefault();
                setFullName(e.target.value);
              }}
            ></Input>

            <Input
              type="password"
              id="password"
              className=" py-8 px-5 border-2 border-primary"
              placeholder="Password"
              onChange={(e) => {
                e?.preventDefault();
                setPassword(e.target.value);
              }}
            ></Input>
          </div>
          <div className="w-full mt-2  text-center font-mono text-[12px]  text-muted-foreground">
            {"Already have an account "}
            <span className="text-sm font-bold text-primary cursor-pointer">
              <Link href="/sign-in">sign-in</Link>
            </span>
          </div>
        </div>
        <div className="w-full h-28 relative flex justify-center pb-3 items-center">
          {/* next btn */}
          <div
            className="w-16 h-32 flex justify-center items-center bottom-[0.35rem] right-0  absolute bg-[#ffc300] rounded-l-full cursor-pointer"
            onClick={() => {
              const name = userFullName.safeParse(fullName);
              !name.success &&
                toast({
                  variant: "destructive",
                  title: name.error.errors[0].message,
                });

              const validatePassword = userPassword.safeParse(password);
              !validatePassword.success &&
                toast({
                  variant: "destructive",
                  title: validatePassword.error.errors[0].message,
                });

              if (name.success && validatePassword.success) {
                dispatch(addUserNamePassword({ userName: fullName, password }));
                setNewPhoneNumber(true);
              }
            }}
          >
            <IoIosArrowRoundForward className="size-7 text-bold animate-next" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
