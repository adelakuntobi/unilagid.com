import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/db";
import { comparePasswords, generateToken } from "../../utils/auth";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");
    const user = await collection.findOne({ email });
    const isPasswordValid = password === user?.password;

    // if (!user || !(await comparePasswords(password, user.password))) {
    if (!user || !isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userId = (user._id as ObjectId).toString(); // Convert ObjectId to string
    const token = generateToken(userId);

    return res.status(200).json({
      message: "Authentication successful",
      data: {
        id: userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        token,

      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
