import React from "react";

function BallBounce({ size, bg }: { size: string; bg: string }) {
  return (
    <span className="flex justify-center gap-1 items-center">
      <span className={`${size} rounded-full ${bg} animate-bounce `}></span>
      <span
        className={`${size} rounded-full ${bg} animate-bounce [animation-delay:0.15s]`}
      ></span>
      <span
        className={`${size} rounded-full ${bg} animate-bounce [animation-delay:0.3s]`}
      ></span>
    </span>
  );
}

export default BallBounce;
