import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-project-6olabackend.vercel.app/api",
  withCredentials: true, // 🔥 required for cookies
});

export default API;
