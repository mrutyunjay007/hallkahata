import React from "react";
import { MdDelete } from "react-icons/md";

function CancelLoader() {
  return (
    <span className="size-7 relative flex justify-center items-center">
      <div className="size-1 border-2 border-red-600 rounded-full  animate-jump absolute top-1 left-[0.35rem] [animation-delay:0.5s] "></div>
      <div className="size-1 border-2 border-red-600 rounded-full  animate-jump absolute top-1  "></div>
      <div className="size-1 border-2 border-red-600 rounded-full  animate-jump absolute top-1 right-[0.35rem]  [animation-delay:1s]"></div>
      <MdDelete className="size-6 text-red-600" />
    </span>
  );
}

export default CancelLoader;
