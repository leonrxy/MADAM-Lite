import axios from "axios";

const API = axios.create();

API.defaults.baseURL = "http://127.0.0.1:3000/api/";

API.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

API.defaults.timeout = 5000;
//API.defaults.withCredentials = true;
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
