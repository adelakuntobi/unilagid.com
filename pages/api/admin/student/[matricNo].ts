import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Biometrics, Documents, User } from "@/lib/models";

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
    // const token = authorizationHeader.substring(7);

    try {
      const { matricNo } = req["query"];
      const user = await User.findOne({ matricNo: Number(matricNo) });
      const documents = await Documents.findOne({ matricNo: Number(matricNo) });
      const biometrics = await Biometrics.findOne({ matricNo: Number(matricNo) });

      // const data = await Documents.find({})
      return res.status(200).json({
        message: "Student information fetched successfully",
        status: "success",
        data: {
          user,
          documents,
          biometrics,
        },
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
