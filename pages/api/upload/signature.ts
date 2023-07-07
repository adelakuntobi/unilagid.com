import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Biometrics, User } from "@/lib/models";
// import { createClient } from "aws-sdk";
import { facialRecogntion } from "@/utils/reuseables";
import axios from "axios";
async function convertImageUrlToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64String = imageBuffer.toString("base64");
    return base64String;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
}
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
      const { matricNo } = await User.findOne({
        _id: new ObjectId(userId),
      });
      const baseUrl =
        "https://studentportalbeta.unilag.edu.ng/(S(2nuegtmwglih1jpo5ja5dpc0))/StudentPassport.aspx?MatricNo=";

      const imgUrl = baseUrl + matricNo;
      convertImageUrlToBase64(imgUrl).then(async (base64String) => {
        if (base64String) {
          // jambImg = base64String;
          const { selfie, signature } = req.body;
          facialRecogntion(matricNo, base64String, selfie)

// if()

          // Validate the incoming request data
          if (!selfie || !signature) {
            return res
              .status(400)
              .json({ message: "Some field(s) are missing", status: "error" });
          }
    
           Biometrics.create({
            matricNo,
            confidence: 0,
            jambImg: base64String,
            ...req.body,
          });
    
          return res.status(201).json({
            message: "Biometrics created successfully",
            status: "success",
          });


        } else {
          console.log("Failed to convert image to base64");
        }
      });
     
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthenticated",
          status: "error",
        });
      }
      console.log(error);
      return res.status(401).json({
        error: "Invalid token",
      });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
