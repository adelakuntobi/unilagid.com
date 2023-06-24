import mongoose, { Schema, model } from "mongoose";


interface biometrics{
  matricNo: number;
  selfie: string
  // fingerprint: string
  signature: string
  createdAt: string
  updatedAt: string

}

const biometricsSchema = new Schema<biometrics>(
  {
    matricNo: {
      type: Number,
      required: true,
      unique: true,
    },
    selfie: {
      type: String,
      required: true,
    },
    // fingerprint: {
    //   type: String,
    //   required: true,
    // },
    signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const Biometrics = mongoose.models.biometrics || model("biometrics", biometricsSchema);
