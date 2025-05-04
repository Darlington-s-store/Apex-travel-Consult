import React, { useState } from 'react';
import { Plane, BookOpen, Building, GraduationCap, Award, Clock, Search, DollarSign, BarChart, X, Globe } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

const StudyAbroadPage = () => {
  const [searchParams, setSearchParams] = useState({
    country: '',
    level: '',
    field: '',
  });
  
  const [scholarshipData, setScholarshipData] = useState({
    gpa: '3.5',
    testScore: '100',
    extracurricular: 'Medium',
    researchExp: 'Yes',
    needBased: 'No',
  });
  
  const [scholarshipAmount, setScholarshipAmount] = useState(0);
  
  const [compareItems, setCompareItems] = useState<Array<{id: number, name: string, tuition: string, duration: string, rank: string}>>([]);
  
  const universities = [
    { id: 1, name: 'University of Oxford', country: 'United Kingdom', level: 'Undergraduate', field: 'Business', tuition: '$45,000/year', duration: '3 years', rank: '#2' },
    { id: 2, name: 'Harvard University', country: 'United States', level: 'Undergraduate', field: 'Business', tuition: '$52,000/year', duration: '4 years', rank: '#1' },
    { id: 3, name: 'University of Toronto', country: 'Canada', level: 'Undergraduate', field: 'Engineering', tuition: '$39,000/year', duration: '4 years', rank: '#18' },
    { id: 4, name: 'University of Melbourne', country: 'Australia', level: 'Postgraduate', field: 'Computer Science', tuition: '$41,000/year', duration: '2 years', rank: '#31' },
    { id: 5, name: 'Technical University of Munich', country: 'Germany', level: 'Postgraduate', field: 'Engineering', tuition: '$2,000/year', duration: '2 years', rank: '#50' },
    { id: 6, name: 'ETH Zurich', country: 'Switzerland', level: 'Postgraduate', field: 'Engineering', tuition: '$1,500/year', duration: '2 years', rank: '#6' },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const handleScholarshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScholarshipData({
      ...scholarshipData,
      [name]: value
    });
    
    // Calculate potential scholarship amount
    calculateScholarship();
  };
  
  const calculateScholarship = () => {
    // Simple algorithm to calculate scholarship potential
    let base = 5000;
    
    // GPA factor
    if (scholarshipData.gpa === '4.0') base += 10000;
    else if (scholarshipData.gpa === '3.7') base += 7000;
    else if (scholarshipData.gpa === '3.5') base += 5000;
    else if (scholarshipData.gpa === '3.0') base += 2000;
    
    // Test score factor
    if (scholarshipData.testScore === '110+') base += 8000;
    else if (scholarshipData.testScore === '100') base += 6000;
    else if (scholarshipData.testScore === '90') base += 3000;
    else if (scholarshipData.testScore === '80') base += 1000;
    
    // Extracurricular factor
    if (scholarshipData.extracurricular === 'High') base += 5000;
    else if (scholarshipData.extracurricular === 'Medium') base += 2500;
    
    // Research experience
    if (scholarshipData.researchExp === 'Yes') base += 4000;
    
    // Need-based
    if (scholarshipData.needBased === 'Yes') base += 7000;
    
    setScholarshipAmount(base);
  };
  
  const addToCompare = (uni: any) => {
    if (compareItems.length < 3 && !compareItems.some(item => item.id === uni.id)) {
      setCompareItems([...compareItems, uni]);
    }
  };
  
  const removeFromCompare = (id: number) => {
    setCompareItems(compareItems.filter(item => item.id !== id));
  };
  
  const filteredUniversities = universities.filter(uni => {
    return (searchParams.country === '' || uni.country === searchParams.country) &&
           (searchParams.level === '' || uni.level === searchParams.level) &&
           (searchParams.field === '' || uni.field === searchParams.field);
  });
  
  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="Study Abroad Programs"
        subtitle="Expand your horizons and advance your education with our comprehensive study abroad programs"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b-2 border-[#F59E0B] pb-2">Destinations</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>United Kingdom</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>Canada</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>United States</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>Australia</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>New Zealand</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>Germany</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Plane size={18} className="mr-2" />
                  <span>France</span>
                </li>
              </ul>
            </div>
            
            {/* Scholarship Calculator */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <DollarSign size={22} className="text-[#F59E0B] mr-2" />
                <h2 className="text-xl font-bold text-[#0F172A]">Scholarship Calculator</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Estimate potential scholarship amount based on your profile.
              </p>
              
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA (4.0 scale)</label>
                  <select 
                    name="gpa"
                    value={scholarshipData.gpa}
                    onChange={handleScholarshipChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="4.0">4.0 (Excellent)</option>
                    <option value="3.7">3.7 (Very Good)</option>
                    <option value="3.5">3.5 (Good)</option>
                    <option value="3.0">3.0 (Average)</option>
                    <option value="2.5">2.5 (Below Average)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Score (TOEFL/IELTS)</label>
                  <select 
                    name="testScore"
                    value={scholarshipData.testScore}
                    onChange={handleScholarshipChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="110+">TOEFL 110+ / IELTS 8+</option>
                    <option value="100">TOEFL 100-109 / IELTS 7.5</option>
                    <option value="90">TOEFL 90-99 / IELTS 7.0</option>
                    <option value="80">TOEFL 80-89 / IELTS 6.5</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Extracurricular Activities</label>
                  <select 
                    name="extracurricular"
                    value={scholarshipData.extracurricular}
                    onChange={handleScholarshipChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="High">High (Leadership roles)</option>
                    <option value="Medium">Medium (Regular participation)</option>
                    <option value="Low">Low (Minimal involvement)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Research Experience</label>
                  <select 
                    name="researchExp"
                    value={scholarshipData.researchExp}
                    onChange={handleScholarshipChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Need-Based Consideration</label>
                  <select 
                    name="needBased"
                    value={scholarshipData.needBased}
                    onChange={handleScholarshipChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Estimated Scholarship:</span>
                  <span className="text-xl font-bold text-[#0F172A]">${scholarshipAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This is an estimate based on your profile. Actual scholarship amounts may vary by institution.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b-2 border-[#F59E0B] pb-2">Study Levels</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <BookOpen size={18} className="mr-2" />
                  <span>Undergraduate</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <BookOpen size={18} className="mr-2" />
                  <span>Postgraduate</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <BookOpen size={18} className="mr-2" />
                  <span>PhD Programs</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <BookOpen size={18} className="mr-2" />
                  <span>Diploma Courses</span>
                </li>
                <li className="flex items-center text-gray-700 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <BookOpen size={18} className="mr-2" />
                  <span>Language Programs</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our Study Abroad Services</h2>
            <p className="text-gray-700 mb-8">
              At Apex Travel Consult, we provide comprehensive support for students seeking to pursue their education abroad. 
              Our expert consultants will guide you through every step of the process, from selecting the right institution and program 
              to securing your visa and preparing for your journey.
            </p>
            
            {/* University Finder */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-10">
              <div className="flex items-center mb-4">
                <Search size={24} className="text-[#F59E0B] mr-2" />
                <h3 className="text-2xl font-bold text-[#0F172A]">University Finder</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Find the perfect university for your study abroad journey based on your preferences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    name="country" 
                    value={searchParams.country}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Any Country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Study Level</label>
                  <select 
                    name="level" 
                    value={searchParams.level}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Any Level</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <select 
                    name="field" 
                    value={searchParams.field}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Any Field</option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map(uni => (
                    <div key={uni.id} className="bg-gray-50 p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{uni.name}</h4>
                        <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Globe size={14} className="mr-1" />
                            {uni.country}
                          </span>
                          <span className="flex items-center">
                            <BookOpen size={14} className="mr-1" />
                            {uni.level}
                          </span>
                          <span className="flex items-center">
                            <BarChart size={14} className="mr-1" />
                            {uni.rank}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => addToCompare(uni)}
                        disabled={compareItems.some(item => item.id === uni.id) || compareItems.length >= 3}
                        className={`text-sm px-3 py-1 rounded ${compareItems.some(item => item.id === uni.id) || compareItems.length >= 3 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
                      >
                        {compareItems.some(item => item.id === uni.id) ? 'Added' : 'Compare'}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No universities match your search criteria. Try adjusting your filters.
                  </div>
                )}
              </div>
            </div>
            
            {/* Program Comparison */}
            {compareItems.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                <div className="flex items-center mb-4">
                  <BarChart size={24} className="text-[#F59E0B] mr-2" />
                  <h3 className="text-2xl font-bold text-[#0F172A]">Program Comparison</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Compare your selected universities side by side.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 text-gray-700 font-semibold border-b">Comparison Factors</th>
                        {compareItems.map(item => (
                          <th key={item.id} className="text-left p-3 text-gray-700 font-semibold border-b relative">
                            {item.name}
                            <button 
                              onClick={() => removeFromCompare(item.id)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                              <X size={16} />
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b font-medium text-gray-700">Tuition</td>
                        {compareItems.map(item => (
                          <td key={item.id} className="p-3 border-b">{item.tuition}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b font-medium text-gray-700">Program Duration</td>
                        {compareItems.map(item => (
                          <td key={item.id} className="p-3 border-b">{item.duration}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-b font-medium text-gray-700">World Ranking</td>
                        {compareItems.map(item => (
                          <td key={item.id} className="p-3 border-b">{item.rank}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <Building size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">University Selection</h3>
                <p className="text-gray-600">
                  Get personalized recommendations for universities and colleges that match your academic profile, career goals, and budget.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <GraduationCap size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Application Assistance</h3>
                <p className="text-gray-600">
                  Receive step-by-step guidance on completing application forms, writing personal statements, and gathering required documents.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <Award size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Scholarship Guidance</h3>
                <p className="text-gray-600">
                  Learn about and apply for various scholarship opportunities to help fund your international education.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
                <div className="text-[#F59E0B] mb-4">
                  <Clock size={36} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Pre-Departure Briefing</h3>
                <p className="text-gray-600">
                  Get comprehensive information about what to expect upon arrival, accommodation options, local transportation, and more.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Our Application Process</h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Initial Consultation</h3>
                  <p className="text-gray-600">
                    Meet with our education consultants to discuss your academic background, career goals, and preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Institution Selection</h3>
                  <p className="text-gray-600">
                    Receive a list of recommended institutions based on your profile and requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Application Submission</h3>
                  <p className="text-gray-600">
                    We help you prepare and submit applications to your chosen institutions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Offer Acceptance</h3>
                  <p className="text-gray-600">
                    Once you receive offers, we help you evaluate and accept the most suitable one.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visa Application</h3>
                  <p className="text-gray-600">
                    We guide you through the student visa application process, documentation, and interview preparation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pre-Departure Support</h3>
                  <p className="text-gray-600">
                    Receive comprehensive briefing and support before you depart for your study destination.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#F59E0B]">
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Get Started Today</h3>
              <p className="text-gray-700 mb-4">
                Ready to take the first step toward your international education? Contact us to schedule your initial consultation.
              </p>
              <button className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadPage;