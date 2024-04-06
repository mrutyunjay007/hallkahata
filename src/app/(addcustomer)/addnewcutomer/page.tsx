"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import india from "../../../../public/india.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function AddNewCustomer() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Card className="w-[350px] border-2 border-zinc-300 drop-shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600">Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="string" placeholder="customer name"></Input>

          <div className="flex justify-center items-center mt-5 gap-2 ">
            <div className="h-9 w-1/2  rounded-lg border-2 border-zinc-300 flex justify-center items-center gap-2 ">
              <Image className="size-5" src={india} alt="" />
              <span>+91</span>
            </div>
            <Input type="number" className=" "></Input>
          </div>

          <div className="w-full mt-5 flex justify-between">
            <Button variant={"ghost"} className="opacity-50 hover:opacity-100">
              Cancel
            </Button>
            <Button variant={"default"}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCustomer;
