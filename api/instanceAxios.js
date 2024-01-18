import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "http://158.160.142.248/api",
  proxy: true,
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const token = () => {
  const token = useCookie('jwt');
  return token.value;
}
