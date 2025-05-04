import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  testimonial: string;
  rating: number;
  image: string;
  flag?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Mensah",
    role: "Student",
    country: "Canada",
    testimonial: "The consultation service was exceptional! They helped me understand all the requirements for studying in Canada and guided me through every step of the application process. Now I'm happily studying at the University of Toronto with a scholarship.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    flag: "/images/flags/canada.svg"
  },
  {
    id: 2,
    name: "Sarah Agyeman",
    role: "Medical Professional",
    country: "UK",
    testimonial: "I had been trying to navigate the UK's healthcare professional registration process for months with no success. After just one consultation, they clarified everything and helped me secure a position at a hospital in London. Highly recommended!",
    rating: 5,
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    flag: "/images/flags/uk.svg"
  },
  {
    id: 3,
    name: "Michael Osei",
    role: "IT Professional",
    country: "Germany",
    testimonial: "The visa consultation was incredibly helpful. They identified issues in my initial application that would have caused rejection. With their guidance, my work visa was approved in record time, and I'm now working as a software engineer in Berlin.",
    rating: 4,
    image: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600",
    flag: "/images/flags/germany.svg"
  },
  {
    id: 4,
    name: "Esther Boateng",
    role: "Graduate Student",
    country: "Australia",
    testimonial: "I was overwhelmed by the scholarship options until I had a consultation with Apex. They helped me identify programs that matched my profile perfectly. I'm now studying on a full scholarship at the University of Melbourne!",
    rating: 5,
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
    flag: "/images/flags/australia-simple.svg"
  }
];

const ConsultationTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-300'} 
      />
    ));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-1">What Our Clients Say</h2>
        <p className="text-gray-600 mb-6">
          Real success stories from people who booked consultations with us
        </p>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-[#0F172A] p-2 rounded-full shadow-md transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-[#0F172A] p-2 rounded-full shadow-md transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Testimonials */}
          <div className="overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex' }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 pl-6 pr-6"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#F59E0B]/20">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <div className="relative mb-4">
                        <Quote className="absolute -top-2 -left-2 text-[#F59E0B]/20" size={24} />
                        <p className="text-gray-700 italic pl-4">
                          {testimonial.testimonial}
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-3">
                          {testimonial.flag && (
                            <div className="w-6 h-4 rounded overflow-hidden">
                              <img 
                                src={testimonial.flag} 
                                alt={`${testimonial.country} flag`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://via.placeholder.com/24x16?text=${testimonial.country.charAt(0)}`;
                                }}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className="font-bold text-[#0F172A]">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#F59E0B] w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationTestimonials; 