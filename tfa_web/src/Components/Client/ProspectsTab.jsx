import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiMail, FiPhone, FiUser, FiMapPin, FiStar, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProspectsTab = ({ prospects }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const sortedProspects = React.useMemo(() => {
        let sortableProspects = [...prospects];
        if (sortConfig.key) {
            sortableProspects.sort((a, b) => {
                // Handle null values
                if (a[sortConfig.key] == null) return 1;
                if (b[sortConfig.key] == null) return -1;

                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProspects;
    }, [prospects, sortConfig]);

    const filteredProspects = sortedProspects.filter(prospect =>
        prospect.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prospect.phoneNumber && prospect.phoneNumber.toString().includes(searchTerm)) ||
        (prospect.location && prospect.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
    };

    const getScoreColor = (score) => {
        if (score == null) return 'bg-gray-100 text-gray-800';
        if (score >= 80) return 'bg-green-100 text-green-800';
        if (score >= 60) return 'bg-blue-100 text-blue-800';
        if (score >= 40) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                            <FiTrendingUp className="mr-2 text-purple-500" />
                            Prospects Management
                            <span className="ml-2 text-sm font-normal bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                                {filteredProspects.length} {filteredProspects.length === 1 ? 'prospect' : 'prospects'}
                            </span>
                        </h2>
                        <p className="text-gray-600 mt-1">Potential clients and business opportunities</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search prospects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th
                            onClick={() => requestSort('companyName')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                Company
                                {getSortIcon('companyName')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('email')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiMail className="mr-1" />
                                Email
                                {getSortIcon('email')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('phoneNumber')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiPhone className="mr-1" />
                                Phone
                                {getSortIcon('phoneNumber')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('contactPerson')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiUser className="mr-1" />
                                Contact
                                {getSortIcon('contactPerson')}
                            </div>
                        </th>
                        <th
                            onClick={() => requestSort('appreciationScore')}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <FiStar className="mr-1" />
                                Score
                                {getSortIcon('appreciationScore')}
                            </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                                <FiMapPin className="mr-1" />
                                Location
                            </div>
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProspects.length > 0 ? (
                        filteredProspects.map((prospect, index) => (
                            <React.Fragment key={index}>
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`hover:bg-gray-50 ${expandedRow === index ? 'bg-purple-50' : ''}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                                                {prospect.companyName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{prospect.companyName}</div>
                                                <div className="text-sm text-gray-500">ID: {prospect.idProspect || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{prospect.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{prospect.phoneNumber || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{prospect.contactPerson}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(prospect.appreciationScore)}`}>
                                                {prospect.appreciationScore ?? 'N/A'}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{prospect.location || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => toggleRow(index)}
                                            className="text-purple-600 hover:text-purple-900 mr-3"
                                        >
                                            {expandedRow === index ? 'Less' : 'More'}
                                        </button>
                                    </td>
                                </motion.tr>

                                {expandedRow === index && (
                                    <motion.tr
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-purple-50"
                                    >
                                        <td colSpan="7" className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                        <FiUser className="mr-2" />
                                                        Contact Details
                                                    </h4>
                                                    <div className="space-y-2 text-sm">
                                                        <p><span className="text-gray-500">Email:</span> {prospect.email}</p>
                                                        <p><span className="text-gray-500">Phone:</span> {prospect.phoneNumber || '-'}</p>
                                                        <p><span className="text-gray-500">Contact Person:</span> {prospect.contactPerson}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                        <FiTrendingUp className="mr-2" />
                                                        Opportunity Details
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Score</p>
                                                            <div className="flex items-center">
                                                                    <span className={`px-2 py-1 rounded ${getScoreColor(prospect.appreciationScore)}`}>
                                                                        {prospect.appreciationScore ?? 'N/A'}
                                                                    </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Location</p>
                                                            <p>{prospect.location || '-'}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Status</p>
                                                            <p>Potential</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Actions</p>
                                                            <div className="flex space-x-2">
                                                                <button className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs hover:bg-blue-200 transition-colors">
                                                                    Contact
                                                                </button>
                                                                <button className="px-2 py-1 bg-green-100 text-green-600 rounded-md text-xs hover:bg-green-200 transition-colors">
                                                                    Convert
                                                                </button>
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
                            <td colSpan="7" className="px-6 py-8 text-center">
                                <div className="text-gray-500">
                                    {searchTerm
                                        ? "No prospects match your search criteria."
                                        : "No prospects available. Add your first prospect to get started."}
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

export default ProspectsTab;