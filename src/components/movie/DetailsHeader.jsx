import React from 'react'

/**
 * DetailsHeader Component
 * Displays the main title, release year, and tagline on the Movie Details page.
 * 
 * @param {string} releaseYear - The year the movie was released
 * @param {string} title - The movie title
 * @param {string} tagline - The movie's official tagline (optional)
 */
const DetailsHeader = ({releaseYear, title, tagline}) => {
  return (
    <div className="space-y-3 md:space-y-4">
        {/* Category and Year badge */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 font-bold">
          <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/10 border border-white/10 rounded-lg text-[10px] md:text-xs uppercase tracking-widest text-gray-300">
            Movie
          </span>
            <span className="text-gray-400 text-sm md:text-base tracking-wider">
            &bull; {releaseYear}
          </span>
        </div>

        {/* Primary Movie Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
          {title}
        </h1>
            
        {/* Styled Tagline section */}
        {tagline && (
          <p className="text-lg md:text-xl text-orange-400 font-serif italic max-w-2xl opacity-90 leading-relaxed">
            &ldquo;{tagline}&rdquo;
          </p>
        )}
    </div>
  )
}

export default DetailsHeader;