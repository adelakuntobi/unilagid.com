import mongoose, { Schema, model } from "mongoose";

interface biometrics {
  matricNo: number;
  jambImg: string;
  selfie: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
}

const biometricsSchema = new Schema<biometrics>(
  {
    matricNo: {
      type: Number,
      required: true,
      unique: true,
    },
    jambImg: {
      type: String,
    },
    selfie: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Biometrics =
  mongoose.models.biometrics || model("biometrics", biometricsSchema);
