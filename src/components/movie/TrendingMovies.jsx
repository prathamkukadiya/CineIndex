import { Link } from 'react-router-dom'
import Spinner from '../ui/Spinner'

/**
 * TrendingMovies Component
 * Displays a horizontally scrollable list of popular movies tracked via our Firebase analytics.
 * 
 * @param {Array} trendingMovies - List of movie objects from Firebase
 * @param {boolean} isLoading - Loading state for the trending data
 */
const TrendingMovies = ({ trendingMovies, isLoading }) => {

  return (
    <div>
        {/* Show spinner while fetching trending data from Firebase */}
        {isLoading ? (
            <div className="flex justify-center mt-10">
                <Spinner />
            </div>
        ) : trendingMovies.length > 0 && (
          <section id="trending-section" className='mt-20'>
            <h2 className='text-2xl font-bold text-white sm:text-3xl'>
              Trending Movies
            </h2>
            
            {/* Horizontal list with custom scrollbar hiding */}
            <ul className='flex flex-row overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar'>
              {trendingMovies.map((movie, index) => (
                <li 
                  className='min-w-[230px] flex flex-row items-center'
                  key={movie.id}
                >
                  <Link to={`/movie/${movie.movie_id}`} className="flex flex-row items-center group">
                    {/* Visual ranking number (e.g., 1, 2, 3...) which scales on parent hover */}
                    <p className='fancy-text mt-[22px] text-nowrap group-hover:scale-110 transition-transform'>
                      {index + 1}
                    </p>
                    {/* Movie poster image with subtle scale and overlay effect on hover */}
                    <img
                      className='w-[127px] h-[163px] rounded-lg object-cover -ml-3.5 group-hover:scale-105 transition-transform duration-300'
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
    </div>
  )
}

export default TrendingMovies