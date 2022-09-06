import { async } from "@firebase/util";
import axios from "axios";
import httpClient from "../utils/httpClient";

export const getUsers = async () => {
  // console.log(httpClient.toString);
  return await (
    await httpClient.get(`/users/get`)
  ).data;
};

export const getLocations = async () => {
  return await (
    await httpClient.get("/get/location")
  ).data;
};

export const getPromotion = async () => {
  return await (
    await httpClient.get("/promotion/get")
  ).data;
};

export const postPromotion = async (data) => {
  await httpClient.post("/promotion/create", data);
};

export const deletePromotion = async (data) => {
  await httpClient.delete(`/promotion/delete/${data}`);
};

export const getPets = async () => {
  return await (
    await httpClient.get("/pets/get")
  ).data;
};
