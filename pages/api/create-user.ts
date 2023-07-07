import { returnMsg } from "@/utils/req";
import { boysHostels, girlsHostels } from "@/utils/reuseables";
import sendEmail from "@/utils/sendmail";
import { validateUserPayload } from "@/lib/validations/user";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { gender, lastName, matricNo, email, newStudent } = req.body;
    var hall = boysHostels;
    if (gender === "female") hall = girlsHostels;
    const hostel = hall[Math.floor(Math.random() * hall.length)];

    // Validate the incoming request data
    const validate = validateUserPayload({
      ...req.body,
      hostel,
      newStudent: Boolean(newStudent),
      firstLogin: true,
    });
    if (!validate.success) {
      return res.status(400).json(returnMsg(validate.error, false));
    }
    req.body = validate.data.value;

    const existingUser = await User.findOne({ matricNo, email });
    if (existingUser) {
      return res.status(400).json(returnMsg("User already exist", false));
    }

    // Create the user object
    const data = {
      ...req.body,
      password: lastName.toLowerCase(),
      // createdAt: new Date(),
    };

    // Insert the user document into the MongoDB collection
    await User.create(data);

    return res
      .status(201)
      .json({ message: "User created successfully", status: "success", data });
  } catch (error) {
    console.error("Error creating user:", error);
    // Check if the email is unique?
    return res.status(500).json({ error: "Error creating user" });
  }
}
