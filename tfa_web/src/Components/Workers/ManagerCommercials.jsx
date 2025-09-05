import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import CreateAccount from "./CreateAccount";
import {API_MANAGER} from "../../Api/Api.jsx";
import {getCommercials} from "../../Api/GetCommercials.jsx";

const ManagerCommercials = () => {
    const [accounts, setAccounts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(true);

    useEffect(() => {
        fetchCommercials();
    }, []);

    const fetchCommercials = async () => {
        const result = await getCommercials.getCommercials();
        setAccounts(result || []);
    };

    const handleCreate = (newAccount) => {
        setAccounts((prev) => [...prev, newAccount]);
        setShowCreateModal(false);
    };

    const handleDelete = async (username) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete commercial "${username}"?`
        );
        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:8090/api/commercial/${encodeURIComponent(username)}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (response.ok) {
                setAccounts((prev) => prev.filter((acc) => acc.username !== username));
            } else {
                const errorData = await response.json();
                alert(`Failed to delete commercial: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            alert("Network error while deleting commercial.");
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Commercial Accounts</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    <FiPlus />
                    Create Account
                </button>
            </div>

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
                        accounts.map(({ username }) => (
                            <tr key={username} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{username}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(username)}
                                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                                    >
                                        <FiTrash2 />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <CreateAccount
                    onCreate={handleCreate}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
};

export default ManagerCommercials;
