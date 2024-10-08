import StoreProvider from "./StoreProvider";
import Nav from "./components/Nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <StoreProvider>
        <Nav></Nav>
        <div className="w-full h-[calc(100%-17.5rem)] flex-1 ">{children}</div>
      </StoreProvider>
    </div>
  );
}
