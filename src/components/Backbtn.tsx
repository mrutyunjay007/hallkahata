"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

function Backbtn({ color }: { color: string }) {
  const router = useRouter();
  return (
    <span>
      <IoIosArrowDropleftCircle
        className={`size-8 text-[${color}] cursor-pointer`}
        onClick={() => {
          router.back();
        }}
      />
    </span>
  );
}

export default Backbtn;
