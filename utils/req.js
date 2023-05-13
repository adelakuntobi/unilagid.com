import axios from "axios";
import { getWithExpiry } from "../redux/actions/requestMethods";

const token = getWithExpiry("jwtToken");
const bearerToken = "Bearer " + token;
var headers;

if (token) {
  headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
    Authorization: bearerToken,
  }
}
else {
  headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
  }
}
export default axios.create({
  headers: headers,
});