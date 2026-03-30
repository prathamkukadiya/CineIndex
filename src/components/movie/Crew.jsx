import React, { useRef } from 'react';
import PersonCard from './PersonCard';
import CreditsScroller from '../ui/CreditsScroller';

/**
 * Crew Component
 * Encapsulates filtering logic to prioritize key crew members (Directors, Writers, etc.)
 * and renders them in a horizontal list.
 * 
 * @param {Array} crew - Full crew list from TMDB
 */
const Crew = ({ crew }) => {
  if (!crew || crew.length === 0) return null;

  // Logic to extract and prioritize key crew members, grouping by ID to show multiple jobs
  const priorityJobs = ['Director', 'Writer', 'Screenplay', 'Producer', 'Director of Photography', 'Editor', 'Original Music Composer'];
  
  // 1. Group by ID and aggregate jobs
  const groupedCrew = crew.reduce((acc, member) => {
    if (!acc[member.id]) {
      acc[member.id] = { 
        ...member, 
        jobs: [member.job],
        // Track highest priority for sorting
        maxPriority: priorityJobs.includes(member.job) ? 0 : 1
      };
    } else {
      acc[member.id].jobs.push(member.job);
      if (priorityJobs.includes(member.job)) {
        acc[member.id].maxPriority = 0;
      }
    }
    return acc;
  }, {});

  // 2. Convert back to array and sort by priority
  const sortedCrewArray = Object.values(groupedCrew).sort((a, b) => {
    if (a.maxPriority !== b.maxPriority) {
      return a.maxPriority - b.maxPriority;
    }
    // Secondary sort: members with profile images first
    if (a.profile_path && !b.profile_path) return -1;
    if (!a.profile_path && b.profile_path) return 1;
    return 0;
  });

  // 3. Take top 8 and format job strings
  const uniqueCrew = sortedCrewArray.slice(0, 8).map(member => ({
    ...member,
    combinedJobs: Array.from(new Set(member.jobs)).slice(0, 2).join(', ') + (member.jobs.length > 2 ? '...' : '')
  }));

  if (uniqueCrew.length === 0) return null;

  const scrollRef = useRef(null);

  return (
    <div className="space-y-4 w-full md:w-[60vw]">
       <div className='flex items-center justify-between'>
          <h3 className="font-bold text-white uppercase text-xs md:text-sm tracking-[0.2em] opacity-80">
            Crew
          </h3>
        
          {uniqueCrew.length > 7 ? <CreditsScroller scrollRef={scrollRef} /> : null}
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-4 w-full overflow-x-auto pb-4 hide-scrollbar -mx-2 px-2"
        >
          {uniqueCrew.map((person) => (
            <PersonCard 
              key={person.id} 
              person={person} 
              subText={person.combinedJobs} 
            />
          ))}
        </div>
    </div>
  );
};

export default Crew;
