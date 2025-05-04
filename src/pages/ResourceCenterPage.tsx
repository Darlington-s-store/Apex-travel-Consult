import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx';
import { Download, BookOpen, FileText } from 'lucide-react';

const ResourceCenterPage = () => {
  const resources = [
    {
      title: "Study Abroad Guide",
      category: "Education",
      icon: <BookOpen size={24} className="text-[#F59E0B]" />,
      description: "Comprehensive guide to studying abroad including university selection, application process, and visa requirements.",
      type: "PDF",
      size: "2.5MB",
      downloadLink: "#"
    },
    {
      title: "Visa Application Checklist",
      category: "Visa",
      icon: <FileText size={24} className="text-[#F59E0B]" />,
      description: "Detailed checklist for visa applications including required documents, timelines, and common mistakes to avoid.",
      type: "DOCX",
      size: "1.2MB",
      downloadLink: "#"
    },
    {
      title: "IELTS Preparation Guide",
      category: "English Proficiency",
      icon: <Download size={24} className="text-[#F59E0B]" />,
      description: "Step-by-step guide to preparing for the IELTS exam including practice tests and study tips.",
      type: "PDF",
      size: "3.1MB",
      downloadLink: "#"
    },
    {
      title: "Scholarship Application Guide",
      category: "Education",
      icon: <BookOpen size={24} className="text-[#F59E0B]" />,
      description: "Guide to finding and applying for scholarships including tips for writing successful scholarship essays.",
      type: "PDF",
      size: "1.8MB",
      downloadLink: "#"
    },
    {
      title: "Work Visa Guide",
      category: "Visa",
      icon: <FileText size={24} className="text-[#F59E0B]" />,
      description: "Comprehensive guide to work visas including eligibility criteria, application process, and required documentation.",
      type: "DOCX",
      size: "1.5MB",
      downloadLink: "#"
    },
    {
      title: "Cultural Integration Guide",
      category: "Preparation",
      icon: <Download size={24} className="text-[#F59E0B]" />,
      description: "Guide to cultural integration and preparation for living in a new country including cultural norms and practical tips.",
      type: "PDF",
      size: "2.2MB",
      downloadLink: "#"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-3">Resource Center</h1>
          <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          <p className="text-gray-700">
            Download our free resources to help you prepare for your international journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center text-center">
                {resource.icon}
                <CardTitle className="text-xl font-semibold mb-2">{resource.title}</CardTitle>
                <p className="text-gray-600 mb-4">{resource.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                    </div>
                    <a 
                      href={resource.downloadLink} 
                      className="inline-flex items-center px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#D97706] transition-colors"
                    >
                      Download
                    </a>
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

export default ResourceCenterPage;
