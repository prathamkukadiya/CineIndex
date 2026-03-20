import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_OPTIONS } from '../constants';

/**
 * Custom hook to fetch watch providers (streaming, rent, buy) for a specific movie.
 * 
 * @param {string|number} movieId - The TMDB ID of the movie
 * @returns {Object} Watch providers, loading state, and error message
 */
export const useWatchProviders = (movieId) => {
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchProviders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/movie/${movieId}/watch/providers`, 
          API_OPTIONS
        );
        
        // TMDB returns providers grouped by country
        // We are specifically interested in India (IN)
        const indiaProviders = response.data.results?.IN;
        setProviders(indiaProviders || null);
      } catch (err) {
        console.error("Error fetching watch providers:", err);
        setError("Failed to load streaming partners.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [movieId]);

  return { providers, isLoading, error };
};
