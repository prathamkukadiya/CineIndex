import React from 'react';

/**
 * Container Component
 * Standardizes the maximum width, horizontal padding, and centering of main page content.
 * 
 * @param {React.ReactNode} children - The content to be wrapped
 * @param {string} className - Additional CSS classes (optional)
 * @param {string} id - HTML ID (optional)
 */
const Container = ({ children, className = "", id = "" }) => {
  return (
    <div 
      id={id}
      className={`px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
