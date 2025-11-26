'use client';

import { motion } from 'framer-motion';
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

// --- Utility Components ---

// A reusable "Tape" component
const Tape = ({ className }: { className?: string }) => (
  <div 
    className={`absolute w-20 h-6 bg-white/40 backdrop-blur-[2px] shadow-sm z-20 ${className}`}
    style={{
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 10%, 98% 90%, 100% 100%, 0% 100%, 2% 90%, 0% 10%)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}
  />
);

// Flexible component for photos and memories
const ScrapbookItem = ({ 
  title,
  description,
  rotate, 
  delay, 
  size = 'medium',
  left,
  top,
  imageSrc
}: { 
  title: string, 
  description: string, 
  rotate: number, 
  delay: number, 
  size?: 'small' | 'medium' | 'large',
  left: number,
  top: number,
  imageSrc: string
}) => {
  
  let width, height;
  if (size === 'small') { width = 280; height = 180; }
  else if (size === 'large') { width = 450; height = 350; }
  else { width = 350; height = 250; }

  const colors = {
    textGreen: '#1A4D2E',
    accentGold: '#D4A373',
    textBrown: '#8B5E3C',
    gharPink: '#F4C2C2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
      className="absolute bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] p-4"
      style={{ 
        transform: `rotate(${rotate}deg)`, 
        width: `${width}px`,
        left: `${left}px`,
        top: `${top}px`
      }}
    >
      {/* Tape Decoration */}
      <Tape className="-top-3 left-1/4 rotate-3" />
      
      {/* Photo Area */}
      <div 
        className="relative overflow-hidden filter sepia-[0.3] hover:sepia-0 transition-all duration-500 mb-4 border-2 border-gray-100"
        style={{ height: `${height}px` }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={width - 32}
          height={height}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      {/* Text Content Area */}
      <div className="px-2">
        <h3 className={`font-bold text-xl mb-1 ${dmSerif.className}`} style={{ color: colors.textGreen }}>
          {title}
        </h3>
        <p className={`mt-1 text-sm ${caveat.className} text-xl`} style={{ color: colors.textBrown }}>
          {description}
        </p>
      </div>
      
    </motion.div>
  );
};

// --- Main Experience Component ---
const Experience = () => {
  const scrollRef = useRef(null);

  const colors = {
    vintagePaper: '#FDFBF7',
    textGreen: '#1A4D2E',
    accentGold: '#D4A373',
    textBrown: '#8B5E3C',
    gharPink: '#F4C2C2'
  };

  // Define the memories with positioning
  const memories = [
    { 
      title: "The Sunday Feast", 
      description: "Every Sunday, the dining hall transformed. Laughter echoed louder than the clatter of plates. It was where strangers became family.",
      rotate: -4, delay: 0.1, size: 'medium', left: 100, top: 80,
      imageSrc: "/sunday_eve.png"
    },
    { 
      title: "Quiet Evenings", 
      description: "After the sun set, the veranda became the spot for quiet contemplation, chai, and the gentle sounds of Machli snoring by the door.",
      rotate: 6, delay: 0.3, size: 'small', left: 550, top: 200,
      imageSrc: "/sunset.png"
    },
    { 
      title: "The Snow ", 
      description: "Winter brought a magical transformation. The courtyard, blanketed in snow, became our playground. Snowmen, snow angels, and impromptu snowball fights were the order of the day.",
      rotate: -8, delay: 0.5, size: 'large', left: 950, top: 50,
      imageSrc: "/snow.png"
    },
    { 
      title: "Rainy Day Games", 
      description: "When the monsoon hit, indoor games took over. Carrom boards and chess sets materialized, turning the living room into a playful battlefield.",
      rotate: 3, delay: 0.7, size: 'medium', left: 1500, top: 150,
      imageSrc: "/memories/rainy-games.jpg"
    },
    { 
      title: "Machli's Watch", 
      description: "Our loyal guard, Machli, was always on duty. She knew every resident and greeted them with a distinctive happy, wiggling dance.",
      rotate: -5, delay: 0.9, size: 'medium', left: 2000, top: 100,
      imageSrc: "/memories/machli-watch.jpg"
    },
    { 
      title: "The Old Library Corner", 
      description: "A silent space filled with the scent of aged paper. Our favourite corner to escape the world and dive into old classics.",
      rotate: 7, delay: 1.1, size: 'small', left: 2500, top: 250,
      imageSrc: "/memories/library-corner.jpg"
    },
    { 
      title: "Farewell Hugs", 
      description: "The hardest part—saying goodbye. But we knew that Ghar 1964 was a chapter that would stay with us forever.",
      rotate: -3, delay: 1.3, size: 'medium', left: 3000, top: 120,
      imageSrc: "/memories/farewell-hugs.jpg"
    },
  ];

  return (
    <section 
      className={`min-h-screen relative overflow-hidden ${caveat.variable} ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
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

      <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 
            className={`text-5xl md:text-7xl font-bold ${dmSerif.className}`}
            style={{ color: colors.textGreen, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
          >
            Memories We Keep
          </h2>
          <p className={`text-xl md:text-2xl mt-4 ${nothingYouCouldDo.className}`} style={{ color: colors.textBrown }}>
            What it was like to truly live at Ghar 1964.
          </p>
        </div>

        {/* Horizontal Scrolling Memory Board */}
        <div 
          ref={scrollRef} 
          className="w-full overflow-x-scroll no-scrollbar py-10"
          style={{ minHeight: '80vh' }}
        >
          <div className="relative" style={{ width: '3600px', height: '700px' }}>
            {/* The Background Pink "Pinboard" */}
            <motion.div 
              className="absolute top-0 left-0 z-0 rounded-2xl p-8 shadow-xl"
              style={{ 
                backgroundColor: colors.gharPink,
                width: '100%',
                height: '100%',
                clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
              }}
            />
            
            {/* Render all the memory cards */}
            {memories.map((memory, index) => (
              <ScrapbookItem
                key={index}
                title={memory.title}
                description={memory.description}
                rotate={memory.rotate}
                delay={memory.delay}
                size={memory.size as 'small' | 'medium' | 'large'}
                left={memory.left}
                top={memory.top}
                imageSrc={memory.imageSrc}
              />
            ))}
          </div>
        </div>

        {/* CSS to hide the scrollbar */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
              display: none;
          }
          .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  )
}

export default Experience