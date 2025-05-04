import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Search, Tag, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoHeroSection from '../components/VideoHeroSection';
import BlogCard from '../components/BlogCard';
import BlogNewsletter from '../components/blog/BlogNewsletter';
import { blogPosts, blogCategories, trendingTopics, BlogPost } from '../data/blogData';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Recent posts from the data
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === 'All' ? null : category);
  };

  // Handle search query
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need to update filteredPosts here as it's done in useEffect
  };

  // Update filtered posts whenever activeCategory or searchQuery changes
  useEffect(() => {
    let results = [...blogPosts];
    
    // Apply category filter
    if (activeCategory) {
      results = results.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(results);
  }, [activeCategory, searchQuery]);

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Posts to display in the main content area
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : blogPosts;

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="Our Blog"
        subtitle="Insights, tips, and resources for international education and travel"
      />
      
      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <div className="bg-[#0F172A] py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Posts</h2>
              <Link to="/blog" className="text-[#F59E0B] hover:text-[#E8A317] transition-colors font-medium flex items-center">
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant="featured" 
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-4 md:mb-0">Blog</h1>
          <div className="w-full md:w-auto flex items-center">
            <div className="relative w-full md:w-64 mr-2">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
              <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button 
              className="md:hidden bg-[#F59E0B] text-white px-3 py-2 rounded-md flex items-center"
              onClick={toggleFilters}
            >
              <Filter size={18} className="mr-1" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 whitespace-nowrap pb-2">
                {blogCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      (category.name === 'All' && activeCategory === null) || category.name === activeCategory
                        ? 'bg-[#F59E0B] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name} <span className="ml-1">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
            
            {displayPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {/* Pagination would go here */}
            {displayPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mx-1">
                  Previous
                </button>
                <button className="bg-[#F59E0B] hover:bg-[#E8A317] text-white font-medium py-2 px-4 rounded-md mx-1">
                  1
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mx-1">
                  2
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mx-1">
                  3
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mx-1">
                  Next
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">Search</h2>
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search blog posts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#F59E0B]">
                  <Search size={18} />
                </button>
              </form>
            </div>
            
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <TrendingUp size={20} className="text-[#F59E0B] mr-2" />
                <h2 className="text-xl font-bold text-[#0F172A] border-b border-gray-100 pb-2 flex-grow">
                  Trending Topics
                </h2>
              </div>
              <ul className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <a href="#" className="text-gray-700 hover:text-[#F59E0B] transition-colors">
                      {topic.name}
                    </a>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {topic.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Tag size={20} className="text-[#F59E0B] mr-2" />
                <h2 className="text-xl font-bold text-[#0F172A] border-b border-gray-100 pb-2 flex-grow">
                  Popular Tags
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10).map((tag, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b border-gray-100 pb-2">Recent Posts</h2>
              <ul className="space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <Link to={`/blog/${post.slug}`} className="block hover:text-[#F59E0B] transition-colors">
                      <h3 className="font-medium text-[#0F172A] mb-1">{post.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <BlogNewsletter />
    </div>
  );
};

export default BlogPage;