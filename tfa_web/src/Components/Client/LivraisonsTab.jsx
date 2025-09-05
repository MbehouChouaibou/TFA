import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck, FiCalendar, FiDollarSign, FiUser, FiPackage, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import LivraisonService from "../../Api/LivraisonService.jsx";
import StatusBadge from './StatusBadge';

const LivraisonsTab = () => {
    const [livraisons, setLivraisons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchLivraisons = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await LivraisonService.getAllLivraisons();
                setLivraisons(response.data);
            } catch (err) {
                setError('Erreur lors du chargement des livraisons.');
                console.error('Error loading livraisons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLivraisons();
    }, []);

    const filteredLivraisons = livraisons.filter(livraison => {
        const matchesSearch =
            livraison.nomPointDeVente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livraison.raisonSociale.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livraison.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livraison.nomsProduits.some(produit =>
                produit.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesStatus =
            filterStatus === 'all' ||
            livraison.statut.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getStatusIcon = (statut) => {
        switch(statut.toLowerCase()) {
            case 'livré':
                return <FiCheckCircle className="text-green-500" />;
            case 'en cours':
                return <FiClock className="text-yellow-500" />;
            case 'retard':
                return <FiAlertCircle className="text-red-500" />;
            default:
                return <FiPackage className="text-gray-500" />;
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <FiTruck className="mr-2 text-blue-500" />
                            Gestion des Livraisons
                            <span className="ml-2 text-sm font-normal bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {filteredLivraisons.length} {filteredLivraisons.length === 1 ? 'livraison' : 'livraisons'}
                            </span>
                        </h2>
                        <p className="text-gray-600 mt-1">Suivi et gestion des livraisons clients</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher livraisons..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                            />
                            <FiPackage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="livré">Livré</option>
                            <option value="en cours">En cours</option>
                            <option value="retard">Retard</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Référence
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                                <FiCalendar className="mr-1" />
                                Date
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Point de Vente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                                <FiUser className="mr-1" />
                                Responsable
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                                <FiDollarSign className="mr-1" />
                                Montant
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                        {filteredLivraisons.length > 0 ? (
                            filteredLivraisons.map((livraison) => (
                                <React.Fragment key={livraison.id}>
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`hover:bg-gray-50 ${expandedRow === livraison.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            #{livraison.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(livraison.dateLivraison).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {livraison.nomPointDeVente}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {livraison.raisonSociale}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {livraison.createdBy}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {livraison.prixTotal} DH
                                            </div>
                                            {livraison.avance > 0 && (
                                                <div className="text-xs text-gray-500">
                                                    Avance: {livraison.avance} DH
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={livraison.statut} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => toggleRow(livraison.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                {expandedRow === livraison.id ? 'Réduire' : 'Détails'}
                                            </button>
                                        </td>
                                    </motion.tr>

                                    {expandedRow === livraison.id && (
                                        <motion.tr
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-blue-50"
                                        >
                                            <td colSpan="8" className="px-6 py-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                            <FiPackage className="mr-2" />
                                                            Produits Livrés
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {livraison.nomsProduits.map((produit, index) => (
                                                                <div key={index} className="flex items-center text-sm">
                                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                                    {produit}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                            <FiDollarSign className="mr-2" />
                                                            Détails de Paiement
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-gray-500">Total</p>
                                                                <p className="font-medium">{livraison.prixTotal} DH</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Avance</p>
                                                                <p className="font-medium">{livraison.avance} DH</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Reste</p>
                                                                <p className="font-medium">{livraison.prixTotal - livraison.avance} DH</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Statut</p>
                                                                <div className="flex items-center">
                                                                    {getStatusIcon(livraison.statut)}
                                                                    <span className="ml-1">{livraison.statut}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-white"
                            >
                                <td colSpan="8" className="px-6 py-8 text-center">
                                    <div className="text-gray-500">
                                        {searchTerm || filterStatus !== 'all'
                                            ? "Aucune livraison ne correspond à vos critères de recherche."
                                            : "Aucune livraison disponible. Créez votre première livraison pour commencer."}
                                    </div>
                                </td>
                            </motion.tr>
                        )}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LivraisonsTab;