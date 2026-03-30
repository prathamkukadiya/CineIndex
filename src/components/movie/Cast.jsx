import React, { useRef } from 'react';
import PersonCard from './PersonCard';
import CreditsScroller from '../ui/CreditsScroller';

/**
 * Cast Component
 * Renders a horizontally scrollable list of top cast members with manual controls.
 * 
 * @param {Array} cast - List of cast members from TMDB
 */
const Cast = ({ cast }) => {
  const scrollRef = useRef(null);

  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-4 w-full md:w-[60vw]">
      <div className='flex items-center justify-between'>
        <h3 className="font-bold text-white uppercase text-xs md:text-sm tracking-[0.2em] opacity-80">
          Cast
        </h3>
        
        {cast.length > 7 ? <CreditsScroller scrollRef={scrollRef} /> : null}
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 w-full overflow-x-auto pb-4 hide-scrollbar -mx-2 px-2 scroll-smooth"
      >
        {cast.slice(0, 15).map((person) => (
          <PersonCard 
            key={`${person.id}-${person.character}`} 
            person={person} 
            subText={person.character} 
          />
        ))}
      </div>
    </div>
  );
};

export default Cast;
