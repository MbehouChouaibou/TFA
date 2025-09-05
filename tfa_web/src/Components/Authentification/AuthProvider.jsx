// src/components/Authentication/AuthProvider.jsx
import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Actually sessionId
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    const handleLogin = async (usernameInput, password) => {
        try {
            const response = await axios.post("http://localhost:8090/api/auth/login", {
                username: usernameInput,
                password,
            });

            const data = response.data;

            console.log("🟡 Full login response data:", data);

            const hasRequiredFields =
                response.status === 200 &&
                data.sessionId &&
                data.username &&
                Array.isArray(data.roles) &&
                data.roles.length > 0;

            if (hasRequiredFields) {
                const userRole = data.roles[0]; // Get first role

                setError(null);
                setIsAuthenticated(true);
                setToken(data.sessionId);
                setUsername(data.username);
                setRole(userRole);

                // Store in localStorage
                localStorage.setItem("auth", "true");
                localStorage.setItem("sessionId", data.sessionId);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", userRole);

                return true;
            } else {
                console.log("🔴 Missing required fields in login response");
                setError("Invalid username or password");
                setIsAuthenticated(false);
                return false;
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed");
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setUsername(null);
        setRole(null);

        localStorage.removeItem("auth");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ handleLogin, logout, error, isAuthenticated, token, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};
