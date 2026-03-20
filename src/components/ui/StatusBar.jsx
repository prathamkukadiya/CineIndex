/**
 * StatusBar Component
 * Displays key metrics for a movie: rating, runtime, and popularity.
 * 
 * @param {number} vote_average - The average user rating
 * @param {string} runtime - Formatted runtime string (e.g., "2h 15m")
 * @param {Object} movie - The movie object containing popularity data
 */
const StatusBar = ({ vote_average, runtime, movie }) => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-5 items-center p-5 md:p-6 bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl backdrop-blur-sm shadow-xl w-fit">
        {/* User Rating Section */}
        <div className="flex items-center gap-2 pr-4 md:pr-5 border-r border-white/10">
            <img src="/star.svg" alt="star" className="w-5 md:w-6 h-5 md:h-6" />
            <span className="text-xl md:text-2xl font-bold">{vote_average?.toFixed(1)}</span>
        </div>
            
        {/* Runtime Section */}
        <div className="flex flex-col pr-4 md:pr-5 border-r border-white/10">
            <span className="text-gray-400 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Runtime</span>
            <span className="text-base md:text-lg font-bold">{runtime}</span>
        </div>

        {/* Popularity/View Count Mockup Section */}
        <div className="flex flex-col">
            <span className="text-gray-400 text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Popularity</span>
            <span className="text-base md:text-lg font-bold text-orange-500">{Math.round(movie.popularity)}</span>
        </div>
    </div>
  )
}

export default StatusBar;