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

// customer as borrower (I will get)
function Borrower() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full h-full p-5">
      <Input placeholder="Enter amount" className="p-8" />

      <TextArea></TextArea>

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
      </Popover>
      <div className="fixed bottom-3 left-0 px-3  w-full ">
        <Button className=" right-2 py-9 w-full bg-green-600 text-lg">
          Save
        </Button>
      </div>
    </div>
  );
}

export default Borrower;
