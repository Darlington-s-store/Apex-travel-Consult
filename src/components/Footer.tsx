import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#F59E0B] pb-2 inline-block">About Us</h3>
            <p className="mb-4">
              Apex Travel Consult specializes in providing expert guidance for international education, 
              travel, and employment opportunities. We help turn your global aspirations into reality.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/apextravelconsult" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/apextravelconsult?utm_source=qr&igsh=cXV6MmFlZHZ5ZW5j" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@apextravelconsult?_t=ZM-8vzoKGy3XzJ&_r=1" className="bg-black p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-3.022-2.9A5.121 5.121 0 0 1 15.848 0h-3.873v16.444c0 1.633-1.335 2.96-2.969 2.96a2.97 2.97 0 0 1-2.969-2.96 2.97 2.97 0 0 1 2.969-2.96c.309 0 .615.048.912.14V9.713a7.003 7.003 0 0 0-.912-.06c-3.859 0-7.006 3.147-7.006 7.004 0 3.858 3.147 7.004 7.006 7.004 3.859 0 7.004-3.147 7.004-7.004V8.989a8.237 8.237 0 0 0 5.283 1.342V6.455a5.152 5.152 0 0 1-1.972-.893Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#F59E0B] pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#F59E0B] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#F59E0B] transition-colors">About Us</Link></li>
              <li><Link to="/study-abroad" className="hover:text-[#F59E0B] transition-colors">Study Abroad</Link></li>
              <li><Link to="/visa-services" className="hover:text-[#F59E0B] transition-colors">Visa Services</Link></li>
              <li><Link to="/blog" className="hover:text-[#F59E0B] transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#F59E0B] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#F59E0B] pb-2 inline-block">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/study-abroad" className="hover:text-[#F59E0B] transition-colors">Study Abroad Programs</Link></li>
              <li><Link to="/recruitment" className="hover:text-[#F59E0B] transition-colors">Recruitment Services</Link></li>
              <li><Link to="/ielts" className="hover:text-[#F59E0B] transition-colors">IELTS Preparation</Link></li>
              <li><Link to="/english-proficiency" className="hover:text-[#F59E0B] transition-colors">English Proficiency</Link></li>
              <li><Link to="/visa-services" className="hover:text-[#F59E0B] transition-colors">Visa Consultation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b-2 border-[#F59E0B] pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-[#F59E0B] mt-1 flex-shrink-0" />
                <span>Santasi Ajacent Amenfiman Rural Bank<br />
                Kumasi Ashanti Region, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[#F59E0B] flex-shrink-0" />
                <span>+233 530 982 527</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[#F59E0B] flex-shrink-0" />
                <span>+233 598 879 349</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[#F59E0B] flex-shrink-0" />
                <span>+233 598 879 348</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-[#F59E0B] flex-shrink-0" />
                <a href="mailto:info@apextravelconsult.com" className="hover:text-[#F59E0B] transition-colors">
                  info@apextravelconsult.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Apex Travel Consult. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;