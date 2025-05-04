
import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, Globe } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
  { name: 'Active Courses', value: '56', icon: BookOpen, change: '+8%' },
  { name: 'Students Abroad', value: '789', icon: GraduationCap, change: '+15%' },
  { name: 'Countries', value: '25', icon: Globe, change: '+4%' },
];

const DashboardPage = () => {
  return (
    <div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-[#F59E0B]/10 rounded-full">
                  <Icon className="text-[#F59E0B]" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-500 text-sm font-medium">
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
};

export default DashboardPage;