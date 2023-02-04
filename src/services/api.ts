import axios from "axios";

export const api = axios.create({
  baseURL: "https://dt-money-pi-indol.vercel.app/api",
});
