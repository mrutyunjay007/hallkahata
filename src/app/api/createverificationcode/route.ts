import dbConnection from "@/lib/dbConnect";
import VerifyModel from "@/models/Verify";
import Response, { ResponseServerError } from "@/util/Response";

export async function POST(request: Request) {
  //db connected
  dbConnection();

  try {
    const { phoneNumber } = await request.json();

    const code = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);

    //create new verification code
    const VerifyCode = await VerifyModel.create({ phoneNumber, code });
    await VerifyCode.save();

    return Response(true, "verification code created!", 201);
  } catch (error) {
    return ResponseServerError(" code creation failed!");
  }
}
