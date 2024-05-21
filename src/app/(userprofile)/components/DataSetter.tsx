"use client";

import { add } from "@/lib/store/features/connection/connectionSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import React, { useEffect } from "react";

const DateSetter = ({
  userName,
  amount,
  phoneNumber,
  userType,
}: {
  userName: string;
  amount: number;
  phoneNumber: string;
  userType: string;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(add({ userName, amount, phoneNumber, userType }));
  }, [phoneNumber, amount, dispatch]);

  return <></>;
};

export default DateSetter;
