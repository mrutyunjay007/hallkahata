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
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { userFullName, userPassword } from "@/schema/userSchema";
import Backbtn from "@/components/Backbtn";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addUserNamePassword } from "@/lib/store/features/auth/authSlice";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const route = useRouter();

  return (
    <div className=" w-full flex flex-col justify-center items-center h-screen  ">
      <div className="w-full p-10 flex flex-col gap-5 justify-center items-center">
        <div className="w-full text-5xl mb-5 font-bold text-primary">
          <span>Sign</span>
          <span className="text-[#ffc300] ">{"up"}</span>
        </div>
        <div className=" w-full flex flex-col justify-center items-center gap-5  ">
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
      </div>
      <div className="w-full h-32 relative flex justify-center items-center">
        <div className="w-full  text-center font-mono text-sm text-muted-foreground">
          Already have an account
        </div>

        {/* next btn */}
        <div
          className="w-16 h-32 flex justify-center items-center top-0 right-0 drop-shadow-md absolute bg-[#ffc300] rounded-l-full cursor-pointer"
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
              route.push("/signup/addphonenumber");
            }
          }}
        >
          <IoIosArrowRoundForward className="size-7" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
