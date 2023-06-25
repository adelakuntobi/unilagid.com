import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { User } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    // Get the Authorization header from the request
    const authorizationHeader = req.headers.authorization;

    // Validate the Authorization header format
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Extract the token value by removing the "Bearer " prefix
    const token = authorizationHeader.substring(7); // 7 is the length of "Bearer "

    // Verify the JWT token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Access the user ID from the decoded token
      const userId = decodedToken["userId"];
      
      const { password, confirmPassword } = req.body;

      // Validate the incoming request data
      if (!password) {
        return res
          .status(400)
          .json({ message: "Password field is missing", status: "error" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Password and confirm password doesn't match",
          status: "error",
        });
      }
      // const isPasswordValid = password === user.password;

      // Update the user details with password and firstLogin in the MongoDB collection?

      const result = await User.updateMany(
        { _id: new ObjectId(userId) },
        { $set: { password: confirmPassword, firstLogin: false } }
      );
      // .updateOne({ _id: new ObjectId(userId) }, { $set: { password } });

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      // Close the MongoDB connection

      return res
        .status(200)
        .json({ message: "Password updated successfully", status: "success" });
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthenticated",
          status: "error",
        });
      }
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
