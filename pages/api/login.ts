import { NextApiRequest, NextApiResponse } from "next";
import { comparePasswords, generateToken } from "../../utils/auth";
import { ObjectId } from "mongodb";
import sendEmail from "@/utils/sendmail";
import { returnMsg } from "@/utils/req";
import { User } from "@/lib/models";
import os from "os";
import { getLocation } from "@/utils/reuseables";

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
      return res.status(401).json({
        status: "error",
        message: "Invalid Matric number or password",
      });
    }

    const userId = (user._id as ObjectId).toString(); // Convert ObjectId to string
    const access_token = generateToken(userId);

    const currentDate = new Date();
    const date = currentDate.toDateString();
    const time = currentDate.toTimeString();

    const networkInterfaces = os.networkInterfaces();
    console.log(networkInterfaces)
    const ipAddress = networkInterfaces["Wi-Fi"][0].address;

    console.log("IP Address:", ipAddress);
    const successText = `Hello ${user.firstName},

    We are pleased to inform you that a successful login was detected on your email account. Your account was accessed from ${
      (await getLocation(ipAddress), ipAddress)
    } at ${date + ", " + time}.
    
    If you initiated this login, no further action is required. However, if you did not authorize this login or believe it to be suspicious, please take immediate action to secure your account.
    
    Should you have any questions or concerns regarding this login activity, please contact our support team or send a mail support@unilagid.com for further assistance.
    
    Best regards,
    Unilag ID
      `;
    await sendEmail({
      to: user.email,
      subject: "Successful Login",
      text: successText,
      html: "",
    });

    return res.status(200).json(
      returnMsg("Authentication successful", true, {
        id: userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        firstLogin: user.firstLogin,
        age: user.age,
        access_token,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(returnMsg("Internal server error", false));
  }
}
