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

function Signup() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center px-5">
      <div>
        <Card className="w-full md:w-[350px]">
          <CardHeader>
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <span>
              <Label htmlFor="name">Full Name:</Label>
              <Input
                id="name"
                placeholder=" Enter your full name"
                className=""
                onChange={(e) => {
                  e?.preventDefault();
                  setFullName(e.target.value);
                }}
              ></Input>
              {fullNameError.length > 0 && (
                <span className="text-sm font-mono text-red-500 text-muted-foreground">
                  {fullNameError}
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
                const name = userFullName.safeParse(fullName);
                !name.success
                  ? setFullNameError(name.error.errors[0].message)
                  : setFullNameError("");

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
          Already have an account
        </div>
      </div>
    </div>
  );
}

export default Signup;
