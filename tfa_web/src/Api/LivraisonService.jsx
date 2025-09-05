// services/LivraisonService.js
import API from '../Api/LivraisonApi.jsx'; // make sure the path is correct

const LivraisonService = {
    getAllLivraisons: () => API.get('/livraisons/read'),
};

export default LivraisonService;
