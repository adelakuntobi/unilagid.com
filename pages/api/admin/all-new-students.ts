import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Biometrics } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const token = authorizationHeader.substring(7);
    try {
      // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const data = await Biometrics.find({});
      console.log(data);
      return res.status(200).json({
        message: "Details fetched successfully",
        status: "success",
        data: {
          all: data.length,
          approved: 7,
          rejected: 89,
          pending: 9,
        }
        // data,
        // count:{
        //   pending,
        //   approved,
        //   rejected
        // }
        // data
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
