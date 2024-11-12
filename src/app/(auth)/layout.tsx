import { Toaster } from "@/components/ui/toaster";

import StoreProvider from "./StoreProvider";
import Image from "next/image";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <div>
        <div className="fixed top-0 left-0 w-full flex items-center justify-start p-5 gap-1">
          <Image src="/d.png" alt="logo" width={25} height={25}></Image>
          <span className="font-poppins font-bold ">{"Hall Khata"}</span>
        </div>
        <StoreProvider>{children}</StoreProvider>
      </div>
      <Toaster></Toaster>
    </div>
  );
}
