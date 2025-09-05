import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        showPassword: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleLogin, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await handleLogin(form.username, form.password);
        setIsSubmitting(false);

        if (success) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2">
                            <FiAlertCircle className="text-xl" />
                            <span>{error}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-md"
            >
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                    {/* Header */}
                    <div className="bg-gray-700 p-8 text-center">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center mb-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            </div>
                        </motion.div>
                        <motion.h2
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-white mb-1"
                        >
                            TFA Authentication
                        </motion.h2>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-1"
                            >
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="Username"
                                        autoComplete="username"
                                    />
                                    <div className="absolute right-3 top-3 text-gray-400">
                                        <FiUser />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-1"
                            >
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={form.showPassword ? "text" : "password"}
                                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                    <div className="absolute right-3 top-3 flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                                            className="text-gray-400 hover:text-white transition"
                                        >
                                            {form.showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                        <FiLock className="text-gray-400" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pt-2"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow transition ${
                                        isSubmitting
                                            ? 'bg-blue-600 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Authenticating...
                                        </div>
                                    ) : (
                                        'Continue'
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center text-sm text-gray-400 mt-6"
                        >
                            <p>Need access? <a href="#" className="text-blue-400 hover:underline">Contact admin</a></p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;