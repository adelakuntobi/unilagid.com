import { connectToDatabase } from "@/utils/db";
import { findEmptyField } from "@/utils/isEmpty";
import sendEmail from "@/utils/sendmail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lastName, matricNo } = req.body;

    // Validate the incoming request data

    const emptyField = findEmptyField(req.body, []);
    if (emptyField) {
      return res.status(400).json({
        status: "error",
        message: `The field '${emptyField}' is required.`,
      });
    }
    const { client, db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ matricNo });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the user object
    const data = {
      // id,
      ...req.body,
      password: lastName.toLowerCase(),
    };

    // Insert the user document into the MongoDB collection
    await db.collection("users").insertOne(data);

    client.close();

    return res
      .status(201)
      .json({ message: "User created successfully", status: "success", data });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
}
