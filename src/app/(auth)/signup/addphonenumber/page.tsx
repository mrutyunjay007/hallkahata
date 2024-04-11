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

function Addphonenumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  return (
    <div className="w-full h-screen flex justify-center px-5 items-center">
      <div>
        <Card className="w-full md:w-[350px] ">
          <CardHeader>
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-center items-center gap-2 ">
              <div className="h-9 w-1/2  rounded-lg border-2 border-zinc-300 flex justify-center items-center gap-2 ">
                <Image className="size-5" src={india} alt="" />
                <span>+91</span>
              </div>
              <Input
                placeholder="phone number"
                className=" "
                onChange={(e) => {
                  e?.preventDefault();
                  setPhoneNumber(e.target.value);
                }}
              ></Input>
            </div>
            {phoneNumberError.length > 0 && (
              <span className="text-sm font-mono text-red-500 text-muted-foreground">
                {phoneNumberError}
              </span>
            )}
          </CardContent>

          <CardFooter className="w-full flex justify-end">
            {/* <Link href="/signup/addphonenumber/verification"> */}
            <Button
              className="bg-sky-900"
              onClick={() => {
                const validatePhoneNumber =
                  userPhoneNumber.safeParse(phoneNumber);
                !validatePhoneNumber.success
                  ? setPhoneNumberError(
                      validatePhoneNumber.error.errors[0].message
                    )
                  : setPhoneNumberError("");
              }}
            >
              Next
            </Button>
            {/* </Link> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Addphonenumber;
