import Axios from "axios";
import { getWithExpiry } from "../utils/req";

let urls = {
  test: "http://localhost:3000/api/",
  development: "http://localhost:3000/api/",
  production: "https://studentify-xyz.vercel.app/api/",
};
export let login = "login";
export let overview = "super/overview";
export let updateDollar = "super/dollar-rate/update";

export let filterBy = (type, param) => `super/${type}/filter/${param}`;
export let activityLog = "super/user/activities/";
export let blockUser = "super/user/status/";
export let blockUserCard = "super/user/card/dollar/";

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
