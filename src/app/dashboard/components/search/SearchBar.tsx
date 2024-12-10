import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { RiLoader4Fill } from "react-icons/ri";
import Placeholder from "./Placeholder";

function SearchBar({
  loading,
  handleFocus,
  handleSearching,
  searching,
  focus,
}: {
  loading: boolean;
  handleFocus: (focus: boolean) => void;
  handleSearching: (s: string) => void;
  searching: string;
  focus: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [focus]);

  return (
    <div className=" relative w-[500px] flex justify-center items-center border-[1px]  border-slate-200 gap-2 py-1 px-3  rounded-xl cursor-pointer ">
      {!focus && (
        <div className="w-28 absolute top-[0.74rem] left-7">
          <Placeholder
            focusHandler={() => {
              handleFocus(true);
            }}
          ></Placeholder>
        </div>
      )}
      <Input
        ref={inputRef}
        placeholder=""
        className="  px-4  border-none outline-none w-full font-poppins font-normal text-sm cursor-pointer"
        value={searching}
        onChange={(e) => {
          e?.preventDefault();
          handleSearching(e.target.value);
        }}
        onFocus={() => {
          handleFocus(true);
        }}
      ></Input>

      <span className=" h-full pl-4 pr-2 border-l border-slate-300 flex justify-center items-center ">
        {loading ? (
          <RiLoader4Fill className="size-7 text-bold text-blue-700 animate-spin" />
        ) : !focus ? (
          <IoSearch className={`size-6 text-slate-400 `} />
        ) : (
          <div
            className="text-xl size-6 font-nunito font-bold  text-red-500 flex justify-center items-center"
            onClick={() => {
              handleFocus(false);
              handleSearching("");
            }}
          >
            {"x"}
          </div>
        )}
      </span>
    </div>
  );
}

export default SearchBar;
