import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function Verify() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Card className="w-[350px] border-2 border-zinc-300 drop-shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-600">Verify Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full  flex justify-center items-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="w-full mt-5 flex justify-between">
            <Button variant={"ghost"} className="opacity-50 hover:opacity-100">
              Cancel
            </Button>
            <Button variant={"default"}>Verify</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Verify;
