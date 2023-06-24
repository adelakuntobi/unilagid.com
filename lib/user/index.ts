import mongoose, { Schema, model } from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  newStudent: boolean;
  title: string;
  department: string;
  faculty: string;
  hostel: string;
  yearOfAdmission: string;
  matricNo: number;
  firstLogin: boolean;
  phone: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
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
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    newStudent: {
      type: Boolean,
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    yearOfAdmission: {
      type: String,
      required: true,
    },
    matricNo: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.user || model("user", userSchema);
