import { NextResponse } from "next/server";

export default function Response(
  success: boolean,
  message: string,
  status: number
) {
  return NextResponse.json(
    {
      success,
      message,
    },
    {
      status,
    }
  );
}

export function ResponseServerError(message:string){

return NextResponse.json(
    {
      success:false,
      message,
    },
    {
      status:500,
    }
  );
}