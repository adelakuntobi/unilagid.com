import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/db";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
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

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Access the user ID from the decoded token
      const userId = decodedToken["userId"];

      const { client, db } = await connectToDatabase();
      await client.connect();
      const collection = db.collection("users");
      const data = await collection.findOne({
        _id: new ObjectId(userId),
      });
      if (!data) {
        return res.status(404).json({ error: "User not found" });
      }

      client.close();
      return res.status(200).json({
        message: "Details fetched successfully",
        status: "success",
        data,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthenticated",
          status: "error",
        });
      }
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
