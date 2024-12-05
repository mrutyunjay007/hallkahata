"use client";
import React, { useEffect, useState } from "react";
import Notification from "./components/notification";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { TNotification } from "@/config/type/notificationType";
import { set } from "mongoose";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";
import BallBounce from "@/components/Loaders/BallBounce";

function Notifications() {
  const [data, setData] = useState<any[]>();
  const [isLoading, setLoading] = useState(false);
  const id = useAppSelector((state) => state.notification.id);
  const [page, setPage] = useState(1);
  const [intersectionLoading, setIntersectionLoading] = useState(false);
  const { More, intersectionObserverRef } = useInfiniteScrolling(
    fetchData,
    data
  );

  async function fetchData(cb: (more: boolean) => void) {
    page > 1 ? setIntersectionLoading(true) : setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/notification?limit=${20}&page=${page}`
      );
      if (data.success) {
        if (data.data.length < 20) {
          cb(false);
        }
        setData(data.data);
        page > 1 ? setIntersectionLoading(false) : setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // remove the approved bill or remainder bill if both true
  useEffect(() => {
    if (id !== "") {
      setData((pre) => {
        return pre?.filter((item) => item._id !== id);
      });
    }
  }, [id]);

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

        {More && (
          <div
            ref={intersectionObserverRef}
            className="w-full h-[5.1rem] flex justify-center items-center"
          >
            {intersectionLoading && (
              <BallBounce size={"size-4"} bg={"bg-slate-300"}></BallBounce>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default Notifications;
