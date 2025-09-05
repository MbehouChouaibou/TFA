import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Components/Authentification/Login.jsx";
import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import Client from "./Components/Client/Client.jsx";
import Workers from "./Components/Workers/Workers.jsx";
import Assignations from "./Components/Assignations/Assignations.jsx";
import AdminAccountSettings from "./Components/Admin/AdminUser.jsx";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="client" element={<Client />} />
                <Route path="workers" element={<Workers />} />
                <Route path="assignations" element={<Assignations />} />
                <Route path="admin/settings" element={<AdminAccountSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

    );
};

export default App;
