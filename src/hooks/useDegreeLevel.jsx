import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios"; // Ensure this path is correct

const useDegreeLevel = () => {
    const [degreeLevel, setdegreeLevel] = useState([]);
    const [loading, setLoading] = useState(true); // Start with true to indicate loading
    const [error, setError] = useState(null);

    const fetchDegreeLevel = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/degree-level");
            setdegreeLevel(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies; function will not change unless explicitly modified

    useEffect(() => {
        fetchDegreeLevel(); // Automatically fetch data when hook is used
    }, [fetchDegreeLevel]); // Depend on fetchDegreeLevel to ensure effect runs correctly

    return { degreeLevel, fetchDegreeLevel };
};

export default useDegreeLevel;
