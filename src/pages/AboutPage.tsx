import { Award, Globe, CheckCircle, MapPin, Phone, Mail, Users, Shield, MessageSquare, FileText } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

// Custom Card component implementation
const CustomCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${className || ''}`}>
    {children}
  </div>
);
import { Star } from 'lucide-react';

const AboutPage = () => {
  // Partner universities from the Home page
  const partners = [
    { name: "University of Toronto", logo: "/images/partners/university-toronto.svg" },
    { name: "University of Melbourne", logo: "/images/partners/university-melbourne.svg" },
    { name: "Harvard University", logo: "/images/partners/harvard.svg" },
    { name: "McGill University", logo: "/images/partners/mcgill-university.svg" },
    { name: "Oxford University", logo: "/images/partners/oxford.svg" },
    { name: "Stanford University", logo: "/images/partners/stanford.svg" },
    { name: "MIT", logo: "/images/partners/mit-university.svg" },
    { name: "ETH Zurich", logo: "/images/partners/eth-zurich.svg" }
  ];

  // Team Members
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      description: "Over 15 years of experience in international education consulting",
      socialLinks: {
        linkedin: "https://linkedin.com/in/john-doe-consultant",
        twitter: "https://twitter.com/john_doe_cons"
      }
    },
    {
      name: "Jane Smith",
      role: "Education Consultant",
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      description: "Expert in student visa processing and university placements",
      socialLinks: {
        linkedin: "https://linkedin.com/in/jane-smith-education",
        twitter: "https://twitter.com/jane_smith_edu"
      }
    },
    {
      name: "Mike Johnson",
      role: "Travel Consultant",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      description: "Specialist in international travel and accommodation",
      socialLinks: {
        linkedin: "https://linkedin.com/in/mike-johnson-travel",
        twitter: "https://twitter.com/mike_johnson_travel"
      }
    },
    {
      name: "Sarah Williams",
      role: "Senior Visa Specialist",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      description: "Expert in visa regulations and immigration law",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarah-williams-visa",
        twitter: "https://twitter.com/sarah_williams_visa"
      }
    },
    {
      name: "David Brown",
      role: "Client Services Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      description: "Focused on client satisfaction and service excellence",
      socialLinks: {
        linkedin: "https://linkedin.com/in/david-brown-client",
        twitter: "https://twitter.com/david_brown_service"
      }
    },
    {
      name: "Emily Chen",
      role: "Education Counselor",
      image: "https://images.unsplash.com/photo-1573497014508-93a7f4a1e6c3",
      description: "Specializes in academic and career guidance",
      socialLinks: {
        linkedin: "https://linkedin.com/in/emily-chen-education",
        twitter: "https://twitter.com/emily_chen_education"
      }
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Wilson",
      role: "Student",
      quote: "Apex Travel Consult helped me secure admission to my dream university in Canada. Their guidance was invaluable!",
      rating: 5
    },
    {
      name: "James Brown",
      role: "Professional",
      quote: "The team at Apex Travel Consult made my work visa process smooth and stress-free. Highly recommend!",
      rating: 5
    }
  ];

  // Services
  const services = [
    {
      icon: <Users size={24} className="text-[#F59E0B]" />,
      title: "Education Consulting",
      description: "Comprehensive guidance on university applications, scholarship opportunities, academic planning, and course selection. We help students find the perfect fit for their academic and career goals."
    },
    {
      icon: <Shield size={24} className="text-[#F59E0B]" />,
      title: "Visa Services",
      description: "Expert assistance with all types of visas including student visas, work permits, visitor visas, and permanent residency applications. We ensure your visa process is smooth and stress-free."
    },
    {
      icon: <MessageSquare size={24} className="text-[#F59E0B]" />,
      title: "Cultural Orientation",
      description: "Pre-departure guidance, cultural integration support, and local lifestyle preparation. We help you understand the destination culture and make your transition smoother."
    },
    {
      icon: <FileText size={24} className="text-[#F59E0B]" />,
      title: "Documentation Support",
      description: "Professional assistance with all required documentation, including application forms, transcripts, recommendation letters, and financial documents. We ensure your paperwork is complete and accurate."
    }
  ];

  // Our Partners section
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, partnerName: string) => {
    const target = e.target as HTMLImageElement;
    // Create an inline SVG fallback as a data URI (most reliable fallback)
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f1f5f9" stroke="%23e2e8f0" stroke-width="2"/><text x="100" y="50" font-family="Arial, sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">${partnerName}</text></svg>`;
    
    try {
      target.src = fallbackSvg;
    } catch (err) {
      console.log('Error handling image fallback', err);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="About Us"
        subtitle="Apex Travel Consult: Your trusted partner for international education, travel, and employment opportunities"
      />
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Story</h2>
              <div className="w-20 h-1 bg-[#F59E0B] mb-6"></div>
              <p className="text-gray-700 mb-6">
                Apex Travel Consult was founded in 2015 with a vision to simplify international education and travel processes for Ghanaians 
                and Africans looking to explore global opportunities. What began as a small consultancy has grown into a comprehensive service 
                provider with a reputation for excellence and integrity.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder, having experienced the challenges of pursuing international opportunities firsthand, established Apex Travel Consult 
                to provide reliable guidance and support to others on similar journeys. Over the years, we have helped thousands of clients 
                achieve their dreams of studying, working, and traveling abroad.
              </p>
              <p className="text-gray-700">
                Today, we continue to uphold our commitment to excellence, offering personalized services that cater to the unique needs of each client. 
                Our experienced team of consultants stays updated with the latest immigration policies, educational requirements, and employment trends 
                to provide accurate and timely advice.
              </p>
            </div>
            <div className="lg:pl-10">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
                alt="Apex Travel Consult Team" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Services</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <CustomCard key={index} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#0F172A]">{service.title}</h3>
                    {service.icon}
                  </div>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Team</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-full h-48 mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-700 mb-4">{member.description}</p>
                <div className="flex space-x-4">
                  <a href={member.socialLinks.linkedin} className="text-gray-600 hover:text-[#F59E0B] transition-colors">
                    LinkedIn
                  </a>
                  <a href={member.socialLinks.twitter} className="text-gray-600 hover:text-[#F59E0B] transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <h3 className="text-[#0F172A] font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="space-y-6">
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-medium text-gray-900 cursor-pointer list-none">
                What services do you offer?
              </summary>
              <p className="mt-2 text-gray-600">
                We offer comprehensive services including education consulting, visa assistance, cultural orientation, and documentation support.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-medium text-gray-900 cursor-pointer list-none">
                How much does your service cost?
              </summary>
              <p className="mt-2 text-gray-600">
                Our fees vary based on the specific services required. Please contact us for a personalized quote.
              </p>
            </details>
            <details className="bg-gray-50 rounded-lg p-6">
              <summary className="font-medium text-gray-900 cursor-pointer list-none">
                How long does the process take?
              </summary>
              <p className="mt-2 text-gray-600">
                The timeline varies depending on your specific needs and circumstances. We provide a detailed timeline during our initial consultation.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Get in Touch</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Phone className="text-[#F59E0B] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-700">+233 123 456 789</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Mail className="text-[#F59E0B] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-700">info@apextravelconsult.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="text-[#F59E0B] mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-700">Accra, Ghana</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Mission & Vision</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#F59E0B] mb-4">
                <Award size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#0F172A]">Our Mission</h3>
              <p className="text-gray-700">
                To provide comprehensive and reliable consulting services that empower individuals to access global education and career opportunities. 
                We are committed to delivering personalized guidance with integrity, professionalism, and excellence, ensuring each client's journey abroad 
                is successful and rewarding.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#F59E0B] mb-4">
                <Globe size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#0F172A]">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading travel and education consultancy in Africa, recognized for our expertise, reliability, and client-centered approach. 
                We envision a world where geographical boundaries do not limit access to quality education and career advancement, and we strive to be at 
                the forefront of making this vision a reality.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3 text-center">Our Core Values</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Integrity</h3>
                <p className="text-gray-700">
                  We uphold the highest ethical standards in all our dealings, providing honest advice and transparent services.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in every aspect of our service, consistently exceeding client expectations.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Client-Focused</h3>
                <p className="text-gray-700">
                  We prioritize our clients' needs and goals, tailoring our services to their unique circumstances and aspirations.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Innovation</h3>
                <p className="text-gray-700">
                  We continuously seek innovative solutions to address the evolving needs of our clients in a changing global landscape.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Professionalism</h3>
                <p className="text-gray-700">
                  We conduct our business with the highest level of professionalism, ensuring quality service and timely delivery.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#F59E0B] transition-colors">
                <div className="text-[#F59E0B] mb-4">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">Empowerment</h3>
                <p className="text-gray-700">
                  We empower our clients with knowledge, resources, and support to make informed decisions about their future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Team</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Meet our team of experienced consultants dedicated to helping you achieve your international education and career goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">John Doe</h3>
                <p className="text-[#F59E0B] font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 mb-4">
                  With over 15 years of experience in international education consulting.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">Jane Smith</h3>
                <p className="text-[#F59E0B] font-medium mb-3">Education Consultant</p>
                <p className="text-gray-600 mb-4">
                  Specializes in UK and Canadian university admissions and scholarships.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">Michael Chen</h3>
                <p className="text-[#F59E0B] font-medium mb-3">Visa Specialist</p>
                <p className="text-gray-600 mb-4">
                  Expert in visa applications with a 95% success rate for clients.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">Sarah Johnson</h3>
                <p className="text-[#F59E0B] font-medium mb-3">IELTS Instructor</p>
                <p className="text-gray-600 mb-4">
                  Certified language instructor with 10 years of teaching experience.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-[#F59E0B]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Our Partners</h2>
            <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We collaborate with leading universities, organizations, and institutions worldwide to provide the best opportunities for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <img 
                  src={partner.logo} 
                  alt="Partner Logo" 
                  className="max-h-16 max-w-full object-contain" 
                  onError={(e) => handleImageError(e, partner.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to schedule a consultation with one of our expert advisors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-[#F59E0B] rounded-full mb-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <p className="text-center">
                Santasi Ajacent Amenfiman Rural Bank<br />
                Kumasi Ashanti Region, Ghana
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-[#F59E0B] rounded-full mb-4">
                  <Phone size={24} className="text-white" />
                </div>
                <p className="text-center">
                +233 598 879 348<br />
                +233 598 879 349
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-[#F59E0B] rounded-full mb-4">
                  <Mail size={24} className="text-white" />
                </div>
                <p className="text-center">
                  info@apextravelconsult.com<br />
                  support@apextravelconsult.com
                </p>
              </div>
            </div>
            <div className="mt-10">
              <a 
                href="/contact"
                className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-3 px-8 rounded-md transition-colors font-medium inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;