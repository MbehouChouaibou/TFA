// src/services/GetCommercials.js
import API_MANAGER from '../Api/Api';

export const getCommercials = async () => {
    try {
        const res = await API_MANAGER.get('/commercial/newnames');
        const data = res.data;

        if (!Array.isArray(data)) {
            console.warn('getCommercials: unexpected response, not an array', data);
            return [];
        }

        if (typeof data[0] === 'string') {
            // Convert array of strings to array of objects with username property
            return data.map((username) => ({ username }));
        }

        // Filter out invalid entries
        return data.filter(
            (item) => item && typeof item.username === 'string' && item.username.trim() !== ''
        );
    } catch (error) {
        console.error('Error in getCommercials:', error);
        return [];
    }
};
