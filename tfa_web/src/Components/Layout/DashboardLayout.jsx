import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiHome,
    FiUsers,
    FiTruck,
    FiSettings,
    FiBell,
    FiChevronLeft,
    FiMenu,
    FiX
} from 'react-icons/fi';

const SidebarLink = ({ to, icon, label }) => (
    <NavLink to={to}>
        {({ isActive }) => (
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
                <motion.div
                    animate={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : '#f3f4f6',
                        rotate: isActive ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-lg"
                >
                    {typeof icon === 'string' ? (
                        <img src={`/Icons/${icon}`} alt={label} className="w-5 h-5" />
                    ) : (
                        React.cloneElement(icon, {
                            className: `w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`
                        })
                    )}
                </motion.div>
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-medium hidden sm:block"
                >
                    {label}
                </motion.span>
            </motion.div>
        )}
    </NavLink>
);

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    return (
        <div className="flex flex-col sm:flex-row h-screen bg-gray-50">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="sm:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white shadow-md"
            >
                {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || window.innerWidth >= 640) && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed sm:relative w-64 bg-white p-4 flex flex-col shadow-lg z-10 border-r border-gray-200 h-full"
                    >
                        {/* Logo/Brand */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center mb-8 px-2 py-3"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-2 rounded-lg mr-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </motion.div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">TFA Dashboard</h2>
                                <p className="text-xs text-gray-500">Field Management</p>
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col gap-1 w-full overflow-y-auto">
                            <SidebarLink to="/home" icon={<FiHome />} label="Dashboard" />
                            <SidebarLink to="/client" icon={<FiUsers />} label="Clients" />
                            <SidebarLink to="/workers" icon={<FiUsers />} label="Workers" />
                            <SidebarLink to="/assignations" icon={<FiTruck />} label="Assignments" />

                            <div className="mt-auto pt-4 border-t border-gray-200">
                                <SidebarLink
                                    to="/admin/settings"
                                    icon={<FiSettings />}
                                    label="Settings"
                                />
                            </div>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xl font-semibold text-gray-800"
                        >
                            Dashboard Overview
                        </motion.h1>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
                            >
                                <FiBell className="h-5 w-5 text-gray-600" />
                                {notificationCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                                    >
                                        {notificationCount}
                                    </motion.span>
                                )}
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-medium">
                                    AD
                                </div>
                                <span className="hidden md:inline text-sm font-medium">Admin</span>
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <div className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-8rem)]"
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;