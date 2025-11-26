'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DM_Serif_Display, Nothing_You_Could_Do } from 'next/font/google';
import { Bed, User, HandPlatter } from 'lucide-react';

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

// --- Type Definitions ---
interface Room {
  name: string;
  tag: string;
  description: string;
  capacity: number;
  bed: string;
  meal: string;
}

// --- Reusable Room Card Component ---
const RoomCard = ({ room, delay, index }: { room: Room; delay: number; index: number }) => {
  // Generate consistent random rotation based on index
  const initialRotate = ((index * 7) % 10 - 5);
  const viewRotate = ((index * 3) % 4 - 2);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotate: initialRotate }}
      whileInView={{ y: 0, opacity: 1, rotate: viewRotate }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}
      transition={{ duration: 0.8, delay: delay, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative bg-white shadow-2xl p-4 cursor-pointer"
      style={{ border: `4px dashed ${colors.gharPink}` }}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden filter sepia-[0.1] hover:sepia-0 transition-all duration-700">
        <Image
          src="/two.jpeg"
          alt={`Image of ${room.name}`}
          width={400}
          height={300}
          className="object-cover h-full w-full"
        />
        {/* Handwritten Label/Tag */}
        <div 
            className="absolute top-4 left-4 p-2 transform -rotate-6"
            style={{ backgroundColor: colors.accentGold, color: colors.textGreen, clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)' }}
        >
            <span className={`text-xl ${nothingYouCouldDo.className}`}>The {room.tag}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 text-center">
        <h3 className={`text-3xl mb-2 ${dmSerif.className}`} style={{ color: colors.textGreen }}>
          {room.name}
        </h3>
        <p className={`text-md mb-4 ${nothingYouCouldDo.className} text-xl`} style={{ color: colors.textBrown }}>
          {room.description}
        </p>

        {/* Features Grid */}
        <div className="flex justify-center space-x-6 pt-2 border-t mt-3" style={{ borderColor: colors.gharPink }}>
            <div className="flex items-center text-sm" style={{ color: colors.textGreen }}>
                <User className="w-4 h-4 mr-1" />
                <span>{room.capacity} Guests</span>
            </div>
            <div className="flex items-center text-sm" style={{ color: colors.textGreen }}>
                <Bed className="w-4 h-4 mr-1" />
                <span>{room.bed}</span>
            </div>
            <div className="flex items-center text-sm" style={{ color: colors.textGreen }}>
                <HandPlatter className="w-4 h-4 mr-1" />
                <span>{room.meal}</span>
            </div>
        </div>

        {/* Pricing / CTA Button */}
        <button
            className={`mt-6 w-full py-2 font-bold rounded-md transition-all duration-300 ${dmSerif.className}`}
            style={{ backgroundColor: colors.textGreen, color: colors.vintagePaper }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = colors.textBrown;
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = colors.textGreen;
            }}
        >
            View Details & Reserve
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Accommodation Component ---
const Accommodation = () => {
  const roomData: Room[] = [
    {
      name: "The Veranda Suite",
      tag: "Premier",
      description: "Our largest room, featuring a private balcony overlooking Machli's garden. A true oasis of tranquility.",
      capacity: 4,
      bed: "King + Sofa Bed",
      meal: "Breakfast & Dinner"
    },
    {
      name: "The Machli Quarters",
      tag: "Cozy",
      description: "A snug, sunlit room on the ground floor, known for Machli's occasional afternoon visits by the window.",
      capacity: 2,
      bed: "Double Bed",
      meal: "Breakfast Only"
    },
    {
      name: "The Traveler's Den",
      tag: "Solace",
      description: "Designed for the solo adventurer, offering a quiet workspace and access to the library corner. Simple and sweet.",
      capacity: 1,
      bed: "Single Bed",
      meal: "Breakfast Only"
    },
    {
      name: "The Family Wing",
      tag: "Community",
      description: "Two connecting rooms sharing a common entryway, ideal for families or close groups seeking togetherness.",
      capacity: 5,
      bed: "2 Doubles + 1 Single",
      meal: "Breakfast & Dinner"
    },
  ];

  return (
    <section 
      className={`py-20 md:py-32 overflow-hidden relative ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.gharPink }}
    >
      {/* Background Grain Texture */}
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
            style={{ color: colors.textGreen, textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
          >
            Your Home at Ghar 1964
          </h2>
          <p className={`text-xl md:text-3xl ${nothingYouCouldDo.className}`} style={{ color: colors.vintagePaper, textShadow: '1px 1px 0px rgba(0,0,0,0.2)' }}>
            Choose the room where your next cherished memories will unfold.
          </p>
        </div>

        {/* Room Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {roomData.map((room, index) => (
            <RoomCard
              key={room.name}
              room={room}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodation;