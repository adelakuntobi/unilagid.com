import { returnMsg } from "@/utils/req";
import { boysHostels, girlsHostels } from "@/utils/reuseables";
import { NextApiRequest, NextApiResponse } from "next";
import { Admins } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;

    // Validate the incoming request data
    // const validate = validateUserPayload(req.body);
    // if (!validate.success) {
    //   return res.status(400).json(returnMsg(validate.error, false));
    // }
    // req.body = validate.data.value;

    const existingUser = await Admins.findOne({ email });
    if (existingUser) {
      return res.status(400).json(returnMsg("User already exist", false));
    }

    // Insert the user document into the MongoDB collection
    await Admins.create(req.body);

    return res.status(201).json({
      message: "Admin created successfully",
      status: "success",
      data: req.body,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Check if the email is unique?
    return res.status(500).json({ error: "Error creating user" });
  }
}
