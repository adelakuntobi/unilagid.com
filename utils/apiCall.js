import axios from "axios";
import { logOutAction } from "../redux/actions/dashboardActions";
import { getWithExpiry } from "../redux/actions/requestMethods";
import NProgress from "react-nprogress";
import cogotoast from "../components/cogotoast";
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

export async function APICall(type, url, payload) {
  NProgress.start();
  const token = getWithExpiry("jwtToken");
  const bearerToken = "Bearer " + token;


  var raw = payload && JSON.stringify(payload)
  var reqOptions;


  if (!token) {
    reqOptions = {
      method: type,
      url: url,
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
      },
      data: raw,
      redirect: 'follow'
    };
    if (type === "GET") {
      reqOptions = {
        url: url,
        method: type,
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
        },
        redirect: 'follow'
      }
    }
  }
  else {
    reqOptions = {
      method: type,
      url: url,
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
        Authorization: token && bearerToken,
      },
      data: raw,
      redirect: 'follow'
    };

    if (type === "GET") {
      reqOptions = {
        url: url,
        method: type,
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "auth-key": `${process.env.REACT_APP_API_AUTHORIZATION_KEY}`,
          Authorization: token && bearerToken,
        },
        redirect: 'follow'
      }
    }
  }

  try {
    const response = await axios(reqOptions);
    if (response) {
      NProgress.done();
      const res = response.data;
      if (response?.data?.message === "Unauthenticated.") {
        logOutAction()
      }

      else {
        NProgress.remove();
        return res
      }

    }
  }
  catch (error) {
    NProgress.done();
    NProgress.remove();
    if (error?.response?.data?.message === "Unauthenticated.") {
      logOutAction()
    }
    if (error.code === "ERR_NETWORK") {

      cogotoast("Network Error, check network connection and try again", "error")
      return "Network Unavailable"
    }
    else {

      return error.response.data ? error.response.data : error.response
    }


    // if (error.response) {
    //   // The client was given an error response (5xx, 4xx)
    //   -error.response);
    //   cogotoast(error.response.data.message, "error")
    // } else if (error.request) {
    //   // The client never received a response, and the request was never left
    //   cogotoast(error.request, "error")
    //   console.log(error.request);
    // } else {
    //   // Anything else
    //   console.log(error);
    // }
  }
}
