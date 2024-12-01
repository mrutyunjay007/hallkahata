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

function Filter({
  sellerNumber,
  customerNumber,
  handelData,
}: {
  sellerNumber: string;
  customerNumber: string;
  handelData: (data: ITanctionWithConnection) => void;
}) {
  const [isFilter, setIsFilter] = useState(false);
  const [date, setDate] = useState("");
  const [color, setcolor] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [reset, setReset] = useState(false);
  const [searched, setSearched] = useState({
    date: "",
    color: "",
  });

  useEffect(() => {
    if (search) {
      if (date !== "" || color !== "") {
        setLoading(true);
        setIsFilter(false);
        (async () => {
          try {
            const { data } = await axios.get(
              `/api/connections?seller=${sellerNumber}&customer=${customerNumber}&color=${
                color === "" ? "white" : color
              }&date=${date}`
            );
            if (data.success) {
              handelData(data.data);
              setLoading(false);
              setSearch(false);
              reset && setReset(false);
              setSearched({
                date: `${reset ? "" : date}`,
                color: `${reset ? "" : color}`,
              });
              setDate("");
              setcolor("");
            }
          } catch (error) {
            console.log(error);
          }
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
              if (searched.date !== "" || searched.color !== "") {
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

          {isLoading ? (
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
            pre={searched.date !== "" && !search ? searched.date : ""}
            reset={reset}
            handelReset={() => {
              !search && setReset(false);
            }}
            handelDate={(date: string) => {
              setDate(date);
            }}
          ></DatePicker>

          <div className=" h-7 border-l-2 border-[#ffc300]"></div>
          <RedGreenFilter
            pre={searched.color !== "" && !search ? searched.color : ""}
            reset={reset}
            handelReset={() => {
              !search && setReset(false);
            }}
            handelColor={(color: string) => {
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
