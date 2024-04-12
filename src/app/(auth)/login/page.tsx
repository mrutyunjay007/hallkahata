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

function Login() {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center px-5">
      <div>
        <Card className="w-full md:w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <span>
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
            </span>

            <span>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => {
                  e?.preventDefault();
                  setPassword(e.target.value);
                }}
              ></Input>
              {passwordError.length > 0 && (
                <span className="text-sm font-mono text-red-500 text-muted-foreground">
                  {passwordError}
                </span>
              )}
            </span>
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            {/* <Link href="/signup/addphonenumber"> */}
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

                const validatePassword = userPassword.safeParse(password);
                !validatePassword.success
                  ? setPasswordError(validatePassword.error.errors[0].message)
                  : setPasswordError("");
              }}
            >
              Next
            </Button>
            {/* </Link> */}
          </CardFooter>
        </Card>
        <div className="w-full text-center mt-2 font-mono text-sm text-muted-foreground">
          {" "}
          Create a new account
        </div>
      </div>
    </div>
  );
}

export default Login;
