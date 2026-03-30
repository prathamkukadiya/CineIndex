import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // DERIVED STATE: Always get page and search from URL search params
  const page = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);
  const searchTermFromUrl = useMemo(() => searchParams.get('query') || '', [searchParams]);

  // LOCAL STATE: Used for UI-only things like errors and movie lists
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

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

      if (!data.results || data.results.length === 0) {
        setErrorMessage(query ? `No movies found for "${query}"` : 'No movies found.');
        setMovieList([]);
        setTotalPages(1);
      } else {
        setMovieList(data.results || []);
        // TMDB caps at 500 pages for discover/search
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages || 1);
      }
    } catch (error) {
      setErrorMessage('Error Fetching Movies. Please try again later. Thank You.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * EFFECT: Synchronize UI state with URL parameters
   */
  useEffect(() => {
    setSearchTerm(searchTermFromUrl);
  }, [searchTermFromUrl]);

  /**
   * EFFECT: Trigger data fetching whenever URL parameters OR location changes
   */
  useEffect(() => {
    // Determine context (search, genre, or home)
    if (location.pathname === '/search') {
      fetchMovies(searchTermFromUrl, page);
    } else if (location.pathname.startsWith('/genre/')) {
      const genreId = location.pathname.split('/').pop();
      fetchMovies('', page, genreId);
    } else {
      fetchMovies('', page);
    }
  }, [location.pathname, page, searchTermFromUrl, fetchMovies]);

  /**
   * Handles page navigation by updating search parameters.
   */
  const handlePageChange = useCallback((newPage) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    }, { replace: false }); // Ensure back button works
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSearchParams]);

  /**
   * Initiates a movie search by updating search parameters.
   */
  const handleSearch = useCallback((query) => {
    if (location.pathname !== '/search') {
      navigate(`/search?query=${encodeURIComponent(query)}&page=1`);
    } else {
      setSearchParams({ query, page: '1' });
    }
  }, [location.pathname, navigate, setSearchParams]);

  /**
   * Filters movies by genre.
   */
  const handleGenreSelect = useCallback((genreId) => {
    setSelectedGenre(genreId);
    setSearchParams({ page: '1' });
  }, [setSearchParams]);

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
