'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Caveat, DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';
import { useRef, useState, useEffect } from 'react';

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

// A reusable "Tape" component - mobile optimized
const Tape = ({ className }: { className?: string }) => (
  <div 
    className={`absolute w-12 h-4 md:w-16 lg:w-20 md:h-5 lg:h-6 bg-white/40 backdrop-blur-[2px] shadow-sm z-20 ${className}`}
    style={{
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 10%, 98% 90%, 100% 100%, 0% 100%, 2% 90%, 0% 10%)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}
  />
);

// Scroll indicator component
const ScrollIndicator = ({ isHorizontal = false }: { isHorizontal?: boolean }) => {
  const colors = {
    accentGold: '#D4A373',
    textBrown: '#8B5E3C'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className={`flex items-center justify-center mt-6 md:mt-8 ${isHorizontal ? 'flex-col' : 'flex-row'} space-y-2 md:space-y-0 space-x-2 md:space-x-4`}
    >
      <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center space-x-2 md:space-x-3 space-y-2 md:space-y-0`}>
        <span className={`text-sm md:text-base ${caveat.className}`} style={{ color: colors.textBrown }}>
          {isHorizontal ? 'Scroll sideways →' : 'Scroll down ↓'}
        </span>
        <motion.div
          animate={{ 
            [isHorizontal ? 'x' : 'y']: [0, 8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop'
          }}
          className={`w-2 h-2 rounded-full ${isHorizontal ? 'bg-amber-600' : 'bg-amber-500'}`}
        />
      </div>
    </motion.div>
  );
};

// Flexible component for photos and memories - mobile optimized
const ScrapbookItem = ({ 
  title,
  description,
  rotate, 
  delay, 
  size = 'medium',
  left,
  top,
  imageSrc,
  isMobile = false
}: { 
  title: string, 
  description: string, 
  rotate: number, 
  delay: number, 
  size?: 'small' | 'medium' | 'large',
  left: number,
  top: number,
  imageSrc: string,
  isMobile?: boolean
}) => {
  
  // Mobile-optimized sizes
  let width, height;
  if (isMobile) {
    if (size === 'small') { width = 160; height = 120; }
    else if (size === 'large') { width = 280; height = 200; }
    else { width = 220; height = 160; }
  } else {
    if (size === 'small') { width = 200; height = 150; }
    else if (size === 'large') { width = 320; height = 240; }
    else { width = 260; height = 190; }
  }

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
      whileHover={{ scale: 1.05, rotate: isMobile ? 0 : rotate, zIndex: 30, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] ${
        isMobile ? 'p-3 mx-auto w-full max-w-[90vw]' : 'p-3 md:p-4 absolute'
      }`}
      style={{ 
        transform: `rotate(${isMobile ? 0 : rotate}deg)`,
        ...(!isMobile && {
          width: `${width}px`,
          left: `${left}px`,
          top: `${top}px`
        })
      }}
    >
      {/* Tape Decoration */}
      <Tape className={`-top-2 ${isMobile ? 'left-1/3' : 'left-1/4'} rotate-3`} />
      
      {/* Photo Area */}
      <div 
        className="relative overflow-hidden filter sepia-[0.3] hover:sepia-0 transition-all duration-500 mb-3 border-2 border-gray-100"
        style={{ height: `${height}px` }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={width - (isMobile ? 24 : 32)}
          height={height}
          className="object-cover h-full w-full"
          sizes={isMobile ? "(max-width: 768px) 90vw, 80vw" : "(max-width: 1024px) 30vw, 25vw"}
          priority={delay < 0.3}
        />
        <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      {/* Text Content Area */}
      <div className="px-1 md:px-2">
        <h3 className={`font-bold text-lg md:text-xl mb-1 ${dmSerif.className}`} style={{ color: colors.textGreen }}>
          {title}
        </h3>
        <p className={`mt-1 text-xs md:text-sm ${caveat.className} leading-relaxed`} style={{ color: colors.textBrown }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Pink Background Board Component
const PinkBoard = ({ isMobile = false }: { isMobile?: boolean }) => {
  const colors = {
    gharPink: '#F4C2C2'
  };

  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-4 md:ins-6 z-0 rounded-2xl p-4 shadow-xl"
        style={{ 
          backgroundColor: colors.gharPink,
          clipPath: 'polygon(0% 3%, 100% 0%, 100% 97%, 0% 100%)',
        }}
      />
    );
  }

  return (
    <motion.div 
      className="absolute top-0 left-0 z-0 rounded-2xl p-6 md:p-8 shadow-xl"
      style={{ 
        backgroundColor: colors.gharPink,
        width: '100%',
        height: '100%',
        clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
      }}
    />
  );
};

// --- Main Experience Component ---
const Experience = () => {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const colors = {
    vintagePaper: '#FDFBF7',
    textGreen: '#1A4D2E',
    accentGold: '#D4A373',
    textBrown: '#8B5E3C',
    gharPink: '#F4C2C2'
  };

  // Define the memories with positioning - mobile optimized
  const memories = [
    { 
      title: "The Sunday Feast", 
      description: "Every Sunday, the dining hall transformed. Laughter echoed louder than the clatter of plates. It was where strangers became family.",
      rotate: -4, delay: 0.1, size: 'medium', left: 50, top: 60,
      imageSrc: "/sunday_eve.png"
    },
    { 
      title: "Quiet Evenings", 
      description: "After the sun set, the veranda became the spot for quiet contemplation, chai, and the gentle sounds of Machli snoring by the door.",
      rotate: 6, delay: 0.3, size: 'small', left: 400, top: 180,
      imageSrc: "/sunset.png"
    },
    { 
      title: "The Snow", 
      description: "Winter brought a magical transformation. The courtyard, blanketed in snow, became our playground. Snowmen, snow angels, and impromptu snowball fights.",
      rotate: -8, delay: 0.3, size: 'large', left: 700, top: 40,
      imageSrc: "/snow.png"
    },
    { 
      title: "Rainy Day Games", 
      description: "When the monsoon hit, indoor games took over. Carrom boards and chess sets materialized, turning the living room into a playful battlefield.",
      rotate: 3, delay: 0.3, size: 'medium', left: 1100, top: 120,
      imageSrc: "/dog4.jpeg"
    },
    { 
      title: "Machli's Watch", 
      description: "Our loyal guard, Machli, was always on duty. She knew every resident and greeted them with a distinctive happy, wiggling dance.",
      rotate: -5, delay: 0.3, size: 'medium', left: 1500, top: 80,
      imageSrc: "/dog1.jpeg"
    },
    { 
      title: "The Old Library Corner", 
      description: "A silent space filled with the scent of aged paper. Our favourite corner to escape the world and dive into old classics.",
      rotate: 7, delay: 0.8, size: 'small', left: 1900, top: 200,
      imageSrc: "/hero.jpeg"
    },
    { 
      title: "Farewell Hugs", 
      description: "The hardest part—saying goodbye. But we knew that Ghar 1964 was a chapter that would stay with us forever.",
      rotate: -3, delay: 0.8, size: 'medium', left: 2300, top: 100,
      imageSrc: "/heroo.jpeg"
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

      <div className="container mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-8 md:pb-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${dmSerif.className}`}
            style={{ color: colors.textGreen, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
          >
            Memories We Keep
          </h2>
          <p className={`text-lg md:text-xl lg:text-2xl mt-3 md:mt-4 ${nothingYouCouldDo.className}`} style={{ color: colors.textBrown }}>
            What it was like to truly live at Ghar 1964.
          </p>
        </div>

        {/* Mobile: Vertical Stack Layout with Pink Background */}
        {isMobile ? (
          <div className="relative min-h-[600px] md:min-h-[700px] py-6 md:py-8">
            {/* Pink Background for Mobile */}
            <PinkBoard isMobile={true} />
            
            {/* Memory Cards */}
            <div className="relative z-10 space-y-6 md:space-y-8 px-2">
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
                  isMobile={true}
                />
              ))}
            </div>
            <ScrollIndicator isHorizontal={false} />
          </div>
        ) : (
          /* Desktop: Horizontal Scrolling Memory Board */
          <div className="relative">
            <div 
              ref={scrollRef} 
              className="w-full overflow-x-auto no-scrollbar py-8 md:py-10"
              style={{ minHeight: '500px' }}
            >
              <div className="relative" style={{ width: '2600px', height: '500px' }}>
                {/* Pink Background for Desktop */}
                <PinkBoard isMobile={false} />
                
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
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
            <ScrollIndicator isHorizontal={true} />
          </div>
        )}

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