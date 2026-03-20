import React from 'react';

/**
 * DetailSection Component
 * A layout wrapper for sections on the Movie Details page to ensure consistent spacing and typography.
 * 
 * @param {string} title - The section heading
 * @param {React.ReactNode} children - The section content
 * @param {string} className - Additional classes for the container
 * @param {string} id - Unique section ID
 * @param {string} badge - Optional small badge text next to title
 */
const DetailSection = ({ title, children, className = "", id = "", badge = "" }) => {
  return (
    <section id={id} className={`space-y-4 md:space-y-6 ${className}`}>
      <div className="flex items-center gap-5">
        <h3 className="font-bold text-white uppercase text-xs md:text-sm opacity-50 tracking-[0.2em]">
          {title}
        </h3>
        {badge && (
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase font-bold tracking-widest text-gray-400">
            {badge}
          </span>
        )}
      </div>
      <div className="pt-2">
        {children}
      </div>
    </section>
  );
};

export default DetailSection;
