"use client";

import {
  add,
  addConnectionId,
} from "@/lib/store/features/connection/connectionSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import React, { useEffect } from "react";

const DateSetter = ({
  userName,
  amount,
  phoneNumber,
  userType,
  connectionId,
}: {
  userName: string;
  amount: number;
  phoneNumber: string;
  userType: string;
  connectionId: string;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(add({ userName, amount, phoneNumber, userType }));
    dispatch(addConnectionId(connectionId));
  }, [phoneNumber, amount, dispatch]);

  return <></>;
};

export default DateSetter;
