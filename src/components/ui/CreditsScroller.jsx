import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CreditsScroller Component
 * A shared navigation UI component that handles horizontal scrolling for a provided ref.
 * 
 * @param {React.RefObject} scrollRef - The ref of the container to scroll
 */
const CreditsScroller = ({ scrollRef }) => {
  /**
   * Smoothly scrolls the container connected to the scrollRef.
   * @param {string} direction - 'left' or 'right'
   */
  const handleScroll = (direction) => {
    if (scrollRef?.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7; // Scroll 70% of the visible area
      
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex items-center">
      <button 
        onClick={() => handleScroll('left')}
        className="p-1 hover:brightness-150 transition-all cursor-pointer active:scale-90"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="size-6 opacity-30 hover:opacity-100 transition-opacity" />
      </button>
      <button 
        onClick={() => handleScroll('right')}
        className="p-1 hover:brightness-150 transition-all cursor-pointer active:scale-90"
        aria-label="Scroll Right"
      >
        <ChevronRight className="size-6 opacity-30 hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default CreditsScroller;