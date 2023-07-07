import mongoose, { Schema, model } from "mongoose";

interface documents {
  matricNo: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  faculty: string;
  yearOfAdmission: string;
  affidavit: string;
  policereport: string;
  status: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

const documentsSchema = new Schema<documents>(
  {
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
    otherNames: {
      type: String,
    },
    faculty: {
      type: String,
      required: true,
    },
    yearOfAdmission: {
      type: String,
      required: true,
    },
    affidavit: { type: String, required: true },
    policereport: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Documents =
  mongoose.models.documents || model("documents", documentsSchema);
