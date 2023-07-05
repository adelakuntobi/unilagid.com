import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Documents, User } from "@/lib/models";
import {formidable} from "formidable";
import multer from "multer"

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

      // Storage
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./public/uploads"); 
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });

      // Upload
      const upload = multer({ storage: storage }).fields([  
        { name: "affidavit", maxCount: 1 },
        { name: "policeReport", maxCount: 1 },
      ]);

      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        }
        if (err) {
          return res.status(500).json(err);
        }
        try{
          const { affidavit, policeReport } = req['files'];
          const affidavitPath = affidavit[0].path;
          const policeReportPath = policeReport[0].path;
          const documents = await Documents.findOneAndUpdate(
            { matricNo: matricNo },
            {
              affidavit: affidavitPath,
              policeReport: policeReportPath,
              status: "pending",
            },
            { upsert: true, new: true }
          );
          return res.status(200).json({
            message: "Documents uploaded successfully",
            status: "success",
            data: documents,
          });
          }catch(e){
            console.log(e)
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
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Error retrieving user" });
  }
}
