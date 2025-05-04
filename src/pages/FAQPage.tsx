import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive services including education consulting, visa assistance, cultural orientation, and documentation support. Our team helps students and professionals achieve their international education and career goals."
    },
    {
      question: "How much does your service cost?",
      answer: "Our fees vary based on the specific services required. We offer personalized quotes based on your needs. Contact us for a free consultation to discuss your requirements and get a detailed quote."
    },
    {
      question: "How long does the process take?",
      answer: "The timeline varies depending on your specific needs and circumstances. We provide a detailed timeline during our initial consultation. Generally, the process can take anywhere from 2-6 months depending on the type of service and destination."
    },
    {
      question: "Do you guarantee visa approval?",
      answer: "While we cannot guarantee visa approval as it depends on various factors and the discretion of immigration authorities, we have a high success rate due to our expertise and thorough preparation of applications."
    },
    {
      question: "What universities do you work with?",
      answer: "We work with top universities worldwide including institutions in the US, UK, Canada, Australia, and more. Our team helps students find the perfect fit based on their academic and career goals."
    },
    {
      question: "Can you help with scholarships?",
      answer: "Yes, we provide comprehensive scholarship guidance including identifying opportunities, preparing application materials, and optimizing your chances of securing financial aid."
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-3">Frequently Asked Questions</h1>
          <div className="w-20 h-1 bg-[#F59E0B] mx-auto mb-6"></div>
          <p className="text-gray-700">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
