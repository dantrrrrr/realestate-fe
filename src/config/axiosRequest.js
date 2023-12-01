import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // allow to get cookies
});
export default axiosRequest;
