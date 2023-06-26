import mongoose, { Schema, model } from "mongoose";

interface documents {
  matricNo: number;
  firstName: string;
  lastName: string;
  confidenceValue: number;
  selfie: string;
  jambImg: string;
  status: string;

  createdAt: string;
  updatedAt: string;
}

const VerificationsSchema = new Schema<documents>({
  matricNo: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  selfie: {
    type: String,
    required: true,
  },
  jambImg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
  confidenceValue: {
    type: Number,
    required: true,
  },
});

export const Verifications =
  mongoose.models.verifications || model("verifications", VerificationsSchema);
