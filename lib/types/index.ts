export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface UserPayload {
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
  address: string
  status: string
  phoneNumber: string;
}

// Interface to define our Todo model on the frontend
