// src/components/StatusBadge.jsx
import React from 'react';
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch(status.toLowerCase()) {
            case 'livré':
                return {
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-800',
                    icon: <FiCheckCircle className="text-green-500 mr-1" />
                };
            case 'en cours':
                return {
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-800',
                    icon: <FiClock className="text-yellow-500 mr-1" />
                };
            case 'retard':
                return {
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-800',
                    icon: <FiAlertCircle className="text-red-500 mr-1" />
                };
            default:
                return {
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-800',
                    icon: <FiClock className="text-gray-500 mr-1" />
                };
        }
    };

    const { bgColor, textColor, icon } = getStatusStyles();

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {icon}
            {status}
        </div>
    );
};

export default StatusBadge;