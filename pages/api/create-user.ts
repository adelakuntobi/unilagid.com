import { connectToDatabase } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { firstName, lastName, age, gender, email, courseOfStudy, newStudent } = req.body;

    // Validate the incoming request data
    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !email ||
      !courseOfStudy ||
      !newStudent
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { client, db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the user object
    const user = {
      // id,
      firstName,
      lastName,
      age,
      email,
      password: lastName,
      gender,
      courseOfStudy,
      newStudent
    };

    // Insert the user document into the MongoDB collection
    await db.collection("users").insertOne(user);

    client.close();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
}
