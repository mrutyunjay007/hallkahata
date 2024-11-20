"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { userFullName, userPhoneNumber } from "@/schema/userSchema";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

function AddNewCustomer({ params }: { params: { sellerNumber: string } }) {
  const { sellerNumber } = params;

  const router = useRouter();

  // TODO: apply later for focus
  const phoneNumberRef = useRef();
  const userNameRef = useRef();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [customerNewName, setCustomerNewName] = useState("");
  const [customerName, setCustomerName] = useState("");

  const { toast } = useToast();

  //checking if phone number is available
  useEffect(() => {
    if (phoneNumber.length < 10) {
      setAvailable(false);
      setIsConnected(false);
      setCustomerName("");
      setLoading(false);
      return;
    }
    if (phoneNumber.length === 10) {
      const validatePhoneNumber = userPhoneNumber.safeParse(phoneNumber);

      if (validatePhoneNumber.success) {
        if (validatePhoneNumber.data === sellerNumber) {
          toast({
            variant: "destructive",
            title: "You can't add yourself as a customer!",
          });
          return;
        }

        (async () => {
          setLoading(true);
          try {
            console.log(phoneNumber);
            const { data } = await axios.get(
              `http://localhost:3000/api/isUserPresent?customerNumber=${phoneNumber}&sellerNumber=${sellerNumber}`
            );

            if (data.success) {
              setCustomerName(data.data.userName);
              setAvailable(true);

              setLoading(false);
              return;
            }
            if (!data.success) {
              setCustomerName(data.data.userName);
              setAvailable(true);

              setLoading(false);
              setIsConnected(true);

              toast({
                variant: "destructive",
                title: "Customer is already connected with you!",
              });
              return;
            }
          } catch (error: any) {
            console.log(error);
            setLoading(false);
          }
        })();
      }
    }
  }, [phoneNumber]);

  const createCustomerHandle = async (
    customerNumber: string,
    customerName: string,
    sellerNumber: string
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/connections",
        {
          customerNumber,
          sellerNumber,
          customerName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        router.push(`/customerprofile/${sellerNumber}/${customerNumber}`);
        return;
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        //TODO: Toast -> customer already present

        toast({
          variant: "destructive",
          title: "customer already connected with you!",
        });
        return;
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen p-5 ">
      <Card className=" w-full md:w-96 flex flex-col justify-center items-center ">
        <span className="w-full flex justify-start items-center p-5">
          <IoIosArrowDropleftCircle
            className={`size-8 text-[#ffc300] cursor-pointer`}
            onClick={() => {
              // backToSignUp();
            }}
          />
        </span>

        <div className="w-full p-9 pt-5 flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-start  gap-px  pt-5 pb-4   text-primary">
            <span className={`font-poppins font-bold text-2xl`}>
              Add New Customer
            </span>
          </div>

          {/* phone number */}
          <div className="  relative w-full flex justify-center items-center border-2 border-primary gap-2 py-5 px-4 rounded-xl  ">
            <span className=" border-r-2  border-slate-300 pr-3 h-full">
              {"+91"}
            </span>

            <Input
              placeholder="phone number"
              className="  px-4  border-none outline-none w-full font-poppins"
              onChange={(e) => {
                e?.preventDefault();
                setPhoneNumber(e.target.value);
              }}
            ></Input>

            <span
              className={` ${
                loading || available ? "block" : "hidden"
              } absolute right-4 `}
            >
              {!loading && available ? (
                <MdVerified
                  className={`size-6 ${
                    isConnected && "text-red-600"
                  } text-blue-700 cursor-pointer animate-one_rotation`}
                />
              ) : (
                <RiLoader4Fill className="size-6 text-bold animate-spin" />
              )}
            </span>
          </div>

          {/* user-name */}
          {available ? (
            <div className="font-poppins flex items-center justify-start h-9 w-full rounded-lg border-2 border-primary  py-8 px-6 text-sm">
              {customerName}
            </div>
          ) : (
            <Input
              id="name"
              placeholder=" User Name"
              className=" py-8 px-5 border-2 border-primary font-poppins"
              onChange={(e) => {
                e?.preventDefault();
                setCustomerNewName(e.target.value);
              }}
            ></Input>
          )}
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

                if (isConnected) {
                  toast({
                    variant: "destructive",
                    title: "customer already connected with you!",
                  });
                  return;
                }
                if (
                  validatePhoneNumber.success &&
                  (customerName.length > 0 || customerNewName.length > 0)
                ) {
                  createCustomerHandle(
                    phoneNumber,
                    customerName || customerNewName,
                    sellerNumber
                  );
                }
              }
            }}
          >
            <IoIosArrowRoundForward className="size-7 text-bold animate-next" />
          </div>
        </div>
      </Card>
    </div>
  );

  // return (
  //   <div className="w-full h-full flex justify-center items-center ">
  //     <Card className="w-[350px] border-2 border-zinc-300 drop-shadow-lg">
  //       <CardHeader>
  //         <CardTitle className="text-purple-600">Add New Customer</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Input
  //           type="string"
  //           placeholder="customer name"
  //           onChange={(e) => {
  //             e?.preventDefault();
  //             setCustomerName(e.target.value);
  //           }}
  //         ></Input>

  //         <div className="flex justify-center items-center mt-5 gap-2 ">
  //           <div className="h-9 w-1/2  rounded-lg border-2 border-zinc-300 flex justify-center items-center gap-2 ">
  //             <Image className="size-5" src={india} alt="" />
  //             <span>+91</span>
  //           </div>
  //           <Input
  //             type="number"
  //             className=" "
  //             onChange={(e) => {
  //               e?.preventDefault();
  //               setNumber(e.target.value);
  //             }}
  //           ></Input>
  //         </div>

  //         <div className="w-full mt-5 flex justify-between">
  //           <Button variant={"ghost"} className="opacity-50 hover:opacity-100">
  //             Cancel
  //           </Button>
  //           <Button
  //             variant={"default"}
  //             onClick={async () => {
  //               const validateUserName = userFullName.safeParse(customerName);
  //               const validateNumber = userPhoneNumber.safeParse(number);
  //               if (!validateUserName.success) {
  //                 toast({
  //                   variant: "destructive",
  //                   title: validateUserName.error.errors[0].message,
  //                 });
  //               } else if (!validateNumber.success) {
  //                 toast({
  //                   variant: "destructive",
  //                   title: validateNumber.error.errors[0].message,
  //                 });
  //               } else {
  //                 createCustomerHandl(number, customerName, "8777761380");
  //               }
  //             }}
  //           >
  //             Add
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}

export default AddNewCustomer;
