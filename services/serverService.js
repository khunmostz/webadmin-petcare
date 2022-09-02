import { async } from "@firebase/util";
import axios from "axios";
import httpClient from "../utils/httpClient";

export const getUsers = async () => {
  //console.log(httpClient);
  return await (
    await httpClient.get(`/users/get`)
  ).data;
};

export const getLocations = async () => {
  return await await (
    await httpClient.get("/get/location")
  ).data;
};
