import React, { useState, useRef } from 'react';
import { Import as Passport, FileCheck, CheckCircle, AlertCircle, Globe, Users, MapPin, Calendar, List, Search, Clock, X, DollarSign, HelpCircle, CheckSquare, RefreshCw, Upload, File, Paperclip, Trash2, Check } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

interface RequirementItem {
  id: number;
  text: string;
  required: boolean;
}

interface DocumentItem {
  id: number;
  name: string;
  description: string;
  required: boolean;
}

interface ProcessingTimeItem {
  country: string;
  visaType: string;
  regularTime: string;
  priorityTime: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  documentType: string;
  status: 'uploading' | 'uploaded' | 'verified' | 'rejected';
  uploadProgress?: number;
  errorMessage?: string;
}

const VisaServicesPage = () => {
  // State for live chat support
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'agent', text: string}>>([
    { sender: 'agent', text: 'Hello! How can I help you with your visa application today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // State for success rate predictor
  const [successPredictorCountry, setSuccessPredictorCountry] = useState('');
  const [successPredictorVisaType, setSuccessPredictorVisaType] = useState('');
  const [successPredictorProfile, setSuccessPredictorProfile] = useState<{
    age: string;
    travelHistory: string;
    financialStatus: string;
    documentStatus: string;
    previousRejections: string;
  }>({
    age: '',
    travelHistory: '',
    financialStatus: '',
    documentStatus: '',
    previousRejections: 'no'
  });
  const [showSuccessRate, setShowSuccessRate] = useState(false);
  const [successRate, setSuccessRate] = useState(0);
  
  // State for document upload simulator
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [uploadingInProgress, setUploadingInProgress] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [destination, setDestination] = useState('');
  const [visaType, setVisaType] = useState('');
  const [nationality, setNationality] = useState('');
  const [showRequirements, setShowRequirements] = useState(false);
  
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  
  const [documentList, setDocumentList] = useState<DocumentItem[]>([]);
  const [documentType, setDocumentType] = useState('student');
  
  // New state for processing time estimator
  const [processingCountry, setProcessingCountry] = useState('');
  const [processingVisaType, setProcessingVisaType] = useState('');
  const [showProcessingTime, setShowProcessingTime] = useState(false);
  
  // New state for visa fee calculator
  const [feeCalculatorCountry, setFeeCalculatorCountry] = useState('');
  const [feeCalculatorVisaType, setFeeCalculatorVisaType] = useState('');
  const [feeCalculatorDuration, setFeeCalculatorDuration] = useState('');
  const [feeCalculatorPriority, setFeeCalculatorPriority] = useState(false);
  const [feeCalculatorResult, setFeeCalculatorResult] = useState<{baseFee: number, serviceFee: number, priorityFee: number, totalFee: number} | null>(null);
  
  // State for interview questions simulator
  const [interviewVisaType, setInterviewVisaType] = useState('');
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(false);
  
  // Sample visa requirements
  const visaRequirements: Record<string, RequirementItem[]> = {
    'uk-student': [
      { id: 1, text: 'Valid passport with at least 6 months validity', required: true },
      { id: 2, text: 'Confirmation of Acceptance for Studies (CAS)', required: true },
      { id: 3, text: 'Proof of financial support', required: true },
      { id: 4, text: 'Tuberculosis test results', required: true },
      { id: 5, text: 'Evidence of English language proficiency', required: true },
      { id: 6, text: 'Academic qualifications', required: true },
      { id: 7, text: 'Immigration Health Surcharge payment', required: true },
    ],
    'uk-work': [
      { id: 1, text: 'Valid passport with at least 6 months validity', required: true },
      { id: 2, text: 'Certificate of Sponsorship from UK employer', required: true },
      { id: 3, text: 'Proof of required skill level', required: true },
      { id: 4, text: 'Proof of English language proficiency', required: true },
      { id: 5, text: 'Proof of financial means', required: true },
      { id: 6, text: 'Tuberculosis test results', required: true },
      { id: 7, text: 'Criminal record certificate', required: true },
    ],
    'us-student': [
      { id: 1, text: 'Valid passport with at least 6 months validity', required: true },
      { id: 2, text: 'Form I-20 from U.S. institution', required: true },
      { id: 3, text: 'SEVIS fee payment receipt', required: true },
      { id: 4, text: 'DS-160 form confirmation page', required: true },
      { id: 5, text: 'Evidence of financial support', required: true },
      { id: 6, text: 'Proof of strong ties to home country', required: true },
      { id: 7, text: 'Passport photos meeting requirements', required: true },
    ],
    'us-visitor': [
      { id: 1, text: 'Valid passport with at least 6 months validity', required: true },
      { id: 2, text: 'Completed DS-160 form', required: true },
      { id: 3, text: 'Proof of funds for trip', required: true },
      { id: 4, text: 'Evidence of intent to return to home country', required: true },
      { id: 5, text: 'Travel itinerary', required: true },
      { id: 6, text: 'Passport photos meeting requirements', required: true },
    ],
    'canada-student': [
      { id: 1, text: 'Valid passport with at least 6 months validity', required: true },
      { id: 2, text: 'Letter of Acceptance from a DLI', required: true },
      { id: 3, text: 'Proof of financial support', required: true },
      { id: 4, text: 'Statement of purpose', required: true },
      { id: 5, text: 'Academic transcripts', required: true },
      { id: 6, text: 'Proof of language proficiency', required: true },
      { id: 7, text: 'Biometrics', required: true },
    ],
  };
  
  // Document templates for different visa types
  const documentTemplates: Record<string, DocumentItem[]> = {
    'student': [
      { id: 1, name: 'Passport', description: 'Valid passport with at least 6 months validity beyond intended stay', required: true },
      { id: 2, name: 'Acceptance Letter', description: 'Official acceptance letter from educational institution', required: true },
      { id: 3, name: 'Financial Documents', description: 'Bank statements, scholarship letters, or sponsor letter covering tuition and living expenses', required: true },
      { id: 4, name: 'Academic Transcripts', description: 'Certified copies of previous academic records', required: true },
      { id: 5, name: 'Language Proficiency', description: 'IELTS, TOEFL, or other language test results as required', required: true },
      { id: 6, name: 'Passport Photos', description: 'Recent passport-sized photos meeting country specifications', required: true },
      { id: 7, name: 'Medical Insurance', description: 'Proof of medical insurance coverage', required: true },
      { id: 8, name: 'Visa Application Form', description: 'Completed and signed visa application form', required: true },
      { id: 9, name: 'CV/Resume', description: 'Current curriculum vitae or resume', required: false },
      { id: 10, name: 'Recommendation Letters', description: 'Letters of recommendation from teachers or professors', required: false },
    ],
    'work': [
      { id: 1, name: 'Passport', description: 'Valid passport with at least 6 months validity beyond intended stay', required: true },
      { id: 2, name: 'Job Offer Letter', description: 'Official job offer letter or employment contract', required: true },
      { id: 3, name: 'Work Permit/Sponsorship', description: 'Approved work permit or sponsorship documentation', required: true },
      { id: 4, name: 'CV/Resume', description: 'Current curriculum vitae or resume', required: true },
      { id: 5, name: 'Qualifications', description: 'Certified copies of degrees, diplomas and professional certifications', required: true },
      { id: 6, name: 'Financial Documents', description: 'Bank statements showing financial stability', required: true },
      { id: 7, name: 'Passport Photos', description: 'Recent passport-sized photos meeting country specifications', required: true },
      { id: 8, name: 'Visa Application Form', description: 'Completed and signed visa application form', required: true },
      { id: 9, name: 'Reference Letters', description: 'Professional references from previous employers', required: false },
      { id: 10, name: 'Police Clearance', description: 'Criminal record check from countries of residence', required: true },
    ],
    'tourist': [
      { id: 1, name: 'Passport', description: 'Valid passport with at least 6 months validity beyond intended stay', required: true },
      { id: 2, name: 'Travel Itinerary', description: 'Round-trip flight reservations and accommodation bookings', required: true },
      { id: 3, name: 'Financial Documents', description: 'Bank statements showing sufficient funds for the trip', required: true },
      { id: 4, name: 'Employment Verification', description: 'Letter from employer confirming employment and approved leave', required: false },
      { id: 5, name: 'Passport Photos', description: 'Recent passport-sized photos meeting country specifications', required: true },
      { id: 6, name: 'Travel Insurance', description: 'Travel and medical insurance for the duration of stay', required: true },
      { id: 7, name: 'Visa Application Form', description: 'Completed and signed visa application form', required: true },
      { id: 8, name: 'Property Ownership', description: 'Proof of property ownership in home country (if applicable)', required: false },
      { id: 9, name: 'Invitation Letter', description: 'Invitation letter from host in destination country (if applicable)', required: false },
    ],
  };
  
  // Sample processing times
  const processingTimes: ProcessingTimeItem[] = [
    { country: 'uk', visaType: 'student', regularTime: '3-4 weeks', priorityTime: '5-7 working days' },
    { country: 'uk', visaType: 'work', regularTime: '3-8 weeks', priorityTime: '5-7 working days' },
    { country: 'uk', visaType: 'visitor', regularTime: '3-4 weeks', priorityTime: '5 working days' },
    { country: 'uk', visaType: 'family', regularTime: '8-12 weeks', priorityTime: '6 weeks' },
    { country: 'us', visaType: 'student', regularTime: '2-4 weeks', priorityTime: 'Not available' },
    { country: 'us', visaType: 'work', regularTime: '2-6 months', priorityTime: 'Not available' },
    { country: 'us', visaType: 'visitor', regularTime: '1-3 weeks', priorityTime: 'Not available' },
    { country: 'canada', visaType: 'student', regularTime: '4-8 weeks', priorityTime: '2-3 weeks' },
    { country: 'canada', visaType: 'work', regularTime: '4-12 weeks', priorityTime: '2-4 weeks' },
    { country: 'canada', visaType: 'visitor', regularTime: '2-4 weeks', priorityTime: '1-2 weeks' },
    { country: 'australia', visaType: 'student', regularTime: '4-6 weeks', priorityTime: '2-3 weeks' },
    { country: 'australia', visaType: 'work', regularTime: '4-8 weeks', priorityTime: '2-3 weeks' },
    { country: 'australia', visaType: 'visitor', regularTime: '2-3 weeks', priorityTime: '5-7 working days' },
  ];
  
  // Sample visa fee data
  const visaFees = {
    uk: {
      student: { baseFee: 348, shortTerm: 348, longTerm: 475 },
      work: { baseFee: 625, shortTerm: 625, longTerm: 1235 },
      visitor: { baseFee: 100, shortTerm: 100, longTerm: 200 },
      family: { baseFee: 1523, shortTerm: 1523, longTerm: 1523 }
    },
    us: {
      student: { baseFee: 160, shortTerm: 160, longTerm: 160 },
      work: { baseFee: 190, shortTerm: 190, longTerm: 190 },
      visitor: { baseFee: 160, shortTerm: 160, longTerm: 160 },
      family: { baseFee: 160, shortTerm: 160, longTerm: 160 }
    },
    canada: {
      student: { baseFee: 150, shortTerm: 150, longTerm: 150 },
      work: { baseFee: 155, shortTerm: 155, longTerm: 155 },
      visitor: { baseFee: 100, shortTerm: 100, longTerm: 100 },
      family: { baseFee: 150, shortTerm: 150, longTerm: 150 }
    },
    australia: {
      student: { baseFee: 620, shortTerm: 620, longTerm: 620 },
      work: { baseFee: 580, shortTerm: 580, longTerm: 580 },
      visitor: { baseFee: 145, shortTerm: 145, longTerm: 365 },
      family: { baseFee: 7715, shortTerm: 7715, longTerm: 7715 }
    }
  };
  
  // Priority processing fees
  const priorityFees = {
    uk: 500,
    canada: 200,
    australia: 300,
    us: 0 // US doesn't typically offer priority processing
  };
  
  // Service fees
  const serviceFee = 150; // Our service fee
  
  // Sample interview questions by visa type
  const interviewQuestions = {
    student: [
      "Why did you choose this particular university or institution?",
      "How will this course help your future career plans?",
      "How do you plan to finance your studies abroad?",
      "Why do you want to study in this specific country?",
      "What are your plans after completing your studies?",
      "Have you researched other universities? Why did you choose this one?",
      "How is this program different from similar programs in your home country?",
      "What are your accommodation arrangements?",
      "Do you have any relatives or friends in the destination country?",
    ],
    work: [
      "Please describe your job role and responsibilities.",
      "Why are you qualified for this position?",
      "What is your educational background and work experience?",
      "Why did you choose this specific employer?",
      "How long do you plan to work in this country?",
      "What are your plans after your work visa expires?",
      "How will this job opportunity benefit your career in the long term?",
      "Have you worked internationally before?",
      "Are you familiar with the culture and working environment of this country?",
    ],
    visitor: [
      "What is the purpose of your visit?",
      "How long do you plan to stay?",
      "What places do you plan to visit?",
      "Where will you be staying during your visit?",
      "Have you visited this country before?",
      "Do you have family or friends in this country?",
      "What is your occupation in your home country?",
      "How will you finance your trip?",
      "What ties do you have to your home country that will ensure your return?",
    ],
    family: [
      "What is your relationship with the person you are joining?",
      "How long have you known this person?",
      "How often do you communicate with each other?",
      "When did you last meet in person?",
      "How will you support yourself financially in the destination country?",
      "Do you plan to work in the destination country?",
      "What are your long-term plans as a family?",
      "Are there any other family members already living in the destination country?",
      "How well do you know the language of the destination country?",
    ]
  };
  
  const handleRequirementsCheck = () => {
    if (destination && visaType && nationality) {
      setShowRequirements(true);
    }
  };
  
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the appointment to a backend
    setAppointmentSubmitted(true);
  };
  
  const generateDocumentList = () => {
    if (documentTemplates[documentType]) {
      setDocumentList(documentTemplates[documentType]);
    }
  };
  
  // Get requirements key
  const getRequirementsKey = () => {
    const key = `${destination.toLowerCase()}-${visaType.toLowerCase()}`;
    return visaRequirements[key] ? key : '';
  };
  
  const handleProcessingTimeCheck = () => {
    if (processingCountry && processingVisaType) {
      setShowProcessingTime(true);
    }
  };
  
  const getProcessingTimeInfo = () => {
    return processingTimes.find(
      item => item.country === processingCountry && item.visaType === processingVisaType
    );
  };
  
  const calculateVisaFees = () => {
    if (!feeCalculatorCountry || !feeCalculatorVisaType || !feeCalculatorDuration) {
      return;
    }
    
    // Type assertion to help TypeScript understand the keys
    const country = feeCalculatorCountry as keyof typeof visaFees;
    const visaType = feeCalculatorVisaType as keyof typeof visaFees.uk;
    const duration = feeCalculatorDuration === 'short' ? 'shortTerm' : 'longTerm';
    
    const baseFee = visaFees[country][visaType][duration];
    const priorityFee = feeCalculatorPriority ? priorityFees[country as keyof typeof priorityFees] : 0;
    
    setFeeCalculatorResult({
      baseFee,
      serviceFee,
      priorityFee,
      totalFee: baseFee + serviceFee + priorityFee
    });
  };
  
  const handleShowInterviewQuestions = () => {
    if (interviewVisaType) {
      setShowInterviewQuestions(true);
    }
  };
  
  // Handle sending chat messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', text: newMessage }]);
    setNewMessage('');
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      setChatMessages(prevMessages => [
        ...prevMessages,
        { 
          sender: 'agent', 
          text: 'Thank you for your question. One of our visa specialists will get back to you shortly with more information. Is there anything else I can help you with?' 
        }
      ]);
    }, 1000);
  };
  
  // Calculate visa success rate based on profile
  const calculateSuccessRate = () => {
    if (!successPredictorCountry || !successPredictorVisaType) return;
    
    // Base success rates by country and visa type
    const baseRates = {
      uk: {
        student: 85,
        work: 75,
        visitor: 80,
        family: 70
      },
      us: {
        student: 75,
        work: 65,
        visitor: 70,
        family: 65
      },
      canada: {
        student: 80,
        work: 70,
        visitor: 75,
        family: 70
      },
      australia: {
        student: 85,
        work: 75,
        visitor: 80,
        family: 75
      }
    };
    
    // Get base rate for selected country and visa type
    const country = successPredictorCountry as keyof typeof baseRates;
    const visaType = successPredictorVisaType as keyof typeof baseRates.uk;
    
    let rate = baseRates[country][visaType];
    
    // Adjust based on age
    if (successPredictorProfile.age === '18-25') {
      rate -= 5; // Younger applicants may face more scrutiny
    } else if (successPredictorProfile.age === '36-60') {
      rate += 5; // More established applicants may have better chances
    } else if (successPredictorProfile.age === '60+') {
      rate -= 3; // Elderly applicants may face some challenges
    }
    
    // Adjust based on travel history
    if (successPredictorProfile.travelHistory === 'extensive') {
      rate += 10; // Proven travel history improves chances
    } else if (successPredictorProfile.travelHistory === 'some') {
      rate += 5; // Some travel history is better than none
    } else if (successPredictorProfile.travelHistory === 'none') {
      rate -= 5; // No travel history may raise concerns
    }
    
    // Adjust based on financial status
    if (successPredictorProfile.financialStatus === 'strong') {
      rate += 10; // Strong financial backing improves chances
    } else if (successPredictorProfile.financialStatus === 'moderate') {
      rate += 0; // Moderate finances are neutral
    } else if (successPredictorProfile.financialStatus === 'limited') {
      rate -= 15; // Limited finances significantly reduce chances
    }
    
    // Adjust based on document status
    if (successPredictorProfile.documentStatus === 'complete') {
      rate += 5; // Complete documentation improves chances
    } else if (successPredictorProfile.documentStatus === 'partial') {
      rate -= 10; // Incomplete documentation reduces chances
    }
    
    // Adjust based on previous rejections
    if (successPredictorProfile.previousRejections === 'yes') {
      rate -= 15; // Previous rejections significantly reduce chances
    }
    
    // Ensure rate stays within 10-95% range (never 0% or 100% as nothing is certain)
    rate = Math.max(10, Math.min(95, rate));
    
    setSuccessRate(rate);
    setShowSuccessRate(true);
  };
  
  // Handle profile field changes
  const handleSuccessProfileChange = (field: string, value: string) => {
    setSuccessPredictorProfile({
      ...successPredictorProfile,
      [field]: value
    });
    setShowSuccessRate(false);
  };
  
  // Document upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedDocumentType) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    // Create new uploaded file object
    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      documentType: selectedDocumentType,
      status: 'uploading',
      uploadProgress: 0
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    setUploadingInProgress(true);
    
    // Simulate upload progress
    const intervalId = setInterval(() => {
      setUploadedFiles(prevFiles => {
        return prevFiles.map(f => {
          if (f.id === newFile.id) {
            const nextProgress = (f.uploadProgress || 0) + 10;
            
            if (nextProgress >= 100) {
              clearInterval(intervalId);
              setUploadingInProgress(false);
              
              if (prevFiles.filter(file => file.status === 'uploaded' || file.status === 'verified').length + 1 >= 4) {
                setUploadComplete(true);
              }
              
              return { ...f, status: 'uploaded', uploadProgress: 100 };
            }
            
            return { ...f, uploadProgress: nextProgress };
          }
          return f;
        });
      });
    }, 300);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setSelectedDocumentType('');
  };
  
  // Handle document removal
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    
    // Update upload complete status
    const remainingFiles = uploadedFiles.filter(f => f.id !== fileId);
    if (remainingFiles.filter(f => f.status === 'uploaded' || f.status === 'verified').length < 4) {
      setUploadComplete(false);
    }
    
    setVerificationComplete(false);
  };
  
  // Start verification process
  const handleStartVerification = () => {
    if (!uploadComplete) return;
    
    // First, update all files to uploading state
    setUploadedFiles(prevFiles => 
      prevFiles.map(f => ({ ...f, status: 'uploading', uploadProgress: 0 }))
    );
    
    setUploadingInProgress(true);
    
    // Make a copy of the current files to work with
    const filesToVerify = [...uploadedFiles];
    
    // Simulate verification progress for each file
    filesToVerify.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles(prevFiles => {
          const newFiles = [...prevFiles];
          const fileIndex = newFiles.findIndex(f => f.id === file.id);
          
          if (fileIndex !== -1) {
            // Randomly determine if file is verified or rejected (mostly verified)
            const isVerified = Math.random() > 0.2;
            newFiles[fileIndex] = {
              ...newFiles[fileIndex],
              status: isVerified ? 'verified' : 'rejected',
              errorMessage: isVerified ? undefined : 'Document appears to be invalid or expired. Please upload a valid document.'
            };
          }
          
          // If this is the last file, update verification status
          if (index === filesToVerify.length - 1) {
            setUploadingInProgress(false);
            setVerificationComplete(true);
          }
          
          return newFiles;
        });
      }, (index + 1) * 1000); // Stagger verification timing
    });
  };
  
  // Get number of required documents
  const getRequiredDocumentsCount = () => {
    return 4; // For simulation, we'll say 4 documents are required
  };
  
  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const availableDates = [
    '2025-06-15', '2025-06-16', '2025-06-17', '2025-06-18', '2025-06-19',
    '2025-06-22', '2025-06-23', '2025-06-24', '2025-06-25', '2025-06-26'
  ];
  
  const availableTimes = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="Visa Services"
        subtitle="Expert guidance for all your visa application needs"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Our Visa Services</h2>
          <p className="text-gray-700 mb-8">
            At Apex Travel Consult, we provide comprehensive visa assistance services to help make your international travel as smooth as possible. 
            Our experienced consultants will guide you through the entire visa application process, ensuring your application meets all requirements.
          </p>
          
          {/* Visa Requirements Checker */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <Search size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Visa Requirements Checker</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Check the specific visa requirements for your destination country based on your nationality.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                <select 
                  value={destination}
                  onChange={(e) => { setDestination(e.target.value); setShowRequirements(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <select 
                  value={visaType}
                  onChange={(e) => { setVisaType(e.target.value); setShowRequirements(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Visa Type</option>
                  <option value="student">Student Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="visitor">Visitor/Tourist Visa</option>
                  <option value="family">Family Visa</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Nationality</label>
                <select 
                  value={nationality}
                  onChange={(e) => { setNationality(e.target.value); setShowRequirements(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Nationality</option>
                  <option value="ghana">Ghana</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="kenya">Kenya</option>
                  <option value="southafrica">South Africa</option>
                  <option value="egypt">Egypt</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleRequirementsCheck}
                disabled={!destination || !visaType || !nationality}
                className={`px-6 py-2 rounded ${(!destination || !visaType || !nationality) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
              >
                Check Requirements
              </button>
            </div>
            
            {showRequirements && getRequirementsKey() && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  Requirements for {nationality} citizens applying for a {visaType} visa to {destination.toUpperCase()}:
                </h4>
                <div className="bg-gray-50 p-5 rounded-md">
                  <ul className="space-y-3">
                    {visaRequirements[getRequirementsKey()].map(req => (
                      <li key={req.id} className="flex items-start">
                        {req.required ? (
                          <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={18} />
                        ) : (
                          <AlertCircle className="text-amber-500 mt-1 mr-3 flex-shrink-0" size={18} />
                        )}
                        <span>
                          {req.text}
                          {!req.required && <span className="text-sm text-amber-600 ml-2">(May be required in some cases)</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-gray-500">
                    <p>* Requirements may change. Please contact our visa consultants for the most up-to-date information.</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#1E293B] transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            )}
            
            {showRequirements && !getRequirementsKey() && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                <div className="flex">
                  <AlertCircle className="flex-shrink-0 mr-3" size={24} />
                  <div>
                    <p className="font-medium">Information not available</p>
                    <p className="mt-1">We don't have specific information for this combination. Please contact our visa consultants for detailed requirements.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Document Checklist Generator */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <List size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Document Checklist Generator</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Generate a customized document checklist based on your visa type.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="w-full md:w-2/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <select 
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="student">Student Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="tourist">Tourist/Visitor Visa</option>
                </select>
              </div>
              
              <div className="w-full md:w-1/3 md:self-end">
                <button 
                  onClick={generateDocumentList}
                  className="w-full px-4 py-2 bg-[#F59E0B] text-white rounded hover:bg-[#E8A317] transition-colors"
                >
                  Generate Checklist
                </button>
              </div>
            </div>
            
            {documentList.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Visa Document Checklist:
                </h4>
                <div className="space-y-4">
                  {documentList.map(doc => (
                    <div key={doc.id} className="flex p-3 bg-gray-50 rounded-md">
                      <div className="flex-shrink-0 mr-3">
                        <input 
                          type="checkbox" 
                          id={`doc-${doc.id}`} 
                          className="h-5 w-5 accent-[#F59E0B]" 
                        />
                      </div>
                      <div>
                        <label htmlFor={`doc-${doc.id}`} className="block font-medium text-[#0F172A]">
                          {doc.name}
                          {!doc.required && <span className="ml-2 text-sm text-gray-500">(Optional)</span>}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button className="px-4 py-2 border border-[#F59E0B] text-[#F59E0B] rounded hover:bg-[#FEF3C7] transition-colors">
                    Save Checklist
                  </button>
                  <button className="px-4 py-2 bg-[#F59E0B] text-white rounded hover:bg-[#E8A317] transition-colors">
                    Print Checklist
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Visa Processing Time Estimator - NEW FEATURE */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <Clock size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Visa Processing Time Estimator</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Get an estimated processing time for your visa application based on destination and visa type.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                <select 
                  value={processingCountry}
                  onChange={(e) => { setProcessingCountry(e.target.value); setShowProcessingTime(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <select 
                  value={processingVisaType}
                  onChange={(e) => { setProcessingVisaType(e.target.value); setShowProcessingTime(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Visa Type</option>
                  <option value="student">Student Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="visitor">Visitor/Tourist Visa</option>
                  <option value="family">Family Visa</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleProcessingTimeCheck}
                disabled={!processingCountry || !processingVisaType}
                className={`px-6 py-2 rounded ${(!processingCountry || !processingVisaType) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
              >
                Check Processing Time
              </button>
            </div>
            
            {showProcessingTime && getProcessingTimeInfo() && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  Estimated Processing Times for {processingVisaType.charAt(0).toUpperCase() + processingVisaType.slice(1)} Visa to {processingCountry.toUpperCase()}:
                </h4>
                <div className="bg-gray-50 p-5 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
                      <h5 className="font-medium text-[#0F172A] mb-2">Regular Processing</h5>
                      <div className="flex items-center">
                        <Clock className="text-[#F59E0B] mr-2" size={18} />
                        <span className="text-xl font-semibold text-[#0F172A]">{getProcessingTimeInfo()?.regularTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Standard processing time with regular service fees.
                      </p>
                    </div>
                    
                    <div className="pt-4 md:pt-0 md:pl-6">
                      <h5 className="font-medium text-[#0F172A] mb-2">Priority Processing</h5>
                      <div className="flex items-center">
                        <RefreshCw className="text-[#F59E0B] mr-2" size={18} />
                        <span className="text-xl font-semibold text-[#0F172A]">{getProcessingTimeInfo()?.priorityTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Expedited processing with additional priority service fees.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gray-500">
                    <p>* Processing times are estimates only and may vary based on individual circumstances, application volume, and embassy/consulate workload.</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#1E293B] transition-colors">
                    Explore Priority Service Options
                  </button>
                </div>
              </div>
            )}
            
            {showProcessingTime && !getProcessingTimeInfo() && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                <div className="flex">
                  <AlertCircle className="flex-shrink-0 mr-3" size={24} />
                  <div>
                    <p className="font-medium">Information not available</p>
                    <p className="mt-1">We don't have specific processing time information for this combination. Please contact our visa consultants for detailed information.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Visa Fee Calculator - NEW FEATURE */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <DollarSign size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Visa Fee Calculator</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Calculate the total cost of your visa application including application fees, service fees, and optional priority processing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                <select 
                  value={feeCalculatorCountry}
                  onChange={(e) => { setFeeCalculatorCountry(e.target.value); setFeeCalculatorResult(null); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <select 
                  value={feeCalculatorVisaType}
                  onChange={(e) => { setFeeCalculatorVisaType(e.target.value); setFeeCalculatorResult(null); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Visa Type</option>
                  <option value="student">Student Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="visitor">Visitor/Tourist Visa</option>
                  <option value="family">Family Visa</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stay Duration</label>
                <select 
                  value={feeCalculatorDuration}
                  onChange={(e) => { setFeeCalculatorDuration(e.target.value); setFeeCalculatorResult(null); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Duration</option>
                  <option value="short">Short-term (less than 6 months)</option>
                  <option value="long">Long-term (more than 6 months)</option>
                </select>
              </div>
              
              <div className="flex items-center pt-8">
                <input 
                  type="checkbox" 
                  id="priority-processing"
                  checked={feeCalculatorPriority}
                  onChange={(e) => { setFeeCalculatorPriority(e.target.checked); setFeeCalculatorResult(null); }}
                  className="h-4 w-4 accent-[#F59E0B]"
                />
                <label htmlFor="priority-processing" className="ml-2 text-gray-700">
                  Add Priority Processing (where available)
                </label>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={calculateVisaFees}
                disabled={!feeCalculatorCountry || !feeCalculatorVisaType || !feeCalculatorDuration}
                className={`px-6 py-2 rounded ${(!feeCalculatorCountry || !feeCalculatorVisaType || !feeCalculatorDuration) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
              >
                Calculate Fees
              </button>
            </div>
            
            {feeCalculatorResult && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  Estimated Visa Fees:
                </h4>
                <div className="bg-gray-50 p-5 rounded-md">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-700">Base Visa Application Fee:</span>
                      <span className="font-semibold text-[#0F172A]">${feeCalculatorResult.baseFee}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-700">Service Fee:</span>
                      <span className="font-semibold text-[#0F172A]">${feeCalculatorResult.serviceFee}</span>
                    </div>
                    {feeCalculatorResult.priorityFee > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-700">Priority Processing Fee:</span>
                        <span className="font-semibold text-[#0F172A]">${feeCalculatorResult.priorityFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-medium text-[#0F172A]">Total Fee:</span>
                      <span className="text-xl font-bold text-[#0F172A]">${feeCalculatorResult.totalFee}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gray-500">
                    <p>* Fees are in USD and are subject to change. Additional fees may apply depending on specific requirements.</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#1E293B] transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Visa Success Rate Predictor - NEW FEATURE */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <CheckSquare size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Visa Success Rate Predictor</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Estimate your visa application success rate based on your profile and specific circumstances.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
                <select 
                  value={successPredictorCountry}
                  onChange={(e) => { setSuccessPredictorCountry(e.target.value); setShowSuccessRate(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <select 
                  value={successPredictorVisaType}
                  onChange={(e) => { setSuccessPredictorVisaType(e.target.value); setShowSuccessRate(false); }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="">Select Visa Type</option>
                  <option value="student">Student Visa</option>
                  <option value="work">Work Visa</option>
                  <option value="visitor">Visitor/Tourist Visa</option>
                  <option value="family">Family Visa</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h4 className="text-lg font-medium text-[#0F172A] mb-4">Your Profile</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
                  <select 
                    value={successPredictorProfile.age}
                    onChange={(e) => handleSuccessProfileChange('age', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Select Age Group</option>
                    <option value="18-25">18-25 years</option>
                    <option value="26-35">26-35 years</option>
                    <option value="36-60">36-60 years</option>
                    <option value="60+">60+ years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">International Travel History</label>
                  <select 
                    value={successPredictorProfile.travelHistory}
                    onChange={(e) => handleSuccessProfileChange('travelHistory', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Select Travel History</option>
                    <option value="extensive">Extensive (5+ countries visited)</option>
                    <option value="some">Some (1-4 countries visited)</option>
                    <option value="none">None (First international trip)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Financial Status</label>
                  <select 
                    value={successPredictorProfile.financialStatus}
                    onChange={(e) => handleSuccessProfileChange('financialStatus', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Select Financial Status</option>
                    <option value="strong">Strong (Significant savings/income)</option>
                    <option value="moderate">Moderate (Adequate for trip/stay)</option>
                    <option value="limited">Limited (Minimal resources)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Completeness</label>
                  <select 
                    value={successPredictorProfile.documentStatus}
                    onChange={(e) => handleSuccessProfileChange('documentStatus', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="">Select Document Status</option>
                    <option value="complete">Complete (All required and supporting documents)</option>
                    <option value="partial">Partial (Some documents missing or incomplete)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Visa Rejections</label>
                  <select 
                    value={successPredictorProfile.previousRejections}
                    onChange={(e) => handleSuccessProfileChange('previousRejections', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  >
                    <option value="no">No previous rejections</option>
                    <option value="yes">Yes, have been rejected before</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={calculateSuccessRate}
                disabled={!successPredictorCountry || !successPredictorVisaType || !successPredictorProfile.age || !successPredictorProfile.travelHistory || !successPredictorProfile.financialStatus || !successPredictorProfile.documentStatus}
                className={`px-6 py-2 rounded ${(!successPredictorCountry || !successPredictorVisaType || !successPredictorProfile.age || !successPredictorProfile.travelHistory || !successPredictorProfile.financialStatus || !successPredictorProfile.documentStatus) 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
              >
                Calculate Success Rate
              </button>
            </div>
            
            {showSuccessRate && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  Your Estimated Success Rate:
                </h4>
                <div className="bg-gray-50 p-5 rounded-md">
                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-[#0F172A]">{successRate}%</span>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="8" 
                        />
                        {/* Progress circle - stroke-dasharray is the circumference of the circle (2*PI*r) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke={
                            successRate > 75 ? "#10B981" : // green for high chances
                            successRate > 50 ? "#F59E0B" : // amber for medium chances
                            "#EF4444" // red for low chances
                          } 
                          strokeWidth="8" 
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * successRate / 100)}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="font-medium text-[#0F172A]">
                        {successRate > 75 ? "High Chance of Approval" : 
                         successRate > 50 ? "Moderate Chance of Approval" : 
                         "Low Chance of Approval"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gray-500">
                    <p>* This is an estimate based on historical data and general trends. Individual results may vary. Our visa experts can help improve your chances.</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-700 mb-4">Want to improve your chances? Get personalized guidance from our experts.</p>
                  <button className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#1E293B] transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
            
            {/* Document Upload Simulator - NEW FEATURE */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <Upload size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Document Upload Simulator</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Experience the document upload and verification process. Upload required documents and see them processed in real-time.
            </p>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium text-[#0F172A] mb-3">Required Documents</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700 mb-2">Please upload the following documents:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Valid passport (first and last page)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Visa application form</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Passport-sized photograph</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Proof of financial means (bank statements)</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select 
                      value={selectedDocumentType}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                      disabled={uploadingInProgress}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select Document Type</option>
                      <option value="Passport">Passport</option>
                      <option value="Application Form">Application Form</option>
                      <option value="Photograph">Passport-sized Photograph</option>
                      <option value="Financial Proof">Financial Proof</option>
                      <option value="Other">Other Supporting Document</option>
                    </select>
                  </div>
                  
                  <div className="md:w-1/3 flex items-end">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      disabled={!selectedDocumentType || uploadingInProgress}
                      className="hidden"
                      id="document-file-input"
                    />
                    <label
                      htmlFor="document-file-input"
                      className={`w-full px-4 py-2 text-center rounded border flex items-center justify-center gap-2 ${
                        !selectedDocumentType || uploadingInProgress
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                          : 'bg-[#F59E0B] text-white hover:bg-[#E8A317] cursor-pointer border-[#F59E0B]'
                      }`}
                    >
                      <Paperclip size={18} />
                      <span>Select File</span>
                    </label>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">Accepted file types: PDF, JPG, PNG. Maximum file size: 5MB.</p>
              </div>
              
              {/* Uploaded files list */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-[#0F172A]">Uploaded Documents</h5>
                    <span className="text-sm text-gray-500">
                      {uploadedFiles.filter(f => f.status === 'uploaded' || f.status === 'verified').length} of {getRequiredDocumentsCount()} uploaded
                    </span>
                  </div>
                </div>
                
                {uploadedFiles.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <File size={40} className="mx-auto mb-2 text-gray-300" />
                    <p>No documents uploaded yet.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {uploadedFiles.map(file => (
                      <li key={file.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              <File className="text-gray-400" size={20} />
                            </div>
                            <div>
                              <p className="font-medium text-[#0F172A] truncate max-w-xs">{file.name}</p>
                              <div className="flex gap-x-3 text-xs text-gray-500">
                                <span>{file.documentType}</span>
                                <span>{formatFileSize(file.size)}</span>
                              </div>
                              
                              {file.status === 'rejected' && file.errorMessage && (
                                <p className="text-red-500 text-xs mt-1">{file.errorMessage}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {file.status === 'uploading' ? (
                              <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-4">
                                <div 
                                  className="bg-[#F59E0B] h-2.5 rounded-full" 
                                  style={{ width: `${file.uploadProgress}%` }}
                                ></div>
                              </div>
                            ) : (
                              <span className={`mr-4 px-2 py-1 text-xs rounded-full ${
                                file.status === 'verified' 
                                  ? 'bg-green-100 text-green-800' 
                                  : file.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {file.status === 'verified' ? 'Verified' : 
                                 file.status === 'rejected' ? 'Rejected' : 'Uploaded'}
                              </span>
                            )}
                            
                            {(file.status === 'uploaded' || file.status === 'rejected') && (
                              <button 
                                onClick={() => handleRemoveFile(file.id)}
                                className="text-gray-400 hover:text-red-500"
                                disabled={uploadingInProgress}
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setUploadedFiles([]);
                    setUploadComplete(false);
                    setVerificationComplete(false);
                  }}
                  disabled={uploadedFiles.length === 0 || uploadingInProgress}
                  className={`px-4 py-2 rounded border ${
                    uploadedFiles.length === 0 || uploadingInProgress
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                      : 'border-[#F59E0B] text-[#F59E0B] hover:bg-[#FEF3C7]'
                  }`}
                >
                  Clear All
                </button>
                
                <button
                  onClick={handleStartVerification}
                  disabled={!uploadComplete || uploadingInProgress || verificationComplete}
                  className={`px-6 py-2 rounded ${
                    !uploadComplete || uploadingInProgress || verificationComplete
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                  }`}
                >
                  Verify Documents
                </button>
              </div>
              
              {verificationComplete && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex">
                    <Check className="text-green-500 mr-3 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium text-green-800">Documents Processed Successfully!</p>
                      <p className="mt-1 text-green-700">Your documents have been verified. You can proceed with your visa application.</p>
                      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Continue Application
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Visa Interview Questions Simulator - NEW FEATURE */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <HelpCircle size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Visa Interview Questions Simulator</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Prepare for your visa interview by practicing with common questions specific to your visa type.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
              <select 
                value={interviewVisaType}
                onChange={(e) => { setInterviewVisaType(e.target.value); setShowInterviewQuestions(false); }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              >
                <option value="">Select Visa Type</option>
                <option value="student">Student Visa</option>
                <option value="work">Work Visa</option>
                <option value="visitor">Visitor/Tourist Visa</option>
                <option value="family">Family Visa</option>
              </select>
            </div>
            
            <div className="text-center mb-6">
              <button 
                onClick={handleShowInterviewQuestions}
                disabled={!interviewVisaType}
                className={`px-6 py-2 rounded ${!interviewVisaType 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F59E0B] text-white hover:bg-[#E8A317]'}`}
              >
                Show Common Interview Questions
              </button>
            </div>
            
            {showInterviewQuestions && interviewVisaType && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-4">
                  Common Interview Questions for {interviewVisaType.charAt(0).toUpperCase() + interviewVisaType.slice(1)} Visa:
                </h4>
                <div className="bg-gray-50 p-5 rounded-md">
                  <ul className="space-y-4">
                    {interviewQuestions[interviewVisaType as keyof typeof interviewQuestions].map((question, index) => (
                      <li key={index} className="pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                        <div className="flex">
                          <span className="font-medium text-[#0F172A] mr-2">{index + 1}.</span>
                          <span>{question}</span>
                        </div>
                        <div className="mt-2 pl-6">
                          <div className="flex items-center text-[#F59E0B] text-sm cursor-pointer hover:underline">
                            <CheckSquare size={14} className="mr-1" />
                            <span>See sample answer</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-700 mb-4">Want personalized interview preparation and coaching?</p>
                  <button className="bg-[#0F172A] text-white px-6 py-2 rounded hover:bg-[#1E293B] transition-colors">
                    Book Interview Preparation Session
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Appointment Scheduler */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="flex items-center mb-4">
              <Calendar size={24} className="text-[#F59E0B] mr-2" />
              <h3 className="text-2xl font-bold text-[#0F172A]">Schedule a Consultation</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Book a consultation with our visa experts to discuss your specific requirements.
            </p>
            
            {!appointmentSubmitted ? (
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <select 
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                    <select 
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Choose a time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Purpose</label>
                    <select 
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                    >
                      <option value="">Select purpose</option>
                      <option value="student">Student Visa Consultation</option>
                      <option value="work">Work Visa Consultation</option>
                      <option value="tourist">Tourist Visa Consultation</option>
                      <option value="family">Family Visa Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-[#F59E0B] text-white rounded hover:bg-[#E8A317] transition-colors font-medium"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-[#0F172A] mb-2">Appointment Scheduled!</h4>
                <p className="text-gray-600 mb-4">
                  Your consultation has been scheduled for {appointmentDate} at {appointmentTime}.
                </p>
                <p className="text-gray-600">
                  We've sent a confirmation email to {email} with details about your appointment.
                </p>
                <button 
                  onClick={() => setAppointmentSubmitted(false)}
                  className="mt-6 px-4 py-2 border border-[#F59E0B] text-[#F59E0B] rounded hover:bg-[#FEF3C7] transition-colors"
                >
                  Schedule Another Appointment
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Passport size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Student Visas</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive assistance for student visa applications to study abroad.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Documentation guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Application review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Interview preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Post-submission support</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <FileCheck size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Work Visas</h3>
              <p className="text-gray-600 mb-4">
                Expert assistance for work visa applications for international employment.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Eligibility assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Document preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Application submission</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Follow-up with authorities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Globe size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Tourist Visas</h3>
              <p className="text-gray-600 mb-4">
                Simplified tourist visa application assistance for your international travel.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Country-specific guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Travel itinerary preparation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Documentation support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Visa application processing</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F59E0B]">
              <div className="text-[#F59E0B] mb-4">
                <Users size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Family Visas</h3>
              <p className="text-gray-600 mb-4">
                Assistance for family reunion, spouse, and dependent visa applications.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Eligibility verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Relationship documentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Financial requirement guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span>Application submission support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Visa Application Process</h2>
          <p className="text-gray-700 mb-8">
            Our streamlined visa application process ensures thorough preparation and timely submission of your application.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  We assess your travel needs, visa type requirements, and eligibility for your destination country.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Document Preparation</h3>
                <p className="text-gray-600">
                  We provide a comprehensive checklist and assist you in gathering and preparing all required documents.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Application Review</h3>
                <p className="text-gray-600">
                  Our experts thoroughly review your application to ensure accuracy and completeness.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Application Submission</h3>
                <p className="text-gray-600">
                  We assist with the submission of your application to the appropriate embassy or consulate.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Interview Preparation</h3>
                <p className="text-gray-600">
                  If required, we provide comprehensive interview preparation and mock interview sessions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                6
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Follow-up and Status Updates</h3>
                <p className="text-gray-600">
                  We follow up with the embassy or consulate and provide regular updates on your application status.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F59E0B] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                7
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Visa Collection</h3>
                <p className="text-gray-600">
                  Once approved, we assist with visa collection and provide pre-departure briefing.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Destinations We Cover</h2>
          <p className="text-gray-700 mb-8">
            We provide visa assistance services for numerous countries worldwide:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">United Kingdom</h3>
              </div>
              <p className="text-gray-600">
                Student, work, tourist, and family visas for the UK.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">United States</h3>
              </div>
              <p className="text-gray-600">
                B1/B2, F1, J1, H1B, and other US visa categories.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">Canada</h3>
              </div>
              <p className="text-gray-600">
                Study permits, work permits, visitor visas, and Express Entry.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">Australia</h3>
              </div>
              <p className="text-gray-600">
                Student, tourist, working holiday, and skilled migration visas.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">Schengen Countries</h3>
              </div>
              <p className="text-gray-600">
                Short-stay, student, and work visas for European countries.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#F59E0B] mr-3" size={24} />
                <h3 className="font-bold text-lg text-[#0F172A]">UAE & Middle East</h3>
              </div>
              <p className="text-gray-600">
                Tourist, business, and employment visas for UAE and other Middle Eastern countries.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Tips for Successful Visa Applications</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Apply well in advance</h3>
                  <p className="text-gray-600">
                    Start your visa application process at least 2-3 months before your planned travel date.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Provide complete and accurate information</h3>
                  <p className="text-gray-600">
                    Ensure all information in your application is accurate and matches your supporting documents.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Submit all required documents</h3>
                  <p className="text-gray-600">
                    Include all required supporting documents as per the embassy or consulate's checklist.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Avoid common mistakes</h3>
                  <p className="text-gray-600">
                    Be aware of common visa application pitfalls such as incomplete forms, insufficient funds proof, or inconsistent travel history.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#F59E0B]">
            <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Ready to Apply for Your Visa?</h3>
            <p className="text-gray-700 mb-4">
              Contact our visa experts today to begin your visa application process with confidence.
            </p>
            <button className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-2 px-6 rounded-md transition-colors font-medium">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
      {/* Live Chat Support - NEW FEATURE */}
      <div className={`fixed bottom-4 right-4 z-50 ${isChatOpen ? 'w-80' : 'w-auto'}`}>
        {!isChatOpen ? (
          <div className="flex flex-col space-y-3">
            <a 
              href="tel:+233594189892" 
              className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
              title="Call us directly"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
              title="Chat with us on WhatsApp"
            >
              <img 
                src="/images/whatsapp-logo.svg" 
                alt="WhatsApp Chat" 
                className="w-7 h-7" 
              />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-96">
            {/* Chat header */}
            <div className="bg-[#25D366] text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/images/whatsapp-logo.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5 mr-2" 
                />
                <span className="font-medium">WhatsApp Support</span>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="text-gray-100 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div 
                    className={`inline-block p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-[#DCF8C6] text-gray-800' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-2">
              <div className="flex">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
                <button 
                  type="submit"
                  className="bg-[#25D366] text-white px-4 rounded-r-md hover:bg-[#128C7E]"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaServicesPage;