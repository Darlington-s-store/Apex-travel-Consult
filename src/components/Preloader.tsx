import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';

interface PreloaderProps {
  minDuration?: number; // Minimum time to show the preloader in ms
}

const Preloader: React.FC<PreloaderProps> = ({ minDuration = 1000 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (1 + Math.random() * 5);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Handle loading completion after minDuration
    const timer = setTimeout(() => {
      clearInterval(interval);
    }, minDuration);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#0F172A] to-[#1E293B] transition-opacity duration-500 ${
        loadingProgress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-48 h-48 flex items-center justify-center bg-black p-6 rounded-xl border-2 border-[#F59E0B] shadow-lg mb-8">
        <img 
          src={logo} 
          alt="Apex Travel Consult" 
          className="w-full h-auto object-contain animate-pulse" 
        />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-3 h-3 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-3 h-3 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
      
      <div className="w-64 bg-gray-300 rounded-full h-2.5 mb-4 overflow-hidden">
        <div 
          className="bg-[#F59E0B] h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
      
      <p className="text-white font-medium">Loading your experience...</p>
    </div>
  );
};

export default Preloader;