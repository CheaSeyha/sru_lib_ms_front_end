import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios"; // Ensure this path is correct

const useCollage = () => {
    const [collageName, setCollageName] = useState([]);
    const [loading, setLoading] = useState(true); // Start with true to indicate loading
    const [error, setError] = useState(null);

    const fetchCollage = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/college");
            setCollageName(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies; function will not change unless explicitly modified

    useEffect(() => {
        fetchCollage(); // Automatically fetch data when hook is used
    }, [fetchCollage]); // Depend on fetchCollage to ensure effect runs correctly

    return { collageName, loading, error };
};

export default useCollage;
