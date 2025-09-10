import axios from "axios";

const BASE_URL = "https://lionhelper.onrender.com";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status outside 2xx
      // Pass through to caller with normalized message
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message || "Request failed",
      });
    }
    if (error.request) {
      // No response received
      return Promise.reject({ message: "No response from server" });
    }
    // Something happened in setting up the request
    return Promise.reject({ message: error.message || "Request error" });
  }
);

export default apiClient;
