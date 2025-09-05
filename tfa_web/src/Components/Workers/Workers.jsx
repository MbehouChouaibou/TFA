import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import CreateAccount from './CreateAccount';
import { getCommercials } from '../../Api/GetCommercials.jsx'; // Adjust path as needed
import { deleteCommercial } from '../../Api/DeleteAccount.jsx';

const Workers = () => {
    const [showForm, setShowForm] = useState(false);
    const [accounts, setAccounts] = useState([]);

    // Fetch commercial accounts on mount
    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const result = await getCommercials(); // Call function directly
            setAccounts(result || []);
        } catch (error) {
            console.error('Failed to fetch commercial accounts:', error);
            setAccounts([]);
        }
    };

    const handleCreate = (account) => {
        setAccounts((prev) => [...prev, account]);
        setShowForm(false);
    };

    const handleDelete = async (username) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${username}?`);
        if (!confirmed) return;

        try {
            const result = await deleteCommercial(username); // Call function directly
            if (result.success) {
                setAccounts((prev) => prev.filter((acc) => acc.username !== username));
            } else {
                alert('Failed to delete account.');
            }
        } catch (error) {
            console.error('Error deleting commercial account:', error);
            alert('Failed to delete account.');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="w-32" />
                <h1 className="text-2xl font-semibold text-center flex-1">Commercial Accounts</h1>
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowForm(true)}
                >
                    <FiPlus className="text-white" />
                    Create Account
                </button>
            </div>

            {/* Account Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.length === 0 ? (
                        <tr>
                            <td colSpan={2} className="text-center py-4 text-gray-500">
                                No commercial accounts found.
                            </td>
                        </tr>
                    ) : (
                        accounts.map((acc) => (
                            <tr key={acc.username} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{acc.username}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                                        onClick={() => handleDelete(acc.username)}
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showForm && <CreateAccount onCreate={handleCreate} onClose={() => setShowForm(false)} />}
        </div>
    );
};

export default Workers;
