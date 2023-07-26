import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: "http://127.0.0.1:4000/api",
  withCredentials: true
});

// Función auxiliar para agregar el token de autorización a los encabezados
const addAuthorizationHeader = (config: AxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
};
//@ts-ignore
authApi.interceptors.request.use(addAuthorizationHeader);

export default authApi;