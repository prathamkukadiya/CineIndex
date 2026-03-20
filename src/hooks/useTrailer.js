import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_OPTIONS } from '../constants';

/**
 * Custom hook to fetch trailer videos for a specific movie.
 * 
 * @param {string|number} movieId - The TMDB ID of the movie
 * @returns {Object} Trailer data, primary video key, loading state, and error message
 */
export const useTrailer = (movieId) => {
    const [trailer, setTrailer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!movieId) return;

        const fetchTrailer = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/videos`, API_OPTIONS);
                setTrailer(response.data);
            } catch (err) {
                console.error("Error fetching trailer:", err);
                setError("Failed to load trailer.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrailer();
    }, [movieId]);

    // Find the official YouTube trailer if possible, otherwise take the first video
    const videoKey = trailer?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || trailer?.results?.[0]?.key;

    return { trailer, videoKey, isLoading, error };
};
