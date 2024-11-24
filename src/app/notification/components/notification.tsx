import { Button } from "@/components/ui/button";
import React from "react";
import AproovalNotification from "./aproovalNotification";
import RemaindingNotification from "./remaindingNotification";
import PaymentNotification from "./paymentNotification";

function Notification({
  id,
  amount,
  sellerName,
  sellerNumber,
  customerNumber,
  customerName,
  paymentType,
  paid,
  remainder,
}: {
  id: string;
  amount: number;
  sellerName: string;
  sellerNumber: string;
  customerNumber: string;
  customerName: string;
  paymentType: string;
  paid: boolean;
  remainder: boolean;
}) {
  return (
    <div className="w-full h-[5.1rem] rounded-lg  mt-2 ">
      {remainder ? (
        <RemaindingNotification
          id={id}
          userName={sellerName}
          amount={amount}
        ></RemaindingNotification>
      ) : paid ? (
        <PaymentNotification
          id={id}
          userName={customerName}
          amount={amount}
          paymentType={paymentType}
        ></PaymentNotification>
      ) : (
        <AproovalNotification
          id={id}
          userName={sellerName}
          amount={amount}
        ></AproovalNotification>
      )}
    </div>
  );
}

export default Notification;
