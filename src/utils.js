/**
 * Format movie runtime from minutes to "Hh Mm" format.
 * @param {number} runtime - Runtime in minutes
 * @returns {string} Formatted runtime string
 */
export const formatRuntime = (runtime) => {
  if (!runtime) return 'N/A';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * Format date string to a more readable format.
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} Formatted date string (Month Day, Year)
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Get the year from a date string.
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} Year string
 */
export const getYear = (dateString) => {
  if (!dateString) return 'N/A';
  return dateString.split("-")[0];
};

/**
 * Get TMDB image URL.
 * @param {string} path - Image path from TMDB API
 * @param {string} size - Image size (e.g., 'w500', 'original')
 * @returns {string} Full image URL or placeholder
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/no-movie.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
