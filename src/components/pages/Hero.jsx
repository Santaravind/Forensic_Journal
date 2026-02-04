// import React from 'react'
// import bg from '../assets/bg.jpeg'
// import bg1 from '../assets/bg1.jpeg'
// import bg2 from '../assets/bg2.jpeg'
// import bg3 from '../assets/bg3.jpeg'
// function Hero() {
//   const image=[bg,bg1,bg2,bg3];
//   return (
//     <> 
//     <div className='lg:mt-48 mt-70 '>
//      this hero section
//      </div>
//      </>
//   )
// }

// export default Hero

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'
import bg from '../assets/bg.jpeg'
import bg1 from '../assets/bg1.jpeg'
import bg2 from '../assets/bg2.jpeg'
import bg3 from '../assets/bg3.jpeg'
import logo from '../assets/logoss.png'

function Hero() {
  const images = [bg, bg1, bg2, bg3]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden mt-12 ">
      {/* Background Images with fade effect */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <img
      src={logo}
      alt="Patrika Logo"
      className="h-40 w-auto object-contain -mt-40"
    />
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ml-8 leading-tight animate-fadeInUp">
                Forensic Patrika
             <span className="block text-2xl md:text-4xl lg:text-5xl text-indigo-200 mt-4 ml-2.5">Journal of Forensic Science    </span> 
              <span className="block text-2xl md:text-4xl lg:text-5xl text-indigo-200 mt-4 ml-3">
                न्यायिक अनुसंधानम्
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 ml-8 text-gray-200 leading-relaxed animate-fadeInUp animation-delay-200 ">
              Advancing scientific research and innovation in forensic studies. 
              A peer-reviewed journal dedicated to excellence in forensic science.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
              <button 
                onClick={() => window.location.href = '/publication'}
                className="px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Your Research
              </button>
              
              <button 
                onClick={() => window.location.href = '/research'}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Browse Articles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 3000)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10 animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </button>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-black/50 transition-colors"
        >
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>
    </section>
  )
}

export default Hero
