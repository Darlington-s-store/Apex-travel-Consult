import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MessageCircle, Heart, Facebook, Linkedin, ArrowRight, ArrowLeft, Bookmark, User, Share2 } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/blog/CommentSection';
import BlogNewsletter from '../components/blog/BlogNewsletter';
import { blogPosts, getRelatedPosts, getPreviousAndNextPosts, BlogPost } from '../data/blogData';
import { useLoading } from '../contexts/LoadingContext';
import ReactMarkdown from 'react-markdown';

// Fallback images
const DEFAULT_BLOG_IMAGE = '/src/assets/default-blog.jpg';
const DEFAULT_AVATAR = '/src/assets/default-avatar.jpg';

// Image error handler
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  const isAvatar = target.classList.contains('avatar-image');
  target.src = isAvatar ? DEFAULT_AVATAR : DEFAULT_BLOG_IMAGE;
  target.onerror = null; // Prevent infinite loop if fallback also fails
};

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useLoading();
  const initialLoadRef = useRef(true);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [navigation, setNavigation] = useState<{ previous: BlogPost | null, next: BlogPost | null }>({
    previous: null,
    next: null
  });

  // This effect runs when the component mounts or when the slug changes
  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    
    // Find the post by slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts
      const related = getRelatedPosts(foundPost.id, foundPost.category, 3);
      setRelatedPosts(related);
      
      // Get previous and next posts
      const navPosts = getPreviousAndNextPosts(foundPost.id);
      setNavigation(navPosts);
      
      // Set page title
      document.title = `${foundPost.title} | Bolt Education Consultants`;
    } else {
      // Redirect to blog listing if post not found
      navigate('/blog');
    }
    
    // Simulate network request
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Only scroll to top on initial page load, not when navigating between posts
      if (initialLoadRef.current) {
        window.scrollTo(0, 0);
        initialLoadRef.current = false;
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug, navigate, setLoading]);

  // Reset the initialLoadRef when the component unmounts
  useEffect(() => {
    return () => {
      initialLoadRef.current = true;
    };
  }, []);

  // Disable scrolling issues by disabling body scroll-behavior during navigation
  useEffect(() => {
    document.body.style.scrollBehavior = 'auto';
    
    return () => {
      document.body.style.scrollBehavior = '';
    };
  }, [location.pathname]);

  if (!post) {
    return null; // Loading state is handled by the LoadingContext
  }

  // Format the author data
  const authorName = typeof post.author === 'string' ? post.author : post.author.name;
  const authorImage = typeof post.author === 'string' ? DEFAULT_AVATAR : post.author.image;
  const authorBio = typeof post.author === 'string' ? '' : post.author.bio || '';

  // Parse date for better display
  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle navigation between posts
  const handlePostNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetSlug: string) => {
    e.preventDefault();
    navigate(`/blog/${targetSlug}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#0F172A] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-4 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center text-gray-300 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="relative -mt-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" 
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8" ref={contentRef}>
              {/* Post Content */}
              <div className="prose prose-lg max-w-none">
                {post.content ? (
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                ) : (
                  <>
                    <p className="lead">{post.excerpt}</p>
                    <p>This article content is not available. Please check back later.</p>
                  </>
                )}
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      to={`/blog?tag=${tag}`} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-start">
                  <img 
                    src={authorImage} 
                    alt={authorName} 
                    className="w-16 h-16 rounded-full mr-4 avatar-image" 
                    onError={handleImageError}
                  />
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{authorName}</h3>
                    {authorBio && (
                      <p className="text-gray-600 text-sm">{authorBio}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Share & Like */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center">
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
                  <button className="text-[#0F172A] hover:text-[#F59E0B] transition-colors">
                    <Facebook size={20} />
                  </button>
                  <button className="text-[#0F172A] hover:text-[#F59E0B] transition-colors">
                    <Linkedin size={20} />
                  </button>
                  <button className="text-[#0F172A] hover:text-[#F59E0B] transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                <div className="flex items-center">
                  <button className="flex items-center text-[#0F172A] hover:text-[#F59E0B] transition-colors mr-4">
                    <Heart size={20} className="mr-1" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center text-[#0F172A] hover:text-[#F59E0B] transition-colors">
                    <Bookmark size={20} className="mr-1" />
                    <span className="text-sm">Save</span>
                  </button>
                </div>
              </div>
              
              {/* Comments */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center">
                  <MessageCircle size={20} className="mr-2 text-[#F59E0B]" />
                  Comments
                </h3>
                <CommentSection postId={post.id} />
              </div>
              
              {/* Post Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                {navigation.previous ? (
                  <a 
                    href={`/blog/${navigation.previous.slug}`}
                    onClick={(e) => handlePostNavigation(e, navigation.previous!.slug)}
                    className="flex items-center text-[#0F172A] hover:text-[#F59E0B] transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Previous</div>
                      <span className="font-medium">{navigation.previous.title.length > 40 ? navigation.previous.title.substring(0, 40) + '...' : navigation.previous.title}</span>
                    </div>
                  </a>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}
                
                {navigation.next ? (
                  <a 
                    href={`/blog/${navigation.next.slug}`}
                    onClick={(e) => handlePostNavigation(e, navigation.next!.slug)}
                    className="flex items-center text-right text-[#0F172A] hover:text-[#F59E0B] transition-colors"
                  >
                    <div>
                      <div className="text-xs text-gray-500">Next</div>
                      <span className="font-medium">{navigation.next.title.length > 40 ? navigation.next.title.substring(0, 40) + '...' : navigation.next.title}</span>
                    </div>
                    <ArrowRight size={20} className="ml-2" />
                  </a>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b border-gray-100 pb-2">Related Posts</h2>
              <div className="space-y-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard 
                    key={relatedPost.id} 
                    post={relatedPost} 
                    variant="compact"
                    handleImageError={handleImageError} 
                  />
                ))}
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b border-gray-100 pb-2">Popular Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Link to="/blog?category=Study Abroad" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Study Abroad
                </Link>
                <Link to="/blog?category=Visa Services" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Visa Services
                </Link>
                <Link to="/blog?category=English Proficiency" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  English Proficiency
                </Link>
                <Link to="/blog?category=Recruitment" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Recruitment
                </Link>
                <Link to="/blog?category=Student Life" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Student Life
                </Link>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-[#0F172A] rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300 mb-4">Stay up to date with the latest news and tips for international education.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
                <button 
                  type="submit" 
                  className="w-full bg-[#F59E0B] hover:bg-[#E8A317] text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Newsletter Section */}
      <BlogNewsletter />
    </div>
  );
};

export default BlogPostDetail;