import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import Response from "@/util/Response";

// Login controler
export async function POST(request: Request) {
  try {
    //connect db
    await dbConnection();

    const { phoneNumber, password } = await request.json();

    //get user
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      return Response(false, "Unauthorized!", 401);
    }

    //match password
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return Response(false, "Unauthorized!", 401);
    }

    return Response(true, "Login successfull!", 200);
  } catch (error) {
    console.log(error);
    return Response(false, "Login failed!", 500);
  }
}
