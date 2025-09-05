// src/services/CreateAccount.js
import API_MANAGER from '../Api/Api.jsx';

export const createCommercial = async (username, password, confirmPassword, managerPassword) => {
    try {
        const res = await API_MANAGER.post('/commercial', {
            username,
            password,
            confirmPassword,
            managerPassword,
        });
        return { success: true, message: res.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data || error.message || 'Network error',
        };
    }
};
