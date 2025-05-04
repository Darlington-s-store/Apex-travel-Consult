import { useState } from 'react';
import { CheckCircle, Award, Users, Calendar, FileText, BookOpen, Download, Calculator, Star, ArrowRight } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

type ScoreSection = 'listening' | 'reading' | 'writing' | 'speaking';

const IeltsPage = () => {
  const [bandScores, setBandScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  
  const [overallScore, setOverallScore] = useState(0);
  
  const handleScoreChange = (section: ScoreSection, value: string) => {
    const newScores = { ...bandScores, [section]: parseFloat(value) };
    setBandScores(newScores);
    
    // Calculate overall score
    const sum = Object.values(newScores).reduce((acc, score) => acc + score, 0);
    const average = sum / 4;
    setOverallScore(Math.round(average * 2) / 2); // Round to nearest 0.5
  };
  
  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="IELTS Preparation"
        subtitle="Comprehensive training and resources to help you achieve your target IELTS band score"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our IELTS Preparation Program</h2>
            <p className="text-gray-700 mb-8">
              The International English Language Testing System (IELTS) is one of the world's most popular English language proficiency tests. 
              At Apex Travel Consult, we offer comprehensive IELTS preparation courses designed to help you achieve your target band score.
            </p>
            
            {/* Interactive Band Score Calculator */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-10 border-l-4 border-[#F59E0B]">
              <div className="flex items-center mb-4">
                <Calculator size={24} className="text-[#F59E0B] mr-2" />
                <h3 className="text-2xl font-bold text-[#0F172A]">IELTS Band Score Calculator</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Use our calculator to estimate your overall IELTS band score based on individual section scores.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Listening</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    value={bandScores.listening}
                    onChange={(e) => handleScoreChange('listening', e.target.value)}
                  >
                    {[...Array(19)].map((_, i) => {
                      const value = i * 0.5;
                      return <option key={i} value={value}>{value.toFixed(1)}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reading</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    value={bandScores.reading}
                    onChange={(e) => handleScoreChange('reading', e.target.value)}
                  >
                    {[...Array(19)].map((_, i) => {
                      const value = i * 0.5;
                      return <option key={i} value={value}>{value.toFixed(1)}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Writing</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    value={bandScores.writing}
                    onChange={(e) => handleScoreChange('writing', e.target.value)}
                  >
                    {[...Array(19)].map((_, i) => {
                      const value = i * 0.5;
                      return <option key={i} value={value}>{value.toFixed(1)}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speaking</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    value={bandScores.speaking}
                    onChange={(e) => handleScoreChange('speaking', e.target.value)}
                  >
                    {[...Array(19)].map((_, i) => {
                      const value = i * 0.5;
                      return <option key={i} value={value}>{value.toFixed(1)}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Overall Band Score:</span>
                  <span className="text-2xl font-bold text-[#0F172A]">{overallScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Why Choose Our IELTS Program?</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Experienced Instructors:</span> Our IELTS trainers are certified professionals with years of experience in preparing students for the exam.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Comprehensive Curriculum:</span> Our courses cover all four test components: Listening, Reading, Writing, and Speaking.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Practice Tests:</span> Regular mock tests to familiarize you with the exam format and assess your progress.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Small Class Sizes:</span> We maintain small groups to ensure personalized attention for each student.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">
                    <span className="font-semibold">Flexible Schedule:</span> Choose between weekday, weekend, and intensive courses to fit your schedule.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <BookOpen size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Academic IELTS</h3>
                <p className="text-gray-600 mb-4">
                  For students planning to study at undergraduate or postgraduate levels, or seeking professional registration.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>University admissions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Professional certification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Immigration requirements</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <FileText size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">General Training IELTS</h3>
                <p className="text-gray-600 mb-4">
                  For those migrating to English-speaking countries or pursuing work experience or secondary education.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Work visa applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Immigration purposes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Secondary education</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Our Course Structure</h2>
            <p className="text-gray-700 mb-6">
              Our IELTS preparation courses are structured to provide comprehensive coverage of all test components and ample opportunity for practice and feedback.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Diagnostic Assessment</h3>
                  <p className="text-gray-600">
                    Begin with a diagnostic test to assess your current English level and identify areas for improvement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Core Training</h3>
                  <p className="text-gray-600">
                    Learn essential strategies, techniques, and language skills for all four components of the IELTS test.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Intensive Practice</h3>
                  <p className="text-gray-600">
                    Regular practice sessions focusing on each component, with immediate feedback and guidance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Mock Tests</h3>
                  <p className="text-gray-600">
                    Full-length practice tests under exam conditions to build confidence and time management skills.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Final Review</h3>
                  <p className="text-gray-600">
                    Comprehensive review of all components and targeted practice for areas needing improvement.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Success Stories Section */}
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "After struggling with the IELTS Speaking section for months, I joined Apex's preparation course and improved from 6.0 to 7.5 in just 6 weeks. The personalized feedback and mock tests made all the difference."
                </p>
                <div className="flex items-center">
                  <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-medium">SK</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Samuel K.</p>
                    <p className="text-sm text-gray-600">Band Score: 7.5 | University of Manchester</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The IELTS writing module was always my weakness. The structured approach and detailed feedback from Apex's instructors helped me understand my mistakes and improve systematically. I achieved my target score of 7.0!"
                </p>
                <div className="flex items-center">
                  <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-medium">AJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Amira J.</p>
                    <p className="text-sm text-gray-600">Band Score: 7.0 | University of Toronto</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The mock tests and timed practice sessions prepared me perfectly for the actual exam environment. I wasn't nervous on test day because I knew exactly what to expect. Thanks to Apex, I scored 8.0 overall!"
                </p>
                <div className="flex items-center">
                  <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-medium">RN</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Robert N.</p>
                    <p className="text-sm text-gray-600">Band Score: 8.0 | Imperial College London</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "I had taken the IELTS test twice before joining Apex's program, but couldn't get the score I needed for my visa. The focused strategies and intensive practice helped me finally achieve my required band score of 6.5."
                </p>
                <div className="flex items-center">
                  <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-medium">LW</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A]">Lin W.</p>
                    <p className="text-sm text-gray-600">Band Score: 6.5 | University of Sydney</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Free Resources Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-10">
              <div className="flex items-center mb-4">
                <Download size={24} className="text-[#F59E0B] mr-2" />
                <h3 className="text-2xl font-bold text-[#0F172A]">Free IELTS Resources</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Access our collection of free resources to help you prepare for your IELTS exam.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="text-[#F59E0B] mr-3" size={20} />
                  <div>
                    <p className="font-medium text-[#0F172A]">IELTS Writing Task 1 Templates</p>
                    <p className="text-sm text-gray-600">PDF Download • 1.2 MB</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
                
                <a href="#" className="flex items-center p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="text-[#F59E0B] mr-3" size={20} />
                  <div>
                    <p className="font-medium text-[#0F172A]">IELTS Speaking Part 2 Topics</p>
                    <p className="text-sm text-gray-600">PDF Download • 850 KB</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
                
                <a href="#" className="flex items-center p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="text-[#F59E0B] mr-3" size={20} />
                  <div>
                    <p className="font-medium text-[#0F172A]">Common Academic Reading Questions</p>
                    <p className="text-sm text-gray-600">PDF Download • 1.5 MB</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
                
                <a href="#" className="flex items-center p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="text-[#F59E0B] mr-3" size={20} />
                  <div>
                    <p className="font-medium text-[#0F172A]">IELTS Vocabulary List by Topic</p>
                    <p className="text-sm text-gray-600">PDF Download • 1.1 MB</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="inline-flex items-center text-[#F59E0B] font-medium hover:underline">
                  View all resources
                  <ArrowRight className="ml-1" size={16} />
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#F59E0B]">
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Ready to Start?</h3>
              <p className="text-gray-700 mb-4">
                Join our next IELTS preparation course and take a significant step toward achieving your target band score.
              </p>
              <button className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium">
                Register Now
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b-2 border-[#F59E0B] pb-2">Upcoming Batches</h2>
              <ul className="space-y-4">
                <li className="border-b border-gray-100 pb-3">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-[#F59E0B] mr-2" />
                    <span className="font-medium">Weekend Batch</span>
                  </div>
                  <p className="text-gray-600 text-sm">Starts: June 15, 2025</p>
                  <p className="text-gray-600 text-sm">Schedule: Sat & Sun, 10AM - 1PM</p>
                </li>
                <li className="border-b border-gray-100 pb-3">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-[#F59E0B] mr-2" />
                    <span className="font-medium">Weekday Evening Batch</span>
                  </div>
                  <p className="text-gray-600 text-sm">Starts: June 20, 2025</p>
                  <p className="text-gray-600 text-sm">Schedule: Mon-Fri, 6PM - 8PM</p>
                </li>
                <li>
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-[#F59E0B] mr-2" />
                    <span className="font-medium">Intensive Batch</span>
                  </div>
                  <p className="text-gray-600 text-sm">Starts: July 5, 2025</p>
                  <p className="text-gray-600 text-sm">Schedule: Daily, 9AM - 12PM (2 weeks)</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b-2 border-[#F59E0B] pb-2">Course Fees</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Regular Course (8 weeks)</span>
                  <span className="font-semibold">$450</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Intensive Course (2 weeks)</span>
                  <span className="font-semibold">$650</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Weekend Course (10 weeks)</span>
                  <span className="font-semibold">$500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Individual Coaching (hourly)</span>
                  <span className="font-semibold">$50/hr</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b-2 border-[#F59E0B] pb-2">Success Stories</h2>
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <div className="flex items-center mb-2">
                    <Users size={18} className="text-[#F59E0B] mr-2" />
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-[#F59E0B] mr-2" />
                    <span className="text-gray-600 text-sm">Band Score: 8.0</span>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "The strategies and practice sessions were incredibly helpful. I achieved my target score on my first attempt!"
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Users size={18} className="text-[#F59E0B] mr-2" />
                    <span className="font-medium">Mary Smith</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-[#F59E0B] mr-2" />
                    <span className="text-gray-600 text-sm">Band Score: 7.5</span>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "The instructors were professional and supportive. They helped me improve my writing score significantly."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeltsPage;