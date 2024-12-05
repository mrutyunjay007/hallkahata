import { selectColor } from "@/lib/store/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";

function RedGreenFilter({
  pre,
  reset,
  handleReset,
  handleColor,
}: {
  pre: string;
  reset: boolean;
  handleReset: () => void;
  handleColor: (color: string) => void;
}) {
  const [left, setLeft] = useState(pre === "red" ? true : false);
  const [right, setRight] = useState(pre === "green" ? true : false);
  const [center, setCenter] = useState(
    pre === "" || pre === "white" ? true : false
  );

  useEffect(() => {
    if (reset) {
      setLeft(false);
      setRight(false);
      setCenter(true);
      handleColor("white");
      handleReset();
    }
  }, [reset]);

  return (
    <div className="relative w-20 h-9  bg-slate-50 shadow-sm border border-input rounded-xl flex justify-center  items-center  ">
      <span
        className={`absolute z-30 w-4 h-4 ${
          left
            ? "left-1 bg-red-600 border-none "
            : right
            ? "right-1 bg-green-500 border-none"
            : "bg-white "
        } 
         shadow-xl rounded-full border-4 duration-300 ease-in border-slate-300 border-opacity-75  insert-shadow-sm`}
      ></span>

      {/* left */}
      <span
        className="w-full px-2 h-full rounded-l-xl flex justify-start items-center cursor-pointer"
        onClick={() => {
          setLeft(true);
          setRight(false);
          setCenter(false);
          handleColor("red");
        }}
      >
        <span className="size-2 rounded-full bg-red-600"></span>
      </span>

      {/* center */}
      <span
        className="w-full h-full flex justify-center items-center cursor-pointer"
        onClick={() => {
          setLeft(false);
          setRight(false);
          setCenter(true);
          handleColor("white");
        }}
      >
        <span className="size-2 rounded-full bg-slate-300 shadow-lg"></span>
      </span>

      {/* right */}
      <span
        className="w-full px-2 h-full rounded-r-xl flex justify-end items-center cursor-pointer"
        onClick={() => {
          setLeft(false);
          setRight(true);
          setCenter(false);
          handleColor("green");
        }}
      >
        <span className="size-2 rounded-full bg-green-500"></span>
      </span>
    </div>
  );
}

export default RedGreenFilter;
