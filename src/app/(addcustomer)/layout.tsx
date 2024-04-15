import { Toaster } from "@/components/ui/toaster";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <Nav></Nav> */}
      <div className="w-full flex-1">{children}</div>
      <Toaster />
    </div>
  );
}
