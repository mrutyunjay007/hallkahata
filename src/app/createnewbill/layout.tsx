import ProfilePic from "../../components/ProfilePic";
import { Toaster } from "@/components/ui/toaster";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <span className=" w-full flex h-[5.1rem] gap-2  py-4 px-3 items-center">
          <ProfilePic url=""></ProfilePic>
          <span className="font-bold relative justify-end text-primary">
            <span>userName</span>
            <span className="absolute top-5 left-0  text-sm font-mono  text-center text-[#ffc300] rounded-lg ">
              customer
            </span>
          </span>
        </span>

        <div className="w-full flex-1">{children}</div>
      </div>
      <Toaster></Toaster>
    </>
  );
}
