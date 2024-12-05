import React, { useEffect, useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoSearchCircle } from "react-icons/io5";
import DatePicker from "./DatePicker";
import RedGreenFilter from "./RedGreenFilter";
import ITanctionWithConnection from "@/config/type/transactionsWithConnectionType";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { RiLoader4Fill } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import {
  searching,
  selectColor,
  selectDate,
} from "@/lib/store/features/filter/filterSlice";

function Filter({
  sellerNumber,
  customerNumber,
  HaseMore,
  handlePage,
  handleData,
}: {
  sellerNumber: string;
  customerNumber: string;
  HaseMore: (more: boolean) => void;
  handlePage: () => void;
  handleData: (data: ITanctionWithConnection) => void;
}) {
  const {
    date: searchedDate,
    color: searchedColor,
    searchLoading,
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const [isFilter, setIsFilter] = useState(false);
  const [date, setDate] = useState("");
  const [color, setcolor] = useState("");
  const [search, setSearch] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (search) {
      if (date !== "" || color !== "") {
        dispatch(searching(true));
        HaseMore(true);
        (async () => {
          try {
            const { data } = await axios.get(
              `/api/connections?customer=${customerNumber}&seller=${sellerNumber}&color=${
                color === "" ? "white" : color
              }&date=${date}&limit=${10}&page=${1}`
            );

            if (data.success) {
              // check if the data is less than 10 then disable haseMore
              if (data.data.transectionHistory.length < 10) {
                HaseMore(false);
              }

              handleData(data.data);

              setIsFilter(false);
              setSearch(false);
              reset && setReset(false);
              dispatch(selectColor(reset ? "" : color));
              dispatch(selectDate(reset ? "" : date));

              handlePage();
              dispatch(searching(false));
            }
          } catch (error) {}
        })();
      } else {
        toast({
          variant: "destructive",
          title: "Please choose new date or color before searching!",
        });
        setSearch(false);
      }
    }
  }, [search, reset]);

  return (
    <div className="w-full flex flex-col items-start justify-center gap-4 -mt-2">
      <div className="w-full px-4 font-poppins font-bold text-blue-700 flex justify-between items-center gap-1 cursor-pointer">
        <span
          className="flex justify-start items-center gap-1"
          onClick={() => setIsFilter(!isFilter)}
        >
          <span>{"filter"}</span>
          <HiAdjustmentsHorizontal className=" size-5 text-bold" />
        </span>

        <div className="w-16 flex justify-center items-center gap-2">
          <BiReset
            className={`size-7 ${
              isFilter ? "block" : "hidden"
            }   text-slate-400`}
            onClick={() => {
              if (searchedDate !== "" || searchedColor !== "") {
                setReset(true);
                setSearch(true);
                setDate("");
                setcolor("white");
              } else {
                setReset(true);
                setDate("");
                setcolor("");
              }
            }}
          />

          {searchLoading ? (
            <RiLoader4Fill className="size-7 text-bold text-blue-700 animate-spin" />
          ) : (
            <IoSearchCircle
              className={`size-8 ${
                isFilter ? "block" : "hidden"
              }   text-blue-800`}
              onClick={() => {
                setSearch(true);
              }}
            />
          )}
        </div>
      </div>
      {isFilter && (
        <div
          className={`w-full flex
         justify-evenly  items-center duration-300 ease-in-out`}
        >
          <DatePicker
            pre={searchedDate !== "" && !search ? searchedDate : ""}
            reset={reset}
            handleReset={() => {
              !search && setReset(false);
            }}
            handleDate={(date: string) => {
              setDate(date);
            }}
          ></DatePicker>

          <div className=" h-7 border-l-2 border-[#ffc300]"></div>
          <RedGreenFilter
            pre={searchedColor !== "" && !search ? searchedColor : ""}
            reset={reset}
            handleReset={() => {
              !search && setReset(false);
            }}
            handleColor={(color: string) => {
              setcolor(color);
            }}
          />
          {/* <div className=" h-7 border-l-2 border-[#ffc300]"></div> */}
        </div>
      )}
    </div>
  );
}

export default Filter;
