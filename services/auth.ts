import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { User } from "@/lib";


export const authenticateToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    // Validate the Authorization header format
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    // Get the token from the request header
    const token = authorizationHeader.substring(7); // 7 is the length of "Bearer "

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Access the user ID from the decoded token
    const userId = decodedToken["userId"];

    const user = await User.findOne({
      _id: new ObjectId(userId),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Attach the user object to the request for further processing
    req["user"] = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
