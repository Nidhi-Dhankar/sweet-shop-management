import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Use proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const fetchSweets = () => API.get("/sweets");
export const searchSweets = (query) => API.get(`/sweets/search${query}`);
export const purchaseSweet = (id, quantity) => API.post(`/sweets/${id}/purchase`, { quantity });

// Admin
export const addSweet = (sweetData) => API.post("/sweets", sweetData);
export const restockSweet = (id, quantity) => API.post(`/sweets/${id}/restock`, { quantity });
export const deleteSweet = (id) => API.delete(`/sweets/${id}`);
export const updateSweet = (id, data) => API.put(`/sweets/${id}`, data);

export default API;
