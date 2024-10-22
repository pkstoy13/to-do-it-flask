import axios from "axios";
//import { useRouter } from "next/navigation";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Adjust to your Flask backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

//let hasRedirected = false;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
