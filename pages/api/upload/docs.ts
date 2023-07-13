import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Documents, User } from "@/lib/models";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { returnMsg } from "@/utils/req";

export const config = {
  api: {
    bodyParser: false,
  },
};
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

      const {
        firstName,
        otherNames,
        lastName,
        faculty,
        yearOfAdmission,
        matricNo,
      } = await User.findOne({
        _id: new ObjectId(userId),
      });

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          const destinationPath = path.join(
            process.cwd(),
            "public/uploads",
            String(matricNo)
          );
          // const uploadDirectory = '/var/task/uploads';

          if (!fs.existsSync(destinationPath)) {
            // fs.mkdirSync(uploadDirectory);
            fs.mkdirSync(destinationPath, { recursive: true });
          }

          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const extension = path.extname(file.originalname);
          const fileName =
            file.fieldname === "affidavit" ? "affidavit" : "policereport";
          cb(null, `${fileName}_${uniqueSuffix}${extension}`);
        },
      });
      const upload = multer({ storage });

      try {
        await upload.fields([
          { name: "affidavit", maxCount: 1 },
          { name: "policereport", maxCount: 1 },
        ])(req, res, async (error) => {
          try {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: "File upload failed" });
            }

            const { affidavit, policereport } = req["files"];

            const file = {
              matricNo,
              firstName,
              otherNames,
              lastName,
              faculty,
              yearOfAdmission,
              affidavit: affidavit[0].filename,
              policereport: policereport[0].filename,
              status: "pending",
              reason: "",
            };

            try {
              // await file.create();
              await Documents.create(file);

              return res
                .status(200)
                .json({ message: "File upload successful" });
            } catch (error) {
              if (error.name === "MongoServerError" && error.code === 11000) {
                console.log(error)
                return res
                  .status(400)
                  .json(returnMsg("Documents already uploaded", false));
              }
              console.error(error);
              return res.status(500).json({ message: "File upload failed" });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "File upload failed" });
          }
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "File upload failed" });
      }
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
