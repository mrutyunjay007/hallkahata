"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Verification() {
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
                      const { data } = await axios.post(
                        "http://localhost:3000/api/verify",
                        {
                          phoneNumber,
                          code: e,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );

                      if (data.success) {
                        route.push("/login");
                      }
                    } catch (error: any) {
                      if (error.response.status === 400) {
                        console.log("hello");

                        toast({
                          variant: "destructive",
                          title: "code is not metching",
                        });
                      }
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
          {/* <CardFooter className="w-full flex justify-end">
            <Link href="/signup/addphonenumber/verification">
              <Button className="bg-sky-900">verify</Button>
            </Link>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default Verification;
