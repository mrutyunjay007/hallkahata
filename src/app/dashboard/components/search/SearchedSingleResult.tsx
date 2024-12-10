import { ISearchedData } from "@/config/type/searchedDataType";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import Link from "next/link";
import React from "react";
import SearchHighlighter from "./SearchHighlighter";

function SearchedSingleResult({
  userData,
  highlightedPart,
  typeOfHighlightedPart,
}: {
  userData: ISearchedData;
  highlightedPart: string;
  typeOfHighlightedPart: string;
}) {
  const { _id, userName, phoneNumber, amount, userType } = userData;

  const curreUserPhoneNumber = useAppSelector(
    (state) => state.auth.phoneNumber
  );

  return (
    <>
      <Link
        href={`${
          userType === "customer"
            ? `/customerprofile/${curreUserPhoneNumber}/${phoneNumber}`
            : `/sellerprofile/${phoneNumber}/${curreUserPhoneNumber}`
        }`}
      >
        <div className="w-full flex justify-between items-center px-2 py-3 cursor-pointer hover:bg-slate-100">
          <div className="  w-full flex flex-col justify-center items-start  ">
            {/* Name */}
            <span
              className={`${
                typeOfHighlightedPart === "name"
                  ? "font-semibold  text-primary "
                  : " text-slate-500"
              }  font-poppins text-lg ml-2 `}
            >
              {typeOfHighlightedPart === "name" ? (
                <SearchHighlighter
                  highlightedPart={highlightedPart}
                  searching={userName}
                ></SearchHighlighter>
              ) : (
                <span>{userName}</span>
              )}
            </span>

            {/* Number */}
            <span
              className={`${
                typeOfHighlightedPart === "number"
                  ? "font-semibold text-sm text-primary "
                  : "text-slate-500 text-xs"
              }  font-mono ml-2`}
            >
              <span>{`+91 `}</span>

              {typeOfHighlightedPart === "number" ? (
                <SearchHighlighter
                  highlightedPart={highlightedPart}
                  searching={phoneNumber}
                ></SearchHighlighter>
              ) : (
                <span>{phoneNumber}</span>
              )}
            </span>
          </div>
          <span
            className={`w-1/2 flex justify-end items-center px-2 font-semibold font-poppins text-lg ${
              amount < 0 ? "text-red-500" : "text-green-500"
            } `}
          >
            {`₹ ${Math.abs(amount)}`}
          </span>
        </div>
      </Link>

      <div className="w-full h-[1px] bg-slate-200"></div>
    </>
  );
}

export default SearchedSingleResult;
