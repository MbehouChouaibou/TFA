import React, { useState, useEffect } from 'react';
import { ClientProspet } from '../../Api/ClientProspet'; // Import custom Axios instance
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers,
    FiTrendingUp,
    FiTruck,
    FiDollarSign,
    FiSearch,
    FiRefreshCw,
    FiCreditCard,
    FiPieChart,
    FiActivity,
    FiBarChart2
} from 'react-icons/fi';
import ClientsTab from './ClientsTab';
import ProspectsTab from './ProspectsTab';
import LivraisonsTab from './LivraisonsTab';
import RecouvrementsTab from './RecouvrementsTab';

const Client = () => {
    const [activeTab, setActiveTab] = useState('clients');
    const [clients, setClients] = useState([]);
    const [prospects, setProspects] = useState([]);
    const [livraisons, setLivraisons] = useState([]);
    const [recouvrements, setRecouvrements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState({
        clients: 0,
        prospects: 0,
        livraisons: 0,
        recouvrements: 0,
        totalRevenue: 0,
        pendingPayments: 0,
        conversionRate: 0,
        avgDeliveryTime: 0
    });

    const tabs = [
        { id: 'clients', label: 'Clients', icon: <FiUsers /> },
        { id: 'prospects', label: 'Prospects', icon: <FiTrendingUp /> },
        { id: 'livraisons', label: 'Livraisons', icon: <FiTruck /> },
        { id: 'recouvrements', label: 'Recouvrements', icon: <FiDollarSign /> }
    ];

    const fetchData = async (tab) => {
        setLoading(true);
        try {
            if (tab === 'clients' || tab === 'prospects') {
                let prospectionsData = sessionStorage.getItem('prospections');

                if (!prospectionsData) {
                    const res = await ClientProspet.get('/prospections/all'); // Use ClientProspet
                    prospectionsData = res.data;
                    sessionStorage.setItem('prospections', JSON.stringify(prospectionsData));
                } else {
                    prospectionsData = JSON.parse(prospectionsData);
                }

                const filteredProspects = prospectionsData
                    .filter(p => p.prospect && p.prospect.appreciationScore != null)
                    .map(p => ({
                        idProspect: p.prospect.idProspect,
                        appreciationScore: p.prospect.appreciationScore,
                        companyName: p.companyName || '-',
                        email: p.email || '-',
                        phoneNumber: p.phoneNumber || '-',
                        contactPerson: p.contactPerson || '-',
                        location: p.location || '-',
                    }));

                const filteredClients = prospectionsData
                    .filter(p => !p.prospect || p.prospect.appreciationScore == null)
                    .map(p => ({
                        idClient: p.client?.idClient || null,
                        companyName: p.companyName || '-',
                        email: p.email || '-',
                        phoneNumber: p.phoneNumber || '-',
                        contactPerson: p.contactPerson || '-',
                        location: p.location || '-',
                    }));

                setClients(filteredClients);
                setProspects(filteredProspects);

                // Calculate conversion rate
                const conversionRate = filteredClients.length > 0
                    ? Math.round((filteredClients.length / (filteredClients.length + filteredProspects.length)) * 100)
                    : 0;

                setStats(prev => ({
                    ...prev,
                    clients: filteredClients.length,
                    prospects: filteredProspects.length,
                    conversionRate
                }));
            }

            if (tab === 'livraisons') {
                let livraisonsData = sessionStorage.getItem('livraisons');

                if (!livraisonsData) {
                    const res = await ClientProspet.get('/livraisons/read'); // Updated to use ClientProspet
                    livraisonsData = res.data;
                    sessionStorage.setItem('livraisons', JSON.stringify(livraisonsData));
                } else {
                    livraisonsData = JSON.parse(livraisonsData);
                }

                // Calculate average delivery time (example calculation)
                const avgDeliveryTime = livraisonsData.length > 0
                    ? Math.round(livraisonsData.reduce((sum, l) => sum + (l.deliveryTime || 0), 0) / livraisonsData.length)
                    : 0;

                setLivraisons(livraisonsData);
                setStats(prev => ({
                    ...prev,
                    livraisons: livraisonsData.length,
                    avgDeliveryTime
                }));
            }

            if (tab === 'recouvrements') {
                let recouvrementData = sessionStorage.getItem('recouvrements');

                if (!recouvrementData) {
                    const res = await ClientProspet.get('/livraisons/recouvrements'); // Updated to use ClientProspet
                    recouvrementData = res.data;
                    sessionStorage.setItem('recouvrements', JSON.stringify(recouvrementData));
                } else {
                    recouvrementData = JSON.parse(recouvrementData);
                }

                // Calculate financial stats
                const totalRevenue = recouvrementData.reduce((sum, r) => sum + (r.prixTotal || 0), 0);
                const pendingPayments = recouvrementData.reduce((sum, r) => sum + ((r.prixTotal || 0) - (r.avance || 0)), 0);

                setRecouvrements(recouvrementData);
                setStats(prev => ({
                    ...prev,
                    recouvrements: recouvrementData.length,
                    totalRevenue,
                    pendingPayments
                }));
            }
        } catch (err) {
            console.error(`Error loading ${tab}:`, err);
            alert(`Failed to load ${tab} data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const handleRefresh = () => {
        sessionStorage.removeItem('prospections');
        sessionStorage.removeItem('livraisons');
        sessionStorage.removeItem('recouvrements');
        fetchData(activeTab);
    };

    const filteredData = {
        clients: clients.filter(client =>
            client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        prospects: prospects.filter(prospect =>
            prospect.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prospect.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        livraisons: livraisons.filter(livraison =>
            livraison.client?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            livraison.reference?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        recouvrements: recouvrements.filter(recouvrement =>
            recouvrement.client?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recouvrement.reference?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Customer Relationship Management</h1>
                        <p className="text-gray-600">Track and manage all customer interactions and transactions</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Business Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md p-6"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                                <FiCreditCard className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(stats.totalRevenue)}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md p-6"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                                <FiActivity className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700">Pending Payments</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(stats.pendingPayments)}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md p-6"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-100 text-green-600">
                                <FiPieChart className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.conversionRate}%
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md p-6"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                                <FiBarChart2 className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-700">Avg Delivery Time</h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.avgDeliveryTime} days
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Module Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {tabs.map((tab) => (
                        <motion.div
                            key={tab.id}
                            whileHover={{ y: -5 }}
                            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300 ${activeTab === tab.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-lg ${getTabColor(tab.id)}`}>
                                    {React.cloneElement(tab.icon, { className: 'text-white text-xl' })}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRefresh();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mt-4">{tab.label}</h3>
                            <p className="text-2xl font-bold text-gray-900">{stats[tab.id]}</p>
                            <p className="text-sm text-gray-500 mt-1">Total {tab.label.toLowerCase()}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Tab Buttons */}
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px--Elf-6 py-4 font-medium text-sm flex items-center gap-2 transition-all duration-300 ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.span
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                                        initial={false}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center items-center p-8"
                            >
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tab Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {!loading && activeTab === 'clients' && <ClientsTab clients={filteredData.clients} />}
                                {!loading && activeTab === 'prospects' && <ProspectsTab prospects={filteredData.prospects} />}
                                {!loading && activeTab === 'livraisons' && <LivraisonsTab livraisons={filteredData.livraisons} />}
                                {!loading && activeTab === 'recouvrements' && <RecouvrementsTab recouvrements={filteredData.recouvrements} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Helper function for tab colors
const getTabColor = (tabId) => {
    switch(tabId) {
        case 'clients': return 'bg-blue-500';
        case 'prospects': return 'bg-purple-500';
        case 'livraisons': return 'bg-green-500';
        case 'recouvrements': return 'bg-orange-500';
        default: return 'bg-gray-500';
    }
};

export default Client;