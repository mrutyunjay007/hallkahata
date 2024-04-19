"use client";

import ProfilePic from "@/components/ProfilePic";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import React from "react";

function Nav() {
  const userName = useAppSelector((state) => state.costomerName.userName);

  return (
    <span className=" w-full flex h-[5.1rem] gap-2  py-4 px-3 items-center">
      <ProfilePic url=""></ProfilePic>
      <span className="font-bold  text-primary">
        <span className="text-primary">{userName}</span>
        <span className="text-[#ffc300]"> is a customer</span>
      </span>
    </span>
  );
}

export default Nav;
