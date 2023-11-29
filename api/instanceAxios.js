import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  proxy: true,
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default instance;
