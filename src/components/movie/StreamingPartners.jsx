import React from 'react';
import { useWatchProviders } from '../../hooks/useWatchProviders';
import DetailSection from '../layout/DetailSection';
import { getImageUrl } from '../../utils';

/**
 * StreamingPartners Component
 * Displays available streaming, rent, and buy options for the movie in India.
 * 
 * @param {string|number} movieId - The TMDB ID of the movie
 */
const StreamingPartners = ({ movieId }) => {
  const { providers, isLoading, error } = useWatchProviders(movieId);

  if (isLoading) return null; // Or a smaller skeleton if needed
  if (error) return null;

  // Flatten options: prioritized streaming (flatrate), then rent or buy
  const flatrate = providers?.flatrate || [];
  const rent = providers?.rent || [];
  const buy = providers?.buy || [];

  const allProviders = [...flatrate, ...rent, ...buy];
  
  // Remove duplicates based on provider_id
  const uniqueProviders = Array.from(
    new Map(allProviders.map(p => [p.provider_id, p])).values()
  );

  return (
    <DetailSection title="Where to Watch (India)" id="streaming-section">
      <div className="flex flex-wrap gap-4 mt-2">
        {uniqueProviders.length > 0 ? (
          uniqueProviders.map((provider) => (
            <div 
              key={provider.provider_id}
              className="group flex flex-col items-center gap-2"
              title={provider.provider_name}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={getImageUrl(provider.logo_path, 'original')}
                  alt={provider.provider_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium text-center w-14 md:w-16">
                {provider.provider_name}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic font-light">Data Not Available/Not Available in India</p>
        )}
      </div>
    </DetailSection>
  );
};

export default StreamingPartners;
