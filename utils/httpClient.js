import axios from "axios";

const httpClient = axios.create({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API,
});
export default httpClient;
