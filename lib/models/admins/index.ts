import mongoose, { Schema, model } from "mongoose";

interface admins {
 email: string
 password: string
  createdAt: string;
  updatedAt: string;
}

const adminsSchema = new Schema<admins>(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Admins =
  mongoose.models.admins || model("admins", adminsSchema);
