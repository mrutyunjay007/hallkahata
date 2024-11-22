import Connection from "@/components/Connection";
import BallBounce from "@/components/Loaders/BallBounce";
import DataLoader from "@/components/Loaders/DataLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCurrentUserData } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

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

  // get all customers
  useEffect(() => {
    //token to cancel the request if the component unmounts
    const cancelToken = axios.CancelToken.source();

    setLoading(true);

    //iife to collect all customers data
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/customers");

        if (data.success) {
          phoneNumber === "" &&
            dispatch(AddCurrentUserData(data.currentUserData));
          setDatas(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // Cleanup function to cancel the request if the component unmounts
      cancelToken.cancel();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full p-3 ">
        <div className="w-full  h-full flex justify-center items-center py-2 px-2 bg-slate-100 rounded-xl">
          {/* <BallBounce size={"size-5"} bg={"bg-slate-200"}></BallBounce> */}
          <DataLoader numberOfItems={3}></DataLoader>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-3 ">
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
      </ScrollArea>

      {phoneNumber !== "" && (
        <Link href={`/addnewcutomer/${phoneNumber}`}>
          <RiAddCircleFill className="size-16 fixed bottom-10 right-10 text-[#ffc300]  rounded-full hover:text-[#ffa600] hover:scale-110 hover:rotate-180 hover:ease-linear hover:duration-75 cursor-pointer " />
        </Link>
      )}
    </div>
  );
}

export default Customers;
