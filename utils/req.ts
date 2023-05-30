import axios from "axios";
import setAuthToken from "./setAuthToken";
import { LOGIN } from "./pageUrl";


export function getWithExpiry(key: string) {
  if (typeof window !== "undefined") {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      setAuthToken(false);
      window.location.href = LOGIN;
      return null;
    }
    return item.value;
  }
}
export function setWithExpiry(key: string, val: any, ttl: number) {
  const now = new Date()
  const item = {
    value: val,
    expiry: now.getTime() + ttl,
  }
  sessionStorage.setItem(key, JSON.stringify(item))
}
