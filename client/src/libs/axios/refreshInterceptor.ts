import { axiosPrivate } from "./axios";
import { getLS } from "../../utils/localStorage";
import { ACCESSTOKEN } from "../../const/localstorageKey";

const refreshInterceptor = () => {
  const accessToken = getLS(ACCESSTOKEN);

  axiosPrivate.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosPrivate;
};

export default refreshInterceptor;
