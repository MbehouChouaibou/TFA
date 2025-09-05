// src/api/index.js
import axios from 'axios';

export const ClientProspet = axios.create({
    baseURL: 'http://localhost:8070/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

ClientProspet.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
