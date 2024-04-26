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
import { userPassword, userPhoneNumber } from "@/schema/userSchema";
import Image from "next/image";
import india from "@/../public/india.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const route = useRouter();

  return (
    <div className=" w-full flex flex-col justify-center items-center h-screen bg-[#ffc300] ">
      <div className="w-full p-10 flex flex-col gap-5 justify-center items-center">
        <div className="w-full text-5xl mb-5 font-bold text-primary">
          <span>Welcome!</span>
          {/* <div className="text-primary text-sm">keep every thing in track</div> */}
        </div>
        <div className=" w-full flex flex-col justify-center items-center gap-5  ">
          <div className=" w-full flex justify-center items-center gap-2  ">
            <div className="h-9 w-1/2 py-8 rounded-lg  bg-white flex justify-center items-center gap-2  ">
              <Image className="size-5" src={india} alt="" />
              <span className="bg-white">+91</span>
            </div>
            <Input
              placeholder="phone number"
              className=" border-none px-4 py-8"
              onChange={(e) => {
                e?.preventDefault();
                setPhoneNumber(e.target.value);
              }}
            ></Input>
          </div>

          <Input
            type="password"
            id="password"
            className=" py-8 px-5 border-none"
            placeholder="password"
            onChange={(e) => {
              e?.preventDefault();
              setPassword(e.target.value);
            }}
          ></Input>
        </div>
      </div>
      <div className="w-full h-32 relative flex justify-start items-center  px-11">
        <Link href={"/signup"}>
          <div className="  text-center font-bold text-lg text-primary ">
            To create a new account
            <div className="text-start cursor-pointer">{" Signup"}</div>
          </div>
        </Link>

        {/* next btn */}
        <div
          className="w-16 h-32 flex justify-center items-center top-0 right-0 drop-shadow-md absolute bg-primary rounded-l-full cursor-pointer"
          onClick={() => {
            const validatePhoneNumber = userPhoneNumber.safeParse(phoneNumber);

            !validatePhoneNumber.success &&
              toast({
                variant: "destructive",
                title: validatePhoneNumber.error?.errors[0].message,
              });

            const validatePassword = userPassword.safeParse(password);
            !validatePassword.success &&
              validatePhoneNumber.success &&
              toast({
                variant: "destructive",
                title: validatePassword.error?.errors[0].message,
              });

            if (validatePassword.success && validatePhoneNumber.success) {
              (async () => {
                try {
                  const { data } = await axios.post(
                    "http://localhost:3000/api/login",
                    {
                      phoneNumber,
                      password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (data.success) {
                    route.push("/customers");
                  }
                } catch (error: any) {
                  if (error.response.status === 401) {
                    toast({
                      variant: "destructive",
                      title: "number or password is incorrect",
                    });
                  }
                }
              })();
            }
          }}
        >
          <IoIosArrowRoundForward className="size-7 text-white " />
        </div>
      </div>
    </div>
  );
}

export default Login;
