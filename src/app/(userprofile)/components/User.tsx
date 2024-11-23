"use client";
import React, { useState } from "react";
import ProfilePic from "@/components/ProfilePic";
import { RiCheckDoubleFill } from "react-icons/ri";
import { dateConverter } from "@/util/dateConverter";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import CancelLoader from "@/components/Loaders/CancelLoader";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import {
  billIdToDelete,
  updateAmount,
} from "@/lib/store/features/connection/connectionSlice";

export default function User(
  {
    billId,
    connectionId,
    amount,
    createdAt,
    aprooved,
    amISeller,
    amICreated,
    cancelled,
  }: {
    billId: string;
    connectionId: string;
    amount: number;
    createdAt: number;
    aprooved: boolean;
    amISeller: boolean;
    amICreated: boolean;
    cancelled: boolean;
  },
  key: string
) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [cancelLoading, setCancelLoading] = useState(false);

  const [aprooval, setAprooval] = useState(aprooved);

  if (cancelLoading) {
    return (
      <div className=" w-full bg-white h-[5.1rem] my-2 rounded-xl cursor-pointer flex flex-col justify-center items-center">
        <CancelLoader />
      </div>
    );
  }

  return (
    <div
      className={`flex relative w-full h-[5.1rem] my-2 rounded-xl cursor-pointer  justify-center items-center`}
    >
      {/* delete and aprooval */}
      {amICreated && (
        <span
          className="opacity-90 size-4 text-sm bg-red-600  rounded-full text-center flex items-center justify-center absolute top-3 right-3 z-50 text-white font-nunito font-bold"
          onClick={() => {
            setCancelLoading(true);
            (async () => {
              try {
                const { data } = await axios.delete(
                  `/api/bill?bill=${billId}&connection=${connectionId}`
                );

                if (data.success) {
                  // setDeleted(true);
                  setCancelLoading(false);
                  dispatch(updateAmount(amount));
                  dispatch(billIdToDelete(billId));
                }
              } catch (error) {}
            })();
          }}
        >
          {"x"}
        </span>
      )}
      <span
        className="absolute bottom-2 z-30 right-3"
        onDoubleClick={() => {
          if (!amICreated && !aprooval) {
            setAprooval(true);
          }
        }}
      >
        <RiCheckDoubleFill
          className={`size-5  ${
            aprooval ? "text-teal-400" : "text-slate-400"
          } `}
        />
      </span>

      {/* body */}
      <div
        className={`w-full h-full font-poppins flex justify-between items-center  rounded-xl  `}
        onClick={() => {
          router.push(`/seller/${billId}`);
        }}
      >
        {/* date */}
        <div className=" w-full h-full flex rounded-s-xl flex-col justify-center bg-[#ffc300] items-center">
          <span className="w-full text-sm md:text-xl font-poppins text-center ">
            {dateConverter(createdAt.toString())}
          </span>
        </div>

        {/* give status */}
        <div className="w-full flex bg-white h-full justify-center items-center">
          <span
            className={`font-mono text-muted-foreground text-sm ${
              amount > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {amount > 0
              ? amISeller
                ? "you got"
                : "you gave"
              : amISeller
              ? "you gave"
              : "you got"}
          </span>
        </div>

        {/* amount */}
        <div className=" relative flex h-full justify-between rounded-e-xl items-center w-full ">
          {amount < 0 && (
            <span className=" h-full w-full  flex justify-center items-center bg-red-100 rounded-e-xl ">
              {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

              <span className="font-bold text-wrap  text-red-500 rounded-e-xl">
                ₹ {Math.abs(amount)}
              </span>
            </span>
          )}

          {amount > 0 && (
            <span className="h-full  w-full flex rounded-e-lg  justify-center items-center bg-green-100">
              {/* <span className="text-sm  font-light text-red-600">you will pay</span> */}

              <span className="font-bold rounded-e-lg text-wrap text-green-400 ">
                ₹ {Math.abs(amount)}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
