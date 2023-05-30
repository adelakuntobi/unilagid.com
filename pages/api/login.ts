import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/db";
import { comparePasswords, generateToken } from "../../utils/auth";
import { ObjectId } from "mongodb";
import sendEmail from "@/utils/sendmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { matricNo, password } = req.body;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");
    const user = await collection.findOne({ matricNo });
    const isPasswordValid = password === user?.password;

    // if (!user || !(await comparePasswords(password, user.password))) {
    if (!user || !isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const userId = (user._id as ObjectId).toString(); // Convert ObjectId to string
    const access_token = generateToken(userId);

    const successText = `Hello ${user.firstName},
    You have successfully logged in to your account.
      If it wasn't you, kindly contact support@unilagid.com.ng
      `;
    await sendEmail({
      to: user.email,
      subject: "Successful Login",
      text: successText,
      html: "",
    });
    // await handleSuccessfulLogin(user);

    return res.status(200).json({
      message: "Authentication successful",
      data: {
        id: userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        access_token,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
