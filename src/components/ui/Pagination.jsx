import React from 'react';

/**
 * Pagination Component
 * A reusable pagination control footer.
 * 
 * @param {number} currentPage - The currently active page index
 * @param {number} totalPages - Total number of available pages (max 500 per TMDB)
 * @param {Function} onPageChange - Callback function to handle page switching
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-10">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2.5 bg-light-100/10 border border-white/10 rounded-xl text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-light-100/10 flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Previous
      </button>

      {/* Page Indicator */}
      <div className="flex items-center gap-2 px-4 py-2 bg-light-100/5 rounded-full border border-white/5">
        <span className="text-white font-bold">{currentPage}</span>
        <span className="text-gray-500">/</span>
        <span className="text-gray-400">{totalPages}</span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-2.5 bg-light-100/10 border border-white/10 rounded-xl text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-light-100/10 flex items-center gap-2 group"
      >
        Next <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
