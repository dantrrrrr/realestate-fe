import axios from "axios";
const BASE_URL =
  process.env.REACT_APP_API_URL || "https://api-realestate-blue.vercel.app";
console.log(process.env.REACT_APP_API_URL);
const axiosRequest = axios.create({
  baseURL: BASE_URL,
});
export default axiosRequest;
