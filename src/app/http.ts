import axios from "axios";

export const BASE_URL = `https://invst-back.up.railway.app`;

export const $api = axios.create({
  //   withCredentials: true,
  baseURL: BASE_URL,
});
