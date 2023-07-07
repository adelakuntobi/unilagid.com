import { User } from "@/lib/models";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const token = authorizationHeader.substring(7); // 7 is the length of "Bearer "

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken["userId"];

      const data = await User.findOne({
        _id: new ObjectId(userId),
      });
      if (!data) {
        return res.status(404).json({ error: "User not found" });
      }
      const result = await User.updateOne(
        
        { _id: new ObjectId(userId) },
        { $set: { ...req.body } },
      );

      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthenticated",
          status: "error",
        });
      }
      console.log(error)
      return res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
