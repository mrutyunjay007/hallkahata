"use client";
import Backbtn from "@/components/Backbtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useSignUp } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";
import ResendOtpCountDown from "./smallComponents/ResendOtpCountDown";

function Verification({
  backToAddPhoneNumber,
}: {
  backToAddPhoneNumber: () => void;
}) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [enable, setEnable] = useState(false);

  const { phoneNumber, userName } = useAppSelector((state) => state.auth);
  const route = useRouter();

  //Handle verification
  const handleVerification = async (e: any) => {
    try {
      if (!isLoaded) {
        return;
      }

      const completeSignUp = await signUp?.attemptPhoneNumberVerification({
        code: e,
      });

      console.log(completeSignUp);

      if (completeSignUp?.status !== "complete") {
        console.log(completeSignUp.status);

        toast({
          variant: "destructive",
          title: JSON.stringify(completeSignUp?.status),
        });
      }
      if (completeSignUp?.status === "complete") {
        // create user in db

        const { data } = await axios.post(
          "http://localhost:3000/api/save-user",
          {
            userId: completeSignUp.createdUserId,
            userName,
            phoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        route.push("/sign-in");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Incorrect code",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-5">
      <Card className=" w-full md:w-96 flex flex-col justify-center items-center ">
        <span className="w-full flex justify-start items-center p-5">
          <IoIosArrowDropleftCircle
            className={`size-8 text-[#ffc300] cursor-pointer`}
            onClick={() => {
              backToAddPhoneNumber();
            }}
          />
        </span>
        <div className="w-full px-10  flex flex-col gap-5 justify-center items-center">
          <div className="w-full text-xl pt-2 pb-4  font-poppins font-bold text-primary">
            <span>OTP</span>
            {/* <span className="text-[#ffc300] ">{"up"}</span> */}
          </div>
          <CardContent className="flex flex-col gap-3">
            <div className="w-full  flex justify-center items-center">
              <InputOTP
                maxLength={6}
                onComplete={(e) => {
                  handleVerification(e);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
        </div>
        <div className="w-full  flex justify-between py-6 px-10  items-center">
          <span className="font-semibold text-sm text-primary flex justify-center items-center gap-2 ">
            <span className="text-sm font-poppins text-[#ffc300] font-semibold">
              Resend otp
            </span>
            <span className="flex justify-center items-center gap-[2px]">
              <span>00</span>
              <span className="">:</span>
              <span>
                <ResendOtpCountDown
                  activate={() => {
                    setEnable(true);
                  }}
                  enable={enable}
                />
              </span>
            </span>
          </span>
          <Button
            disabled={!enable}
            className={`p-5 bg-[#ffc300] text-white font-semibold  disabled:bg-slate-300`}
            onClick={() => {
              (async () => {
                await signUp?.preparePhoneNumberVerification({
                  strategy: "phone_code",
                });
              })();
              setEnable(false);
            }}
          >
            Resend
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Verification;
