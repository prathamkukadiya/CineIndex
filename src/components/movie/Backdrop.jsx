import { getImageUrl } from "../../utils";

/**
 * Backdrop Component
 * Displays a large, hero-style backdrop image with top and bottom gradients 
 * for better text legibility and smooth transitions.
 * 
 * @param {string} backdrop_path - The TMDB backdrop image path
 * @param {string} title - The movie title (for alt text)
 */
const Backdrop = ({ backdrop_path, title }) => {
  return (
    <div className="relative w-full aspect-video md:aspect-none md:h-screen overflow-hidden">
      {/* Backdrop Image */}
      <img
        src={getImageUrl(backdrop_path, 'original')}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Decorative Gradients for readability and aesthetic blending */}
      <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/20 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-96 bg-linear-to-t from-primary to-transparent z-10" />
    </div>
  );
};

export default Backdrop;