import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useTrailer } from "../hooks/useTrailer";
import { useCredits } from "../hooks/useCredits";
import Spinner from "../components/ui/Spinner";
import Backdrop from "../components/movie/Backdrop";
import Poster from "../components/movie/Poster";
import DetailsHeader from "../components/movie/DetailsHeader";
import StatusBar from "../components/ui/StatusBar";
import ReleaseInfo from "../components/movie/ReleaseInfo";
import Genres from "../components/movie/Genres";
import DetailSection from "../components/layout/DetailSection";
import TrailerSection from "../components/movie/TrailerSection";
import Credits from "../components/movie/Credits";
import StreamingPartners from "../components/movie/StreamingPartners";
import { updateMovieViewCount } from "../firebase";
import { formatRuntime, formatDate, getYear } from "../utils";

/**
 * MovieDetails Page Component
 * Displays comprehensive information about a specific movie, including:
 * - Backdrop and Poster
 * - Title, Tagline, and Overview
 * - Rating and Runtime
 * - Genres and Release Info
 * - Cast and Crew
 * - Official Trailer
 */
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch all necessary data using custom hooks
  const { movie, isLoading, error } = useMovieDetails(id);
  const { credits, isLoading: isCreditsLoading } = useCredits(id);
  const { videoKey } = useTrailer(id);

  // Update view count in Firebase when movie details are successfully loaded
  React.useEffect(() => {
    if (movie) {
      updateMovieViewCount(movie);
    }
  }, [movie]);

  // Show loading spinner while fetching data
  if (isLoading || isCreditsLoading) {
    return <Spinner />;
  }

  // Handle errors or missing movie data
  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <p className="text-xl">{error || "Movie not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
    status,
    tagline,
  } = movie;

  const {
    cast = [],
    crew = []
  } = credits || {};

  // Utility-based formatting for cleaner UI logic
  const releaseYear = getYear(release_date);
  const formattedDate = formatDate(release_date);
  const runtimeString = formatRuntime(runtime);

  return (
    <div className="relative text-white min-h-screen w-full overflow-x-hidden bg-primary shadow-2xl">
      <Backdrop
        backdrop_path={backdrop_path}
        title={title}
      />

      {/* Details Section Overlay */}
      <div className="px-5 md:px-12 lg:px-24 relative z-30 flex flex-col md:flex-row gap-6 md:gap-14 pb-20 -mt-12 md:-mt-64">
        <Poster 
          poster_path={poster_path} 
          title={title} 
          className="w-44 md:w-64 lg:w-72 shrink-0 self-start shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
        />

        {/* Content Column */}
        <div className="flex-1 space-y-6 md:space-y-8 md:pt-12">
          <DetailsHeader
            releaseYear={releaseYear}
            title={title}
            tagline={tagline}
          />

          <StatusBar
            vote_average={vote_average}
            runtime={runtimeString}
            movie={movie}
          />

          <Genres genres={genres} />

          <ReleaseInfo status={status} formattedDate={formattedDate} />

          <StreamingPartners movieId={id} />

          <DetailSection title="Overview" id="overview-section">
            <p className="text-gray-300 leading-relaxed max-w-4xl text-lg md:text-xl font-light">
              {overview}
            </p>
          </DetailSection>
          
          <DetailSection title="Top Cast & Crew" id="cast-crew-section">
            <Credits cast={cast} crew={crew} />
          </DetailSection>

          {/* Video Trailer Preview with internal DetailSection-like structure */}
          <TrailerSection videoKey={videoKey} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
