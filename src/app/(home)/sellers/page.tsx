import Connection from "@/components/Connection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

function Sellers() {
  return (
    <div className="w-full rounded-t-3xl bg-white h-full p-5">
      <ScrollArea className="w-full  h-full">
        <Connection></Connection>
        <Connection></Connection>
        <Connection></Connection>
        <Connection></Connection>
      </ScrollArea>
    </div>
  );
}

export default Sellers;
