'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Caveat, DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';
import { useRef } from 'react';

// --- Fonts ---
const caveat = Caveat({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat'
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif'
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-handwritten'
});

// --- Components ---

// A reusable "Tape" component to make photos look stuck to the wall
const Tape = ({ className }: { className?: string }) => (
  <div 
    className={`absolute w-24 h-8 bg-white/40 backdrop-blur-[2px] shadow-sm z-20 ${className}`}
    style={{
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 10%, 98% 90%, 100% 100%, 0% 100%, 2% 90%, 0% 10%)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}
  />
);

// A reusable Polaroid-style photo component
const Polaroid = ({ 
  src, 
  alt, 
  rotate, 
  delay, 
  className,
  width = 300,
  height = 240
}: { src: string, alt: string, rotate: number, delay: number, className?: string, width?: number, height?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate + 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true }}
      className={`absolute bg-white p-3 pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${className}`}
    >
      {/* The Image */}
      <div className="relative overflow-hidden filter sepia-[0.2] hover:sepia-0 transition-all duration-500">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover h-full w-full"
        />
        {/* Subtle inner shadow for paper depth */}
        <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>
      
      {/* Tape Decoration */}
      <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-2" />
    </motion.div>
  );
};

const Ghar1964Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]); // Parallax for text

  const colors = {
    vintagePaper: '#FDFBF7', // Lighter, cleaner cream
    textGreen: '#1A4D2E',    // Deep forest green
    accentGold: '#D4A373',
    textBrown: '#8B5E3C'
  };

  // Using Unsplash placeholders for demonstration
  const images = [
    "/three.jpeg", // Vintage interior
    "/two.jpeg", // Vintage interior
    "/hero.jpeg", // Vintage interior
    "/heroo.jpeg", // Vintage interior
  ];

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${caveat.variable} ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.vintagePaper }}
    >
      {/* 1. Grain Texture Overlay - Adds the "Paper" feel */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-40 mix-blend-multiply">
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      {/* 2. Abstract Painted Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] opacity-10 blur-3xl rounded-[100%] bg-[#E9967A] z-0" />
      <div className="absolute top-1/4 left-1/4 w-[50%] h-[40%] opacity-10 blur-3xl rounded-[100%] bg-[#2F5D44] z-0" />

      {/* 3. Main Content Grid */}
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center relative z-10">
        
        {/* Central Typography */}
        <motion.div 
          style={{ y: yText }}
          className="text-center z-20 relative max-w-4xl mx-auto"
        >
          {/* Decorative Crown/Icon above text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4 flex justify-center"
          >
            <span className={`text-2xl text-[${colors.accentGold}] ${nothingYouCouldDo.className}`}>Est. 2022</span>
          </motion.div>

          <motion.h1 
            initial={{ scale: 0.9, opacity: 0, letterSpacing: '0.1em' }}
            animate={{ scale: 1, opacity: 1, letterSpacing: '0em' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-7xl md:text-9xl lg:text-[10rem] leading-none mb-2 ${dmSerif.className}`}
            style={{ color: colors.textGreen }}
          >
            Ghar <span className="text-[${colors.accentGold}] text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D44] to-[#5a8c70]">1964</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative inline-block mt-4"
          >
            <p 
              className={`text-3xl md:text-5xl transform -rotate-2 ${nothingYouCouldDo.className}`}
              style={{ color: colors.textBrown }}
            >
              Ghar se door ek ghar
            </p>
            {/* Animated Underline */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-[#E8A93A] opacity-60 rounded-full origin-left"
              style={{ filter: 'url(#rough-edges)' }} // Hypothetical filter reference or just rounded
            />
          </motion.div>
        </motion.div>

        {/* 4. Scattered Photos Layer */}
        {/* Top Left */}
        <Polaroid 
          src={images[0]}
          alt="Vintage Memory 1"
          rotate={-6}
          delay={0.2}
          className="top-[10%] left-[5%] md:left-[10%] w-48 md:w-64"
        />

        {/* Top Right */}
        <Polaroid 
          src={images[1]}
          alt="Vintage Memory 2"
          rotate={8}
          delay={0.4}
          className="top-[15%] right-[5%] md:right-[12%] w-40 md:w-56"
        />

        {/* Bottom Left */}
        <Polaroid 
          src={images[2]}
          alt="Vintage Memory 3"
          rotate={4}
          delay={0.6}
          className="bottom-[15%] left-[8%] md:left-[15%] w-44 md:w-60 z-30"
        />

        {/* Bottom Right */}
        <Polaroid 
          src={images[3]}
          alt="Vintage Memory 4"
          rotate={-12}
          delay={0.8}
          className="bottom-[10%] right-[8%] md:right-[18%] w-52 md:w-72"
        />

      </div>
      
      {/* Decorative floral/organic corners (Optional, CSS shapes) */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none"
           style={{ background: `radial-gradient(circle at 0 0, ${colors.textGreen} 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
           style={{ background: `radial-gradient(circle at 100% 100%, ${colors.accentGold} 0%, transparent 70%)` }} />
    </section>
  );
};

export default Ghar1964Hero;