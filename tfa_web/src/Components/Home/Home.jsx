import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/location/user';
const JWT_TOKEN = 'YOUR_JWT_TOKEN'; // Replace with actual token or localStorage

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${JWT_TOKEN}`
                    }
                });

                const { username, street, city } = response.data;

                setData([
                    {
                        username: username || 'Unknown',
                        street: street || 'Unknown',
                        city: city || 'Unknown',
                    }
                ]);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setData([
                    {
                        username: 'admin',
                        street: 'Unknown',
                        city: 'Unknown'
                    }
                ]);
            }
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12
            }
        }
    };

    const hoverVariants = {
        hover: {
            y: -4,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            transition: { type: 'spring', stiffness: 400 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 p-4 sm:p-8 lg:p-12 flex justify-center">
            <div className="max-w-4xl w-full">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                        User Location Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
                        View your current location information in real-time
                    </p>
                    <div className="mt-3 w-20 h-1 bg-gradient-to-r from-indigo-600 to-teal-600 mx-auto rounded-full"></div>
                </motion.div>

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <table className="min-w-full text-sm sm:text-base">
                        <thead>
                        <motion.tr
                            className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <th className="px-6 py-4 font-semibold tracking-wide text-left rounded-tl-2xl">Username</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left">Street</th>
                            <th className="px-6 py-4 font-semibold tracking-wide text-left rounded-tr-2xl">Town</th>
                        </motion.tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {data.map((user, index) => (
                                <motion.tr
                                    key={index}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    variants={hoverVariants}
                                    className="bg-white"
                                >
                                    <motion.td
                                        variants={itemVariants}
                                        className="px-6 py-4 font-medium text-gray-900"
                                    >
                                        {user.username}
                                    </motion.td>
                                    <motion.td
                                        variants={itemVariants}
                                        className="px-6 py-4 text-gray-700"
                                    >
                                        {user.street}
                                    </motion.td>
                                    <motion.td
                                        variants={itemVariants}
                                        className="px-6 py-4 text-gray-700"
                                    >
                                        {user.city}
                                    </motion.td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
