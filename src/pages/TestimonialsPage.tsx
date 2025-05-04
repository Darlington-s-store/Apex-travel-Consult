import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Sarah Wilson",
      role: "Student",
      quote: "Apex Travel Consult helped me secure admission to my dream university in Canada. Their guidance was invaluable!",
      rating: 5,
      location: "Canada",
      program: "Computer Science",
      university: "University of Toronto"
    },
    {
      name: "James Brown",
      role: "Professional",
      quote: "The team at Apex Travel Consult made my work visa process smooth and stress-free. Highly recommend!",
      rating: 5,
      location: "Australia",
      company: "Google",
      position: "Software Engineer"
    },
    {
      name: "Aisha Johnson",
      role: "Student",
      quote: "Thanks to Apex Travel Consult, I was able to get a scholarship for my master's program in the UK. Their support was outstanding!",
      rating: 5,
      location: "UK",
      program: "Business Administration",
      university: "University of Oxford"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-3">Client Testimonials</h1>
          <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          <p className="text-gray-700">
            Hear from our satisfied clients who have achieved their dreams with our help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-xl font-semibold mb-2">{testimonial.name}</CardTitle>
                <p className="text-gray-600 mb-4">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                  {testimonial.location && (
                    <p>Location: {testimonial.location}</p>
                  )}
                  {testimonial.program && (
                    <p>Program: {testimonial.program}</p>
                  )}
                  {testimonial.university && (
                    <p>University: {testimonial.university}</p>
                  )}
                  {testimonial.company && (
                    <p>Company: {testimonial.company}</p>
                  )}
                  {testimonial.position && (
                    <p>Position: {testimonial.position}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
