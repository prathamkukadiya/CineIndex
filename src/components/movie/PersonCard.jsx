import React from 'react';
import { getImageUrl } from "../../utils";

/**
 * PersonCard Component
 * Displays a single person (cast or crew) with their profile image and subtext (character or job).
 * 
 * @param {Object} person - Person data object from TMDB
 * @param {string} subText - Role or job description
 */
const PersonCard = ({ person, subText }) => (
  <div className="shrink-0 w-28 md:w-32 group">
    <div className="relative overflow-hidden rounded-xl aspect-2/3 border border-white/5 transition-transform duration-300 group-hover:scale-105">
      <img
        src={getImageUrl(person.profile_path, 'w200')}
        alt={person.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
        <p className="text-[10px] text-light-200">{subText}</p>
      </div>
    </div>
    <div className="mt-2 text-center">
      <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-light-100 transition-colors">
        {person.name}
      </p>
      <p className="text-xs text-gray-500 line-clamp-1">
        {subText}
      </p>
    </div>
  </div>
);

export default PersonCard;
