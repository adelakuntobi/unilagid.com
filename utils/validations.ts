import Joi from "joi";
import { UserPayload } from "./types";


const JoiInstance = Joi.defaults(schema => {
  return schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false
      }
    }
  });
});

export const validateUserPayload = ({
  firstName,
  lastName,
  otherNames,
  email,
  dateOfBirth,
  gender,
  newStudent,
  title,
  department,
  faculty,
  hostel,
  yearOfAdmission,
  matricNo,
  firstLogin,
  phone,
}: UserPayload) => {
  const schema = JoiInstance.object({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    otherNames: Joi.string().required().trim(),
    email: Joi.string().email({ minDomainSegments: 2 }).required().trim(),
    dateOfBirth: Joi.string().required().trim(),
    gender: Joi.string().required().trim(),
    newStudent: Joi.boolean().required(),
    title: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    faculty: Joi.string().required().trim(),
    hostel: Joi.string().required().trim(),
    yearOfAdmission: Joi.string().required().trim(),
    matricNo: Joi.number().required(),
    firstLogin: Joi.boolean().required(),
    phone: Joi.string()
      .regex(/^234[789][01]\d{8}$/)
      .message("Invalid phone number")
      .trim(),
  });

  const validation = schema.validate({
    firstName,
    lastName,
    otherNames,
    email,
    dateOfBirth,
    gender,
    newStudent,
    title,
    department,
    faculty,
    hostel,
    yearOfAdmission,
    matricNo,
    firstLogin,
    phone,
  });
  if (validation.error)
    return {
      success: false,
      error: validation.error.message,
    };

  return { success: true, data: validation };
};
