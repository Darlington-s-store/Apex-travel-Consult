import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import VideoHeroSection from '../components/VideoHeroSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      service: ''
    });
    alert('Message sent successfully!');
  };

  return (
    <div>
      {/* Hero Section */}
      <VideoHeroSection 
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, appointments, or assistance"
      />
      
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="p-3 bg-[#F59E0B]/10 rounded-full inline-block mb-4">
                <MapPin size={24} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0F172A]">Our Location</h3>
              <p className="text-gray-600">
                Santasi Ajacent Amenfiman Rural Bank<br />
                Kumasi Ashanti Region, Ghana
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="p-3 bg-[#F59E0B]/10 rounded-full inline-block mb-4">
                <Phone size={24} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0F172A]">Phone Numbers</h3>
              <p className="text-gray-600">
                +233 530 982 527<br />
                +233 322 493 675<br />
                +233 202 958 487
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="p-3 bg-[#F59E0B]/10 rounded-full inline-block mb-4">
                <Mail size={24} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0F172A]">Email Address</h3>
              <p className="text-gray-600">
                info@apextravelconsult.com<br />
                support@apextravelconsult.com
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="p-3 bg-[#F59E0B]/10 rounded-full inline-block mb-4">
                <Clock size={24} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#0F172A]">Working Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9AM - 5PM<br />
                Saturday: 10AM - 2PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name*</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service Interested In*</label>
                      <select 
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                      >
                        <option value="">Select a service</option>
                        <option value="study-abroad">Study Abroad</option>
                        <option value="recruitment">Recruitment</option>
                        <option value="ielts">IELTS Preparation</option>
                        <option value="english-proficiency">English Proficiency</option>
                        <option value="visa-services">Visa Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject*</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message*</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]" 
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-[#F59E0B] hover:bg-[#E8A317] text-white py-3 px-6 rounded-md transition-colors font-medium flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Map */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Find Us On The Map</h2>
                <div className="h-[400px] w-full bg-gray-300 rounded-lg mb-6">
                  {/* Replace with actual map embedding */}
                  <div className="h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    [Map will be displayed here]
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-[#0F172A]">Office Hours</h3>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
              <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
              <p className="text-gray-700">
                Find answers to commonly asked questions about our services.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">How do I schedule a consultation?</h3>
                <p className="text-gray-700">
                  You can schedule a consultation by filling out the contact form above, calling our office directly, 
                  or sending us an email. Our team will get back to you within 24 hours to arrange a convenient time.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Are your consultations free?</h3>
                <p className="text-gray-700">
                  Yes, we offer free initial consultations to understand your needs and goals. Based on this, 
                  we will recommend suitable services and provide a transparent fee structure for any additional services.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">How long does the visa application process take?</h3>
                <p className="text-gray-700">
                  The visa application processing time varies depending on the country and visa type. 
                  It can range from a few weeks to several months. During your consultation, we will provide 
                  specific timeframes based on your destination and visa category.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Do you offer virtual consultations?</h3>
                <p className="text-gray-700">
                  Yes, we offer both in-person and virtual consultations via video conferencing platforms. 
                  Virtual consultations are especially convenient for clients who cannot visit our office in person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Connect With Us On Social Media</h2>
            <p className="text-xl text-gray-300 mb-8">
              Follow us for the latest updates, tips, and information about international education and travel.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="bg-sky-500 hover:bg-sky-600 p-3 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C1.763 3.45.366 5.55.366 9.75c0 4.2 1.397 6.3 4.02 6.566 3.6.245 11.626.246 15.23 0 2.621-.267 4.019-2.366 4.019-6.566 0-4.2-1.398-6.3-4.02-6.566zm-10.99 8.075v-6.81l6.266 3.406-6.266 3.404z"/>
                </svg>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-900 p-3 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;