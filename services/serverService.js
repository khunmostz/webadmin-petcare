import { async } from "@firebase/util";
import axios from "axios";
import httpClient from "../utils/httpClient";

export const getUsers = async () => {
  return await (
    await axios.get(`http://localhost:8000/api/v1/petcare/users/get`)
  ).data;
};

export const getLocations = async () => {
  return await await (
    await axios.get("http://localhost:8000/api/v1/petcare/get/location")
  ).data;
};
