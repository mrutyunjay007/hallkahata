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
import { useSignIn } from "@clerk/nextjs";

function Signin() {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  const route = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <Card className=" w-full md:w-96 flex flex-col justify-center items-center ">
        <div className="w-full px-10 pt-5 flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-start  gap-px  pt-5 pb-4   text-primary">
            <span className={`font-poppins font-bold text-3xl`}>
              Welcome Back!
            </span>
            <span className="font-mono text-sm -mt-1 ml-[0.35rem]">
              {"sing-in to your account✨"}
            </span>
          </div>
          <div className=" w-full flex flex-col justify-center items-center gap-5 ">
            <div className="w-full flex flex-col gap-5 justify-center items-center">
              <div className=" w-full flex justify-center items-center border-2 border-primary gap-2 py-4 px-4 rounded-xl  ">
                <span className=" border-r-2  border-slate-300 pr-3 h-full">
                  {"+91"}
                </span>

                <Input
                  placeholder="phone number"
                  className="  px-4  border-none outline-none w-full"
                  onChange={(e) => {
                    e?.preventDefault();
                    setPhoneNumber(e.target.value);
                  }}
                ></Input>
              </div>
            </div>

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
            <span className="text-sm font-bold text-primary cursor-pointer">
              <Link href="/sign-up">sign-up</Link>
            </span>
            {" to create a new account"}
          </div>
        </div>
        <div className="w-full h-28 relative flex justify-center pb-3 items-center">
          {/* next btn */}
          <div
            className="w-16 h-32 flex justify-center items-center bottom-[0.35rem] right-0  absolute bg-[#ffc300] rounded-l-full cursor-pointer"
            onClick={() => {
              const validatePhoneNumber =
                userPhoneNumber.safeParse(phoneNumber);

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
                    const completeSignIn = await signIn?.create({
                      identifier: `+91${phoneNumber}`,
                      password,
                    });

                    console.log(completeSignIn);

                    if (completeSignIn?.status !== "complete") {
                      toast({
                        variant: "destructive",
                        title: JSON.stringify(completeSignIn?.status),
                      });
                    }

                    if (completeSignIn?.status === "complete") {
                      await setActive!({
                        session: completeSignIn?.createdSessionId,
                      });

                      route.push("/customers");
                    }
                  } catch (error: any) {
                    toast({
                      variant: "destructive",
                      title: "number or password is incorrect",
                    });
                  }
                })();
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

export default Signin;
