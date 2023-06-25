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
export let updloadSign = "/api/upload/signature";

export let adminLogin = "/api/admin/login";


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
