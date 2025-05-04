
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAdminStore } from '../../lib/store';
import { motion } from 'framer-motion';

const AdminHeader = () => {
  const { user, logout } = useAdminStore();

  return (
    <motion.header 
      className="bg-white shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;