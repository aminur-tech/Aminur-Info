import { ArrowRight } from 'lucide-react';
import React from 'react';

const Hero = () => {
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-20">
        {/* LEFT CONTENT */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="flex items-center justify-center lg:justify-start text-red-500 text-sm tracking-widest font-mono uppercase mb-5">
            <span className="w-8 h-px bg-red-500 mr-3" />
            FULL STACK DEVELOPMENT
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight text-white uppercase">
            BUILD SCALABLE
            <br />
            WEB APPS.
            <br />
            DELIVER RESULTS.
          </h1>

          <button
            onClick={scrollToProjects}
            className="inline-flex mt-8 sm:mt-12 items-center bg-transparent border-2 border-red-600 text-white font-semibold py-3 px-8 rounded-lg uppercase text-sm transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/20"
          >
            VIEW MY PROJECTS
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-80 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-gray-900/50 transform hover:scale-[1.01] transition-transform duration-500">
            <div
              className="w-full h-full bg-cover bg-center grayscale contrast-125 relative"
              style={{
                backgroundImage: `url('https://i.ibb.co.com/gMxQc4vH/profile.jpg')`,
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), inset 0 0 50px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 bg-red-600/80 backdrop-blur-sm w-full">
                <p className="text-white text-lg sm:text-xl font-bold uppercase tracking-widest">
                  MERN Stack Developer
                </p>
                <p className="text-white text-xs sm:text-sm opacity-90">
                  MongoDB, Express, React, Node.js
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
