import Backbtn from "@/components/Backbtn";
import StoreProvider from "./StoreProvider";

export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen  flex flex-col">
      <StoreProvider>
        <span className="w-full px-6 py-6 flex items-center justify-start gap-2">
          <Backbtn color={"#ffc300"}></Backbtn>
          <span className="font-poppins font-semibold text-2xl">
            {"Notifications"}
          </span>
        </span>
        <div className="w-full h-[calc(100%-5rem)] flex-1 ">{children}</div>
      </StoreProvider>
    </div>
  );
}
