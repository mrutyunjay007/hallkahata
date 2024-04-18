"use client";

import { add } from "@/lib/store/features/connection/connectionSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import React, { useEffect } from "react";

const DateSetter = ({
  userName,
  amount,
  phoneNumber,
}: {
  userName: string;
  amount: number;
  phoneNumber: string;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(add({ userName, amount, phoneNumber }));
  }, [phoneNumber, amount, dispatch]);

  return <></>;
};

export default DateSetter;
