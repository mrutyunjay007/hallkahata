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
