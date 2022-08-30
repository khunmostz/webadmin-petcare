import axios from "axios";
import httpClient from "../utils/httpClient";

export const getUsers = async () => {
  return await (
    await axios.get(`http://localhost:8000/api/v1/petcare/users/get`)
  ).data;
};
