import React from 'react';
import videoBackground from '../assets/V1.mp4';

interface VideoHeroSectionProps {
  title: string;
  subtitle?: string;
}

const VideoHeroSection: React.FC<VideoHeroSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 to-[#0F172A]/30"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white/90 mb-8">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoHeroSection; 