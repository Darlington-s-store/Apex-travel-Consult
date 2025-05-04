import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import TestimonialCard from '../components/TestimonialCard';
import CircularProgress from '../components/CircularProgress';
import { GraduationCap, Briefcase, Languages, Import as Passport, Award, Globe, School, CreditCard, ArrowRight, MapPin, Calendar, User, Send, ChevronRight, Clock, AlertCircle, Check, ChevronDown, ChevronUp, ChevronLeft, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog posts data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: "Guide to Studying in Canada in 2025",
    excerpt: "Everything you need to know about Canadian universities, visa requirements, and scholarships.",
    image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg",
    date: "April 10, 2025",
    author: "Sarah Johnson",
    category: "Study Abroad"
  },
  {
    id: 2,
    title: "Top 5 In-Demand Skills for International Jobs",
    excerpt: "Discover which professional skills are most sought after by global employers in today's market.",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    date: "April 3, 2025",
    author: "Michael Chen",
    category: "Careers"
  },
  {
    id: 3,
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    excerpt: "A comprehensive comparison of the two most popular English proficiency tests for international students.",
    image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg",
    date: "March 25, 2025",
    author: "Emma Williams",
    category: "Language Testing"
  }
];

// Sample countries data
const countries = [
  { 
    name: "USA", 
    flag: "/images/flags/usa-simple.svg", 
    fallbackFlag: "https://flagcdn.com/w80/us.png",
    title: "Study & Work" 
  },
  { 
    name: "Canada", 
    flag: "/images/flags/canada.svg", 
    fallbackFlag: "https://flagcdn.com/w80/ca.png",
    title: "Study & Immigration" 
  },
  { 
    name: "UK", 
    flag: "/images/flags/uk.svg", 
    fallbackFlag: "https://flagcdn.com/w80/gb.png",
    title: "Study & Work" 
  },
  { 
    name: "Australia", 
    flag: "/images/flags/australia-simple.svg", 
    fallbackFlag: "https://flagcdn.com/w80/au.png",
    title: "Study & Work" 
  },
  { 
    name: "Germany", 
    flag: "/images/flags/germany.svg", 
    fallbackFlag: "https://flagcdn.com/w80/de.png",
    title: "Study (Free)" 
  },
  { 
    name: "France", 
    flag: "/images/flags/france.svg", 
    fallbackFlag: "https://flagcdn.com/w80/fr.png",
    title: "Study (Low Tuition)" 
  }
];

// Partner logos
const partners = [
  { name: "University of Toronto", logo: "/images/partners/university-toronto.svg" },
  { name: "University of Melbourne", logo: "/images/partners/university-melbourne.svg" },
  { name: "Harvard University", logo: "/images/partners/harvard.svg" },
  { name: "McGill University", logo: "/images/partners/mcgill-university.svg" },
  { name: "Oxford University", logo: "/images/partners/oxford.svg" },
  { name: "Stanford University", logo: "/images/partners/stanford.svg" },
  { name: "MIT", logo: "/images/partners/mit-university.svg" },
  { name: "ETH Zurich", logo: "/images/partners/eth-zurich.svg" },
  { name: "National University of Singapore", logo: "/images/partners/national-university-singapore.svg" },
  { name: "British Council", logo: "/images/partners/british-council.svg" },
  { name: "Education USA", logo: "/images/partners/education-usa.svg" },
  { name: "Cambridge English", logo: "/images/partners/cambridge-english.svg" },
  { name: "Australian Education Board", logo: "/images/partners/australian-edu-board.svg" },
  { name: "Study Abroad Institute", logo: "/images/partners/study-abroad-institute.svg" }
];

// Stats counter component
interface StatCounterProps {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, label, icon, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const Icon = icon;
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/,/g, ''));
    const incrementTime = Math.floor(duration / end);
    
    if (start === end) return;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-3 bg-[#F59E0B]/10 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
        <Icon className="text-[#F59E0B]" size={30} />
      </div>
      <h3 className="text-4xl font-bold text-[#0F172A] mb-2">{count.toLocaleString()}+</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

// Countdown Timer Component
interface CountdownTimerProps {
  targetDate: Date;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, title, subtitle, buttonText, buttonLink }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-8 rounded-lg shadow-lg text-white">
      <div className="flex items-center justify-center mb-5">
        <Clock className="text-[#F59E0B] mr-3" size={28} />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-center text-white/80 mb-8">{subtitle}</p>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="text-center">
          <div className="bg-white/10 p-4 rounded-lg mb-2">
            <span className="text-3xl font-bold text-[#F59E0B]">{timeLeft.days}</span>
          </div>
          <span className="text-sm">Days</span>
        </div>
        <div className="text-center">
          <div className="bg-white/10 p-4 rounded-lg mb-2">
            <span className="text-3xl font-bold text-[#F59E0B]">{timeLeft.hours}</span>
          </div>
          <span className="text-sm">Hours</span>
        </div>
        <div className="text-center">
          <div className="bg-white/10 p-4 rounded-lg mb-2">
            <span className="text-3xl font-bold text-[#F59E0B]">{timeLeft.minutes}</span>
          </div>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="text-center">
          <div className="bg-white/10 p-4 rounded-lg mb-2">
            <span className="text-3xl font-bold text-[#F59E0B]">{timeLeft.seconds}</span>
          </div>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
      
      <div className="text-center">
        <Link to={buttonLink} className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-3 px-8 rounded-md transition-colors inline-block font-medium">
          {buttonText}
        </Link>
        
        <div className="flex items-center justify-center mt-4 text-sm text-white/70">
          <AlertCircle size={14} className="mr-2" />
          <span>Limited spots available</span>
        </div>
      </div>
    </div>
  );
};

// FAQ Item component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-5 px-4 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-left text-[#0F172A]">{question}</h3>
        <div className="ml-2 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="text-[#F59E0B]" size={20} />
          ) : (
            <ChevronDown className="text-[#F59E0B]" size={20} />
          )}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5 px-4' : 'max-h-0'
        }`}
      >
        <div className="text-gray-600">{answer}</div>
      </div>
    </div>
  );
};

// Sample FAQs data
const faqs = [
  {
    question: "What services does Apex Travel Consult offer?",
    answer: "We offer a comprehensive range of services including study abroad consultations, international recruitment assistance, language testing preparation (IELTS, TOEFL), and visa application support. Our goal is to help you achieve your international education and career goals with personalized guidance every step of the way."
  },
  {
    question: "How much does it cost to use your services?",
    answer: "Our service fees vary depending on the specific service you require. We offer competitive rates with flexible payment options. We believe in transparency, so all costs will be clearly explained during your initial consultation. We also offer package deals for clients who require multiple services."
  },
  {
    question: "Which countries can you help me apply to?",
    answer: "We specialize in helping clients apply to institutions in several countries including the USA, Canada, UK, Australia, Germany, France, and many other European and Asian destinations. Our network of university and employer partners spans across these countries, giving you a wide range of options."
  },
  {
    question: "What is the success rate for visa applications through your service?",
    answer: "We're proud to maintain a visa success rate of over 98% for our clients. This high success rate is due to our thorough understanding of visa requirements, meticulous document preparation, and comprehensive interview coaching. We stay updated with the latest immigration policies to ensure your application has the best chance of approval."
  },
  {
    question: "How long does the whole application process take?",
    answer: "The timeline varies depending on your destination country, the type of program or job you're applying for, and visa processing times. On average, the process from initial consultation to departure can take 3-8 months. During your consultation, we'll provide you with a more specific timeline based on your individual situation and goals."
  },
  {
    question: "Do you provide support after I arrive in the destination country?",
    answer: "Yes, we offer post-arrival support services to help you settle into your new environment. This includes assistance with accommodation, bank account setup, local transportation guidance, and connecting you with our alumni network in your destination. Our commitment to your success extends beyond just getting you there."
  }
];

// Quick Facts component
interface QuickFactProps {
  number: string;
  label: string;
  description: string;
  color: string;
}

const QuickFact: React.FC<QuickFactProps> = ({ number, label, description, color }) => {
  return (
    <div className="text-center p-6">
      <div className={`text-4xl font-bold mb-2 ${color}`}>{number}</div>
      <h3 className="font-bold text-lg mb-1 text-[#0F172A]">{label}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// Success Story component
interface SuccessStoryProps {
  name: string;
  role: string;
  country: string;
  image: string;
  story: string;
  flag?: string;
}

const successStories: SuccessStoryProps[] = [
  {
    name: "Emmanuel Osei",
    role: "Medical Student",
    country: "Canada",
    flag: "/images/flags/canada.svg",
    image: "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "Coming from Ghana with dreams of becoming a doctor, Apex Travel Consult guided me through my application to the University of Toronto. They helped me secure a partial scholarship and made the visa process smooth. I'm now in my second year of medical school and loving every moment of this journey!"
  },
  {
    name: "Fatima Mensah",
    role: "Software Engineer",
    country: "Germany",
    flag: "/images/flags/germany.svg",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600", 
    story: "I wanted to study in Germany but had no idea where to start. The team at Apex helped me with everything from university selection to language preparation. I graduated with a degree in Computer Science and now work for a major tech company in Berlin. Their guidance changed my life completely."
  },
  {
    name: "Daniel Kwame",
    role: "MBA Graduate",
    country: "UK",
    flag: "/images/flags/uk.svg",
    image: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "After working for 3 years in Ghana, I wanted to pursue an MBA abroad. Apex Travel Consult helped me build a strong application that got me accepted into a top business school in London. Their IELTS preparation course was excellent, and their visa guidance was precise and helpful. I'm now working in finance in London."
  },
  {
    name: "Abena Frimpong",
    role: "Research Scientist",
    country: "Australia",
    flag: "/images/flags/australia-simple.svg",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
    story: "I had a dream of pursuing environmental science research in Australia. The consultants at Apex were incredibly knowledgeable about Australian universities and scholarship opportunities. They helped me secure a full scholarship at the University of Melbourne. I'm now working on climate change research and making a real impact."
  }
];

const SuccessStoryCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % successStories.length);
      
      // Reset animation flag after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + successStories.length) % successStories.length);
      
      // Reset animation flag after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  useEffect(() => {
    // Auto advance slides every 8 seconds
    timerRef.current = window.setInterval(() => {
      goToNext();
    }, 8000);
    
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const currentStory = successStories[currentIndex];

  return (
    <div className="relative overflow-hidden">
      {/* Navigation buttons */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-[#0F172A] p-2 rounded-full shadow-md transition-all"
        aria-label="Previous story"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-[#0F172A] p-2 rounded-full shadow-md transition-all"
        aria-label="Next story"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Story content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-xl overflow-hidden">
        <div className="lg:col-span-2 relative overflow-hidden">
          <img 
            src={currentStory.image} 
            alt={currentStory.name} 
            className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out transform animate-fadeIn"
            key={currentStory.name} // Force re-render on image change
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center">
              <div className="mr-3">
                {currentStory.flag && (
                  <div className="w-10 h-6 rounded overflow-hidden">
                    <img 
                      src={currentStory.flag}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/30x20?text=${currentStory.country}`;
                      }}
                      alt={`${currentStory.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{currentStory.name}</h3>
                <p className="text-white/80 text-sm">{currentStory.role}, {currentStory.country}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <div className="text-5xl text-[#F59E0B]">"</div>
          </div>
          <p className="text-lg text-white/90 mb-8 italic transition-all duration-500 ease-in-out animate-fadeIn" key={currentStory.name}>
            {currentStory.story}
          </p>
          
          {/* Indicators */}
          <div className="flex space-x-2 mt-auto">
            {successStories.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-[#F59E0B] w-10' : 'bg-white/30'}`}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// BackToTop component
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#F59E0B] text-white shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

// Destination map component
const DestinationMap: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>("north-america");
  
  const regions = [
    { id: "north-america", name: "North America", countries: ["USA", "Canada"], color: "#3B82F6" },
    { id: "europe", name: "Europe", countries: ["UK", "Germany", "France", "Spain", "Italy"], color: "#10B981" },
    { id: "australia", name: "Australia", countries: ["Australia", "New Zealand"], color: "#F59E0B" },
    { id: "asia", name: "Asia", countries: ["China", "Japan", "South Korea", "Singapore"], color: "#8B5CF6" },
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="bg-[#0F172A] p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Popular Destinations</h3>
          <div className="space-y-4">
            {regions.map((region) => (
              <button
                key={region.id}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeRegion === region.id
                    ? `bg-${region.id === 'north-america' ? '[#3B82F6]' : 
                        region.id === 'europe' ? '[#10B981]' : 
                        region.id === 'australia' ? '[#F59E0B]' : '[#8B5CF6]'} text-white`
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
                onClick={() => setActiveRegion(region.id)}
              >
                <div className="font-bold text-lg">{region.name}</div>
                <div className="text-sm mt-1 opacity-80">
                  {region.countries.join(", ")}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-8">
            <Link
              to="/study-abroad"
              className="inline-flex items-center text-white font-medium hover:text-[#F59E0B] transition-colors"
            >
              View all destinations
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
        
        <div className="col-span-2 p-0 relative">
          <div className="h-full">
            {activeRegion === "north-america" && (
              <div className="animate-fadeIn">
                <img 
                  src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="North America"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0F172A] to-transparent">
                  <h3 className="text-3xl font-bold text-white">North America</h3>
                  <p className="text-white/80 mt-2 max-w-md">
                    Study in world-renowned universities across the USA and Canada, 
                    with excellent prospects for post-graduation work opportunities.
                  </p>
                </div>
              </div>
            )}
            
            {activeRegion === "europe" && (
              <div className="animate-fadeIn">
                <img 
                  src="https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Europe"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0F172A] to-transparent">
                  <h3 className="text-3xl font-bold text-white">Europe</h3>
                  <p className="text-white/80 mt-2 max-w-md">
                    Experience world-class education in historic European countries, 
                    including free tuition options in Germany and affordable programs in France.
                  </p>
                </div>
              </div>
            )}
            
            {activeRegion === "australia" && (
              <div className="animate-fadeIn">
                <img 
                  src="https://images.pexels.com/photos/981682/pexels-photo-981682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Australia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0F172A] to-transparent">
                  <h3 className="text-3xl font-bold text-white">Australia</h3>
                  <p className="text-white/80 mt-2 max-w-md">
                    High-quality education with excellent quality of life and post-study work 
                    opportunities in Australia and New Zealand.
                  </p>
                </div>
              </div>
            )}
            
            {activeRegion === "asia" && (
              <div className="animate-fadeIn">
                <img 
                  src="https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Asia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0F172A] to-transparent">
                  <h3 className="text-3xl font-bold text-white">Asia</h3>
                  <p className="text-white/80 mt-2 max-w-md">
                    Discover cutting-edge technology and innovation in the educational 
                    hubs of Japan, South Korea, Singapore, and China.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ServiceHighlight component for the carousel
interface ServiceHighlightProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  isActive: boolean;
  onClick: () => void;
}

const ServiceHighlight: React.FC<ServiceHighlightProps> = ({
  title,
  subtitle,
  description,
  icon,
  link,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? 'bg-[#0F172A] text-white scale-105 shadow-xl' : 'bg-white text-[#0F172A] hover:bg-gray-50'
      } rounded-lg shadow-md overflow-hidden`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full mr-4 ${isActive ? 'bg-[#F59E0B]' : 'bg-[#F59E0B]/10'}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>
          </div>
        </div>
        
        <p className={`text-sm mb-6 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <Link 
          to={link}
          className={`inline-flex items-center font-medium ${
            isActive ? 'text-[#F59E0B]' : 'text-[#F59E0B]'
          } hover:text-[#E8A317] transition-colors text-sm`}
        >
          Learn more
          <ArrowRight className="ml-2" size={14} />
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const heroImage = "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg";
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email to your backend
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };
  
  // For the countdown timer - set to a date 2 months in the future
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 2);
  
  // For FAQ accordion
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };
  
  // For service highlights
  const [activeService, setActiveService] = useState(0);
  
  const serviceHighlights = [
    {
      title: "Study Abroad",
      subtitle: "International Education",
      description: "Find your perfect university match with our personalized guidance on applications, scholarships, and course selection.",
      icon: <GraduationCap size={24} className="text-white" />,
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      link: "/study-abroad"
    },
    {
      title: "Recruitment Services",
      subtitle: "International Careers",
      description: "Connect with top global employers through our network and receive guidance on job applications and work permits.",
      icon: <Briefcase size={24} className="text-white" />,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      link: "/recruitment"
    },
    {
      title: "Language Testing",
      subtitle: "IELTS & TOEFL Preparation",
      description: "Achieve your target scores with our comprehensive preparation courses, practice tests, and personalized feedback.",
      icon: <Languages size={24} className="text-white" />,
      image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      link: "/english-proficiency"
    },
    {
      title: "Visa Services",
      subtitle: "Expert Application Support",
      description: "Navigate complex visa requirements with our step-by-step guidance, document preparation, and interview coaching.",
      icon: <Passport size={24} className="text-white" />,
      image: "https://images.pexels.com/photos/2574010/pexels-photo-2574010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      link: "/visa-services"
    }
  ];
  
  return (
    <div>
      <HeroSection 
        title="LET'S BEGIN YOUR JOURNEY ABROAD"
        subtitle="We assist qualified and skilled candidates connect with appropriate employers, schools, and travel opportunities worldwide."
        buttonText="VIEW SERVICES"
        buttonLink="/study-abroad"
        backgroundImage={heroImage}
      />
      
      {/* Service Highlights Section - Replaces the static service cards section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Services</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the wide range of services we offer to help you achieve your international education, career, and travel goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceHighlights.map((service, index) => (
                <ServiceHighlight
                  key={index}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                  isActive={activeService === index}
                  onClick={() => setActiveService(index)}
                />
              ))}
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-96 shadow-lg">
              {serviceHighlights.map((service, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeService === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-white/80 max-w-md mb-6">{service.description}</p>
                    <Link
                      to={service.link}
                      className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors inline-flex items-center font-medium"
                    >
                      Explore {service.title}
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Add the Countdown Timer section after Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Next IELTS Preparation Course</h2>
              <div className="w-20 h-1 bg-[#F59E0B] mb-6"></div>
              <p className="text-gray-600 mb-8">
                Our intensive IELTS preparation course is designed to help you achieve the band score you need for your academic or immigration goals. With expert instructors and personalized feedback, you'll be well-prepared for your exam.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-1 bg-[#F59E0B]/10 rounded-full mr-3 mt-1">
                    <Check className="text-[#F59E0B]" size={16} />
                  </div>
                  <span>Small class sizes (maximum 15 students)</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 bg-[#F59E0B]/10 rounded-full mr-3 mt-1">
                    <Check className="text-[#F59E0B]" size={16} />
                  </div>
                  <span>Comprehensive study materials included</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 bg-[#F59E0B]/10 rounded-full mr-3 mt-1">
                    <Check className="text-[#F59E0B]" size={16} />
                  </div>
                  <span>Practice tests with detailed feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="p-1 bg-[#F59E0B]/10 rounded-full mr-3 mt-1">
                    <Check className="text-[#F59E0B]" size={16} />
                  </div>
                  <span>One-on-one speaking practice sessions</span>
                </li>
              </ul>
            </div>
            
            <div>
              <CountdownTimer 
                targetDate={futureDate}
                title="Next Course Starts In"
                subtitle="Secure your spot in our upcoming IELTS preparation course before all places are filled."
                buttonText="Register Now"
                buttonLink="/english-proficiency"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Counter Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Impact By The Numbers</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've helped thousands of students and professionals achieve their international goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000" label="Students Placed Abroad" icon={GraduationCap} />
            <StatCounter value="500" label="Partner Universities" icon={School} />
            <StatCounter value="35" label="Countries Served" icon={Globe} />
            <StatCounter value="98" label="Visa Success Rate %" icon={Passport} />
          </div>
        </div>
      </section>
      
      {/* Visual Progress Stats Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our Success Metrics</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              We take pride in our record of success helping clients achieve their international education and career goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <CircularProgress percentage={98} color="#F59E0B">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">98%</span>
                </div>
              </CircularProgress>
              <h3 className="mt-4 text-xl font-bold text-white">Visa Success</h3>
              <p className="text-white/70 text-center mt-2">Our visa applications have a 98% approval rate</p>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularProgress percentage={85} color="#10B981">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">85%</span>
                </div>
              </CircularProgress>
              <h3 className="mt-4 text-xl font-bold text-white">Scholarship Rate</h3>
              <p className="text-white/70 text-center mt-2">85% of our students receive financial aid</p>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularProgress percentage={92} color="#3B82F6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">92%</span>
                </div>
              </CircularProgress>
              <h3 className="mt-4 text-xl font-bold text-white">Top Universities</h3>
              <p className="text-white/70 text-center mt-2">92% of our students get into their top 3 choices</p>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularProgress percentage={100} color="#8B5CF6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">100%</span>
                </div>
              </CircularProgress>
              <h3 className="mt-4 text-xl font-bold text-white">Client Support</h3>
              <p className="text-white/70 text-center mt-2">Complete support throughout your journey</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Why Choose Apex Travel Consult?</h2>
              <div className="w-20 h-1 bg-[#F59E0B] mb-6"></div>
              <p className="text-gray-600 mb-8">
                With years of experience in international education and travel consultation, we provide personalized services to help you achieve your global ambitions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-4">
                    <Award className="text-[#F59E0B]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Expert Consultants</h3>
                    <p className="text-gray-600">Our team consists of experienced professionals who know the ins and outs of international education.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-4">
                    <Globe className="text-[#F59E0B]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Global Network</h3>
                    <p className="text-gray-600">We have partnerships with universities and employers worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-4">
                    <School className="text-[#F59E0B]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Custom Solutions</h3>
                    <p className="text-gray-600">We provide personalized guidance tailored to your specific goals and needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-[#F59E0B]/10 rounded-lg mr-4">
                    <CreditCard className="text-[#F59E0B]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Affordable Rates</h3>
                    <p className="text-gray-600">We offer competitive pricing and flexible payment options for our services.</p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center mt-8 font-medium text-[#F59E0B] hover:text-[#E8A317] transition-colors"
              >
                Learn more about us
                <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" size={16} />
              </Link>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
                alt="Students discussing with an advisor" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Destination Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Explore Popular Destinations</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the wide range of educational and career opportunities available around the world.
            </p>
          </div>
          
          <DestinationMap />
        </div>
      </section>
      
      {/* Quick Facts Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Quick Facts About Studying Abroad</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Interesting statistics and facts about international education and career opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <QuickFact 
              number="90%" 
              label="Employment Rate" 
              description="Students who study abroad have a 90% employment rate within six months of graduation."
              color="text-green-600"
            />
            <QuickFact 
              number="25%" 
              label="Higher Salaries" 
              description="International graduates earn up to 25% more than those who study domestically."
              color="text-[#F59E0B]"
            />
            <QuickFact 
              number="50+" 
              label="Countries Welcome Students" 
              description="Over 50 countries actively recruit international students with specialized programs."
              color="text-blue-600"
            />
            <QuickFact 
              number="6M+" 
              label="Students Worldwide" 
              description="More than 6 million students choose to study outside their home country each year."
              color="text-purple-600"
            />
          </div>
          
          <div className="mt-12 p-6 bg-[#0F172A]/5 rounded-lg max-w-5xl mx-auto text-center">
            <p className="text-lg text-[#0F172A]">
              "International education is not just about academics; it's about gaining a global perspective, building cross-cultural competencies, and developing the resilience needed in today's interconnected world."
            </p>
            <p className="mt-4 font-bold">Dr. Samuel Mensah - Education Policy Expert</p>
          </div>
        </div>
      </section>
      
      {/* Countries We Serve Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Countries We Serve</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore educational and career opportunities in these top destinations with our expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {countries.map((country, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-24 flex items-center justify-center p-4 border-b border-gray-100">
                  <img 
                    src={country.flag}
                    onError={(e) => {
                      // If the SVG fails to load, fall back to the fallback image
                      const target = e.target as HTMLImageElement;
                      if (country.fallbackFlag && target.src !== country.fallbackFlag) {
                        target.src = country.fallbackFlag;
                      } else {
                        // If fallback also fails, use placeholder
                        target.src = `https://via.placeholder.com/80x60?text=${country.name}`;
                      }
                    }}
                    alt={`${country.name} flag`}
                    className="h-16 w-auto object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[#0F172A]">{country.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{country.title}</p>
                </div>
                <div className="bg-[#0F172A] text-white text-center py-2 text-sm font-medium cursor-pointer hover:bg-[#0F172A]/90">
                  <Link to={`/study-abroad`} className="block w-full h-full">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/study-abroad" 
              className="inline-flex items-center font-medium text-[#F59E0B] hover:text-[#E8A317] transition-colors"
            >
              View all destinations
              <ArrowRight className="ml-2 transition-all duration-300" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience with Apex Travel Consult.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Opoku Ampofo Dorigen"
              location="Studying in Canada"
              testimonial="Apex Travel Consult helped me secure admission to my dream university in Canada. Their guidance throughout the visa process was invaluable."
              rating={5}
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
            />
            
            <TestimonialCard 
              name="Daniel Mensah"
              location="Working in Australia"
              testimonial="I couldn't have navigated the complicated work visa process without the expert help from the Apex team. Now I'm happily working in Melbourne!"
              rating={5}
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            />
            
            <TestimonialCard 
              name="Priya Sharma"
              location="Studying in UK"
              testimonial="Their IELTS preparation course was excellent, and I achieved the band score I needed for my UK university application. Highly recommended!"
              rating={4}
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            />
          </div>
        </div>
      </section>
      
      {/* Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Latest From Our Blog</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, tips, and advice for your international education and career journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-[#0F172A] hover:text-[#F59E0B] transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center font-medium text-[#F59E0B] hover:text-[#E8A317] transition-colors"
                  >
                    Read more
                    <ChevronRight className="ml-1" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/blog" 
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white py-3 px-6 rounded-md transition-colors font-medium inline-flex items-center"
            >
              View All Articles
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-[#F59E0B]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-6">
                  Stay updated with the latest opportunities, tips, and news about studying and working abroad.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                  >
                    <span>Subscribe</span>
                    <Send size={16} className="ml-2" />
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </div>
              <div className="hidden md:block relative">
                <img
                  src="https://images.pexels.com/photos/3759059/pexels-photo-3759059.jpeg"
                  alt="Newsletter"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0F172A]/60"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#F59E0B] rounded-full mr-3">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <p className="font-medium">Join 5,000+ subscribers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, application processes, and more.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-5">Still have questions? We're here to help.</p>
            <Link 
              to="/contact" 
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white py-3 px-6 rounded-md transition-colors font-medium inline-flex items-center"
            >
              Contact Our Team
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Trusted Partners</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading institutions and organizations worldwide to provide you with the best opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {partners.map((partner, index) => {
              // Create an inline SVG fallback as a data URI (most reliable fallback)
              const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f1f5f9" stroke="%23e2e8f0" stroke-width="2"/><text x="100" y="50" font-family="Arial, sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">${partner.name}</text></svg>`;

              return (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 transform border border-gray-100"
                >
                  <div className="flex items-center justify-center h-24">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        try {
                          const target = e.target as HTMLImageElement;
                          // Use the inline SVG data URI as fallback
                          target.src = fallbackSvg;
                        } catch (err) {
                          console.log('Error handling image fallback', err);
                        }
                      }}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2 font-medium">{partner.name}</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/about" 
              className="inline-flex items-center font-medium text-[#F59E0B] hover:text-[#E8A317] transition-colors"
            >
              View all our partners
              <ArrowRight className="ml-2 transition-all duration-300" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Success Stories</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read about the journeys of our clients who successfully achieved their international education and career goals.
            </p>
          </div>
          
          <SuccessStoryCarousel />
          
          <div className="text-center mt-12">
            <Link 
              to="/about" 
              className="inline-flex items-center font-medium text-[#F59E0B] hover:text-[#E8A317] transition-colors"
            >
              View more success stories
              <ArrowRight className="ml-2 transition-all duration-300" size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contact our team of experts today and take the first step toward your international education and career goals.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              to="/contact" 
              className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-3 px-8 rounded-md transition-colors font-medium"
            >
              Contact Us
            </Link>
            <Link 
              to="/study-abroad" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-md transition-colors font-medium"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;