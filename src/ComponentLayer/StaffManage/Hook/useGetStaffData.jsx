import { useState, useCallback } from 'react';
import axios from '../api/axios'; // Adjust the import path as needed

const useGetStaffData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const saveStaff = useCallback(async (staffData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/staff', staffData); // Adjust the endpoint as needed
            setSuccess(true); // Set success to true on successful save
            return response.data; // Optionally return the response data if needed
        } catch (err) {
            setError(err);
            console.error('Failed to save staff data:', err); // Log the error for debugging
            throw err; // Optionally rethrow the error to handle it in the calling component
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies; function will not change unless explicitly modified

    return { saveStaff, loading, error, success };
};

export default useGetStaffData;
