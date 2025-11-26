'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';
import Image from 'next/image';
import { Home } from 'lucide-react';

// --- Fonts ---
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

// --- Colors ---
const colors = {
  vintagePaper: '#FDFBF7',
  textGreen: '#1A4D2E',
  accentGold: '#D4A373',
  textBrown: '#8B5E3C',
  gharPink: '#F4C2C2' 
};

// --- Custom 404 Component ---
const Custom404 = () => {
  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-8 relative overflow-hidden ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.vintagePaper }}
    >
      {/* 1. Background Grain Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      {/* 2. Central Content Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative bg-white p-10 md:p-16 rounded-xl shadow-2xl max-w-lg w-full text-center"
        style={{ border: `8px solid ${colors.accentGold}` }}
      >
        {/* Decorative Corner Element (Like a torn page or stamp) */}
        <div 
          className="absolute top-0 right-0 w-24 h-24 transform rotate-12 -translate-y-6 translate-x-6 rounded-full opacity-70"
          style={{ backgroundColor: colors.gharPink }}
        />

        {/* 3. The Big 404 Number */}
        <motion.h1
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className={`text-9xl md:text-[12rem] font-bold ${dmSerif.className}`}
          style={{ color: colors.textGreen, textShadow: '4px 4px 0px rgba(244, 194, 194, 0.5)' }} // Text shadow uses gharPink
        >
          404
        </motion.h1>

        {/* 4. Handwritten Message */}
        <p className={`text-4xl md:text-5xl mt-4 mb-6 ${nothingYouCouldDo.className}`} style={{ color: colors.textBrown }}>
          Someone took the wrong turn...
        </p>

        {/* 5. Main Message */}
        <p className={`text-lg mb-8 ${dmSerif.className}`} style={{ color: colors.textGreen }}>
          It seems the memory you were looking for has either been lost to time or perhaps Machli ran off with the map! We couldn&apos;t find this page.
        </p>
        
        {/* Image Placeholder for Machli/Map */}
        <div className="flex justify-center my-6">
            <Image
                src="/two.jpeg" // Using the universal image path for visual consistency
                alt="Lost page"
                width={250}
                height={150}
                className="object-cover rounded-md shadow-md filter sepia-[0.2] transform -rotate-3"
            />
        </div>

        {/* 6. Call to Action */}
        <Link href="/" passHref legacyBehavior>
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(27, 77, 46, 0.3)" }}
            className={`inline-flex items-center justify-center px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 ${nothingYouCouldDo.className}`}
            style={{ backgroundColor: colors.textGreen, color: colors.vintagePaper }}
          >
            <Home className="w-5 h-5 mr-2" />
            Take Me Back Home
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
};

export default Custom404;