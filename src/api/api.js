// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://vitaltrack-backend-v5el.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
