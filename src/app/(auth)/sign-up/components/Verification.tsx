"use client";
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
import React, { useEffect } from "react";

function Verification() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const phoneNumber = useAppSelector((state) => state.auth.phoneNumber);
  const route = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="w-full  flex justify-center items-center">
              <InputOTP
                maxLength={6}
                onComplete={(e) => {
                  (async () => {
                    try {
                      if (!isLoaded) {
                        return;
                      }

                      const completeSignUp =
                        await signUp?.attemptPhoneNumberVerification({
                          code: e,
                        });

                      console.log(completeSignUp);

                      if (completeSignUp?.status !== "complete") {
                        toast({
                          variant: "destructive",
                          title: JSON.stringify(completeSignUp),
                        });
                      }
                      if (completeSignUp?.status === "complete") {
                        const test = await setActive({
                          session: completeSignUp.createdSessionId,
                        });
                        route.push("/sign-in");
                      }
                    } catch (error: any) {
                      console.log(error);
                    }
                  })();
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
        </Card>
      </div>
    </div>
  );
}

export default Verification;
