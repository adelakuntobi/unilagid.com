import { NextApiRequest, NextApiResponse } from "next";
import { comparePasswords, generateToken } from "../../utils/auth";
import { ObjectId } from "mongodb";
import sendEmail from "@/utils/sendmail";
import { returnMsg } from "@/utils/req";
import { data } from "autoprefixer";
import { User } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }



  
  const { matricNo, password } = req.body;

  try {
    const user = await User.findOne({ matricNo: Number(matricNo) });
    const isPasswordValid = password === user?.password;

    // if (!user || !(await comparePasswords(password, user.password))) {
    if (!user || !isPasswordValid) {
      return res
        .status(401)
        .json({
          status: "error",
          message: "Invalid Matric number or password",
        });
    }

    const userId = (user._id as ObjectId).toString(); // Convert ObjectId to string
    const access_token = generateToken(userId);

    const successText = `Hello ${user.firstName},
    You have successfully logged in to your account.
      If it wasn't you, kindly contact support@unilagid.com.ng
      `;
    // await sendEmail({
    //   to: user.email,
    //   subject: "Successful Login",
    //   text: successText,
    //   html: "",
    // });

    return res.status(200).json(
      returnMsg(
         "Authentication successful",
         true,
         {
          id: userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          firstLogin: user.firstLogin,
          age: user.age,
          access_token,
        }
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(returnMsg("Internal server error", false));
  }
}
