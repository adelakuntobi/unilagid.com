import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import mongoose from "mongoose";
import { authenticateToken } from "@/services/auth";
import { connectToDatabase } from "@/utils/db";
import { returnMsg } from "@/utils/req";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Define the Image schema
const imageSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimeType: String,
  path: String,
  name: String,
  email: String,
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

const uploadApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { client, db } = await connectToDatabase(); // Connect to the database using your function

    const { filename, originalname, mimetype, path } = req.body;

    // Access additional parameters from the request body
    const { name, email } = req.body;

    const image = new Image({
      filename,
      originalName: originalname,
      mimeType: mimetype,
      path,
      name,
      email,
    });

    await image.save();
    
    client.close(); // Close the MongoDB connection

    return res.status(200).json({ message: "Image uploaded successfully!", image });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while uploading the image." });
  }
};

const authenticatedUploadApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await authenticateToken(req, res, () => {
      upload.single("image")(req, res, (error: any) => {
        if (error instanceof multer.MulterError) {
          return res.status(400).json({ error: "File upload error." });
        } else if (error) {
          console.log(error)
          return res
            .status(500)
            .json(returnMsg("An error occurred while uploading the image.", false));
        } else {
          uploadApiHandler(req, res);
        }
      }); // Use the authenticateToken middleware before the uploadApiHandler
    });
  } catch (error) {
    console.log("error");
    return res.status(401).json(returnMsg("Unauthorized", false ));
  }
};

export default authenticatedUploadApiHandler;
