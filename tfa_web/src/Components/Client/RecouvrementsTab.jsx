import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiDollarSign,
    FiCalendar,
    FiTruck,
    FiUser,
    FiPackage,
    FiCheckCircle,
    FiAlertCircle,
    FiSearch,
    FiChevronDown,
    FiChevronUp
} from 'react-icons/fi';

const RecouvrementsTab = ({ recouvrements }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const sortedRecouvrements = React.useMemo(() => {
        let sortableData = [...recouvrements];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                // Handle nested properties
                const aValue = sortConfig.key.includes('.')
                    ? sortConfig.key.split('.').reduce((o, i) => o?.[i], a)
                    : a[sortConfig.key];

                const bValue = sortConfig.key.includes('.')
                    ? sortConfig.key.split('.').reduce((o, i) => o?.[i], b)
                    : b[sortConfig.key];

                // Handle null values
                if (aValue == null) return 1;
                if (bValue == null) return -1;

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [recouvrements, sortConfig]);

    const filteredRecouvrements = sortedRecouvrements.filter(r => {
        const matchesSearch =
            r.bordereauDeLivraison?.nomPointDeVente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.bordereauDeLivraison?.raisonSociale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.bordereauDeLivraison?.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.bordereauDeLivraison?.nomsProduits?.some(produit =>
                produit.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesStatus =
            filterStatus === 'all' ||
            r.bordereauDeLivraison?.statut?.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
    };

    const getStatusBadge = (status) => {
        let bgColor, textColor, icon;

        switch(status?.toLowerCase()) {
            case 'livré':
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                icon = <FiCheckCircle className="text-green-500 mr-1" />;
                break;
            case 'en cours':
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-800';
                icon = <FiAlertCircle className="text-yellow-500 mr-1" />;
                break;
            case 'retard':
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                icon = <FiAlertCircle className="text-red-500 mr-1" />;
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                icon = <FiAlertCircle className="text-gray-500 mr-1" />;
        }

        return (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                {icon}
                {status || 'N/A'}
            </div>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(amount || 0).replace('XOF', '') + 'FCFA';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <FiDollarSign className="mr-2 text-green-500" />
                            Gestion des Recouvrements
                            <span className="ml-2 text-sm font-normal bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {filteredRecouvrements.length} {filteredRecouvrements.length === 1 ? 'recouvrement' : 'recouvrements'}
              </span>
                        </h2>
                        <p className="text-gray-600 mt-1">Suivi des paiements et recouvrements clients</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher recouvrements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        <th
                            onClick={() => requestSort('dateRecouvrement')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiCalendar className="mr-1" />
                                Date Recouvrement
                                {getSortIcon('dateRecouvrement')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('bordereauDeLivraison.dateLivraison')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiCalendar className="mr-1" />
                                Date Livraison
                                {getSortIcon('bordereauDeLivraison.dateLivraison')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('bordereauDeLivraison.nomPointDeVente')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiTruck className="mr-1" />
                                Point de Vente
                                {getSortIcon('bordereauDeLivraison.nomPointDeVente')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('bordereauDeLivraison.raisonSociale')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                Client
                                {getSortIcon('bordereauDeLivraison.raisonSociale')}
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
                    {filteredRecouvrements.length > 0 ? (
                        filteredRecouvrements.map((r, index) => {
                            const bdl = r.bordereauDeLivraison;
                            const isExpanded = expandedRow === r.id;

                            return (
                                <React.Fragment key={index}>
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`hover:bg-gray-50 ${isExpanded ? 'bg-green-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {r.dateRecouvrement || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {bdl?.dateLivraison || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {bdl?.nomPointDeVente || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {bdl?.raisonSociale || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatCurrency(r.prixTotal)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Avance: {formatCurrency(r.avance)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(bdl?.statut)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => toggleRow(r.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                {isExpanded ? 'Réduire' : 'Détails'}
                                            </button>
                                        </td>
                                    </motion.tr>

                                    {isExpanded && (
                                        <motion.tr
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-green-50"
                                        >
                                            <td colSpan="7" className="px-6 py-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                            <FiPackage className="mr-2" />
                                                            Détails de Livraison
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-gray-500">Référence</p>
                                                                <p>{bdl?.id || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Créé par</p>
                                                                <p>{bdl?.createdBy || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Produits</p>
                                                                <div className="space-y-1">
                                                                    {bdl?.nomsProduits?.map((produit, i) => (
                                                                        <p key={i}>{produit}</p>
                                                                    )) || '-'}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Total Livraison</p>
                                                                <p>{formatCurrency(bdl?.prixTotal)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                            <FiDollarSign className="mr-2" />
                                                            Détails de Paiement
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-gray-500">Montant Total</p>
                                                                <p className="font-medium">{formatCurrency(r.prixTotal)}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Avance</p>
                                                                <p className="font-medium">{formatCurrency(r.avance)}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Reste à Payer</p>
                                                                <p className="font-medium">
                                                                    {formatCurrency((r.prixTotal || 0) - (r.avance || 0))}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-gray-500">Statut Paiement</p>
                                                                <div className="flex items-center">
                                                                    {r.avance >= r.prixTotal ? (
                                                                        <FiCheckCircle className="text-green-500 mr-1" />
                                                                    ) : (
                                                                        <FiAlertCircle className="text-yellow-500 mr-1" />
                                                                    )}
                                                                    {r.avance >= r.prixTotal ? 'Payé' : 'En cours'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-white"
                        >
                            <td colSpan="7" className="px-6 py-8 text-center">
                                <div className="text-gray-500">
                                    {searchTerm || filterStatus !== 'all'
                                        ? "Aucun recouvrement ne correspond à vos critères de recherche."
                                        : "Aucun recouvrement disponible."}
                                </div>
                            </td>
                        </motion.tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecouvrementsTab;