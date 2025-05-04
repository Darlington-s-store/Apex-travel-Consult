import { Facebook, Instagram } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-medium text-sm md:text-base">
          STUDY | LEARN | TRAVEL | WORK
        </div>
        <div className="flex space-x-2 md:space-x-4">
          <a href="https://www.facebook.com/apextravelconsult" className="hover:text-accent transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://www.instagram.com/apextravelconsult?utm_source=qr&igsh=cXV6MmFlZHZ5ZW5j" className="hover:text-accent transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://www.tiktok.com/@apextravelconsult?_t=ZM-8vzoKGy3XzJ&_r=1" className="hover:text-accent transition-colors" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.321 5.562a5.124 5.124 0 0 1-3.022-2.9A5.121 5.121 0 0 1 15.848 0h-3.873v16.444c0 1.633-1.335 2.96-2.969 2.96a2.97 2.97 0 0 1-2.969-2.96 2.97 2.97 0 0 1 2.969-2.96c.309 0 .615.048.912.14V9.713a7.003 7.003 0 0 0-.912-.06c-3.859 0-7.006 3.147-7.006 7.004 0 3.858 3.147 7.004 7.006 7.004 3.859 0 7.004-3.147 7.004-7.004V8.989a8.237 8.237 0 0 0 5.283 1.342V6.455a5.152 5.152 0 0 1-1.972-.893Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

