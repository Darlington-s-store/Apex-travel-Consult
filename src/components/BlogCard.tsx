import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface BlogCardProps {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string | { name: string; image?: string };
    category: string;
    readTime?: string;
    tags?: string[];
    featured?: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  handleImageError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default', handleImageError }) => {
  const authorName = typeof post.author === 'string' ? post.author : post.author.name;
  const navigate = useNavigate();
  
  // Default image error handler if none is provided
  const defaultImageErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const isAvatar = target.classList.contains('avatar-image');
    target.src = isAvatar 
      ? '/src/assets/default-avatar.jpg' 
      : '/src/assets/default-blog.jpg';
    target.onerror = null;
  };
  
  const onImageError = handleImageError || defaultImageErrorHandler;
  
  const handlePostClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // Navigate programmatically to ensure the loading state is shown
    navigate(`/blog/${post.slug}`);
  };
  
  if (variant === 'compact') {
    return (
      <div className="flex items-start space-x-4">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
          onError={onImageError}
        />
        <div>
          <div className="text-xs text-[#F59E0B] font-medium mb-1">{post.category}</div>
          <h3 className="font-medium text-[#0F172A] hover:text-[#F59E0B] transition-colors text-sm mb-1">
            <Link to={`/blog/${post.slug}`} onClick={handlePostClick}>{post.title}</Link>
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover" 
            onError={onImageError}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-3 text-[#0F172A] hover:text-[#F59E0B] transition-colors">
            <Link to={`/blog/${post.slug}`} onClick={handlePostClick}>{post.title}</Link>
          </h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span className="mr-4">{post.date}</span>
              <User size={16} className="mr-1" />
              <span>{authorName}</span>
            </div>
            {post.readTime && (
              <span className="text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                {post.readTime}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-48 object-cover" 
        onError={onImageError}
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-3 text-[#0F172A] hover:text-[#F59E0B] transition-colors">
          <Link to={`/blog/${post.slug}`} onClick={handlePostClick}>{post.title}</Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span className="mr-4">{post.date}</span>
            <User size={16} className="mr-1" />
            <span>{authorName}</span>
          </div>
          {post.readTime && (
            <span className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {post.readTime}
            </span>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <Link 
            to={`/blog/${post.slug}`}
            onClick={handlePostClick}
            className="inline-flex items-center text-[#F59E0B] font-medium hover:text-[#E8A317] transition-colors"
          >
            Read More
            <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 