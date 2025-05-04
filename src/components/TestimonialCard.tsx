import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  testimonial,
  rating,
  image
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#F59E0B]" 
        />
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{location}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 italic">"{testimonial}"</p>
    </div>
  );
};

export default TestimonialCard;