
import { motion } from 'framer-motion';
import { Briefcase, Edit, Trash2, Plus, MapPin, Building } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Ltd',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£50,000 - £70,000',
    status: 'Active',
    applications: 12,
  },
  {
    id: 2,
    title: 'Registered Nurse',
    company: 'City Hospital',
    location: 'Toronto, Canada',
    type: 'Full-time',
    salary: 'CAD 65,000 - 85,000',
    status: 'Active',
    applications: 8,
  },
  // Add more jobs as needed
];

const JobsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Jobs Management
        </motion.h1>
        
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#E8A317] transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Job
        </motion.button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                        <Briefcase size={20} className="text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Building size={14} className="mr-1" />
                        {job.company}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.type} • {job.salary}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    {job.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.applications} applications
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default JobsPage;