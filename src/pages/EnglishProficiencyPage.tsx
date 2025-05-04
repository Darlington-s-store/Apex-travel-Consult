import { Languages, Book, Award, CheckCircle, Calendar, Mic, FileText, PenTool } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

const EnglishProficiencyPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="English Proficiency Tests"
        subtitle="Comprehensive preparation for IELTS, TOEFL, PTE, and other English language tests"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our English Language Programs</h2>
          <p className="text-gray-700 mb-8">
            At Apex Travel Consult, we offer a range of English language programs designed to help learners at all levels improve their proficiency. 
            Whether you need English for academic purposes, professional advancement, or personal development, we have a program tailored to your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Languages size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">General English</h3>
              <p className="text-gray-600 mb-4">
                Develop all-round English language skills with our comprehensive General English program.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Speaking and pronunciation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Listening comprehension</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Reading and vocabulary</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Writing and grammar</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Book size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Academic English</h3>
              <p className="text-gray-600 mb-4">
                Prepare for university studies with our Academic English program.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Academic writing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Critical reading</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Note-taking skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Presentation skills</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Award size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Business English</h3>
              <p className="text-gray-600 mb-4">
                Enhance your professional communication skills with our Business English program.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Email and report writing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Meeting participation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Negotiation skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Professional presentations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <FileText size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Exam Preparation</h3>
              <p className="text-gray-600 mb-4">
                Targeted preparation for major English proficiency exams.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>IELTS preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>TOEFL preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Cambridge exam preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>PTE Academic preparation</span>
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">English Proficiency Tests We Prepare For</h2>
          <p className="text-gray-700 mb-8">
            We offer specialized preparation courses for all major English proficiency tests required for academic and immigration purposes.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className="text-[#F59E0B] mr-4">
                  <Award size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">IELTS (International English Language Testing System)</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The IELTS is recognized by over 10,000 organizations worldwide, including universities, employers, professional bodies, and immigration authorities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Mic className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Speaking</h4>
                    <p className="text-sm text-gray-600">Face-to-face interview with an examiner</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Reading</h4>
                    <p className="text-sm text-gray-600">Three reading passages with tasks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PenTool className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Writing</h4>
                    <p className="text-sm text-gray-600">Two writing tasks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Languages className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Listening</h4>
                    <p className="text-sm text-gray-600">Four recorded monologues and conversations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className="text-[#F59E0B] mr-4">
                  <Award size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">TOEFL (Test of English as a Foreign Language)</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The TOEFL is widely accepted by universities and colleges in the USA, Canada, and other countries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Mic className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Speaking</h4>
                    <p className="text-sm text-gray-600">Six speaking tasks recorded</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Reading</h4>
                    <p className="text-sm text-gray-600">3-4 passages with questions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PenTool className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Writing</h4>
                    <p className="text-sm text-gray-600">Integrated and independent writing tasks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Languages className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-[#0F172A]">Listening</h4>
                    <p className="text-sm text-gray-600">Lectures, classroom discussions, and conversations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className="text-[#F59E0B] mr-4">
                  <Award size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Cambridge English Qualifications</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Cambridge English Qualifications are in-depth exams that make learning English enjoyable, effective, and rewarding.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">
                    <span className="font-semibold">B2 First (FCE):</span> Upper-intermediate level qualification
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">
                    <span className="font-semibold">C1 Advanced (CAE):</span> Advanced level qualification
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">
                    <span className="font-semibold">C2 Proficiency (CPE):</span> Highest level qualification
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Course Formats</h2>
          <p className="text-gray-700 mb-8">
            We offer flexible course formats to accommodate different schedules and learning preferences:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-[#F59E0B] mx-auto mb-4">
                <Calendar size={36} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Regular Courses</h3>
              <p className="text-gray-600">
                2-3 sessions per week, ideal for those balancing work or studies.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-[#F59E0B] mx-auto mb-4">
                <Calendar size={36} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Intensive Courses</h3>
              <p className="text-gray-600">
                Daily sessions for rapid progress, perfect for those with limited time.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-[#F59E0B] mx-auto mb-4">
                <Calendar size={36} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#0F172A]">Private Tutoring</h3>
              <p className="text-gray-600">
                One-on-one instruction tailored to your specific needs and schedule.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#F59E0B]">
            <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Ready to Improve Your English?</h3>
            <p className="text-gray-700 mb-4">
              Take the first step toward English proficiency by contacting us today for a free level assessment.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium">
                Schedule Assessment
              </button>
              <button className="bg-transparent border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 py-2 px-6 rounded-md transition-colors font-medium">
                View Course Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishProficiencyPage;