"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function Backbtn() {
  const router = useRouter();
  return (
    <span>
      <IoIosArrowDropleftCircle
        className="size-8 text-white cursor-pointer"
        onClick={() => {
          router.back();
        }}
      />
    </span>
  );
}

export default Backbtn;
