import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Globe, GraduationCap, Briefcase } from 'lucide-react';

const SuccessStoriesPage = () => {
  const successStories = [
    {
      title: "From Ghana to Silicon Valley",
      category: "Career Success",
      icon: <Briefcase size={24} className="text-[#F59E0B]" />,
      content: "John Doe, a software developer from Ghana, secured a job at Google in Silicon Valley through our career placement services. We helped him with his resume, interview preparation, and visa process.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      stats: [
        { label: "Salary Increase", value: "+150%" },
        { label: "Visa Processing Time", value: "3 months" },
        { label: "Job Offers", value: "3" }
      ]
    },
    {
      title: "Academic Excellence",
      category: "Education Success",
      icon: <GraduationCap size={24} className="text-[#F59E0B]" />,
      content: "Sarah Wilson achieved a full scholarship to study Computer Science at MIT. Our team helped her with her application, scholarship essays, and visa requirements.",
      image: "https://images.unsplash.com/photo-1573497014508-93a7f4a1e6c3",
      stats: [
        { label: "Scholarship Amount", value: "$50,000" },
        { label: "Application Timeline", value: "6 months" },
        { label: "Accepted Universities", value: "5" }
      ]
    },
    {
      title: "Global Mobility",
      category: "Visa Success",
      icon: <Globe size={24} className="text-[#F59E0B]" />,
      content: "David Brown successfully obtained his UK work visa within 2 months. Our team provided comprehensive support throughout the entire process.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      stats: [
        { label: "Visa Type", value: "Tier 2" },
        { label: "Processing Time", value: "2 months" },
        { label: "Success Rate", value: "95%" }
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-3">Success Stories</h1>
          <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          <p className="text-gray-700">
            Real success stories from our clients who achieved their dreams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center text-center">
                {story.icon}
                <CardTitle className="text-xl font-semibold mb-2">{story.title}</CardTitle>
                <p className="text-gray-600 mb-4">{story.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{story.content}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {story.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
