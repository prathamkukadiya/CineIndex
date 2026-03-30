import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NavLogo Component
 * Renders the application branding and logo, linking back to the home page.
 */
const NavLogo = () => {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo(0, 0)}
      className="flex items-center gap-2 group"
    >
      <img
        src="/CineIndexLogo.png"
        alt="Cine-Index Logo"
        className="h-10 md:h-12 w-auto hover:scale-105 transition-transform duration-300"
      />
      <span className="text-white font-black text-xl tracking-tighter sm:text-2xl hidden sm:block">
        CINE<span className="text-purple-400">INDEX</span>
      </span>
    </Link>
  );
};

export default NavLogo;
