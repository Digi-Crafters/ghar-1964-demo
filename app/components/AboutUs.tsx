'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Caveat, DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';
import { useRef,  useState } from 'react';

// --- Fonts (Ensure these are defined once in your _app.tsx or layout.tsx if used globally) ---
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

// --- Reusable Components (from previous Hero section) ---

// A reusable "Tape" component - made smaller for mobile
const Tape = ({ className }: { className?: string }) => (
  <div 
    className={`absolute w-16 h-6 md:w-24 md:h-8 bg-white/40 backdrop-blur-[2px] shadow-sm z-20 ${className}`}
    style={{
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 10%, 98% 90%, 100% 100%, 0% 100%, 2% 90%, 0% 10%)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}
  />
);

// A reusable Polaroid-style photo component - optimized for mobile
const PolaroidCard = ({ 
  src = '/two.jpeg', // Default to /two.jpeg as requested
  alt, 
  rotate = 0, 
  delay = 0, 
  className,
  width = 280, // Reduced default for mobile
  height = 210, // Reduced default for mobile
  children // To allow text content inside the card
}: { src?: string, alt: string, rotate?: number, delay?: number, className?: string, width?: number, height?: number, children?: React.ReactNode }) => {
  // Generate random values once using lazy initializers to avoid cascading renders from synchronous setState in effects
  const [randomRotationOffset] = useState(() => (Math.random() - 0.5) * 10);
  const [showTwoTapes] = useState(() => Math.random() > 0.5);
  const [singleTapeTop] = useState(() => Math.random() > 0.5);
  const [singleTapeLeft] = useState(() => Math.random() > 0.5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate + randomRotationOffset }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, amount: 0.3 }} // Reduced from 0.5 for mobile
      className={`relative bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] mx-auto max-w-[90vw] ${className}`}
    >
      {/* The Image (if src is provided) */}
      {src && (
        <div className="relative overflow-hidden filter sepia-[0.2] hover:sepia-0 transition-all duration-500">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover h-full w-full"
            priority={delay < 0.3}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          />
          {/* Subtle inner shadow for paper depth */}
          <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
        </div>
      )}
      
      {/* Tape Decoration - Randomly place one or two tapes */}
      {showTwoTapes ? (
        <>
          <Tape className="-top-3 left-1/4 -translate-x-1/2 rotate-3" />
          <Tape className="-bottom-3 right-1/4 translate-x-1/2 -rotate-6" />
        </>
      ) : (
        <Tape className={`${singleTapeTop ? '-top-3' : '-bottom-3'} ${singleTapeLeft ? 'left-1/2 -translate-x-1/2 rotate-2' : 'right-1/2 translate-x-1/2 -rotate-3'}`} />
      )}

      {/* Children content (for text) */}
      {children && (
        <div className="px-1 pt-3 md:pt-4 text-center text-xs md:text-sm text-gray-700">
          {children}
        </div>
      )}
    </motion.div>
  );
};

// --- About Us Section Component ---
const AboutGhar1964 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]); // Reduced parallax for mobile
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Reduced parallax
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]); // Reduced parallax

  const colors = {
    vintagePaper: '#FDFBF7',
    textGreen: '#1A4D2E',
    accentGold: '#D4A373',
    textBrown: '#8B5E3C',
    gharPink: '#F4C2C2'
  };

  return (
    <section 
      ref={ref}
      className={`relative py-12 md:py-20 lg:py-32 overflow-hidden ${caveat.variable} ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.vintagePaper }}
    >
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      {/* Background Pink Swash - adjusted for mobile */}
      <motion.div 
        className="absolute top-1/4 left-0 w-full h-[200px] md:h-[300px] -rotate-3 z-[1]"
        style={{ 
          backgroundColor: colors.gharPink,
          clipPath: 'polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)',
          y: yImage1
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-0 w-full h-[150px] md:h-[250px] rotate-2 z-[1]"
        style={{ 
          backgroundColor: colors.accentGold,
          opacity: 0.3,
          clipPath: 'polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)',
          y: yImage2
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Title - optimized for mobile */}
        <motion.div
          style={{ y: yText }}
          className="text-center mb-12 md:mb-24 relative"
        >
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ${dmSerif.className}`}
            style={{ color: colors.textGreen, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
          >
            Our Story: Ghar 1964
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl mt-3 md:mt-4 ${nothingYouCouldDo.className}`} style={{ color: colors.textBrown }}>
            A home away from home, built on memories.
          </p>
          <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1 bg-[${colors.accentGold}] opacity-70 rounded-full" />
        </motion.div>

        {/* Story Cards Grid - single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 relative mt-12 md:mt-24">
          {/* Card 1: The Beginning */}
          <PolaroidCard 
            alt="Old house entrance" 
            rotate={-2} // Reduced rotation for mobile
            delay={0.1} 
            width={320} 
            height={240}
            className="md:col-span-2 lg:col-span-1 md:justify-self-end md:-top-8"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>The Foundation</h3>
            <p className="mt-1 text-xs md:text-base">
              Ghar 1964 began with a dream to create a sanctuary, a true &apos;home away from home&apos;. It was a simple idea born from the desire for warmth and community.
            </p>
          </PolaroidCard>

          {/* Card 2: The Year 1964 */}
          <PolaroidCard 
            src='/three.jpeg'
            alt="Vintage calendar 1964" 
            rotate={3} // Reduced rotation for mobile
            delay={0.3} 
            width={300} 
            height={220}
            className="lg:justify-self-center lg:-top-16"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>A New Beginning</h3>
            <p className="mt-1 text-xs md:text-base">
              The year 1964 marked our humble beginnings. A small building, a big heart, and a promise to welcome all who sought solace and connection.
            </p>
          </PolaroidCard>

          {/* Card 3: Early Days */}
          <PolaroidCard 
            alt="Handwritten note" 
            src="/hero.jpeg"
            rotate={-1} // Reduced rotation for mobile
            delay={0.5} 
            width={280} 
            height={180}
            className="md:col-span-1 md:justify-self-start md:-bottom-4 lg:-top-8"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>Building Memories</h3>
            <p className="mt-1 text-xs md:text-base">
              From the very first day, Ghar 1964 was filled with laughter, shared stories, and the aroma of home-cooked meals. Every brick holds a memory.
            </p>
          </PolaroidCard>

          {/* Card 4: Introducing Machli - Features Dog */}
          <PolaroidCard 
            alt="Machli the dog" 
            rotate={4} // Reduced rotation for mobile
            src='/dog1.jpeg'
            delay={0.7} 
            width={320} 
            height={240}
            className="md:col-span-2 lg:col-span-1 lg:justify-self-end md:mt-8 lg:mt-0"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>Our Beloved Machli</h3>
            <p className="mt-1 text-xs md:text-base">
              No story of Ghar 1964 is complete without Machli, our loyal and playful canine companion. She guarded our gates and wagged her way into every heart.
            </p>
          </PolaroidCard>

          {/* Card 5: Machli's Role */}
          <PolaroidCard 
            alt="Machli playing" 
            rotate={-3} // Reduced rotation for mobile
            delay={0.9} 
            src='/dog3.jpeg'
            width={300} 
            height={200}
            className="lg:justify-self-center md:col-start-1 md:row-start-5 lg:row-start-auto lg:col-start-auto md:-bottom-12"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>Machli, the Heart of Ghar</h3>
            <p className="mt-1 text-xs md:text-base">
              Machli wasn&apos;t just a pet; she was family. Her comforting presence and joyful barks were as much a part of Ghar 1964 as the very walls themselves.
            </p>
          </PolaroidCard>

          {/* Card 6: The Legacy */}
          <PolaroidCard 
            alt="Generations at Ghar" 
            rotate={2} // Reduced rotation for mobile
            delay={1.1} 
            src='/dog4.jpeg'
            width={320} 
            height={240}
            className="md:col-span-2 lg:col-span-1 md:justify-self-start md:mt-4 lg:mt-0"
          >
            <h3 className={`font-bold text-base md:text-lg ${dmSerif.className}`} style={{ color: colors.textGreen }}>A Lasting Legacy</h3>
            <p className="mt-1 text-xs md:text-base">
              Today, Ghar 1964 stands as a testament to those early dreams, a place where new memories are forged, always remembering the spirit of Machli.
            </p>
          </PolaroidCard>
        </div>
      </div>
    </section>
  );
};

export default AboutGhar1964;