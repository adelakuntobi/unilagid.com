import Axios from "axios";
import { getWithExpiry } from "../utils/req";

let urls = {
  test: "http://localhost:3000",
  development: "http://localhost:3000",
  production: "https://studentify-xyz.vercel.app",
};
export let login = "/api/login";
export let createStudent = "/api/create-user";
export let overview = "/api/overview";
export let updatePassword = "/api/update-password";
export let updateUser = "/api/update-user";
export let uploadSign = "/api/upload/signature";
export let uploadDocs = "/api/upload/docs";

export let adminLogin = "/api/admin/login";
export let adminCreate = "/api/admin/create";
export let adminOverview = "/api/admin/overview";
export let adminStudents = "/api/admin/all-students";
export let allReturningStudents = "/api/admin/all-returning-students";
// export let eachStudent = "/api/admin/student";


// export let filterBy = (type, param) => `super/${type}/filter/${param}`;

const token = getWithExpiry("jwtToken");
const bearerToken = "Bearer " + token;

var headers = {
  "Content-Type": "application/json",
  auth_key: `${process.env.NEXT_PUBLIC_API_AUTHORIZATION_KEY}`,
  Accept: "application/json",
};

if (token) {
  // Add bearerToken to headers object?
  headers["Authorization"] = bearerToken;
}

const api = Axios.create({
  baseURL: urls[process.env.NEXT_PUBLIC_ENVIRONMENT],
  headers: headers,
});



export default api;
