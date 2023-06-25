import mongoose, { Schema, model } from "mongoose";


interface documents {
  matricNo: number;
  affidavit: string
  policeReport: string
  status: string
  reason: string
  createdAt: string
  updatedAt: string

}



const documentsSchema = new Schema<documents>(
  {
    matricNo: {
      type: Number,
      required: true,
      unique: true,
    },
    affidavit: {
      type: String,
      required: true,
    },
    policeReport: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    reason: {
      type: String,
    },
  }
);

export const Documents = mongoose.models.documents || model("documents", documentsSchema);


