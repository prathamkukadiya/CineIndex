import React from 'react';
import DetailSection from '../layout/DetailSection';

/**
 * TrailerSection Component
 * Embeds an official YouTube trailer for the movie using an iframe.
 * 
 * @param {string} videoKey - The YouTube video ID
 */
const TrailerSection = ({ videoKey }) => {
  // Return null if no trailer is available to avoid empty space
  if (!videoKey) return null;

  return (
    <DetailSection title="Trailers & Extras" badge="Official Trailer" id="trailer-section">
      {/* Responsive Iframe Container */}
      <div className="relative w-full md:w-3/4 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 mx-auto md:mx-0">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&rel=0&modestbranding=1`}
          title="Movie Trailer"
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </DetailSection>
  );
};

export default TrailerSection;
