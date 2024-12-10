import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import SearchedSingleResult from "./SearchedSingleResult";
import { ISearchedData } from "@/config/type/searchedDataType";
import BallBounce from "@/components/Loaders/BallBounce";

function SearTab({
  searchedData,
  infiniteLoading,
  More,
  intersectionObserverRef,
  name,
  number,
}: {
  searchedData: ISearchedData[];
  infiniteLoading: boolean;
  More: boolean;
  intersectionObserverRef: React.RefObject<HTMLDivElement>;
  name: string;
  number: string;
}) {
  return (
    <div className=" absolute z-30 w-[500px] -bottom-72  h-72 rounded-xl py-2 px-1  border border-slate-200 bg-slate-50">
      <ScrollArea className="w-full  h-full py-2 px-2 rounded-xl bg-slate-50">
        {searchedData?.map((data: ISearchedData) => (
          <SearchedSingleResult
            key={data._id}
            userData={data}
            highlightedPart={name.length > 0 ? name : number}
            typeOfHighlightedPart={name.length > 0 ? "name" : "number"}
          ></SearchedSingleResult>
        ))}

        {More && (
          <div
            ref={intersectionObserverRef}
            className="w-full h-[5.1rem] flex justify-center items-center"
          >
            {infiniteLoading && (
              <BallBounce size={"size-2"} bg={"bg-slate-300"}></BallBounce>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default SearTab;
