import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://api-realestate-blue.vercel.app",
});
export default axiosRequest;
