import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, API_OPTIONS } from "../constants";

/**
 * Custom hook to fetch cast and crew information for a specific movie.
 * 
 * @param {string|number} movieId - The TMDB ID of the movie
 * @returns {Object} Credits (cast & crew), loading state, and error message
 */
export const useCredits = (movieId) => {
    const [credits, setCredits] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!movieId) return;

        const fetchCredits = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, API_OPTIONS);
                setCredits(response.data);
            }
            catch(err){
                console.error("Error fetching credits:", err);
                setError("Failed to load credits.");
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchCredits();

    }, [movieId]);

    return {credits, isLoading, error};
}