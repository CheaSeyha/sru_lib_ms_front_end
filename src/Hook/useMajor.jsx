import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios"; // Ensure this path is correct

const useMajor = () => {
    const [majorData, setmajorData] = useState([]);
    const [loading, setLoading] = useState(true); // Start with true to indicate loading
    const [error, setError] = useState(null);

    const fetchMajorData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/major");
            setmajorData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies; function will not change unless explicitly modified

    useEffect(() => {
        fetchMajorData(); // Automatically fetch data when hook is used
    }, [fetchMajorData]); // Depend on fetchMajorData to ensure effect runs correctly

    return { majorData, loading, error,fetchMajorData };
};

export default useMajor;
