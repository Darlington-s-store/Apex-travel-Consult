
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings,
  BookOpen,
  Briefcase,
  GraduationCap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/admin' },
  { icon: Users, name: 'Users', path: '/admin/users' },
  { icon: FileText, name: 'Blog Posts', path: '/admin/posts' },
  { icon: BookOpen, name: 'Services', path: '/admin/services' },
  { icon: Briefcase, name: 'Jobs', path: '/admin/jobs' },
  { icon: GraduationCap, name: 'Courses', path: '/admin/courses' },
  { icon: Globe, name: 'Countries', path: '/admin/countries' },
  { icon: Settings, name: 'Settings', path: '/admin/settings' },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <motion.aside 
      className="w-64 bg-white shadow-sm h-screen"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li 
                key={item.name}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#F59E0B] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;