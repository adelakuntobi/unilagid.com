import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Biometrics, User } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
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
      
      const { selfie, signature } = req.body;
      const {matricNo} = await User.findOne({
        _id: new ObjectId(userId),
      });
      // Validate the incoming request data
      if (!selfie || !signature ) {
        return res
          .status(400)
          .json({ message: "Some field(s) are missing", status: "error" });
      }


    // Insert the user document into the MongoDB collection
    await Biometrics.create({
      matricNo,
      ...req.body,
    });

    return res
      .status(201)
      .json({ message: "Biometrics created successfully", status: "success" });
    } catch (error) {
      console.log(error)
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
