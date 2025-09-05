import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiSearch, FiPlus, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Assignations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCard, setExpandedCard] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    // Sample data
    const assignations = [
        {
            id: 1,
            client: 'Acme Corporation',
            project: 'Website Redesign',
            assignedTo: 'Sarah Johnson',
            deadline: '2023-12-15',
            status: 'in-progress',
            priority: 'high',
            details: 'Complete homepage redesign with new branding elements and mobile optimization.'
        },
        {
            id: 2,
            client: 'Global Tech',
            project: 'API Integration',
            assignedTo: 'Michael Chen',
            deadline: '2023-11-30',
            status: 'pending',
            priority: 'medium',
            details: 'Integrate payment gateway API with existing e-commerce platform.'
        },
        {
            id: 3,
            client: 'Sunrise Healthcare',
            project: 'Patient Portal',
            assignedTo: 'Emma Rodriguez',
            deadline: '2024-01-20',
            status: 'completed',
            priority: 'low',
            details: 'Develop patient portal with appointment scheduling and medical records access.'
        },
    ];

    const filteredAssignations = assignations.filter(assignation => {
        const matchesSearch = assignation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignation.project.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;
        return matchesSearch && assignation.status === activeFilter;
    });

    const toggleCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Assignations</h1>
                        <p className="text-gray-600 mt-2">Manage client assignments and project allocations</p>
                    </div>
                    <button className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
                        <FiPlus className="mr-2" />
                        New Assignation
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search clients or projects..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                <FiFilter className="text-gray-500 mr-2" />
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assignations List */}
                <div className="space-y-4">
                    {filteredAssignations.length > 0 ? (
                        filteredAssignations.map((assignation) => (
                            <div
                                key={assignation.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200"
                            >
                                <div
                                    className="p-5 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleCard(assignation.id)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`h-3 w-3 rounded-full ${
                                            assignation.status === 'completed' ? 'bg-green-500' :
                                                assignation.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                                        }`}></div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">{assignation.client}</h3>
                                            <p className="text-sm text-gray-500">{assignation.project}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        <div className="hidden md:block">
                                            <p className="text-sm text-gray-500">Assigned to</p>
                                            <p className="font-medium">{assignation.assignedTo}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-sm text-gray-500">Deadline</p>
                                            <p className="font-medium">{assignation.deadline}</p>
                                        </div>
                                        <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assignation.priority === 'high' ? 'bg-red-100 text-red-800' :
                              assignation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {assignation.priority}
                      </span>
                                            {expandedCard === assignation.id ? (
                                                <FiChevronUp className="ml-4 text-gray-500" />
                                            ) : (
                                                <FiChevronDown className="ml-4 text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {expandedCard === assignation.id && (
                                    <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Project Details</h4>
                                                <p className="text-gray-700">{assignation.details}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                                                <div className="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full ${
                                                        assignation.status === 'completed' ? 'bg-green-500' :
                                                            assignation.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                                                    } mr-2`}></div>
                                                    <span className="capitalize">{assignation.status}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Actions</h4>
                                                <div className="flex space-x-3">
                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                        Edit
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                                        View Details
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                        Reassign
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No assignations found</h3>
                            <p className="mt-1 text-gray-500">
                                {searchTerm ? 'Try adjusting your search or filter' : 'Create a new assignation to get started'}
                            </p>
                            <div className="mt-6">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                                    New Assignation
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assignations;