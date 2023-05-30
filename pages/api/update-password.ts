import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/db";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

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

      const { client, db } = await connectToDatabase();

      // Find the user document by user ID in the MongoDB collection
      // const user = await db
      //   .collection("users")
      //   .findOne({ _id: new ObjectId(userId) });
      // if (!user) {
      //   return res.status(404).json({ error: "User not found" });
      // }

      // Perform any operations with the found user document
      // For example, return the user's details
      const { password } = req.body;

      // Validate the incoming request data
      if (!password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // const isPasswordValid = password === user.password;

      // Update the user details in the MongoDB collection
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password } }
      );
      console.log(result)
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Close the MongoDB connection
      client.close();
  

      return res
        .status(200)
        .json({ message: "Password updated successfully", status: "success" });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
