"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import india from "../../../../public/india.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { userFullName, userPhoneNumber } from "@/schema/userSchema";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

function AddNewCustomer() {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [customerName, setCustomerName] = useState("");

  const { toast } = useToast();

  const createCustomerHandl = async (
    customerNumber: string,
    customerName: string,
    sellerNumber: string
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/connections",
        {
          customerNumber,
          sellerNumber,
          customerName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        router.push(`/customerprofile/8777761380/${customerNumber}`);
        return;
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        //TODO: Toast -> customer already present

        toast({
          variant: "destructive",
          title: "customer already connected with you!",
        });
        return;
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Card className="w-[350px] border-2 border-zinc-300 drop-shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600">Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="string"
            placeholder="customer name"
            onChange={(e) => {
              e?.preventDefault();
              setCustomerName(e.target.value);
            }}
          ></Input>

          <div className="flex justify-center items-center mt-5 gap-2 ">
            <div className="h-9 w-1/2  rounded-lg border-2 border-zinc-300 flex justify-center items-center gap-2 ">
              <Image className="size-5" src={india} alt="" />
              <span>+91</span>
            </div>
            <Input
              type="number"
              className=" "
              onChange={(e) => {
                e?.preventDefault();
                setNumber(e.target.value);
              }}
            ></Input>
          </div>

          <div className="w-full mt-5 flex justify-between">
            <Button variant={"ghost"} className="opacity-50 hover:opacity-100">
              Cancel
            </Button>
            <Button
              variant={"default"}
              onClick={async () => {
                const validateUserName = userFullName.safeParse(customerName);
                const validateNumber = userPhoneNumber.safeParse(number);
                if (!validateUserName.success) {
                  toast({
                    variant: "destructive",
                    title: validateUserName.error.errors[0].message,
                  });
                } else if (!validateNumber.success) {
                  toast({
                    variant: "destructive",
                    title: validateNumber.error.errors[0].message,
                  });
                } else {
                  createCustomerHandl(number, customerName, "8777761380");
                }
              }}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCustomer;
