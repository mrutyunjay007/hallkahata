"use client";

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
import React from "react";

function Signup() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Card className="w-[350px]">
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
              ></Input>
            </span>

            <span>
              <Label htmlFor="password">Password:</Label>
              <Input id="password" placeholder="password"></Input>
            </span>
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            <Link href="/signup/addphonenumber">
              <Button className="bg-sky-900">Next</Button>
            </Link>
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
