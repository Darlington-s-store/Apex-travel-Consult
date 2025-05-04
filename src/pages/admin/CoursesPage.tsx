
import { motion } from 'framer-motion';
import { BookOpen, Edit, Trash2, Plus, Users, Clock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'IELTS Preparation Course',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    students: 25,
    status: 'Active',
    price: '$400',
  },
  {
    id: 2,
    title: 'English for Academic Purposes',
    instructor: 'Michael Brown',
    duration: '12 weeks',
    students: 18,
    status: 'Active',
    price: '$600',
  },
  // Add more courses as needed
];

const CoursesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Courses Management
        </motion.h1>
        
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#E8A317] transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Course
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
                Course Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                        <BookOpen size={20} className="text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">
                        Instructor: {course.instructor}
                      </div>
                      <div className="text-sm text-gray-500">
                        Price: {course.price}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {course.duration}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />
                    {course.students} enrolled
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {course.status}
                  </span>
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

export default CoursesPage;