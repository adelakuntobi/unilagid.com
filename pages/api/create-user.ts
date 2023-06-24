import { User } from "@/lib";
import { returnMsg } from "@/utils/req";
import sendEmail from "@/utils/sendmail";
import { validateUserPayload } from "@/utils/validations";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lastName, matricNo, email } = req.body;

    // Validate the incoming request data
    const validate = validateUserPayload(req.body);
    if (!validate.success){
      console.log(validate.error)
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
    return res.status(500).json({ error: "Error creating user" });
  }
}
