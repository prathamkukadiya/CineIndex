import React from 'react';
import Cast from './Cast';
import Crew from './Crew';

/**
 * Credits Component
 * Orchestrates the display of both Cast and Crew sections.
 * 
 * @param {Array} cast - List of cast members
 * @param {Array} crew - List of crew members
 */
const Credits = ({ cast, crew }) => {
  if (!cast && !crew) return null;

  return (
    <div className="space-y-12 py-6">
      <Cast cast={cast} />
      <Crew crew={crew} />
    </div>
  );
};

export default Credits;
