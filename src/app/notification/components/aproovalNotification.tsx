import BallBounce from "@/components/Loaders/BallBounce";
import { Button } from "@/components/ui/button";
import { add } from "@/lib/store/features/notification/notificationSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import axios from "axios";
import React, { useState } from "react";
import { RiCheckDoubleFill, RiCheckFill, RiCloseFill } from "react-icons/ri";

function AproovalNotification({
  id,
  userName,
  amount,
}: {
  id: string;
  userName: string;
  amount: number;
}) {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full h-full flex bg-white justify-center px-3 items-center rounded-lg">
        <BallBounce size="size-3" bg="bg-slate-400"></BallBounce>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex bg-white justify-between px-3 items-center rounded-lg">
      <span className=" text-wrap font-poppins w-full h-full  flex items-center  ">
        {`Do you owe ₹${Math.abs(amount)} to ${userName} Seller?`}
      </span>

      {/* btns */}
      <span className=" h-full flex justify-end items-center gap-3 text-white font-bold bg-slate-50 rounded-r-xl">
        {/* btn to approve */}
        <span
          className=" w-7 h-7 flex justify-center items-center bg-primary rounded-full  cursor-pointer"
          onClick={() => {
            (async () => {
              setLoading(true);
              try {
                const { data } = await axios.post(
                  `http://localhost:3000/api/notification`,
                  {
                    id,
                    aprooved: true,
                    cancel: false,
                    remainder: false,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (data.success) {
                  setLoading(false);
                  dispatch(add(id));
                }
              } catch (error) {
                console.log(error);
              }
            })();
          }}
        >
          <RiCheckDoubleFill className="size-3 font-bold" />
        </span>

        {/* btn to cancel */}
        <span
          className=" bg-slate-200 text-primary w-7 h-7 flex justify-center items-center rounded-full"
          onClick={() => {
            (async () => {
              setLoading(true);
              try {
                const { data } = await axios.post(
                  `http://localhost:3000/api/notification`,
                  {
                    id,
                    aprooved: false,
                    cancel: true,
                    remainder: false,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (data.success) {
                  setLoading(false);
                  dispatch(add(id));
                }
              } catch (error) {}
            })();
          }}
        >
          <RiCloseFill className="size-3  font-bold" />
        </span>
      </span>
    </div>
  );
}

export default AproovalNotification;
