'use client';

import { motion } from 'framer-motion';
import { DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';

// --- Fonts ---
// Assumed to be imported and defined once globally, but defined here for context
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

// --- Reusable Voucher Component ---
const ServiceVoucher = ({ title, description, delay, accentColor }: { title: string, description: string, delay: number, accentColor: string }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: delay }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative p-6 md:p-8 rounded-lg shadow-xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: colors.vintagePaper }}
    >
      {/* Torn Edge Effect Background (Accent Strip) */}
      <div 
        className="absolute top-0 left-0 w-full h-1/3 opacity-80"
        style={{ 
          backgroundColor: accentColor,
          clipPath: 'polygon(0% 0%, 100% 0%, 98% 30%, 2% 25%)', // Simple torn/wavy top
        }}
      />
      
      <div className="relative z-10 pt-4">
        {/* Handwritten Title */}
        <h3 
          className={`text-4xl mb-2 ${nothingYouCouldDo.className} transform -rotate-1`}
          style={{ color: colors.textGreen }}
        >
          {title}
        </h3>
        
        {/* Decorative Divider */}
        <div 
          className="w-16 h-1 my-3 rounded-full"
          style={{ backgroundColor: colors.accentGold }}
        />
        
        {/* Description */}
        <p 
          className={`text-lg mt-3 ${dmSerif.className}`}
          style={{ color: colors.textBrown }}
        >
          {description}
        </p>
        
        {/* Subtle detail: Old Stamp */}
        <div 
            className="absolute bottom-4 right-4 text-sm opacity-50 transform rotate-12"
            style={{ color: colors.textGreen }}
        >
            GHAR &apos;64
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Services Component ---
const Services = () => {
  const servicesData = [
    { 
      title: "Family Dining", 
      description: "Daily curated meals, served family-style. Authentic Indian recipes passed down through generations. Always fresh, always warm.", 
      accent: colors.gharPink 
    },
    { 
      title: "Cozy Stays", 
      description: "Comfortable, individually designed rooms focused on tranquility and rest. Wake up to the sounds of nature and fresh chai.", 
      accent: colors.accentGold 
    },
    { 
      title: "Machli's Garden Access", 
      description: "Unlimited access to our lush, private courtyard. Perfect for evening strolls, morning yoga, or just petting Machli (when she's awake!).", 
      accent: colors.textGreen 
    },
    { 
      title: "Laundry & Pressing", 
      description: "A comprehensive service ensuring your clothes are clean, neatly pressed, and returned to you with care and attention to detail.", 
      accent: colors.gharPink 
    },
    { 
      title: "Community Events", 
      description: "Join our seasonal festivals, weekly storytelling nights, and art workshops. Experience the vibrant culture of our Ghar family.", 
      accent: colors.accentGold 
    },
    { 
      title: "24/7 Chai Service", 
      description: "Because life's best conversations happen over a cup of chai. Our famous blend is available anytime, day or night.", 
      accent: colors.textGreen 
    },
  ];

  return (
    <section 
      className={`py-20 md:py-32 overflow-hidden ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.gharPink }} // Use pink as the section background for contrast
    >
      {/* Paper texture overlay (optional, but good for consistency) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 
            className={`text-5xl md:text-7xl font-bold mb-4 ${dmSerif.className}`}
            style={{ color: colors.textGreen }}
          >
            A Place to Be Cared For
          </h2>
          <p className={`text-xl md:text-3xl ${nothingYouCouldDo.className}`} style={{ color: colors.textBrown }}>
            What you can expect from your time at Ghar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {servicesData.map((service, index) => (
            <ServiceVoucher
              key={service.title}
              title={service.title}
              description={service.description}
              delay={index * 0.15}
              accentColor={service.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;