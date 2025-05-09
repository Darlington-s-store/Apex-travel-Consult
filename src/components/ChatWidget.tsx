import { useState } from 'react';
import { X } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-5 md:right-10 bg-white p-4 rounded-lg shadow-lg w-80 z-50 border-2 border-[#F59E0B] animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#0F172A]">Need Help?</h3>
            <button 
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm mb-4">Chat with us for help with your travel plans!</p>
          <a 
            href="https://wa.me/+233598879349" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-4 rounded flex items-center justify-center transition-colors"
          >
            <img 
              src="/images/whatsapp-logo.svg" 
              alt="WhatsApp" 
              className="w-5 h-5 mr-2" 
            />
            Start WhatsApp Chat
          </a>
        </div>
      )}
      
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:right-10 z-50 flex flex-col space-y-3">
          <a 
            href="tel:+233594189892" 
            className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
            aria-label="Call us directly"
            title="Call us directly"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <button 
            onClick={toggleChat}
            className="bg-[#25D366] p-3.5 rounded-full shadow-lg focus:outline-none transition-all duration-300 hover:bg-[#128C7E]"
            aria-label="Chat with us on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            <img 
              src="/images/whatsapp-logo.svg" 
              alt="WhatsApp" 
              className="w-7 h-7" 
            />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
