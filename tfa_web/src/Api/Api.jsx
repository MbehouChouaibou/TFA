// src/Api/ApiManager.js
import axios from 'axios';

const API_MANAGER = axios.create({
    baseURL: 'http://localhost:8090/api/manager',
    headers: {
        'Content-Type': 'application/json',
    },
    // Remove withCredentials unless you're using cookies & CORS
    // withCredentials: true,
});

// Define public endpoints that do NOT require auth
const publicEndpoints = [];

API_MANAGER.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sessionId');

        // Extract URL path without query parameters
        const urlPath = config?.url?.split('?')[0] || '';

        // Conditionally add token
        if (token && !publicEndpoints.includes(urlPath)) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add interceptor to handle unauthorized errors globally
API_MANAGER.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("⛔ Unauthorized or session expired");
            // Optional: redirect to login or notify user
        }
        return Promise.reject(error);
    }
);

export default API_MANAGER;
