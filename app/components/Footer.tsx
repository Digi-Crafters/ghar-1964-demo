"use client";

import { motion } from "framer-motion";
import { DM_Serif_Display, Nothing_You_Could_Do } from "next/font/google";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"; // Using Lucide for modern, clean icons

// --- Fonts ---
// Assuming fonts are defined as in previous sections
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwritten",
});

// --- Colors ---
const colors = {
  vintagePaper: "#FDFBF7",
  textGreen: "#1A4D2E",
  accentGold: "#D4A373",
  textBrown: "#8B5E3C",
  gharPink: "#F4C2C2",
};

const Footer = () => {
  const contactInfo = {
    address: "1964, Heritage Lane, Mumbai, Maharashtra 400001",
    phone: "+91 22 5555 1964",
    email: "reservations@ghar1964.com",
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "About Us", href: "#about" },
    { title: "Experience", href: "#experience" },
    { title: "Services", href: "#services" },
    { title: "Machli's Corner", href: "#machli" },
  ];

  return (
    <footer
      className={`relative pt-20 pb-8 md:pt-32 overflow-hidden ${dmSerif.variable} ${nothingYouCouldDo.variable}`}
      style={{ backgroundColor: colors.vintagePaper }} // Footer on the lightest paper background
    >
      {/* Background Accent Swash (Ghar Pink) */}

      {/* Handwriting Signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <p
          className={`text-5xl ${nothingYouCouldDo.className} transform rotate-1`}
          style={{ color: colors.textGreen }}
        >
          Come Visit Our Ghar.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t pt-12"
          style={{ borderColor: colors.accentGold }}
        >
          {/* 1. Brand / Copyright */}
          <div>
            <h4
              className={`text-3xl font-bold mb-4 ${dmSerif.className}`}
              style={{ color: colors.textGreen }}
            >
              Ghar 1964
            </h4>
            <p className="text-sm" style={{ color: colors.textBrown }}>
              © {new Date().getFullYear()} Ghar 1964. <br /> All rights
              reserved.
            </p>
            <p className="mt-2 text-xs" style={{ color: colors.textBrown }}>
              Designed with love and nostalgia.
            </p>
          </div>

          {/* 2. Contact Information */}
          <div>
            <h4
              className={`text-2xl font-bold mb-4 ${dmSerif.className}`}
              style={{ color: colors.textGreen }}
            >
              Connect
            </h4>
            <ul className="space-y-3" style={{ color: colors.textBrown }}>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    contactInfo.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  {contactInfo.address}
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-500" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Quick Links */}
          <div>
            <h4
              className={`text-2xl font-bold mb-4 ${dmSerif.className}`}
              style={{ color: colors.textGreen }}
            >
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    style={{ fontFamily: dmSerif.style.fontFamily }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social Media */}
          <div>
            <h4
              className={`text-2xl font-bold mb-4 ${dmSerif.className}`}
              style={{ color: colors.textGreen }}
            >
              Follow Our Journey
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.accentGold,
                    color: colors.textGreen,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.textGreen)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.accentGold)
                  }
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final Divider */}
      <div
        className="mt-12 w-full h-0.5 opacity-30"
        style={{ backgroundColor: colors.gharPink }}
      />

      {/* Footer Bottom Text */}
      <div className="container mx-auto px-4 text-center mt-4">
        <p
          className={`text-sm ${nothingYouCouldDo.className}`}
          style={{ color: colors.textBrown }}
        >
          *Machli ensures all mail and reservations are handled with the highest
          level of enthusiasm.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
