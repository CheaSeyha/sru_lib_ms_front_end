import { useState, useCallback } from "react";
import axios from "../api/axios"; // Ensure this path is correct

const useCollage = () => {
    const [collageName, setCollageName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCollage = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/college");
            // Log response data to verify it's what you expect
            setCollageName(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies; function will not change unless explicitly modified

    return { collageName, loading, error, fetchCollage };
};

export default useCollage;
