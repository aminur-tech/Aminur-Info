import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="relative min-h-screen text-white flex items-center overflow-x-hidden px-4 sm:px-6 lg:px-24">
      {/* --- Background Decorations --- */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`, bgSize: '45px 45px' }} />

      <div className="absolute top-1/4 left-0 w-[90vw] max-w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[90vw] max-w-[600px] h-[600px] bg-green-500/10 blur-[150px] rounded-full" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 pt-10 md:pt-20 lg:pt-0">

        {/* --- Left Side Content --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 lg:space-y-8 text-center lg:text-left"
        >
          {/* Available for Hire */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            <span className="h-[2px] w-10 bg-green-500 rounded-full"></span>
            <h1 className="text-green-500 tracking-[0.3em] text-xs md:text-sm uppercase font-bold">
              Available for Hire
            </h1>
          </motion.div>

          {/* Name & Role */}
          <motion.div variants={fadeInUp} className="space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              I'm <span className="text-green-500">Aminur</span>
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              Rahman
            </h2>

            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-200 pt-4">
              <TypeAnimation
                sequence={[
                  'Full Stack Web Developer', 2000,
                  'MERN Stack Developer', 2000
                ]}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="
      text-gray-400 max-w-lg mx-auto lg:mx-0
      leading-relaxed text-base sm:text-lg italic
      border-l-0 lg:border-l-2
      border-green-500/20
      pl-0 lg:pl-6
    "
          >
            Focused on building high-performance web applications using the MERN stack.
            I bridge the gap between clean code and user-centric design.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 pt-4 items-center lg:items-start"
          >
            <motion.a
              href="/Aminur.pdf"
              download="Aminur_Rahman_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
        flex items-center justify-center gap-3
        bg-green-600 hover:bg-green-500
        text-[#020617] font-bold
        py-4 px-10 rounded-xl
        transition-all
        shadow-[0_10px_30px_rgba(34,197,94,0.3)]
        cursor-pointer
        w-full sm:w-auto
      "
            >
              Get Resume <FaDownload size={16} />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
        border-2 border-green-500/30 hover:border-green-500
        py-4 px-10 rounded-xl
        transition-all
        text-green-500 font-bold
        bg-green-500/5 backdrop-blur-sm
        cursor-pointer
        w-full sm:w-auto
        text-center
      "
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-5 sm:gap-8 text-xl sm:text-2xl text-gray-500 justify-center lg:justify-start"
          >
            <a
              href="https://github.com/aminur-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-all hover:-translate-y-1"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/aminur-rahman4078"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-all hover:-translate-y-1"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
              className="hover:text-green-500 transition-all hover:-translate-y-1"
            >
              <FaEnvelope />
            </a>
          </motion.div>
        </motion.div>


        {/* --- Right Side: Image --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center lg:justify-end items-end h-full mt-10 md:mt-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] 
                  bg-green-500/30 blur-[80px] rounded-full z-0 opacity-60" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-green-500/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-green-500/10 rounded-full animate-pulse" />

          <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}>
            <img
              src="https://i.ibb.co.com/h1nS5dhr/profile-removebg-preview.png"
              alt="Aminur Rahman"
              className="w-full h-auto filter brightness-110 contrast-[1.05]"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold mb-1">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;