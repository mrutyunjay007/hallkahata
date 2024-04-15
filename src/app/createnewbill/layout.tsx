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
        <span className=" w-full flex h-[5.1rem] gap-2 bg-purple-700 py-4 px-3 items-center">
          <ProfilePic url=""></ProfilePic>
          <span className="font-bold text-white">userName</span>
        </span>

        <div className="w-full flex-1">{children}</div>
      </div>
      <Toaster></Toaster>
    </>
  );
}
