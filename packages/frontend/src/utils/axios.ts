import { CookieKeys } from "@/api/contexts/cookie-keys";
import axios from "axios";
import Cookies from "js-cookie";

export const initAxios = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.interceptors.request.use((config) => {
    const token = Cookies.get(CookieKeys.BSSTREAMING_JWT_TOKEN);
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });
};
