import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';
import logo from '../assets/Logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'IELTS', path: '/ielts' },
    { name: 'STUDY ABROAD', path: '/study-abroad' },
    { name: 'RECRUITMENT', path: '/recruitment' },
    { name: 'ENGLISH PROFICIENCY', path: '/english-proficiency' },
    { name: 'VISA SERVICES', path: '/visa-services' },
    { name: 'BLOG', path: '/blog' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-[#0F172A] to-[#1E293B] shadow-lg' 
        : 'bg-gradient-to-r from-[#0F172A] to-[#1E293B]'
    }`}>
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-40 md:w-48 bg-black p-2 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#F59E0B]">
                <img 
                  src={logo} 
                  alt="Apex Travel Consult" 
                  className="h-16 w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center text-white font-medium">
            <Plane className="text-[#F59E0B] mr-2" size={24} />
            <span className="text-lg">YOUR TRAVEL EXPERTS!</span>
            <span className="ml-3 text-base text-gray-200">
              +233 530 982 527 / +233 598 879 349 / +233 598 879 348
            </span>
          </div>

          <div className="lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white p-2 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block border-t border-gray-700">
        <div className="container mx-auto px-4">
          <ul className="flex justify-start space-x-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`inline-block py-4 px-3 font-medium text-sm border-b-2 transition-colors hover:text-[#F59E0B] ${
                    location.pathname === item.path 
                      ? 'border-[#F59E0B] text-[#F59E0B]' 
                      : 'border-transparent text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link 
                to="/book-consultation" 
                className="inline-block py-3 px-5 font-medium text-sm text-[#0F172A] bg-[#F59E0B] hover:bg-[#E8A317] rounded-md transition-colors"
              >
                BOOK CONSULTATION
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 bg-[#0F172A] z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu} 
            className="text-white p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex justify-center mb-6">
            <div className="w-36 bg-black p-3 rounded-lg shadow-md overflow-hidden border border-[#F59E0B]">
              <img 
                src={logo} 
                alt="Apex Travel Consult" 
                className="h-14 w-auto object-contain mx-auto" 
              />
            </div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <Plane className="text-[#F59E0B] mr-2" size={20} />
            <span className="text-sm font-medium text-white">+233 594 189 892</span>
          </div>
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`block py-3 px-4 text-center font-medium rounded-md ${
                    location.pathname === item.path 
                      ? 'bg-[#F59E0B]/20 text-[#F59E0B]' 
                      : 'text-white hover:bg-[#1E293B]'
                  }`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 px-4">
            <Link 
              to="/book-consultation" 
              className="block w-full text-center py-3 px-4 font-medium text-[#0F172A] bg-[#F59E0B] hover:bg-[#E8A317] rounded-md transition-colors"
            >
              BOOK CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;