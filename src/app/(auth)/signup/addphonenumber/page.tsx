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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import india from "@/../public/india.png";

function Addphonenumber() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Card className="w-[350px]">
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
                type="number"
                placeholder="phone number"
                className=" "
              ></Input>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            <Link href="/signup/addphonenumber/verification">
              <Button className="bg-sky-900">Next</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Addphonenumber;
