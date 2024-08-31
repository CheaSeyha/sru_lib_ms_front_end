import { useState, useCallback, useEffect } from 'react';
import axios from '../../../api/axios'; // Adjust the import path as needed

const useCRUDStaff = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [staffList, setStaffList] = useState([]); // State for storing staff data

    // Function to save staff data
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

    // Function to fetch all staff data
    const getAllStaff = useCallback(async () => {
        // Only fetch if staffList is empty
        if (staffList.length === 0) {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/staff'); // Fetch all staff data
                setStaffList(response.data); // Update the staffList state with the fetched data
                return response.data; // Optionally return the response data if needed
            } catch (err) {
                setError(err);
                console.error('Failed to fetch staff data:', err); // Log the error for debugging
                throw err; // Optionally rethrow the error to handle it in the calling component
            } finally {
                setLoading(false);
            }
        }
    }, [staffList]); // staffList as a dependency to ensure it only refetches if it's empty

    // Automatically fetch staff data when the hook is first used
    useEffect(() => {
        getAllStaff();
    }, [getAllStaff]);

    return { saveStaff, getAllStaff, loading, error, success, staffList };
};

export default useCRUDStaff;
