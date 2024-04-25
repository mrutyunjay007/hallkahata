"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import india from "@/../public/india.png";
import { userPhoneNumber } from "@/schema/userSchema";
import Backbtn from "@/components/Backbtn";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addPhoneNumber } from "@/lib/store/features/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

function Addphonenumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (phoneNumber.length === 10) {
      const validatePhoneNumber = userPhoneNumber.safeParse(phoneNumber);

      if (validatePhoneNumber.success) {
        (async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(
              `http://localhost:3000/api/verify?phoneNumber=${phoneNumber}`
            );

            if (data.success) {
              setAvailable(true);
              toast({
                variant: "default",
                title: "Available",
              });
              setLoading(false);
              return;
            }
            if (!data.success && data.data.inVerification) {
              route.push("/signup/addphonenumber/verification");
              setLoading(false);
              return;
            }
          } catch (error: any) {
            console.log(error);
            if (error.response.status === 400) {
              toast({
                variant: "destructive",
                title: "user already been present with this phone number",
              });
            }
            setLoading(false);
          }
        })();
      }
    }
  }, [phoneNumber]);

  return (
    <div className="w-full flex justify-center items-center h-screen  ">
      <div className="w-full fixed p-5 top-0 left-0 ">
        <Backbtn color="#ffc300"></Backbtn>

        <div className="w-full mt-3 text-5xl p-5 font-bold text-primary">
          <span>Sign</span>
          <span className="text-[#ffc300]">up</span>
        </div>
      </div>

      <div className="w-full p-10 flex flex-col gap-10 justify-center items-center">
        <div className=" w-full flex justify-center items-center gap-2  ">
          <div className="h-9 w-1/2 py-8 rounded-lg  bg-white flex justify-center items-center gap-2 border-2 border-primary ">
            <Image className="size-5" src={india} alt="" />
            <span className="bg-white">+91</span>
          </div>
          <Input
            placeholder="phone number"
            className=" border-2 border-primary px-4 py-8"
            onChange={(e) => {
              e?.preventDefault();
              setPhoneNumber(e.target.value);
            }}
          ></Input>
        </div>

        {/* next btn */}
        <Button
          className=" w-full py-8 bg-primary hover:bg-[#ffc300] font-bold text-white hover:text-primary"
          onClick={() => {
            if (!loading) {
              const validatePhoneNumber =
                userPhoneNumber.safeParse(phoneNumber);
              !validatePhoneNumber.success &&
                toast({
                  variant: "destructive",
                  title: validatePhoneNumber.error.errors[0].message,
                });

              if (validatePhoneNumber.success && available) {
                dispatch(addPhoneNumber({ phoneNumber }));

                // create verification code
                (async () => {
                  setLoading(true);
                  try {
                    const { data } = await axios.post(
                      "http://localhost:3000/api/createverificationcode",
                      {
                        phoneNumber,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (data.success) {
                      setLoading(false);
                      route.push("/signup/addphonenumber/verification");
                    }
                  } catch (error) {
                    console.log(error);
                    setLoading(false);
                  }
                })();
              }
            }
          }}
        >
          {loading ? "Loading..." : "Next"}
        </Button>
      </div>
      {/* <div className="w-full h-32 relative flex justify-center items-center">
        <div
          className="w-16 h-32 flex justify-center items-center top-0 right-0 drop-shadow-md absolute bg-[#ffc300] rounded-l-full cursor-pointer"
          // onClick={() => {
          //   const name = userFullName.safeParse(fullName);
          //   !name.success
          //     ? setFullNameError(name.error.errors[0].message)
          //     : setFullNameError("");

          //   const validatePassword = userPassword.safeParse(password);
          //   !validatePassword.success
          //     ? setPasswordError(validatePassword.error.errors[0].message)
          //     : setPasswordError("");
          // }}
        >
          <IoIosArrowRoundForward className="size-7" />
        </div>
      </div> */}
    </div>
  );
}

export default Addphonenumber;
