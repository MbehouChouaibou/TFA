import axios from "axios";

// Update admin password
export const updatePassword = async ({
                                         username,
                                         password,
                                         confirmPassword,
                                         currentPassword,
                                     }) => {
    const response = await axios.post(
        "http://localhost:8090/api/manager/update",
        {
            username,
            password,
            confirmPassword,
            currentPassword,
        },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

// Logout the current user
export const logout = async () => {
    const response = await axios.post(
        "http://localhost:8090/api/auth/logout",
        {},
        {
            withCredentials: true,
        }
    );

    return response.data;
};
