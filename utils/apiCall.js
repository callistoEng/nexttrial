import axios from "axios";
import { getNewAccessToken } from "../state/actionCreators/auth";
// import { getNewAccessToken } from "../state/actionCreators/auth";
// import { production_url } from "./conf";

export const ECAuthApiRoot = () => {
  let accessToken = localStorage.getItem("access");
  const authApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${accessToken}`,
      Accept: "application/json",
    },
  });
  authApiInstance.interceptors.request.use(async (request) => {
    if (!accessToken) {
      accessToken = await getNewAccessToken();
      request.headers.Authorization = `JWT ${accessToken}`;
    }
    return request;
  });
  return authApiInstance;
};
export const ApiFree = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return axiosInstance;
};
export const ApiFreeNoBase = () => {
  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
    },
  });
  return axiosInstance;
};



export const LoginApiRoot = () => {
  let accessToken = localStorage.getItem("access");
  const authApiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  authApiInstance.interceptors.response.use(async (response) => {
    if (!accessToken) {
      accessToken = await getNewAccessToken();
      response.headers.Authorization = `JWT ${accessToken}`;
    }
    return response;
  });
  return authApiInstance;
};