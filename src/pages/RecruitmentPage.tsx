import React, { useState } from 'react';
import { Briefcase, CheckCircle, Building, Users, MapPin, Search, DollarSign, CheckSquare, X, FileText, BarChart2, Clipboard, MessageCircle, Trash2 } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

// Define interfaces for type safety
interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  industry: string;
  experienceLevel: string;
  salary: string;
  skills: string[];
}

interface AssessmentSkill {
  name: string;
  level: number;
}

interface ApplicationStatus {
  id: number;
  position: string;
  company: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  dateApplied: string;
  nextStep?: string;
}

const RecruitmentPage = () => {
  // State for Job Matching Tool
  const [jobSearchParams, setJobSearchParams] = useState({
    skills: '',
    location: '',
    industry: '',
    experienceLevel: '',
  });
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [showJobResults, setShowJobResults] = useState(false);
  
  // State for Salary Calculator
  const [salaryParams, setSalaryParams] = useState({
    country: '',
    industry: '',
    role: '',
    experience: '',
    education: '',
  });
  const [salaryEstimate, setSalaryEstimate] = useState<{min: number, max: number, currency: string} | null>(null);
  
  // State for Visa Eligibility Checker
  const [visaParams, setVisaParams] = useState({
    nationality: '',
    destination: '',
    jobOffer: 'no',
    qualification: '',
    experience: '',
    language: '',
  });
  const [visaEligibilityResult, setVisaEligibilityResult] = useState<{
    eligible: boolean;
    score: number;
    maxScore: number;
    visaType: string;
    requirements: string[];
  } | null>(null);
  
  // State for Interview Simulator
  const [interviewIndustry, setInterviewIndustry] = useState('');
  const [interviewRole, setInterviewRole] = useState('');
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  
  // State for Skill Assessment
  const [skills, setSkills] = useState<AssessmentSkill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState(3);
  
  // State for Application Tracker
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [newApplication, setNewApplication] = useState({
    position: '',
    company: '',
    dateApplied: '',
  });
  const [showAddApplication, setShowAddApplication] = useState(false);
  
  // Sample job listings
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Senior Nurse',
      company: 'NHS',
      location: 'United Kingdom',
      industry: 'Healthcare',
      experienceLevel: 'Senior',
      salary: '£35,000 - £42,000',
      skills: ['Nursing', 'Patient Care', 'Medical Records', 'Team Leadership']
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Microsoft',
      location: 'United States',
      industry: 'Information Technology',
      experienceLevel: 'Mid-level',
      salary: '$85,000 - $110,000',
      skills: ['JavaScript', 'React', 'Node.js', 'Cloud Services']
    },
    {
      id: 3,
      title: 'Civil Engineer',
      company: 'AECOM',
      location: 'Canada',
      industry: 'Engineering',
      experienceLevel: 'Mid-level',
      salary: 'CAD 75,000 - 90,000',
      skills: ['Structural Design', 'AutoCAD', 'Project Management']
    },
    {
      id: 4,
      title: 'English Teacher',
      company: 'International School of Dubai',
      location: 'UAE',
      industry: 'Education',
      experienceLevel: 'Entry-level',
      salary: 'AED 12,000 - 18,000 monthly',
      skills: ['Teaching', 'Curriculum Development', 'ESL']
    },
    {
      id: 5,
      title: 'Hotel Manager',
      company: 'Marriott',
      location: 'Australia',
      industry: 'Hospitality',
      experienceLevel: 'Senior',
      salary: 'AUD 85,000 - 110,000',
      skills: ['Hospitality Management', 'Customer Service', 'Staff Training', 'Budgeting']
    },
    {
      id: 6,
      title: 'Financial Analyst',
      company: 'Deutsche Bank',
      location: 'Germany',
      industry: 'Finance',
      experienceLevel: 'Mid-level',
      salary: '€65,000 - €80,000',
      skills: ['Financial Modeling', 'Data Analysis', 'Forecasting', 'Excel']
    },
  ];
  
  // Sample interview questions by industry and role
  const interviewQuestions: Record<string, Record<string, string[]>> = {
    'Healthcare': {
      'Nurse': [
        'How do you handle stressful situations in a medical environment?',
        'Describe a time when you had to deal with a difficult patient.',
        'How do you ensure accurate patient record keeping?',
        'What experience do you have with administering medications?',
        'How do you stay updated with the latest medical procedures?'
      ],
      'Doctor': [
        'How do you stay current with medical research in your field?',
        'Describe a challenging diagnosis you have made and how you approached it.',
        'How do you communicate difficult news to patients?',
        'What is your approach to working in a multidisciplinary team?',
        'How do you handle disagreements with colleagues about patient care?'
      ]
    },
    'Information Technology': {
      'Software Engineer': [
        'Describe a complex technical problem you have solved recently.',
        'How do you approach learning new programming languages or frameworks?',
        'How do you ensure your code is maintainable and scalable?',
        'Describe your experience with Agile development methodologies.',
        'How do you handle code reviews and feedback on your work?'
      ],
      'Project Manager': [
        'How do you handle scope creep in a project?',
        'Describe a time when you had to manage conflicting priorities.',
        'What tools do you use for project management and why?',
        'How do you ensure team members meet their deadlines?',
        'Describe how you communicate project status to stakeholders.'
      ]
    },
    'Education': {
      'Teacher': [
        'How do you adapt your teaching methods for different learning styles?',
        'How do you handle classroom discipline?',
        'Describe your approach to creating lesson plans.',
        'How do you assess student progress and understanding?',
        'How do you communicate with parents about student performance?'
      ]
    }
  };
  
  // Sample currency symbols by country
  const currencyByCountry: Record<string, string> = {
    'United Kingdom': '£',
    'United States': '$',
    'Canada': 'CAD',
    'Australia': 'AUD',
    'Germany': '€',
    'UAE': 'AED',
  };
  
  // Sample salary data by country, industry, and role
  const salaryData: Record<string, Record<string, Record<string, {low: number, high: number}>>> = {
    'United Kingdom': {
      'Healthcare': {
        'Nurse': {low: 25000, high: 40000},
        'Doctor': {low: 50000, high: 120000}
      },
      'Information Technology': {
        'Software Engineer': {low: 35000, high: 75000},
        'Project Manager': {low: 45000, high: 85000}
      },
      'Education': {
        'Teacher': {low: 25000, high: 45000},
        'Principal': {low: 50000, high: 90000}
      }
    },
    'United States': {
      'Healthcare': {
        'Nurse': {low: 60000, high: 100000},
        'Doctor': {low: 150000, high: 300000}
      },
      'Information Technology': {
        'Software Engineer': {low: 80000, high: 150000},
        'Project Manager': {low: 90000, high: 160000}
      },
      'Education': {
        'Teacher': {low: 45000, high: 75000},
        'Principal': {low: 90000, high: 150000}
      }
    },
    'Canada': {
      'Healthcare': {
        'Nurse': {low: 55000, high: 85000},
        'Doctor': {low: 120000, high: 250000}
      },
      'Information Technology': {
        'Software Engineer': {low: 65000, high: 120000},
        'Project Manager': {low: 75000, high: 130000}
      }
    }
  };
  
  // Sample visa eligibility criteria
  const visaRequirements: Record<string, Record<string, {
    minPoints: number;
    maxPoints: number;
    criteria: Record<string, Record<string, number>>;
  }>> = {
    'United Kingdom': {
      'Skilled Worker Visa': {
        minPoints: 70,
        maxPoints: 100,
        criteria: {
          'jobOffer': {
            'yes': 50,
            'no': 0
          },
          'qualification': {
            'PhD': 20,
            'Masters': 15,
            'Bachelors': 10,
            'None': 0
          },
          'language': {
            'IELTS 7+': 10,
            'IELTS 6-6.5': 5,
            'IELTS below 6': 0
          },
          'experience': {
            '5+ years': 20,
            '3-5 years': 15,
            '1-2 years': 10,
            'Less than 1 year': 0
          }
        }
      }
    },
    'Canada': {
      'Express Entry': {
        minPoints: 450,
        maxPoints: 600,
        criteria: {
          'jobOffer': {
            'yes': 200,
            'no': 0
          },
          'qualification': {
            'PhD': 150,
            'Masters': 135,
            'Bachelors': 120,
            'None': 0
          },
          'language': {
            'IELTS 8+': 160,
            'IELTS 7-7.5': 140,
            'IELTS 6-6.5': 120,
            'IELTS below 6': 0
          },
          'experience': {
            '5+ years': 90,
            '3-5 years': 75,
            '1-2 years': 50,
            'Less than 1 year': 0
          }
        }
      }
    },
    'Australia': {
      'Skilled Independent Visa': {
        minPoints: 65,
        maxPoints: 100,
        criteria: {
          'jobOffer': {
            'yes': 20,
            'no': 0
          },
          'qualification': {
            'PhD': 20,
            'Masters': 15,
            'Bachelors': 10,
            'None': 0
          },
          'language': {
            'IELTS 8+': 20,
            'IELTS 7-7.5': 15,
            'IELTS 6-6.5': 10,
            'IELTS below 6': 0
          },
          'experience': {
            '5+ years': 20,
            '3-5 years': 15,
            '1-2 years': 10,
            'Less than 1 year': 0
          }
        }
      }
    }
  };

  // Job matching function
  const handleJobSearch = () => {
    const results = jobListings.filter(job => {
      const locationMatch = !jobSearchParams.location || job.location === jobSearchParams.location;
      const industryMatch = !jobSearchParams.industry || job.industry === jobSearchParams.industry;
      const experienceMatch = !jobSearchParams.experienceLevel || job.experienceLevel === jobSearchParams.experienceLevel;
      const skillsMatch = !jobSearchParams.skills || 
        job.skills.some(skill => 
          skill.toLowerCase().includes(jobSearchParams.skills.toLowerCase())
        );
      
      return locationMatch && industryMatch && experienceMatch && skillsMatch;
    });
    
    setFilteredJobs(results);
    setShowJobResults(true);
  };
  
  // Handle job search form changes
  const handleJobSearchChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobSearchParams({
      ...jobSearchParams,
      [name]: value
    });
  };
  
  // Calculate salary estimation
  const calculateSalary = () => {
    if (!salaryParams.country || !salaryParams.industry || !salaryParams.role) {
      return;
    }
    
    try {
      const baseSalary = salaryData[salaryParams.country][salaryParams.industry][salaryParams.role];
      
      // Adjust for experience
      let minAdjustment = 1.0;
      let maxAdjustment = 1.0;
      
      if (salaryParams.experience === '5+ years') {
        minAdjustment = 1.2;
        maxAdjustment = 1.3;
      } else if (salaryParams.experience === '3-5 years') {
        minAdjustment = 1.1;
        maxAdjustment = 1.2;
      } else if (salaryParams.experience === '1-2 years') {
        minAdjustment = 1.0;
        maxAdjustment = 1.1;
      }
      
      // Adjust for education
      if (salaryParams.education === 'PhD') {
        minAdjustment += 0.2;
        maxAdjustment += 0.2;
      } else if (salaryParams.education === 'Masters') {
        minAdjustment += 0.1;
        maxAdjustment += 0.1;
      }
      
      const minSalary = Math.round(baseSalary.low * minAdjustment);
      const maxSalary = Math.round(baseSalary.high * maxAdjustment);
      
      setSalaryEstimate({
        min: minSalary,
        max: maxSalary,
        currency: currencyByCountry[salaryParams.country] || '$'
      });
      
    } catch (error) {
      // Handle case where data for the selected combination doesn't exist
      setSalaryEstimate(null);
    }
  };
  
  // Handle salary calculator form changes
  const handleSalaryParamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSalaryParams({
      ...salaryParams,
      [name]: value
    });
  };
  
  // Visa eligibility checker function
  const checkVisaEligibility = () => {
    if (!visaParams.nationality || !visaParams.destination) {
      return;
    }
    
    try {
      // Get visa type and criteria for the selected destination
      const visaTypes = Object.keys(visaRequirements[visaParams.destination]);
      const visaType = visaTypes[0]; // Get the first visa type for simplicity
      const requirements = visaRequirements[visaParams.destination][visaType];
      
      // Calculate points based on criteria
      let totalPoints = 0;
      
      // Job offer points
      totalPoints += requirements.criteria.jobOffer[visaParams.jobOffer] || 0;
      
      // Qualification points
      totalPoints += requirements.criteria.qualification[visaParams.qualification] || 0;
      
      // Language points
      totalPoints += requirements.criteria.language[visaParams.language] || 0;
      
      // Experience points
      totalPoints += requirements.criteria.experience[visaParams.experience] || 0;
      
      // Determine eligibility
      const eligible = totalPoints >= requirements.minPoints;
      
      setVisaEligibilityResult({
        eligible,
        score: totalPoints,
        maxScore: requirements.maxPoints,
        visaType,
        requirements: [
          `Job offer: ${visaParams.jobOffer === 'yes' ? 'Yes' : 'No'}`,
          `Qualification: ${visaParams.qualification}`,
          `Language proficiency: ${visaParams.language}`,
          `Work experience: ${visaParams.experience}`
        ]
      });
      
    } catch (error) {
      // Handle case where data for the selected destination doesn't exist
      setVisaEligibilityResult(null);
    }
  };
  
  // Handle visa params form changes
  const handleVisaParamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVisaParams({
      ...visaParams,
      [name]: value
    });
  };
  
  // Interview simulator functions
  const startInterviewSimulation = () => {
    setShowInterviewQuestions(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
  };
  
  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = currentAnswer;
      setUserAnswers(updatedAnswers);
      
      if (currentQuestionIndex < getInterviewQuestions().length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer('');
      }
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(userAnswers[currentQuestionIndex - 1] || '');
    }
  };
  
  const getInterviewQuestions = () => {
    if (interviewIndustry && interviewRole && 
        interviewQuestions[interviewIndustry] && 
        interviewQuestions[interviewIndustry][interviewRole]) {
      return interviewQuestions[interviewIndustry][interviewRole];
    }
    return ['No questions available for this role and industry.'];
  };
  
  // Skill assessment functions
  const addSkill = () => {
    if (newSkill.trim() && !skills.some(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { name: newSkill, level: skillLevel }]);
      setNewSkill('');
      setSkillLevel(3);
    }
  };
  
  const removeSkill = (skillName: string) => {
    setSkills(skills.filter(skill => skill.name !== skillName));
  };
  
  // Application tracker functions
  const addApplication = () => {
    if (newApplication.position && newApplication.company && newApplication.dateApplied) {
      const newApp: ApplicationStatus = {
        id: applications.length + 1,
        position: newApplication.position,
        company: newApplication.company,
        status: 'applied',
        dateApplied: newApplication.dateApplied,
        nextStep: 'Waiting for employer response'
      };
      
      setApplications([...applications, newApp]);
      setNewApplication({
        position: '',
        company: '',
        dateApplied: ''
      });
      setShowAddApplication(false);
    }
  };
  
  const updateApplicationStatus = (id: number, newStatus: ApplicationStatus['status']) => {
    const updatedApplications = applications.map(app => {
      if (app.id === id) {
        const nextStepMap: Record<string, string> = {
          'applied': 'Waiting for screening',
          'screening': 'Prepare for interview',
          'interview': 'Waiting for offer decision',
          'offer': 'Review offer details',
          'rejected': 'Apply for other positions'
        };
        
        return {
          ...app,
          status: newStatus,
          nextStep: nextStepMap[newStatus]
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
  };
  
  const removeApplication = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="Recruitment Services"
        subtitle="Connecting skilled candidates with international employment opportunities"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our Recruitment Services</h2>
          <p className="text-gray-700 mb-8">
            At Apex Travel Consult, we specialize in connecting skilled professionals with reputable employers around the world. 
            Our recruitment services are designed to match qualified candidates with the right opportunities abroad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#F59E0B] mb-4">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">For Candidates</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Job search assistance based on your skills and experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">CV/resume optimization for international employers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Interview preparation and coaching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Work visa application guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Relocation advice and support</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#F59E0B] mb-4">
                <Building size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">For Employers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Access to a pool of pre-screened, qualified candidates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Customized recruitment solutions based on your needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Assistance with work permit and visa processes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Candidate verification and background checks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Ongoing support throughout the recruitment process</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Interactive Features Section */}
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Interactive Tools</h2>
          <p className="text-gray-700 mb-8">
            Explore our interactive tools designed to help you in your international job search and career planning.
          </p>
          
          <div className="space-y-12">
            {/* Job Matching Tool */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <Search className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Job Matching Tool</h3>
            </div>
                <p className="text-gray-300 mt-2">
                  Find job opportunities matching your skills, experience, and preferences.
                </p>
            </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={jobSearchParams.skills}
                      onChange={handleJobSearchChange}
                      placeholder="e.g., Nursing, Programming, Teaching"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
            </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                    <select
                      name="location"
                      value={jobSearchParams.location}
                      onChange={handleJobSearchChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Any Location</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="UAE">UAE</option>
                    </select>
            </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      name="industry"
                      value={jobSearchParams.industry}
                      onChange={handleJobSearchChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Any Industry</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Education">Education</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Finance">Finance</option>
                    </select>
            </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <select
                      name="experienceLevel"
                      value={jobSearchParams.experienceLevel}
                      onChange={handleJobSearchChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Any Experience Level</option>
                      <option value="Entry-level">Entry-level</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                    </select>
            </div>
            </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleJobSearch}
                    className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium flex items-center"
                  >
                    <Search className="mr-2" size={20} />
                    Find Matching Jobs
                  </button>
                </div>
                
                {showJobResults && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-[#0F172A]">Search Results ({filteredJobs.length} jobs found)</h4>
                    
                    {filteredJobs.length === 0 ? (
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-gray-600">No jobs matching your criteria were found. Try adjusting your search parameters.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredJobs.map(job => (
                          <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-lg font-bold text-[#0F172A]">{job.title}</h5>
                                <p className="text-[#F59E0B] font-medium">{job.company}</p>
                              </div>
                              <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                {job.experienceLevel}
            </div>
          </div>
          
                            <div className="mt-3 flex items-center text-gray-500 text-sm">
                              <MapPin size={16} className="mr-1" />
                              <span>{job.location}</span>
                              <span className="mx-2">•</span>
                              <Briefcase size={16} className="mr-1" />
                              <span>{job.industry}</span>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-gray-700 font-semibold">{job.salary}</p>
              </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {job.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
            </div>
                            
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                              <button className="bg-[#0F172A] hover:bg-[#1E293B] text-white py-1.5 px-4 rounded-md text-sm transition-colors">
                                Apply Now
                              </button>
              </div>
            </div>
                        ))}
              </div>
                    )}
            </div>
                )}
              </div>
            </div>
            
            {/* Salary Calculator */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <DollarSign className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Salary Calculator</h3>
                </div>
                <p className="text-gray-300 mt-2">
                  Estimate potential salary ranges for various roles in different countries.
              </p>
            </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={salaryParams.country}
                      onChange={handleSalaryParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select a country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
              </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      name="industry"
                      value={salaryParams.industry}
                      onChange={handleSalaryParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select an industry</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      value={salaryParams.role}
                      onChange={handleSalaryParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select a role</option>
                      {salaryParams.industry === 'Healthcare' && (
                        <>
                          <option value="Nurse">Nurse</option>
                          <option value="Doctor">Doctor</option>
                        </>
                      )}
                      {salaryParams.industry === 'Information Technology' && (
                        <>
                          <option value="Software Engineer">Software Engineer</option>
                          <option value="Project Manager">Project Manager</option>
                        </>
                      )}
                      {salaryParams.industry === 'Education' && (
                        <>
                          <option value="Teacher">Teacher</option>
                          <option value="Principal">Principal</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <select
                      name="experience"
                      value={salaryParams.experience}
                      onChange={handleSalaryParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select experience level</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                    <select
                      name="education"
                      value={salaryParams.education}
                      onChange={handleSalaryParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select education level</option>
                      <option value="Bachelors">Bachelor's Degree</option>
                      <option value="Masters">Master's Degree</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={calculateSalary}
                    className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium flex items-center"
                  >
                    <DollarSign className="mr-2" size={20} />
                    Calculate Salary Range
                  </button>
                </div>
                
                {salaryEstimate && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="text-lg font-semibold mb-4 text-[#0F172A]">Estimated Salary Range</h4>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-[#0F172A]">
                          {salaryEstimate.currency}{salaryEstimate.min.toLocaleString()} - {salaryEstimate.currency}{salaryEstimate.max.toLocaleString()}
                        </p>
                        <p className="text-gray-500 mt-2">Annual salary estimate</p>
            </div>
              </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        This is an estimated salary range based on the information provided. Actual salaries may vary depending on specific employer, location, and other factors.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
          
            {/* Visa Eligibility Checker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <Clipboard className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Visa Eligibility Checker</h3>
              </div>
                <p className="text-gray-300 mt-2">
                  Check if you qualify for a work visa in your desired destination country.
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Nationality</label>
                    <select
                      name="nationality"
                      value={visaParams.nationality}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select your nationality</option>
                      <option value="India">India</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Other">Other</option>
                    </select>
            </div>
            
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                    <select
                      name="destination"
                      value={visaParams.destination}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select destination country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
              </div>
                  
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Do you have a job offer?</label>
                    <select
                      name="jobOffer"
                      value={visaParams.jobOffer}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
              </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                    <select
                      name="qualification"
                      value={visaParams.qualification}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select qualification</option>
                      <option value="PhD">PhD</option>
                      <option value="Masters">Master's Degree</option>
                      <option value="Bachelors">Bachelor's Degree</option>
                      <option value="None">No Degree</option>
                    </select>
            </div>
            
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience</label>
                    <select
                      name="experience"
                      value={visaParams.experience}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select experience</option>
                      <option value="5+ years">5+ years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                    </select>
              </div>
                  
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language Proficiency</label>
                    <select
                      name="language"
                      value={visaParams.language}
                      onChange={handleVisaParamChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select language level</option>
                      <option value="IELTS 8+">IELTS 8+</option>
                      <option value="IELTS 7-7.5">IELTS 7-7.5</option>
                      <option value="IELTS 6-6.5">IELTS 6-6.5</option>
                      <option value="IELTS below 6">IELTS below 6</option>
                    </select>
              </div>
            </div>
            
                <div className="flex justify-center">
                  <button
                    onClick={checkVisaEligibility}
                    className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium flex items-center"
                  >
                    <CheckSquare className="mr-2" size={20} />
                    Check Eligibility
                  </button>
              </div>
                
                {visaEligibilityResult && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="text-lg font-semibold mb-4 text-[#0F172A]">Visa Eligibility Result</h4>
                    
                    <div className="flex items-center mb-4">
                      {visaEligibilityResult.eligible ? (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
                          <CheckCircle className="mr-2" size={20} />
                          <span className="font-medium">You are likely eligible for a {visaEligibilityResult.visaType}</span>
                        </div>
                      ) : (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md flex items-center">
                          <X className="mr-2" size={20} />
                          <span className="font-medium">You may not be eligible for a {visaEligibilityResult.visaType} at this time</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Your Points:</span>
                        <span className="font-semibold">{visaEligibilityResult.score} / {visaEligibilityResult.maxScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${visaEligibilityResult.eligible ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${(visaEligibilityResult.score / visaEligibilityResult.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <h5 className="font-medium text-gray-700 mb-2">Your Profile</h5>
                    <ul className="space-y-2 mb-6">
                      {visaEligibilityResult.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-[#F59E0B] mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {!visaEligibilityResult.eligible && (
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h5 className="font-medium text-blue-800 mb-2">Recommendations to Improve Eligibility</h5>
                        <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                          {!visaParams.jobOffer || visaParams.jobOffer === 'no' ? (
                            <li>Secure a job offer from an employer in {visaParams.destination}</li>
                          ) : null}
                          {visaParams.qualification === 'None' || visaParams.qualification === 'Bachelors' ? (
                            <li>Consider pursuing higher education qualifications</li>
                          ) : null}
                          {visaParams.language === 'IELTS below 6' || visaParams.language === 'IELTS 6-6.5' ? (
                            <li>Improve your language proficiency score</li>
                          ) : null}
                          {visaParams.experience === 'Less than 1 year' || visaParams.experience === '1-2 years' ? (
                            <li>Gain more relevant work experience in your field</li>
                          ) : null}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Interview Simulator */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <MessageCircle className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Interview Simulator</h3>
                </div>
                <p className="text-gray-300 mt-2">
                  Practice common job interview questions for your industry and position.
                </p>
              </div>
              
              <div className="p-6">
                {!showInterviewQuestions ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <select
                          value={interviewIndustry}
                          onChange={(e) => setInterviewIndustry(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        >
                          <option value="">Select an industry</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Education">Education</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <select
                          value={interviewRole}
                          onChange={(e) => setInterviewRole(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                          disabled={!interviewIndustry}
                        >
                          <option value="">Select a position</option>
                          {interviewIndustry === 'Healthcare' && (
                            <>
                              <option value="Nurse">Nurse</option>
                              <option value="Doctor">Doctor</option>
                            </>
                          )}
                          {interviewIndustry === 'Information Technology' && (
                            <>
                              <option value="Software Engineer">Software Engineer</option>
                              <option value="Project Manager">Project Manager</option>
                            </>
                          )}
                          {interviewIndustry === 'Education' && (
                            <>
                              <option value="Teacher">Teacher</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={startInterviewSimulation}
                        disabled={!interviewIndustry || !interviewRole}
                        className={`py-2 px-6 rounded-md transition-colors font-medium flex items-center ${
                          interviewIndustry && interviewRole 
                            ? 'bg-[#F59E0B] hover:bg-[#E8A317] text-white' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <MessageCircle className="mr-2" size={20} />
                        Start Interview Simulation
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-lg font-semibold text-[#0F172A]">
                        {interviewIndustry} - {interviewRole} Interview
                      </h4>
                      <div className="text-gray-500 text-sm">
                        Question {currentQuestionIndex + 1} of {getInterviewQuestions().length}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <p className="text-[#0F172A] font-medium">
                          {getInterviewQuestions()[currentQuestionIndex]}
                </p>
              </div>
            </div>
            
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                      <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        placeholder="Type your answer here..."
                      ></textarea>
              </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`py-2 px-4 rounded-md transition-colors font-medium ${
                          currentQuestionIndex > 0
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Previous Question
                      </button>
                      
                      {currentQuestionIndex < getInterviewQuestions().length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          disabled={!currentAnswer.trim()}
                          className={`py-2 px-4 rounded-md transition-colors font-medium ${
                            currentAnswer.trim()
                              ? 'bg-[#F59E0B] hover:bg-[#E8A317] text-white' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (currentAnswer.trim()) {
                              const updatedAnswers = [...userAnswers];
                              updatedAnswers[currentQuestionIndex] = currentAnswer;
                              setUserAnswers(updatedAnswers);
                              setShowInterviewQuestions(false);
                            }
                          }}
                          disabled={!currentAnswer.trim()}
                          className={`py-2 px-4 rounded-md transition-colors font-medium ${
                            currentAnswer.trim()
                              ? 'bg-green-600 hover:bg-green-700 text-white' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Complete Interview
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skill Assessment Tool */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <BarChart2 className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Skill Assessment Tool</h3>
                </div>
                <p className="text-gray-300 mt-2">
                  Evaluate and visualize your professional skills to identify strengths and areas for improvement.
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Skill</label>
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., Project Management, Python, Customer Service"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
            </div>
            
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                    <select
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value={1}>1 - Beginner</option>
                      <option value={2}>2 - Basic</option>
                      <option value={3}>3 - Intermediate</option>
                      <option value={4}>4 - Advanced</option>
                      <option value={5}>5 - Expert</option>
                    </select>
              </div>
                </div>
                
                <div className="flex justify-center mb-8">
                  <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className={`py-2 px-6 rounded-md transition-colors font-medium flex items-center ${
                      newSkill.trim()
                        ? 'bg-[#F59E0B] hover:bg-[#E8A317] text-white' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Add Skill
                  </button>
                </div>
                
                {skills.length > 0 ? (
              <div>
                    <h4 className="text-lg font-semibold mb-4 text-[#0F172A]">Your Skills Profile</h4>
                    
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-[#0F172A]">{skill.name}</span>
                            <button
                              onClick={() => removeSkill(skill.name)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex-grow mr-3">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="h-2.5 rounded-full bg-[#F59E0B]"
                                  style={{ width: `${(skill.level / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-16 text-sm text-gray-500">
                              Level {skill.level}/5
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-md">
                      <h5 className="font-medium text-blue-800 mb-2">Skills Analysis</h5>
                      <p className="text-blue-700 text-sm mb-3">
                        Based on your skills profile, here are some insights:
                      </p>
                      <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                        {skills.filter(s => s.level >= 4).length > 0 && (
                          <li>You have expert-level proficiency in {skills.filter(s => s.level >= 4).length} skill(s)</li>
                        )}
                        {skills.filter(s => s.level <= 2).length > 0 && (
                          <li>Consider improving your {skills.filter(s => s.level <= 2).map(s => s.name).join(', ')} skills</li>
                        )}
                        {skills.length < 3 && (
                          <li>Add more skills to your profile for a more comprehensive assessment</li>
                        )}
                      </ul>
              </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <p>Add your professional skills to create your skills profile</p>
                  </div>
                )}
            </div>
          </div>
          
            {/* Application Tracker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#334155] p-6">
                <div className="flex items-center">
                  <FileText className="text-[#F59E0B] mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Application Tracker</h3>
                </div>
                <p className="text-gray-300 mt-2">
                  Track the status of your job applications and next steps in the process.
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-semibold text-[#0F172A]">Your Job Applications</h4>
                  <button
                    onClick={() => setShowAddApplication(!showAddApplication)}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white py-1.5 px-4 rounded-md transition-colors text-sm flex items-center"
                  >
                    {showAddApplication ? 'Cancel' : '+ Add Application'}
              </button>
                </div>
                
                {showAddApplication && (
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h5 className="font-medium text-[#0F172A] mb-3">Add New Application</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <input
                          type="text"
                          value={newApplication.position}
                          onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                          placeholder="Job Title"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={newApplication.company}
                          onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                          placeholder="Company Name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
                        <input
                          type="date"
                          value={newApplication.dateApplied}
                          onChange={(e) => setNewApplication({...newApplication, dateApplied: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={addApplication}
                        disabled={!newApplication.position || !newApplication.company || !newApplication.dateApplied}
                        className={`py-1.5 px-4 rounded-md transition-colors text-sm ${
                          newApplication.position && newApplication.company && newApplication.dateApplied
                            ? 'bg-[#F59E0B] hover:bg-[#E8A317] text-white' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Save Application
              </button>
            </div>
          </div>
                )}
                
                {applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Step</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900">{app.position}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{app.company}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">{app.dateApplied}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                                app.status === 'screening' ? 'bg-yellow-100 text-yellow-800' :
                                app.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                                app.status === 'offer' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">{app.nextStep}</td>
                            <td className="py-3 px-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <select
                                  value={app.status}
                                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus['status'])}
                                  className="text-xs p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
                                >
                                  <option value="applied">Applied</option>
                                  <option value="screening">Screening</option>
                                  <option value="interview">Interview</option>
                                  <option value="offer">Offer</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                
                                <button
                                  onClick={() => removeApplication(app.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
        </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">You haven't added any job applications yet</p>
                    <button
                      onClick={() => setShowAddApplication(true)}
                      className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-4 rounded-md transition-colors text-sm"
                    >
                      Start Tracking Applications
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4 mt-12">Industries We Serve</h2>
          <p className="text-gray-700 mb-8">
            We specialize in connecting employers with qualified candidates across various industries, including:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Healthcare</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Information Technology</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Engineering</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Education</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Hospitality</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Finance</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Construction</span>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-[#F59E0B] flex items-center">
              <Briefcase className="text-[#F59E0B] mr-3" size={20} />
              <span className="font-medium text-[#0F172A]">Manufacturing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;