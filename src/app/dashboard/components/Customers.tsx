import Connection from "@/components/Connection";
import BallBounce from "@/components/Loaders/BallBounce";
import DataLoader from "@/components/Loaders/DataLoader";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCurrentUserData } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { RiAddCircleFill, RiLoader4Fill } from "react-icons/ri";
import Search from "./search/Search";

interface IConnectionCustomer {
  _id: string;
  sellerNumber: string;
  amount: number;
  customer: {
    _id?: string;
    userName: string;
    phoneNumber: string;
  };
}

function Customers() {
  const [datas, setDatas] = useState<IConnectionCustomer[]>();
  const [isLoading, setLoading] = useState(false);
  const { phoneNumber } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [intersectionLoading, setIntersectionLoading] = useState(false);
  const { More, intersectionObserverRef } = useInfiniteScrolling(
    fetchData,
    datas
  );

  // get the data with infinite scrolling
  async function fetchData(cb: (more: boolean) => void) {
    page > 1 ? setIntersectionLoading(true) : setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/customers?limit=${10}&page=${page}`
      );

      if (data.success) {
        if (data.data.length < 10) {
          cb(false);
        }

        phoneNumber === "" &&
          dispatch(AddCurrentUserData(data.currentUserData));
        setDatas(data.data);
        setPage((pre) => pre + 1);
        page > 1 ? setIntersectionLoading(false) : setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full p-3 ">
        <div className="w-full  h-full flex justify-center items-center py-2 px-2 bg-slate-100 rounded-xl">
          <DataLoader numberOfItems={3}></DataLoader>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-3 flex flex-col ">
      {phoneNumber !== "" && (
        <Search userNumber={phoneNumber} userType={"seller"}></Search>
      )}

      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-100">
        {datas?.map((data: IConnectionCustomer) => (
          <Connection
            key={data._id}
            customerNumber={data.customer.phoneNumber}
            sellerNumber={data.sellerNumber}
            connectionUserName={data.customer.userName}
            isSeller={false}
            amount={data.amount}
          ></Connection>
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

      <span className=" flex flex-col justify-center items-center gap-2 fixed bottom-10 right-10">
        {phoneNumber !== "" && (
          <Link href={`/addnewcutomer/${phoneNumber}`}>
            <RiAddCircleFill className="size-[3.47rem] text-[#ffc300]  rounded-full hover:text-[#ffa600] hover:scale-110 hover:rotate-180 hover:ease-linear hover:duration-75 cursor-pointer " />
          </Link>
        )}

        {/* <IoSearchCircle
          className={`size-[3.47rem]   text-primary cursor-pointer `}
          onClick={() => {
            // setSearch(false);
          }}
        /> */}
      </span>
    </div>
  );
}

export default Customers;
