// src/api/API.js or Api.jsx
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Authorization header with JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('sessionId'); // stored at login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
