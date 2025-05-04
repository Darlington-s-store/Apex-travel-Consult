import React, { useEffect, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import logo from '../assets/Logo.png';

interface LoadingScreenProps {
  minDuration?: number;
}

// Define the keyframes animation in regular CSS
const blinkAnimation = `
  @keyframes blink {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const { isLoading } = useLoading();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      // Delay hiding the loader for a smoother transition
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle the initial page load
  useEffect(() => {
    const handleLoad = () => {
      if (!isLoading) {
        setVisible(false);
      }
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A] transition-opacity duration-500 ${
        !isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: blinkAnimation }} />
      <div className="w-64 h-64 flex items-center justify-center bg-black p-6 rounded-xl border-2 border-[#F59E0B] shadow-lg">
        <img 
          src={logo} 
          alt="Bolt Education Consultants" 
          className="w-full h-auto object-contain"
          style={{
            animation: 'blink 3s infinite'
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 