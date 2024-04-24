import { Toaster } from "@/components/ui/toaster";

import StoreProvider from "./StoreProvider";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <StoreProvider>{children}</StoreProvider>
      </div>
      <Toaster></Toaster>
    </>
  );
}
