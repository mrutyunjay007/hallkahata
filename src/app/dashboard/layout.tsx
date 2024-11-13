import dbConnection from "@/lib/dbConnect";
import TopBar from "./components/TopBar";
import StoreProvider from "./StoreProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <StoreProvider>
        <TopBar></TopBar>
        <div className="w-full h-full flex-1">{children}</div>
      </StoreProvider>
    </div>
  );
}
