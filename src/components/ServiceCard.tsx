import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  bgColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  icon, 
  description, 
  link,
  bgColor = 'bg-white'
}) => {
  return (
    <Link 
      to={link}
      className={`block ${bgColor} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group`}
    >
      <div className="p-6">
        <div className="mb-4 text-[#F59E0B]">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-[#0F172A] group-hover:text-[#F59E0B] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex items-center text-[#F59E0B] font-medium">
          <span>Learn More</span>
          <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;