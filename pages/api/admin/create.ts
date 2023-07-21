import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { returnMsg } from "@/utils/req";
import { generateToken } from "@/utils/auth";
import { Admins } from "@/lib/models";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;

    
    const existingUser = await Admins.findOne({ email });

    if (existingUser) {
      return res.status(400).json(returnMsg("User already exist", false));
    }

    // Insert the user document into the MongoDB collection
    await Admins.create(req.body);
    const newUser = await Admins.findOne({ email });

    const userId = (newUser._id as ObjectId).toString(); 
    const access_token = generateToken(userId);


    return res.status(201).json({
      message: "Admin created successfully",
      status: "success",
      data:{
        access_token,
        ...req.body
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Check if the email is unique?
    return res.status(500).json({ error: "Error creating user" });
  }
}
