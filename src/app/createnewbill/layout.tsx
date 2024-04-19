import ProfilePic from "../../components/ProfilePic";
import { Toaster } from "@/components/ui/toaster";
import Nav from "./components/Nav";
import StoreProvider from "./StoreProvider";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <StoreProvider>
          <Nav></Nav>
          <div className="w-full flex-1">{children}</div>
        </StoreProvider>
      </div>
      <Toaster></Toaster>
    </>
  );
}
