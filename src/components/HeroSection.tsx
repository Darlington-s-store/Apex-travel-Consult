import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import videoBackground from '../assets/V1.mp4';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string; // Make this optional
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage
}) => {
  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoBackground} type="video/mp4" />
        {/* Fallback to image if video doesn't load */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        )}
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 to-[#0F172A]/30"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <div className="w-20 h-1 bg-[#F59E0B] mb-8"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {subtitle}
          </p>
          <Link 
            to={buttonLink}
            className="inline-flex items-center bg-[#F59E0B] hover:bg-[#E8A317] text-white py-3 px-6 rounded-md transition-colors font-medium group"
          >
            {buttonText}
            <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;