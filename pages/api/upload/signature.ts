import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Biometrics, User } from "@/lib/models";
// import { createClient } from "aws-sdk";
// import { facialRecogntion } from "@/utils/reuseables";
import axios from "axios";
import AWS from "aws-sdk";

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
    const authorizationHeader = req.headers.authorization;

    // Validate the Authorization header format
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Extract the token value by removing the "Bearer " prefix
    const token = authorizationHeader.substring(7);

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
      // const { status } = await Biometrics.findOne({ matricNo });
      const user = await Biometrics.findOne({ matricNo });
      convertImageUrlToBase64(imgUrl).then(async (jambImg) => {
        if (jambImg) {
          const { selfie, signature } = req.body;

          if (!selfie || !signature) {
            return res.status(400).json({
              message: "Some field(s) are missing",
              status: "error",
            });
          }

          // await facialRecogntion(matricNo, selfie, base64String);
          if (user) {
            const { status } = user;
            if (status === "pending") {
              return res.status(401).json({
                message: "Your request is being processed, chill out a bit",
                status: "error",
              });
            } else if (status === "approved") {
              return res.status(401).json({
                message: "You have already submitted your biometrics",
                status: "error",
              });
            } else {
              const { confidence, status } = await facialRecogntion(
                selfie,
                jambImg
              );
              await Biometrics.updateOne(
                { matricNo },
                { selfie, jambImg, confidence, status, signature }
              );
              return res.status(201).json({
                message: "Biometrics created successfully",
                status: "success",
                data: {
                  matricNo,
                  confidence,
                  status,
                },
              });
            }
          } else {
            const { confidence, status } = await facialRecogntion(
              selfie,
              jambImg
            );
            await Biometrics.create({
              matricNo,
              confidence,
              status,
              jambImg,
              signature,
              selfie,
            });
            return res.status(201).json({
              message: "Biometrics created successfully",
              status: "success",
              data: {
                matricNo,
                confidence,
                status,
              },
            });
          }
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

const facialRecogntion = async (img1, img2) => {
  console.log("Its running");
  const apiKey = process.env.AWS_ACCESS_KEY_ID;
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
  const apiRegion = process.env.AWS_REGION;

  AWS.config.update({
    accessKeyId: apiKey,
    secretAccessKey: awsSecret,
    region: apiRegion,
  });
  const rekognition = new AWS.Rekognition();

  function convertBase64ToBinary(base64String) {
    const binaryData = Buffer.from(base64String, "base64");
    return binaryData;
  }
  const imageBinary1 = convertBase64ToBinary(img1);
  const imageBinary2 = convertBase64ToBinary(img2);

  const params1 = { Image: { Bytes: imageBinary1 } };
  const params2 = { Image: { Bytes: imageBinary2 } };
  const detectedFaces1 = await rekognition.detectFaces(params1).promise();
  // console.log("Detected faces for Image 1:", detectedFaces1.FaceDetails);

  const detectedFaces2 = await rekognition.detectFaces(params2).promise();
  // console.log("Detected faces for Image 2:", detectedFaces2.FaceDetails);
  if (
    detectedFaces1.FaceDetails.length > 0 &&
    detectedFaces2.FaceDetails.length > 0
  ) {
    const compareParams = {
      SourceImage: { Bytes: imageBinary1 },
      TargetImage: { Bytes: imageBinary2 },
      SimilarityThreshold: 80,
    };

    const faceComparisonResult = await rekognition
      .compareFaces(compareParams)
      .promise();
    console.log("Face comparison result:", faceComparisonResult.FaceMatches);

    if (faceComparisonResult.FaceMatches.length > 0) {
      const similarity = faceComparisonResult.FaceMatches[0].Similarity;
      console.log("Similarity:", similarity);
      try {
        if (similarity >= 80) {
          console.log("Faces match!");
          return { confidence: similarity, status: "approved" };
        } else {
          console.log("Faces do not match!");
          return { confidence: similarity, status: "rejected" };
        }
      } catch (error) {
        console.error(
          "Error updating document in Biometrics collection:",
          error
        );
      }
    } else {
      console.log("No face matches found.");
      return { confidence: 0, status: "rejected" };
    }
  }
};
