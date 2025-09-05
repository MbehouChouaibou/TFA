// src/services/RecouvrementService.js
import API from '../api/LivraisonApi.js';

const RecouvrementService = {
    getRecouvrements: () => API.get('/livraisons/recouvrements'),
};

export default RecouvrementService;
