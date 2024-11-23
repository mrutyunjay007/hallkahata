"use client";
import React, { useState } from "react";
import ProfilePic from "@/components/ProfilePic";
import { RiCheckDoubleFill } from "react-icons/ri";
import { dateConverter } from "@/util/dateConverter";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import {
  billIdToDelete,
  updateAmount,
} from "@/lib/store/features/connection/connectionSlice";
import DeleteLoader from "@/components/Loaders/DeleteLoader";
import { Button } from "@/components/ui/button";
import BallBounce from "@/components/Loaders/BallBounce";

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

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [cancellationStatus, setCancellationStatus] = useState(cancelled);
  const [approval, setApproval] = useState(aprooved);

  // Loaders
  if (deleteLoading || resendLoading) {
    return (
      <div className=" w-full bg-white h-[5.1rem] my-2 rounded-xl cursor-pointer flex flex-col justify-center items-center">
        {deleteLoading ? (
          <DeleteLoader />
        ) : (
          <BallBounce size="size-3" bg="bg-slate-300"></BallBounce>
        )}
      </div>
    );
  }

  // Cancelled notification
  if (cancellationStatus) {
    return (
      <div
        className={`flex  w-full h-[5.1rem] my-2 rounded-xl cursor-pointer  justify-center items-center`}
      >
        <div className=" px-5 w-full h-full flex rounded-xl  font-poppins justify-between bg-white items-center">
          <span className="text-sm text-wrap">{`₹ ${amount} payment approval request canceled!`}</span>
          {/* resend btn */}
          <Button
            className="p-2 text-sm"
            onClick={() => {
              setResendLoading(true);
              (async () => {
                try {
                  const { data } = await axios.post(
                    `http://localhost:3000/api/notification`,
                    {
                      id: billId,
                      aprooved: false,
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
                    setResendLoading(false);
                    setCancellationStatus(false);
                    dispatch(updateAmount(amount));
                  }
                } catch (error) {}
              })();
            }}
          >
            Resend
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex relative w-full h-[5.1rem] my-2 rounded-xl cursor-pointer  justify-center items-center`}
    >
      {/* delete */}
      {amICreated && !approval && (
        <span
          className="opacity-90 size-4 text-sm bg-red-600  rounded-full text-center flex items-center justify-center absolute top-3 right-3 z-50 text-white font-nunito font-bold"
          onClick={() => {
            setDeleteLoading(true);
            (async () => {
              try {
                const { data } = await axios.delete(
                  `/api/bill?bill=${billId}&connection=${connectionId}`
                );

                if (data.success) {
                  // setDeleted(true);
                  setDeleteLoading(false);
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

      {/* double click to aproove */}
      <span
        className="absolute bottom-2 z-30 right-3"
        onDoubleClick={() => {
          if (!amICreated && !approval) {
            //ifee to make aprooval true
            (async () => {
              try {
                // make aprooval true
                const { data } = await axios.post(
                  `http://localhost:3000/api/notification`,
                  {
                    id: billId,
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
              } catch (error) {
                console.log(error);
              }
            })();

            setApproval(true);
          }
        }}
      >
        <RiCheckDoubleFill
          className={`size-5  ${
            approval ? "text-blue-700" : "text-slate-400"
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
