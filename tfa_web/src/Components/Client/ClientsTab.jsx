import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ClientsTab = ({ clients }) => {
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
    const [expandedRow, setExpandedRow] = React.useState(null);

    const sortedClients = React.useMemo(() => {
        let sortableClients = [...clients];
        if (sortConfig.key) {
            sortableClients.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableClients;
    }, [clients, sortConfig]);

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

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FiUser className="mr-2 text-blue-500" />
                    Client Directory
                    <span className="ml-2 text-sm font-normal bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {clients.length} {clients.length === 1 ? 'client' : 'clients'}
          </span>
                </h2>
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
                                Contact
                                {getSortIcon('contactPerson')}
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
                    {sortedClients.map((client, index) => (
                        <React.Fragment key={index}>
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`hover:bg-gray-50 ${expandedRow === index ? 'bg-blue-50' : ''}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                            {client.companyName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{client.companyName}</div>
                                            <div className="text-sm text-gray-500">ID: {client.idClient || 'N/A'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{client.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{client.phoneNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{client.contactPerson}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{client.location || '-'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => toggleRow(index)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
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
                                    className="bg-blue-50"
                                >
                                    <td colSpan="6" className="px-6 py-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Additional Information</h4>
                                                <div className="space-y-1">
                                                    <p><span className="text-gray-500">Last Contact:</span> Not available</p>
                                                    <p><span className="text-gray-500">Status:</span> Active</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
                                                <div className="flex space-x-2">
                                                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-xs hover:bg-blue-200 transition-colors">
                                                        Send Email
                                                    </button>
                                                    <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-xs hover:bg-green-200 transition-colors">
                                                        Create Order
                                                    </button>
                                                    <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-md text-xs hover:bg-purple-200 transition-colors">
                                                        View History
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            {clients.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    No clients found. Add your first client to get started.
                </div>
            )}
        </div>
    );
};

export default ClientsTab;