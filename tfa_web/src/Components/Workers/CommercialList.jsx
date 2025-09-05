import React, { useState, useEffect } from "react";
import { getCommercials } from "../../Api/GetCommercials.jsx";
import {deleteCommercial} from  "../../Api/DeleteAccount.jsx"// Adjust path as needed
import CreateCommercial from "./CreateCommercial";

const CommercialList = () => {
    const [commercials, setCommercials] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // Fetch commercial accounts from backend
    useEffect(() => {
        fetchCommercials();
    }, []);

    const fetchCommercials = async () => {
        const result = await getCommercials.getCommercials(); // Implement this in your API
        setCommercials(result || []);
    };

    const handleCreate = (newCommercial) => {
        setCommercials((prev) => [...prev, newCommercial]);
        setShowCreate(false);
    };

    const handleDelete = async (username) => {
        const result = await deleteCommercial.deleteCommercial(username); // Implement this in your API
        if (result.success) {
            setCommercials((prev) => prev.filter((c) => c.username !== username));
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Commercial Accounts</h1>
            <button
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowCreate(true)}
            >
                Create Commercial
            </button>
            <table className="w-full border">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {commercials.map((c) => (
                    <tr key={c.username}>
                        <td className="border px-4 py-2">{c.username}</td>
                        <td className="border px-4 py-2">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => handleDelete(c.username)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showCreate && (
                <CreateCommercial
                    onCreate={handleCreate}
                    onClose={() => setShowCreate(false)}
                />
            )}
        </div>
    );
};

export default CommercialList;
