import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearTab from "./SearTab";
import { toast } from "@/components/ui/use-toast";
import {
  searchLetter,
  searchNumber,
  searchResult,
} from "@/schema/searchSchema";
import axios from "axios";
import { ISearchedData } from "@/config/type/searchedDataType";
import useInfiniteScrolling from "@/lib/store/hooks/useInfiniteScrolling";

function Search({
  userNumber,
  userType,
}: {
  userNumber: string;
  userType: string;
}) {
  const [search, setSearch] = useState(false);
  const [focus, setfocus] = useState(false);
  const [searching, setSearching] = useState("");
  const [searchedData, setSearchedData] = useState<ISearchedData[]>();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfinteLoading] = useState(false);

  const [page, setPage] = useState(1);

  const { HaseMore, More, intersectionObserverRef } = useInfiniteScrolling(
    fetchSearchedData,
    searchedData
  );

  async function fetchSearchedData(cb: (more: boolean) => void) {
    if (searching.length > 0) {
      try {
        setInfinteLoading(true);
        const { data } = await axios.get(
          `http://localhost:3000/api/search?customer=${
            userType === "customer" ? userNumber : ""
          }&seller=${userType === "seller" ? userNumber : ""}&name=${
            name.length > 0 ? name : ""
          }&number=${number.length > 0 ? number : ""}&limit=${5}&page=${page}`
        );

        if (data.success) {
          // check if the data is less than 5 then disable haseMore
          if (data.data.transectionHistory.length < 5) {
            cb(false);
          }

          setSearchedData((pre) => {
            if (!pre) {
              return [...data.data];
            }
            return [...pre, data.data];
          });

          setPage((pre) => pre + 1);
          setInfinteLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    setSearch(false);

    // Debouncing
    if (searching.length > 0) {
      timer = setTimeout(() => {
        const validateResult = searchResult.safeParse(searching);
        const validateNumber = searchNumber.safeParse(searching);
        const validateName = searchLetter.safeParse(searching);

        console.log(validateResult, validateNumber, validateName);

        if (validateResult.success) {
          if (!validateName.success && !validateNumber.success) {
            toast({
              variant: "destructive",
              title: validateNumber.error?.errors[0].message,
            });
          }

          // call search api with user name
          validateName.success &&
            (async () => {
              try {
                setLoading(true);
                HaseMore(true);
                const { data } = await axios.get(
                  `http://localhost:3000/api/search?customer=${
                    userType === "customer" ? userNumber : ""
                  }&seller=${userType === "seller" ? userNumber : ""}&name=${
                    validateName.data
                  }&number=${""}&limit=${5}&page=${1}`
                );

                if (data.success) {
                  if (data.data.length < 5) {
                    HaseMore(false);
                  }

                  setSearchedData(data.data);
                  setName(validateName.data);
                  setNumber("");
                  setPage((pre) => {
                    return 1 + 1;
                  });
                  setLoading(false);
                  setSearch(true);
                }
              } catch (error) {
                console.log(error);
                setLoading(false);
              }
            })();

          // call search api with phone number
          validateNumber.success &&
            (async () => {
              try {
                setLoading(true);
                HaseMore(true);
                const { data } = await axios.get(
                  `http://localhost:3000/api/search?customer=${
                    userType === "customer" ? userNumber : ""
                  }&seller=${
                    userType === "seller" ? userNumber : ""
                  }&name=${""}&number=${
                    validateNumber.data
                  }&limit=${5}&page=${1}`
                );

                if (data.success) {
                  if (data.data.length < 5) {
                    HaseMore(false);
                  }

                  setSearchedData(data.data);
                  setName("");
                  setNumber(validateNumber.data);
                  setPage((pre) => {
                    return 1 + 1;
                  });
                  setSearch(true);
                  setLoading(false);
                }
              } catch (error) {
                console.log(error);
                setLoading(false);
              }
            })();
        } else {
          toast({
            variant: "destructive",
            title: validateResult.error?.errors[0].message,
          });
        }
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [searching]);

  return (
    <div className=" relative w-full flex flex-col justify-center items-center pb-4 pt-2 ">
      <SearchBar
        loading={loading}
        searching={searching}
        handleSearching={(s) => {
          setSearching(s);
        }}
        handleFocus={(focus) => {
          setfocus(focus);
        }}
        focus={focus}
      ></SearchBar>

      {search && (
        <SearTab
          searchedData={searchedData!}
          infiniteLoading={infiniteLoading}
          More={More}
          intersectionObserverRef={intersectionObserverRef}
          name={name}
          number={number}
        ></SearTab>
      )}
    </div>
  );
}

export default Search;
