import Connection from "@/components/Connection";
import DataLoader from "@/components/Loaders/DataLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCurrentUserData } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IConnectionSeller {
  _id: string;
  customerNumber: string;
  amount: number;
  seller: {
    _id: string;
    userName: string;
    phoneNumber: string;
  };
}

function Sellers() {
  const [datas, setDatas] = useState<IConnectionSeller[]>();
  const [isLoading, setLoading] = useState(false);
  const { phoneNumber } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // get all sellers
  useEffect(() => {
    // token to cancel the request if the component unmounts
    const cancelToken = axios.CancelToken.source();

    setLoading(true);
    
    // iife to collect all sellers data
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/sellers");

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
          <DataLoader numberOfItems={3}></DataLoader>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3">
      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-100">
        {datas?.map((data: IConnectionSeller) => (
          <Connection
            key={data._id}
            customerNumber={data.customerNumber}
            sellerNumber={data.seller.phoneNumber}
            connectionUserName={data.seller.userName}
            isSeller={true}
            amount={data.amount}
          ></Connection>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Sellers;
