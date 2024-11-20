"use client";

import Backbtn from "@/components/Backbtn";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import React from "react";

function Nav() {
  const { userName, userType } = useAppSelector(
    (state) => state.connectionName
  );

  return (
    <div className=" w-full flex py-4 px-5 justify-between items-center">
      <span>
        <Backbtn color="#ffc300"></Backbtn>
      </span>

      <span className=" flex flex-col justify-start items-end">
        <span className="text-lg font-bold font-poppins">{userName}</span>
        <span className=" text-[11px] -mt-1 font-normal font-mono opacity-75">
          {userType}
        </span>
      </span>
    </div>
  );
}

export default Nav;
