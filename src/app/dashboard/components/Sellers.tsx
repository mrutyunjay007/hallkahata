import Connection from "@/components/Connection";
import BallBounce from "@/components/Loaders/BallBounce";
import DataLoader from "@/components/Loaders/DataLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddCurrentUserData } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "./search/Search";

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
        `http://localhost:3000/api/sellers?limit=${10}&page=${page}`
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
    <div className="w-full h-full p-3">
      {phoneNumber !== "" && (
        <Search userNumber={phoneNumber} userType={"customer"}></Search>
      )}

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

export default Sellers;
