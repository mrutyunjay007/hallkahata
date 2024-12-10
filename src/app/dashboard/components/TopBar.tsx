"use client";
import ProfilePic from "@/components/ProfilePic";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaymentTracking from "./PaymentTracking";
import axios from "axios";
import { RiLoader4Fill, RiNotification2Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { getDataFromToken } from "@/util/getDataFromToken";
import { AddCurrentUserData } from "@/lib/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IoSearchCircle } from "react-icons/io5";

function TopBar() {
  const [youWillGet, setYouWillGet] = useState(0);
  const [youWillGive, setYouWillGive] = useState(0);
  const [notification, setNotification] = useState(false);

  const router = useRouter();
  const [search, setSearch] = useState(false);

  const { iAmCustomer, phoneNumber } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // fetch total amount to pay or to get, if current user phone number is present
  useEffect(() => {
    //iife to get total amount to pay or to get
    phoneNumber !== "" &&
      (async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/user?phoneNumber=${phoneNumber}`
          );

          if (data.success) {
            setYouWillGet(data.data.youWillGet);
            setYouWillGive(data.data.youWillGive);
          }
        } catch (error) {
          console.log(error);
        }
      })();
  }, [phoneNumber]);

  return (
    <>
      <div className=" flex gap-2 items-center justify-center w-full px-6 ">
        <div className="flex w-full gap-2 items-center  py-3">
          <span className="size-10">
            <ProfilePic url=""></ProfilePic>
          </span>
          <span className=" font-semibold text-wrap font-poppins text-[0.997rem] ">
            {`I'm a ${!iAmCustomer ? "Seller" : "Customer"}`}
          </span>
        </div>

        {/* <div className=" w-full flex justify-center items-center border-2 border-primary gap-2 py-1 px-3 rounded-full  ">
          <Input
            placeholder="user name or phone number"
            className="  px-4  border-none outline-none w-full font-poppins text-sm"
            onChange={(e) => {
              e?.preventDefault();
              // setPhoneNumber(e.target.value);
            }}
          ></Input>
          <span className=" h-full ">
            {search ? (
              <RiLoader4Fill className="size-7 text-bold text-blue-700 animate-spin" />
            ) : (
              <IoSearchCircle
                className={`size-8   text-primary cursor-pointer `}
                onClick={() => {
                  // setSearch(false);
                }}
              />
            )}
          </span>
        </div> */}

        <div
          className="relative  cursor-pointer"
          onClick={() => {
            router.push("/notification");
          }}
        >
          {notification && (
            <span className="w-3 h-3 border-2 border-white bg-[#ffc300] rounded-full absolute z-20 top-0 right-0 flex justify-center items-center"></span>
          )}
          <RiNotification2Fill className="size-6" />
        </div>
      </div>
      <div className={` relative flex flex-col  justify-end gap-3 w-full `}>
        <PaymentTracking
          youWillGet={youWillGet}
          youWillGive={youWillGive}
        ></PaymentTracking>

        {/* <nav className="w-full flex justify-around px-10 pb-2 gap-4 font-bold">
          <span
            className={`cursor-pointer ${first && "text-slate-900"}`}
            onClick={() => {
              setfirst(!first);
            }}
          >
            <Link href="/customers">Customers</Link>
          </span>
          <span
            className={`cursor-pointer ${!first && "text-slate-900"}`}
            onClick={() => {
              setfirst(!first);
            }}
          >
            <Link href="/sellers">Sellers</Link>
          </span>
        </nav>
        <div
          className={` absolute bottom-0  ${
            !first ? "right-0" : "left-0"
          } w-1/2 h-[2px] bg-slate-900 rounded-lg`}
        ></div> */}
      </div>
    </>
  );
}

export default TopBar;
