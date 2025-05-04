import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, MinusSquare, Maximize2, Phone } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! How can I help you with your travel consultation today?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [agentTyping, setAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Automatic responses based on user messages
  const autoResponses = [
    { 
      keywords: ['hello', 'hi', 'hey'], 
      response: 'Hello! How can I help you with your travel consultation today?' 
    },
    { 
      keywords: ['study', 'abroad', 'university', 'college', 'education'], 
      response: 'We offer comprehensive study abroad services for various destinations. Would you like to schedule a consultation to discuss your options?' 
    },
    { 
      keywords: ['visa', 'immigration', 'permit'], 
      response: 'Our visa experts can help with your application process. What country are you interested in?' 
    },
    { 
      keywords: ['ielts', 'english', 'language', 'test', 'toefl'], 
      response: 'We offer IELTS and TOEFL preparation courses with expert trainers. Our next batch starts soon. Would you like more information?' 
    },
    { 
      keywords: ['cost', 'fee', 'price', 'expensive'], 
      response: 'Our consultation fees vary based on the services you need. The initial consultation is free. Would you like me to explain our service packages?' 
    },
    { 
      keywords: ['job', 'work', 'employment', 'career', 'recruitment'], 
      response: 'Our international recruitment services connect qualified candidates with employers worldwide. What field are you interested in?' 
    }
  ];
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  // Toggle minimized state
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
  
  // Handle message submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate agent typing
    setAgentTyping(true);
    
    // Find automatic response based on message content
    setTimeout(() => {
      setAgentTyping(false);
      
      // Check for matching keywords in the message
      const lowerCaseMessage = message.toLowerCase();
      let responseText = 'Thank you for your message. One of our consultants will get back to you soon. Would you like to schedule a proper consultation?';
      
      for (const response of autoResponses) {
        if (response.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
          responseText = response.response;
          break;
        }
      }
      
      // Add agent response
      const agentResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F59E0B] hover:bg-[#E8A317] text-white shadow-lg transition-all"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/233530982527"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg transition-all absolute bottom-20 right-0"
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      
      {/* Call Button */}
      <a
        href="tel:+233530982527"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-lg transition-all absolute bottom-40 right-0"
        aria-label="Call us"
      >
        <Phone size={24} />
      </a>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[500px]'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-[#0F172A] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center mr-3">
                <User size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium">Live Support</h3>
                <div className="flex items-center text-xs text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={toggleMinimize}
                className="text-white/80 hover:text-white"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={18} /> : <MinusSquare size={18} />}
              </button>
              <a 
                href="https://wa.me/233530982527"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white"
                aria-label="Contact on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a 
                href="tel:+233530982527"
                className="text-white/80 hover:text-white"
                aria-label="Call us"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          {/* Chat Messages */}
          {!isMinimized && (
            <div className="p-4 h-[calc(100%-128px)] overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-[#0F172A] text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 shadow rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {agentTyping && (
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center mr-2">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-[#F59E0B] rounded-full animate-[bounce_0.8s_infinite]" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-3 h-3 bg-[#F59E0B] rounded-full animate-[bounce_0.8s_infinite]" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-3 h-3 bg-[#F59E0B] rounded-full animate-[bounce_0.8s_infinite]" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Chat Input */}
          {!isMinimized && (
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#F59E0B] hover:bg-[#E8A317] text-white px-4 rounded-r-md transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChatWidget; 