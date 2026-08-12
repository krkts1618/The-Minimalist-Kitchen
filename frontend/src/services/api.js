import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Pointing to your Express backend
});

// Automatically attach the JWT token to requests if it exists in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
