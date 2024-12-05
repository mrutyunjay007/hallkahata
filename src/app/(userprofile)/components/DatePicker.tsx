import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectDate } from "@/lib/store/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { cn } from "@/lib/utils";
import {
  dateReverserConverterForCalendar,
  dateUrrengerForCalendar,
} from "@/util/dateConverter";
import { CalendarIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";

function DatePicker({
  pre,
  reset,
  handleReset,
  handleDate,
}: {
  pre: string;
  reset: boolean;
  handleReset: () => void;
  handleDate: (date: string) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(
    pre !== "" ? new Date(pre) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (pre !== "") {
      const newSelectedDate = dateUrrengerForCalendar(pre);
      setSelectedDate(newSelectedDate);
    }
  }, [pre]);

  useEffect(() => {
    if (selectedDate.length > 0) {
      buttonRef.current?.click();
    }
  }, [date]);

  useEffect(() => {
    if (reset) {
      setSelectedDate("");
      setDate(new Date());
      handleDate("");
      handleReset();
    }
  }, [reset]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant={"outline"}
          className={cn(
            "w-36 pl-3 text-left font-medium font-poppins rounded-xl "
          )}
        >
          <span>{selectedDate !== "" ? selectedDate : "All"}</span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-90 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setSelectedDate(d?.toString().slice(4, 15)!);
            handleDate(
              dateReverserConverterForCalendar(d?.toString().slice(4, 15)!)
            );

            setDate(d);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
