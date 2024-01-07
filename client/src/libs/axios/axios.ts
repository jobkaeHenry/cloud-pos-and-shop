import axios from "axios";
import { getLS } from "../../utils/localStorage";
import { ACCESSTOKEN } from "../../const/localstorageKey";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://testserver.com";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getLS(ACCESSTOKEN)}`,
  },
});

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
