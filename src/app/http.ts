import axios from "axios";
import { RootState } from "./store";

export const BASE_URL = `https://dstu-ts-back.onrender.com`;



export const $api = axios.create({
  
  //   withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer'
  }
});
