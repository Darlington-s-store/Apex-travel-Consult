import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface BlogNewsletterProps {
  title?: string;
  description?: string;
  dark?: boolean;
}

const BlogNewsletter: React.FC<BlogNewsletterProps> = ({ 
  title = "Subscribe to Our Newsletter", 
  description = "Stay updated with our latest news, tips, and insights delivered directly to your inbox.",
  dark = true
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 3000);
    }, 1000);
  };
  
  const bgColor = dark ? 'bg-[#0F172A]' : 'bg-white';
  const textColor = dark ? 'text-white' : 'text-[#0F172A]';
  const subTextColor = dark ? 'text-gray-300' : 'text-gray-600';
  
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6`}>
      <div className="flex items-center mb-4">
        <Mail className={`mr-2 ${dark ? 'text-[#F59E0B]' : 'text-[#0F172A]'}`} size={24} />
        <h2 className={`text-xl font-bold ${textColor}`}>{title}</h2>
      </div>
      
      <p className={`mb-4 ${subTextColor}`}>
        {description}
      </p>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
          <Check size={20} className="text-green-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Thank you for subscribing!</h4>
            <p className="text-green-700 text-sm">We've sent a confirmation email to your inbox.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-gray-700`}
            />
            {error && (
              <div className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle size={14} className="mr-1" />
                {error}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-[#F59E0B]/80' : 'bg-[#F59E0B] hover:bg-[#E8A317]'} text-white py-2 px-4 rounded-md transition-colors font-medium flex justify-center items-center`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
          
          <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
          </p>
        </form>
      )}
    </div>
  );
};

export default BlogNewsletter; 