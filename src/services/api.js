import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2223",
});

export default api;
