"use client";
import React, { useEffect, useState } from "react";
import Notification from "./components/notification";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { TNotification } from "@/config/type/notificationType";
import { set } from "mongoose";

function Notifications() {
  const [data, setData] = useState<any[]>();

  const id = useAppSelector((state) => state.notification.id);

  // remove the approved bill or remainder bill if both true
  useEffect(() => {
    if (id !== "") {
      setData((pre) => {
        return pre?.filter((item) => item._id !== id);
      });
    }
  }, [id]);

  // get the data
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/notification?`
        );
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="w-full h-full  px-3 pb-5 rounded-t-2xl">
      <ScrollArea className="h-full py-2 px-2 rounded-xl bg-slate-100 w-full  ">
        {data?.map((item) => (
          <Notification
            key={item._id}
            id={item._id}
            amount={item.amount}
            sellerName={item.seller.userName}
            sellerNumber={item.seller.phoneNumber}
            customerNumber={item.customer?.phoneNumber}
            customerName={item.customer?.userName}
            paymentType={item.paymentType}
            paid={item.paid}
            remainder={item.remainder}
          ></Notification>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Notifications;
