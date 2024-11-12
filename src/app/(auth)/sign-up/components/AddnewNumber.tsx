"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import india from "@/../public/india.png";
import { userPhoneNumber } from "@/schema/userSchema";
import Backbtn from "@/components/Backbtn";
import { RiLoader4Fill } from "react-icons/ri";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import {
  addPhoneNumber,
  removePassWord,
} from "@/lib/store/features/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

function Addnewphonenumber({
  transferToVerification,
  backToSignUp,
}: {
  transferToVerification: () => void;
  backToSignUp: () => void;
}) {
  const { userName, password } = useAppSelector((state) => state.auth);

  const { isLoaded, signUp, setActive } = useSignUp();
  console.log(isLoaded);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const dispatch = useAppDispatch();

  //checking if phone number is available
  useEffect(() => {
    if (phoneNumber.length === 10) {
      const validatePhoneNumber = userPhoneNumber.safeParse(phoneNumber);

      if (validatePhoneNumber.success) {
        (async () => {
          setLoading(true);
          try {
            console.log(phoneNumber);
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
    <div className="w-full flex justify-center items-center h-screen p-5 ">
      <Card className=" w-full md:w-96 flex flex-col justify-center items-center ">
        <span className="w-full flex justify-start items-center p-5">
          <IoIosArrowDropleftCircle
            className={`size-8 text-[#ffc300] cursor-pointer`}
            onClick={() => {
              backToSignUp();
            }}
          />
        </span>
        <div className="w-full p-9 pt-5 flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-start  gap-px  pt-5 pb-4   text-primary">
            <span className={`font-poppins font-bold text-2xl`}>
              Add phone number
            </span>
          </div>
          <div className=" w-full flex justify-center items-center border-2 border-primary gap-2 py-5 px-4 rounded-xl  ">
            <span className=" border-r-2  border-slate-300 pr-3 h-full">
              {"+91"}
            </span>

            <Input
              placeholder="phone number"
              className="  px-4  border-none outline-none w-full"
              onChange={(e) => {
                e?.preventDefault();
                setPhoneNumber(e.target.value);
              }}
            ></Input>
          </div>
        </div>

        {/* next btn */}
        <div className="w-full h-28 relative flex justify-center pb-3 items-center">
          {/* next btn */}
          <div
            className="w-16 h-32 flex justify-center items-center bottom-[0.35rem] right-0  absolute bg-[#ffc300] rounded-l-full cursor-pointer"
            onClick={() => {
              if (!loading) {
                const validatePhoneNumber =
                  userPhoneNumber.safeParse(phoneNumber);
                !validatePhoneNumber.success &&
                  toast({
                    variant: "destructive",
                    title: validatePhoneNumber.error.errors[0].message,
                  });
                console.log(validatePhoneNumber.success, available);

                if (validatePhoneNumber.success && available) {
                  dispatch(addPhoneNumber({ phoneNumber }));

                  (async () => {
                    // signup user by clerck
                    await signUp?.create({
                      firstName: userName,
                      phoneNumber: `+91${phoneNumber}`,
                      password,
                    });
                    dispatch(removePassWord());
                    // create verification code
                    await signUp?.preparePhoneNumberVerification({
                      strategy: "phone_code",
                    });

                    transferToVerification();
                  })();
                }
              }
            }}
          >
            {loading ? (
              <RiLoader4Fill className="size-6 text-bold animate-spin ml-3" />
            ) : (
              <IoIosArrowRoundForward className="size-7 text-bold animate-next" />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Addnewphonenumber;
