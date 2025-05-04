import React, { useState } from 'react';
import { Clock, MapPin, Phone, Mail, Calendar as CalendarIcon, 
  Briefcase, GraduationCap, Globe, FileText, CheckCircle,
  AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePickerCalendar from '../components/DatePickerCalendar';
import MultiStepForm, { StepIndicator } from '../components/MultiStepForm';
import ConsultationTestimonials from '../components/ConsultationTestimonials';
import LiveChatWidget from '../components/LiveChatWidget';

// Service options for the form
const consultationServices = [
  { id: 'study-abroad', name: 'Study Abroad', icon: GraduationCap },
  { id: 'recruitment', name: 'International Recruitment', icon: Briefcase },
  { id: 'language-testing', name: 'Language Testing', icon: FileText },
  { id: 'visa-services', name: 'Visa Services', icon: Globe },
];

// Available time slots
const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

// Countries for the form
const countries = [
  'USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 
  'Other (Please specify in additional information)'
];

// Steps for multi-step form
const formSteps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Service Details' },
  { id: 3, title: 'Schedule' },
  { id: 4, title: 'Review & Submit' }
];

const BookConsultationPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    country: '',
    additionalInfo: '',
    agreeTerms: false,
    preferredConsultation: 'in-person' // Default to in-person
  });
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Success state after form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle date change from calendar component
  const handleDateChange = (date: string) => {
    setFormData({
      ...formData,
      date
    });
  };
  
  // Go to next step
  const goToNextStep = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return Boolean(formData.service && formData.preferredConsultation);
      case 3:
        return Boolean(formData.date && formData.time);
      case 4:
        return formData.agreeTerms;
      default:
        return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!isStepValid()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      // In a real application, you would send this data to your backend
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after some time
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          country: '',
          additionalInfo: '',
          agreeTerms: false,
          preferredConsultation: 'in-person'
        });
        setCurrentStep(1);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Consultation</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Take the first step towards your international education and career goals with a personalized consultation.
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                {/* Show success message if form is submitted */}
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <h3 className="font-bold text-xl mb-2">Consultation Booked Successfully!</h3>
                        <p className="mb-4">
                          Thank you for booking a consultation with Apex Travel Consult. We have received your request and will contact you shortly to confirm your appointment.
                        </p>
                        <div className="bg-white p-4 rounded-md border border-green-100 mb-4">
                          <h4 className="font-bold text-[#0F172A] mb-2">Appointment Details</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <CalendarIcon className="text-[#F59E0B] mr-2" size={16} />
                              <span>Date: {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </li>
                            <li className="flex items-center">
                              <Clock className="text-[#F59E0B] mr-2" size={16} />
                              <span>Time: {formData.time}</span>
                            </li>
                            <li className="flex items-center">
                              <MapPin className="text-[#F59E0B] mr-2" size={16} />
                              <span>Location: {formData.preferredConsultation === 'in-person' ? 'Our Office' : 
                                formData.preferredConsultation === 'virtual' ? 'Virtual Meeting (link will be sent via email)' : 
                                'Phone Call'}</span>
                            </li>
                          </ul>
                        </div>
                        <p className="mb-4">
                          A confirmation email has been sent to <strong>{formData.email}</strong> with all the details of your appointment.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link 
                            to="/" 
                            className="bg-[#0F172A] hover:bg-[#1E293B] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center"
                          >
                            Return to Homepage
                          </Link>
                          <button 
                            onClick={() => setIsSubmitted(false)} 
                            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md transition-colors inline-flex items-center"
                          >
                            Book Another Consultation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Schedule Your Appointment</h2>
                    
                    {/* Mobile Step Indicator (visible on small screens) */}
                    <div className="lg:hidden mb-6">
                      <StepIndicator currentStep={currentStep} totalSteps={formSteps.length} />
                    </div>
                    
                    {/* Multi-step Form */}
                    <MultiStepForm
                      steps={formSteps}
                      currentStep={currentStep}
                      onNext={goToNextStep}
                      onPrevious={goToPreviousStep}
                      isStepValid={isStepValid()}
                      isLastStep={currentStep === formSteps.length}
                      isFirstStep={currentStep === 1}
                      isSubmitting={isSubmitting}
                    >
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Personal Information</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name *
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-blue-500" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                  Your contact information will only be used to arrange the consultation and provide related services.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 2: Service Details */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Consultation Details</h3>
                          
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Consultation Type *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                { value: 'in-person', label: 'In-Person', icon: MapPin, description: 'Meet at our office' },
                                { value: 'virtual', label: 'Virtual', icon: Globe, description: 'Zoom/Google Meet' },
                                { value: 'phone', label: 'Phone Call', icon: Phone, description: 'Speak via telephone' }
                              ].map((option) => (
                                <label 
                                  key={option.value}
                                  className={`
                                    block p-4 border rounded-lg cursor-pointer transition-all
                                    ${formData.preferredConsultation === option.value 
                                      ? 'border-[#F59E0B] bg-[#F59E0B]/5 ring-2 ring-[#F59E0B]' 
                                      : 'border-gray-200 hover:border-gray-300'
                                    }
                                  `}
                                >
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      name="preferredConsultation"
                                      value={option.value}
                                      checked={formData.preferredConsultation === option.value}
                                      onChange={handleChange}
                                      className="sr-only"
                                    />
                                    <div 
                                      className={`
                                        w-10 h-10 rounded-full flex items-center justify-center mr-3
                                        ${formData.preferredConsultation === option.value 
                                          ? 'bg-[#F59E0B] text-white' 
                                          : 'bg-gray-100 text-gray-500'
                                        }
                                      `}
                                    >
                                      <option.icon size={20} />
                                    </div>
                                    <div>
                                      <div className="font-medium">{option.label}</div>
                                      <div className="text-xs text-gray-500">{option.description}</div>
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                              Service Interested In *
                            </label>
                            <select
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                            >
                              <option value="">Select a service</option>
                              {consultationServices.map(service => (
                                <option key={service.id} value={service.id}>
                                  {service.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Destination Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                            >
                              <option value="">Select a country</option>
                              {countries.map(country => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 3: Schedule */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Schedule Your Appointment</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Date *
                              </label>
                              <DatePickerCalendar 
                                selectedDate={formData.date}
                                onChange={handleDateChange}
                                minDate={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Time *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map(slot => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({...formData, time: slot})}
                                    className={`
                                      py-2 px-4 border rounded-md text-center transition-colors
                                      ${formData.time === slot 
                                        ? 'bg-[#F59E0B]/10 border-[#F59E0B] text-[#0F172A] font-medium' 
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                      }
                                    `}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Information
                            </label>
                            <textarea
                              id="additionalInfo"
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Please share any specific questions or concerns you'd like to discuss during the consultation."
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                            ></textarea>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 4: Review & Submit */}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Review Your Information</h3>
                          
                          <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-[#0F172A]">Personal Information</h4>
                                <button 
                                  type="button" 
                                  className="text-[#F59E0B] text-sm hover:underline"
                                  onClick={() => setCurrentStep(1)}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}
                                </div>
                                <div>
                                  <span className="text-gray-500">Email:</span> {formData.email}
                                </div>
                                <div>
                                  <span className="text-gray-500">Phone:</span> {formData.phone}
                                </div>
                              </div>
                            </div>
                            
                            {/* Service Details */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-[#0F172A]">Consultation Details</h4>
                                <button 
                                  type="button" 
                                  className="text-[#F59E0B] text-sm hover:underline"
                                  onClick={() => setCurrentStep(2)}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Consultation Type:</span> {
                                    formData.preferredConsultation === 'in-person' ? 'In-Person' :
                                    formData.preferredConsultation === 'virtual' ? 'Virtual Meeting' :
                                    'Phone Call'
                                  }
                                </div>
                                <div>
                                  <span className="text-gray-500">Service:</span> {
                                    consultationServices.find(s => s.id === formData.service)?.name || 'Not specified'
                                  }
                                </div>
                                {formData.country && (
                                  <div>
                                    <span className="text-gray-500">Destination:</span> {formData.country}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Schedule */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-[#0F172A]">Appointment Schedule</h4>
                                <button 
                                  type="button" 
                                  className="text-[#F59E0B] text-sm hover:underline"
                                  onClick={() => setCurrentStep(3)}
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Date:</span> {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}
                                </div>
                                <div>
                                  <span className="text-gray-500">Time:</span> {formData.time || 'Not specified'}
                                </div>
                                {formData.additionalInfo && (
                                  <div className="md:col-span-2">
                                    <span className="text-gray-500">Additional Information:</span><br />
                                    {formData.additionalInfo}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Payment Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-bold text-[#0F172A] mb-2">Consultation Fee</h4>
                              <div className="text-sm">
                                <p className="flex items-center text-green-700 font-medium mb-2">
                                  <CheckCircle size={16} className="mr-2" />
                                  Initial consultation: <span className="ml-auto">Free</span>
                                </p>
                                <p className="text-gray-500 text-xs">
                                  If follow-up consultations are needed, fees will be discussed during your initial consultation.
                                </p>
                              </div>
                            </div>
                            
                            {/* Terms Agreement */}
                            <div className="mt-4">
                              <label className="inline-flex items-start">
                                <input
                                  type="checkbox"
                                  name="agreeTerms"
                                  checked={formData.agreeTerms}
                                  onChange={handleChange}
                                  required
                                  className="mt-1 text-[#F59E0B] focus:ring-[#F59E0B]"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                  I agree to the <Link to="/privacy-policy" className="text-[#F59E0B] hover:underline">Privacy Policy</Link> and consent to Apex Travel Consult processing my personal information for the purpose of this consultation.
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </MultiStepForm>
                  </>
                )}
              </div>
              
              {/* Testimonials Section - visible only on larger screens */}
              <div className="mt-8 hidden lg:block">
                <ConsultationTestimonials />
              </div>
            </div>
            
            {/* Information Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0F172A] text-white rounded-lg shadow-lg p-6 md:p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-[#F59E0B] mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold mb-1">Our Office</h3>
                      <p className="text-white/80">
                        123 Education Lane, Accra, Ghana
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-[#F59E0B] mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p className="text-white/80">
                        +233 530 982 527<br />
                        +233 322 493 675<br />
                        +233 202 958 487
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-[#F59E0B] mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-white/80">
                        info@apextravelconsult.com<br />
                        bookings@apextravelconsult.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-[#F59E0B] mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold mb-1">Office Hours</h3>
                      <p className="text-white/80">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-6 border-white/20" />
                
                <div>
                  <h3 className="font-bold text-lg mb-4">Our Services</h3>
                  <ul className="space-y-3">
                    {consultationServices.map(service => (
                      <li key={service.id} className="flex items-center">
                        <service.icon className="text-[#F59E0B] mr-3" size={16} />
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="/about"
                    className="text-[#F59E0B] hover:text-[#E8A317] flex items-center font-medium"
                  >
                    Learn more about us
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Testimonials Section - visible only on mobile */}
              <div className="mt-8 lg:hidden">
                <ConsultationTestimonials />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our consultation process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">What should I prepare for the consultation?</h3>
              <p className="text-gray-600">
                To make the most of your consultation, please have your educational documents, passport (if available), and a clear idea of your goals ready. This will help our consultants provide you with the most accurate guidance.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">How long does a typical consultation last?</h3>
              <p className="text-gray-600">
                Our consultations typically last for 30-45 minutes, depending on the complexity of your case and the number of questions you have. We ensure that all your concerns are addressed during this time.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">Is there a fee for the initial consultation?</h3>
              <p className="text-gray-600">
                The initial consultation is free of charge. This allows us to understand your needs and goals, and for you to learn about our services without any commitment.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">Can I reschedule my appointment if needed?</h3>
              <p className="text-gray-600">
                Yes, you can reschedule your appointment up to 24 hours before your scheduled time without any penalty. Please contact our office if you need to make changes to your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
};

export default BookConsultationPage; 