import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getTrendingMovies } from '../firebase';
import { API_BASE_URL, API_OPTIONS } from '../constants';

/**
 * Custom hook to manage movie fetching, searching, and pagination.
 * This is the central logic for the movie listing pages (Home, Search, Genre).
 * 
 * @returns {Object} Movie state and handler functions
 */
export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const location = useLocation();

  /**
   * Fetches movies from TMDB API based on query, page, and genre.
   */
  const fetchMovies = useCallback(async (query = '', pageNum = 1, genreId = null) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let endpoint = '';
      
      if (query) {
        endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`;
      } else {
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;
        if (genreId) {
          endpoint += `&with_genres=${genreId}`;
        }
      }

      const response = await axios.get(endpoint, API_OPTIONS);
      const data = response.data;

      if (!data.results) {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        setTotalPages(1);
      } else {
        setMovieList(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages || 1);
      }
    } catch (error) {
      setErrorMessage('Error Fetching Movies. Please try again later. Thank You.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); // No external dependencies needed inside fetchMovies logic except constants

  /**
   * Handles page navigation and triggers a re-fetch.
   */
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    if (location.pathname === '/search') {
      fetchMovies(searchTerm, newPage);
    } else if (location.pathname.startsWith('/genre/')) {
      fetchMovies('', newPage, selectedGenre);
    } else {
      fetchMovies('', newPage);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, searchTerm, selectedGenre, fetchMovies]);

  /**
   * Initiates a movie search.
   */
  const handleSearch = useCallback((query) => {
    setSearchTerm(query);
    setSelectedGenre(null);
    setPage(1);
    fetchMovies(query, 1);
  }, [fetchMovies]);

  /**
   * Filters movies by genre.
   */
  const handleGenreSelect = useCallback((genreId) => {
    setSelectedGenre(genreId);
    setSearchTerm('');
    setPage(1);
    fetchMovies('', 1, genreId);
  }, [fetchMovies]);

  // Effect to load trending movies from Firebase on mount
  useEffect(() => {
    setIsTrendingLoading(true);
    const unsubscribe = getTrendingMovies((movies) => {
      setTrendingMovies(movies);
      setIsTrendingLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    isLoading,
    isTrendingLoading,
    trendingMovies,
    page,
    totalPages,
    selectedGenre,
    handlePageChange,
    handleGenreSelect,
    executeSearch: handleSearch
  };
};
