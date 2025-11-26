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
  weight: ['400',],
  variable: '--font-handwritten'
});

// --- Components ---

// A reusable "Tape" component to make photos look stuck to the wall
const Tape = ({ className }: { className?: string }) => (
  <div 
    className={`absolute w-16 h-6 md:w-24 md:h-8 bg-white/40 backdrop-blur-[2px] shadow-sm z-20 ${className}`}
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
  width = 200,
  height = 160
}: { src: string, alt: string, rotate: number, delay: number, className?: string, width?: number, height?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate + 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] mx-auto ${className}`}
    >
      {/* The Image */}
      <div className="relative overflow-hidden filter sepia-[0.2] hover:sepia-0 transition-all duration-500">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover h-full w-full"
          sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
          priority={delay < 0.3}
        />
        {/* Subtle inner shadow for paper depth */}
        <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>
      
      {/* Tape Decoration */}
      <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" />
    </motion.div>
  );
};

const Ghar1964Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]); // Reduced parallax for mobile

  const colors = {
    vintagePaper: '#FDFBF7',
    textGreen: '#1A4D2E',
    accentGold: '#D4A373',
    textBrown: '#8B5E3C'
  };

  // Using Unsplash placeholders for demonstration
  const images = [
    "/three.jpeg",
    "/two.jpeg",
    "/hero.jpeg",
    "/heroo.jpeg",
  ];

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${caveat.variable} ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.vintagePaper }}
    >
      {/* 1. Grain Texture Overlay - Fixed opacity */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-multiply">
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      {/* 2. Abstract Painted Background Element - Fixed positioning and opacity */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[40%] md:w-[120%] md:h-[60%] opacity-15 blur-xl md:blur-3xl rounded-full z-0"
        style={{ backgroundColor: '#E9967A' }}
      />
      <div 
        className="absolute top-1/4 left-1/4 w-[60%] h-[30%] md:w-[50%] md:h-[40%] opacity-15 blur-xl md:blur-3xl rounded-full z-0"
        style={{ backgroundColor: '#2F5D44' }}
      />

      {/* 3. Main Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 h-screen flex flex-col justify-center items-center relative z-20">
        
        {/* Central Typography */}
        <motion.div 
          style={{ y: yText }}
          className="text-center z-30 relative max-w-4xl mx-auto px-4"
        >
          {/* Decorative Crown/Icon above text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4 md:mb-6 flex justify-center"
          >
            <span 
              className={`text-lg md:text-2xl ${nothingYouCouldDo.className}`}
              style={{ color: colors.accentGold }}
            >
              Est. 2022
            </span>
          </motion.div>

          <motion.h1 
            initial={{ scale: 0.9, opacity: 0, letterSpacing: '0.1em' }}
            animate={{ scale: 1, opacity: 1, letterSpacing: '0em' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none mb-2 md:mb-4 ${dmSerif.className}`}
            style={{ color: colors.textGreen }}
          >
            Ghar{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F5D44] to-[#5a8c70]"
            >
              1964
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative inline-block mt-4 md:mt-6"
          >
            <p 
              className={`text-xl sm:text-2xl md:text-4xl transform -rotate-1 md:-rotate-2 ${nothingYouCouldDo.className}`}
              style={{ color: colors.textBrown }}
            >
              Ghar se door ek ghar
            </p>
            {/* Animated Underline - Fixed color reference */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 rounded-full origin-left"
              style={{ 
                backgroundColor: colors.accentGold,
                opacity: 0.6
              }}
            />
          </motion.div>
        </motion.div>

        {/* 4. Scattered Photos Layer - Mobile optimized positioning */}
        
        {/* Top Left - Mobile positioning */}
        <Polaroid 
          src={images[0]}
          alt="Vintage Memory 1"
          rotate={-4}
          delay={0.2}
          width={160}
          height={120}
          className="top-[5%] left-[2%] sm:left-[5%] md:top-[10%] md:left-[10%] w-32 sm:w-40 md:w-48 lg:w-64"
        />

        {/* Top Right - Mobile positioning */}
        <Polaroid 
          src={images[1]}
          alt="Vintage Memory 2"
          rotate={6}
          delay={0.4}
          width={140}
          height={110}
          className="top-[8%] right-[2%] sm:right-[5%] md:top-[15%] md:right-[12%] w-28 sm:w-36 md:w-44 lg:w-56"
        />

        {/* Bottom Left - Mobile positioning */}
        <Polaroid 
          src={images[2]}
          alt="Vintage Memory 3"
          rotate={3}
          delay={0.6}
          width={150}
          height={115}
          className="bottom-[10%] left-[3%] sm:left-[8%] md:bottom-[15%] md:left-[15%] w-30 sm:w-38 md:w-44 lg:w-60 z-30"
        />

        {/* Bottom Right - Mobile positioning */}
        <Polaroid 
          src={images[3]}
          alt="Vintage Memory 4"
          rotate={-8}
          delay={0.8}
          width={170}
          height={130}
          className="bottom-[5%] right-[3%] sm:right-[8%] md:bottom-[10%] md:right-[18%] w-34 sm:w-42 md:w-52 lg:w-72"
        />

      </div>
      
      {/* Decorative floral/organic corners - Fixed opacity and positioning */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 opacity-10 pointer-events-none z-0"
        style={{ 
          background: `radial-gradient(circle at 0 0, ${colors.textGreen} 0%, transparent 70%)` 
        }} 
      />
      <div 
        className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 opacity-10 pointer-events-none z-0"
        style={{ 
          background: `radial-gradient(circle at 100% 100%, ${colors.accentGold} 0%, transparent 70%)` 
        }} 
      />
    </section>
  );
};

export default Ghar1964Hero;