import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_OPTIONS } from '../constants';

/**
 * Custom hook to fetch detailed information for a specific movie.
 * 
 * @param {string|number} movieId - The TMDB ID of the movie
 * @returns {Object} Movie details, loading state, and error message
 */
export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, API_OPTIONS);
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return { movie, isLoading, error };
};
