import { Button } from "@/components/ui/button";
import React from "react";
import AproovalNotification from "./aproovalNotification";
import RemaindingNotification from "./remaindingNotification";
import PaymentNotification from "./paymentNotification";

function Notification() {
  return (
    <div className="w-full h-[5.1rem] rounded-xl cursor-pointer mt-3 ">
      {/* notice for aprooval */}
      {/* <AproovalNotification></AproovalNotification> */}
      {/* notice for remainder */}
      <RemaindingNotification></RemaindingNotification>
      {/* notice of payment from customer */}
      {/* <PaymentNotification></PaymentNotification>  */}
    </div>
  );
}

export default Notification;
