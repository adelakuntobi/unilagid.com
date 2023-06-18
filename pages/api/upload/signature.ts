import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/utils/db';

const upload = multer({ dest: 'uploads/' });

const handler = upload.single('image');

const uploadApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { client, db } = await connectToDatabase(); // Connect to the database using your function

    const { filename, originalname, mimetype, path } = req.body;

    const imageSchema = new mongoose.Schema({
      filename: String,
      originalName: String,
      mimeType: String,
      path: String,
    });

    const Image = mongoose.models.selfies || mongoose.model('selfies', imageSchema);

    const image = new Image({
      filename,
      originalName: originalname,
      mimeType: mimetype,
      path,
    });

    await image.save();

    res.status(200).json({ message: 'Image uploaded successfully!', image });

    client.close(); // Close the MongoDB connection
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the image.' });
  }
};

export default function handlerWrapper(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res, (error: any) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    } else {
      uploadApiHandler(req, res);
    }
  });
}
