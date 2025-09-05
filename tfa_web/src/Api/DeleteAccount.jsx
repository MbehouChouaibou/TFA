// src/services/DeleteCommercial.js
import API_MANAGER from '../Api/Api';

export const deleteCommercial = async (username) => {
    try {
        const res = await API_MANAGER.delete(`/commercial/${encodeURIComponent(username)}`);
        return { success: res.status >= 200 && res.status < 300 };
    } catch {
        return { success: false };
    }
};
