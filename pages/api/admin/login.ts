import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { returnMsg } from "@/utils/req";
import { generateToken } from "@/utils/auth";
import { Admins } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await Admins.findOne({ email });
    const isPasswordValid = password === user?.password;

    // if (!user || !(await comparePasswords(password, user.password))) {
    if (!user || !isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "error",
      });
    }

    const userId = (user._id as ObjectId).toString(); // Convert ObjectId to string
    const access_token = generateToken(userId);

    return res.status(200).json(returnMsg("Login successful", true, 
    {
      access_token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    ));
  } catch (error) {
    console.log(error);
    return res.status(500).json(returnMsg("Internal server error", false));
  }
}
