import Nav from "./components/Nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Nav></Nav>
      <div className="w-full flex-1 ">{children}</div>
    </div>
  );
}
