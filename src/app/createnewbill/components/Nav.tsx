"use client";

import Backbtn from "@/components/Backbtn";
import ProfilePic from "@/components/ProfilePic";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import React from "react";

function Nav() {
  const userName = useAppSelector((state) => state.costomerName.userName);

  return (
    <div className=" w-full flex   py-4 px-3 justify-between items-center">
      <span>
        <Backbtn color="#ffc300"></Backbtn>
      </span>
      <span className=" flex flex-col justify-start items-end">
        <span className="text-lg font-bold ">{userName}</span>
        <span className=" text-[11px] -mt-2 font-normal font-mono opacity-50">
          {" "}
          customer
        </span>
      </span>
    </div>
  );
}

export default Nav;
