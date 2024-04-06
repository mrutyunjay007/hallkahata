import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const CustomerBill = ({ params }: { params: { billId: string } }) => {
  const { billId } = params;

  const data = {
    _id: "bcsha54484",
    // TODO: in orgina : seller Id
    seller: {
      userId: "1",
      userName: "Ram",
    },
    // TODO: in orgina : customer Id
    customer: {
      userId: "2",
      userName: "sam",
    },
    amount: -1500,
    createdAt: "05-07-2024",
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {" "}
            <div className="w-full  flex justify-between items-center">
              <span className="tag ">Bill</span>
              <span className="val text-muted-foreground font-normal">
                {billId}
              </span>
            </div>
          </CardTitle>
          <CardDescription
            className={`font-mono font-semibold  ${
              data.amount > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="text-sm">
              {`${data.amount > 0 ? "paid" : "unpaid"}`}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* cutomer */}
          <div className="w-full py-2 flex justify-between items-center text-sm text-muted-foreground">
            <span className="tag ">customer :</span>
            <span className="val">{data.customer.userName}</span>
          </div>
          {/* seller */}
          <div className="w-full py-2 flex justify-between items-center text-sm text-muted-foreground">
            <span className="tag ">seller :</span>
            <span className="val">{data.seller.userName}</span>
          </div>
          {/* date */}
          <div className="w-full py-2 flex justify-between items-center text-sm text-muted-foreground">
            <span className="tag ">date :</span>
            <span className="val">{data.createdAt}</span>
          </div>
        </CardContent>
        <CardFooter>
          {/* amount */}
          <div className="w-full py-2 flex justify-between items-center ">
            <span className={` tag text-sm text-muted-foreground`}>
              Total amount :
            </span>
            <span
              className={`${
                data.amount > 0 ? "text-green-400" : "text-red-400"
              } val font-bold text-lg`}
            >
              ₹ {Math.abs(data.amount)}
            </span>
          </div>
        </CardFooter>
      </Card>
      {data.amount < 0 && (
        <Button className="w-[350px] py-7 bg-purple-700 hover:bg-purple-900 font-bold">
          Remainder
        </Button>
      )}
    </div>
  );
};

export default CustomerBill;
