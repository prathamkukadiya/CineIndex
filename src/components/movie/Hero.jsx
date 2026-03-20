import React from 'react'

/**
 * Hero Component
 * The main banner section of the homepage.
 * Displays a large title and a hero image to welcome users.
 */
const Hero = () => {
  return (
    <header className='sm:mt-10 mt-5'>
      <img 
        className='w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md'
        src="./hero.png"
        alt="Hero Banner"
      />
      <h1 className='mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]'>
        Find
        <span className='bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent'> Movies </span>
          You'll Enjoy Without Hassle
      </h1>
    </header>
  )
}

export default Hero