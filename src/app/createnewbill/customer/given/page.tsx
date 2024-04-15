"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import TextArea from "@/components/TextArea";
import axios from "axios";
import { amountOfBill } from "@/schema/amountSchema";
import { toast } from "@/components/ui/use-toast";

// customer as borrower (I will get)
function Borrower() {
  // const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState("");

  const createNewBillhandel = async (
    customerNumber: string,
    sellerNumber: string,
    customerName: string,
    amount: number
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/bill",
        {
          customerNumber,
          sellerNumber,
          customerName,
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <div className="w-full h-full p-5">
      <Input
        type="number"
        placeholder="Enter amount"
        className="p-8"
        onChange={(e) => {
          e?.preventDefault();
          setAmount(e.target.value);
        }}
      />

      <TextArea></TextArea>
      {/* 
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-32 h-11 mt-5 border-2 rounded-lg border-zinc-500 text-purple-600 font-semibold justify-start ",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon
              className={`${
                date ? "hidden" : "block"
              } text-purple-600 mr-2 h-7 w-7`}
            />
            {date ? (
              format(date, "dd / MM / yyyy")
            ) : (
              <span className=" text-purple-600 font-semibold">
                Pick a date
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover> */}
      <div className="fixed bottom-3 left-0 px-3  w-full ">
        <Button
          className=" right-2 py-9 w-full bg-green-600 text-lg"
          onClick={() => {
            const validateAmount = amountOfBill.safeParse(amount);

            if (!validateAmount.success) {
              toast({
                variant: "destructive",
                title: validateAmount.error.errors[0].message,
              });
            } else {
              const totalAmount: number = -parseInt(amount);

              createNewBillhandel(
                "8777761382",
                "8777761380",
                "Sam",
                totalAmount
              );
            }
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Borrower;
