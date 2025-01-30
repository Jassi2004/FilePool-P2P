// src/services/lenderService.ts

import axios from "axios";

// Define the API base URL
const API_URL = "http://localhost:5000/api/lenders"; // Update to your backend URL if necessary

// Login Lender
export const loginLender = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
        return response.data; // Return response data
    } catch (error) {
        // Handle the error
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed.");
        }
        throw new Error("An unknown error occurred.");
    }
};

// Register Lender function (for reference, update as needed)
export const registerLender = async (lenderData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    storageCapacity: number;
    maxRentalDuration: number;
}) => {
    try {
        const response = await axios.post(`${API_URL}/register`, lenderData, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Registration failed.");
        }
        throw new Error("An unknown error occurred.");
    }
};


export const getAllLenders = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Registration failed.");
        }
        throw new Error("An unknown error occurred.");
    }
}