import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketseat-nlw-setup-server.vercel.app",
});
