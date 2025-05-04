export interface Author {
  name: string;
  image: string;
  bio?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: Author | string;
  category: string;
  featured: boolean;
  readTime: string;
  tags: string[];
  content?: string;
}

// Blog post data
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "top-universities-international-students-2025",
    title: "Top 10 Universities for International Students in 2025",
    excerpt: "Discover the best universities around the world that offer excellent programs and support for international students.",
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    date: "May 15, 2025",
    author: {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sarah is an education consultant with over 10 years of experience helping international students find their perfect university match."
    },
    category: "Study Abroad",
    featured: true,
    readTime: "8 min read",
    tags: ["Universities", "International Education", "Study Abroad"],
    content: `
# Top 10 Universities for International Students in 2025

Are you considering studying abroad in 2025? Making the decision to pursue international education is exciting, but choosing the right university can be overwhelming. To help you make an informed decision, we've compiled a list of the top 10 universities that offer excellent programs and support for international students.

## What Makes a University Great for International Students?

Before diving into our list, let's understand what factors we considered:

1. **Quality of Education**: Academic reputation and teaching standards
2. **International Student Support**: Dedicated services for international students
3. **Diversity**: Percentage of international students and diversity initiatives
4. **Scholarship Opportunities**: Financial aid specifically for international students
5. **Career Services**: Job placement rates and career support for international graduates
6. **Location**: Safety, affordability, and quality of life in the host city

## The Top 10 List

### 1. University of Toronto (Canada)

Toronto's flagship university continues to attract international students thanks to Canada's friendly immigration policies and the university's robust support network. With over 700 undergraduate programs and 200 graduate programs, students have plenty of options.

**Key Facts:**
- International student population: 25%
- Notable programs: Computer Science, Engineering, Business
- Average tuition for international students: $40,000-$60,000 CAD per year

### 2. University of Melbourne (Australia)

Australia's education system remains attractive to international students, with Melbourne University leading the pack. The university offers a unique curriculum design that allows for greater flexibility.

**Key Facts:**
- International student population: 40%
- Notable programs: Medicine, Law, Environmental Science
- Average tuition for international students: $30,000-$45,000 AUD per year

### 3. ETH Zurich (Switzerland)

Known for its excellence in science and technology, ETH Zurich offers many programs in English despite being in a German-speaking region.

**Key Facts:**
- International student population: 40%
- Notable programs: Engineering, Architecture, Computer Science
- Tuition: Approximately 1,460 CHF per year (one of the most affordable options)

[...]

## How to Apply

When applying to these top universities, keep these tips in mind:

1. Start your application process at least 12 months in advance
2. Research specific program requirements, as they can vary significantly
3. Prepare for standardized tests like IELTS/TOEFL, GRE/GMAT as required
4. Seek guidance from education consultants who specialize in your target country
5. Apply for scholarships early, as many have deadlines well before admission deadlines

## Conclusion

The landscape of international education continues to evolve, with universities increasingly competing to attract talented students from around the globe. The universities on this list stand out for their commitment to providing excellent education and support services specifically designed for international students.

Remember, the "best" university is ultimately the one that best fits your academic goals, career aspirations, and personal preferences. We recommend researching each institution thoroughly and, if possible, connecting with current students or alumni to get insider perspectives.
    `
  },
  {
    id: 2,
    slug: "visa-interview-tips-and-tricks",
    title: "How to Prepare for Your Visa Interview: Tips and Tricks",
    excerpt: "Learn effective strategies and preparation techniques to ace your visa interview and increase your chances of approval.",
    image: "https://images.pexels.com/photos/45111/pexels-photo-45111.jpeg",
    date: "May 8, 2025",
    author: {
      name: "David Wong",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "David is a visa consultant who has helped hundreds of students navigate the complex visa application process."
    },
    category: "Visa Services",
    featured: false,
    readTime: "6 min read",
    tags: ["Visa", "Interview", "Immigration"],
    content: `
# How to Prepare for Your Visa Interview: Tips and Tricks

A visa interview can be nerve-wracking, especially when your educational and career aspirations depend on its outcome. However, with proper preparation, you can significantly increase your chances of success. This guide provides comprehensive strategies to help you ace your visa interview.

## Understanding the Purpose of the Interview

The visa officer's primary concern is determining whether you:
- Have legitimate reasons for visiting the country
- Plan to return to your home country after your stay
- Have the financial means to support yourself
- Meet all the legal requirements for the visa category

## Essential Documents to Prepare

Always bring these documents to your interview:
- Passport (valid for at least six months beyond your intended stay)
- Visa application confirmation
- Interview appointment letter
- Passport-sized photographs (meeting specific requirements)
- Academic documents (transcripts, certificates, standardized test scores)
- Proof of financial support (bank statements, scholarship letters, sponsor documents)
- Proof of ties to your home country
- Travel itinerary and accommodation details

## Common Questions and How to Answer Them

### About Your Educational Background

**Q: Why did you choose this particular university/program?**
A: Be specific about academic reputation, faculty expertise, unique program features, and how it aligns with your career goals.

**Q: Why not study in your home country?**
A: Focus on unique opportunities, specialized programs, or research possibilities not available at home.

### About Your Intentions

**Q: What are your plans after completing your studies?**
A: Emphasize your intention to return home and how your international education will benefit your career prospects in your country.

**Q: How will you contribute to your home country with this education?**
A: Discuss specific industries, companies, or projects where you can apply your knowledge.

[...]

## Day of the Interview: Practical Tips

1. **Arrive early**: Plan to arrive at least 30 minutes before your appointment
2. **Dress professionally**: Business casual attire is appropriate
3. **Be concise**: Answer questions clearly and directly without unnecessary elaboration
4. **Maintain eye contact**: This conveys confidence and honesty
5. **Speak confidently**: Practice your answers beforehand, but don't sound rehearsed
6. **Be truthful**: Dishonesty can result in permanent visa ineligibility

## What to Do If Your Visa Is Denied

A denial is not the end of the road. You can:
1. Request feedback on the reason for denial
2. Address the specific concerns in a new application
3. Provide additional documentation to strengthen your case
4. Consider seeking professional assistance for your next application

## Conclusion

A successful visa interview requires thorough preparation, confidence, and honesty. By understanding what visa officers are looking for and preparing accordingly, you can significantly improve your chances of approval. Remember that visa officers process hundreds of applications - your goal is to clearly demonstrate that you meet all requirements and have legitimate reasons for your visit.
    `
  },
  {
    id: 3,
    slug: "ielts-vs-toefl-comparison",
    title: "IELTS vs. TOEFL: Which English Test Should You Take?",
    excerpt: "A comprehensive comparison of the two most popular English proficiency tests to help you decide which one is right for you.",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    date: "April 29, 2025",
    author: {
      name: "Emma Smith",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      bio: "Emma is an English language instructor specialized in test preparation for IELTS and TOEFL."
    },
    category: "English Proficiency",
    featured: false,
    readTime: "7 min read",
    tags: ["IELTS", "TOEFL", "English Test", "Language Proficiency"],
    content: `
# IELTS vs. TOEFL: Which English Test Should You Take?

Proving your English proficiency is a crucial step in the international education journey. Two tests dominate the landscape: IELTS (International English Language Testing System) and TOEFL (Test of English as a Foreign Language). This guide will help you understand the key differences and choose the right test for your needs.

## Test Format Comparison

### IELTS

The IELTS test is divided into four sections:

1. **Listening (30 minutes)**: 40 questions based on recorded conversations and monologues
2. **Reading (60 minutes)**: 40 questions testing your reading comprehension
3. **Writing (60 minutes)**: Two writing tasks (Academic: report writing and essay; General: letter and essay)
4. **Speaking (11-14 minutes)**: Face-to-face interview with an examiner

Total test time: Approximately 2 hours and 45 minutes

### TOEFL iBT

The TOEFL iBT (Internet-Based Test) also has four sections:

1. **Reading (54-72 minutes)**: 30-40 questions based on academic texts
2. **Listening (41-57 minutes)**: 28-39 questions based on lectures and conversations
3. **Speaking (17 minutes)**: 4 tasks recorded on computer
4. **Writing (50 minutes)**: 2 writing tasks (integrated and independent)

Total test time: Approximately 3 hours

## Key Differences

### Accent and Language Variation

- **IELTS**: Features a variety of English accents (British, Australian, American, etc.)
- **TOEFL**: Primarily uses North American English accents

### Speaking Section

- **IELTS**: Face-to-face interview with an examiner, more conversational
- **TOEFL**: Speaking into a microphone with recorded responses, more structured

### Availability and Locations

- **IELTS**: Offered up to four times a month at over 1,600 locations in 140 countries
- **TOEFL**: Offered more than 50 times a year at over 4,500 locations in 165 countries

[...]

## Which Test Should You Choose?

Consider these factors when making your decision:

### Choose IELTS if:
- You prefer face-to-face communication
- You're more comfortable with diverse English accents
- You're applying to institutions in the UK, Australia, Canada, or New Zealand
- You need the test for immigration purposes (IELTS General)
- You perform better with handwritten responses

### Choose TOEFL if:
- You're comfortable with technology and speaking into a microphone
- You're more familiar with American English
- You're applying to North American institutions (especially U.S. universities)
- You prefer multiple-choice questions over open-ended questions
- You perform better with keyboard typing than handwriting

## Preparation Strategies

Regardless of which test you choose, effective preparation is essential:

1. **Familiarize yourself with the format**: Take practice tests to understand the structure
2. **Develop a study schedule**: Allocate specific time for each section
3. **Use official materials**: Both IELTS and TOEFL offer official preparation resources
4. **Identify your weaknesses**: Focus more time on improving your weakest areas
5. **Practice regularly**: Consistent practice is key to improving your scores

## Conclusion

Both IELTS and TOEFL are widely accepted by institutions worldwide. Your choice should depend on your personal preferences, target institutions' requirements, and your strengths as a test-taker. Check with your prospective schools about their specific requirements before deciding which test to take.

Remember that preparation is the most important factor in your success, regardless of which test you choose.
    `
  },
  {
    id: 4,
    slug: "in-demand-skills-international-job-markets-2025",
    title: "In-Demand Skills for International Job Markets in 2025",
    excerpt: "Explore the skills and qualifications that employers around the world are looking for in today's competitive job market.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    date: "April 20, 2025",
    author: {
      name: "Michael Chen",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Michael is a career development specialist focusing on international recruitment and job placement."
    },
    category: "Recruitment",
    featured: false,
    readTime: "5 min read",
    tags: ["Career", "Skills", "Job Market", "Employment"],
    content: `
# In-Demand Skills for International Job Markets in 2025

The global job market is evolving rapidly, with new technologies and changing economic landscapes creating demand for specific skill sets. Whether you're a recent graduate or looking to pivot your career internationally, understanding which skills are most valued by employers can give you a significant competitive advantage.

## Technical Skills in High Demand

### 1. Artificial Intelligence and Machine Learning

The AI revolution continues to transform industries worldwide. Professionals with expertise in:
- Machine learning algorithms
- Natural language processing
- Computer vision
- AI ethics and governance

remain among the most sought-after. Countries like Canada, Germany, and Singapore have established themselves as AI hubs with significant talent shortages.

### 2. Cybersecurity

As digital transformation accelerates, cybersecurity professionals are in critical demand. Key specializations include:
- Cloud security
- IoT security
- Ethical hacking
- Security architecture
- Risk assessment and management

### 3. Data Science and Analytics

Organizations continue to seek professionals who can derive actionable insights from complex data:
- Statistical analysis
- Data visualization
- Predictive modeling
- Big data technologies
- Domain-specific analytics (finance, healthcare, retail)

[...]

## Professional Skills That Cross Borders

### 1. Cross-Cultural Communication

The ability to communicate effectively across cultures has become non-negotiable in global businesses:
- Cultural sensitivity and awareness
- Multilingual capabilities (particularly Mandarin, Spanish, Arabic)
- Virtual collaboration skills
- Conflict resolution in diverse teams

### 2. Adaptability and Resilience

In rapidly changing work environments, employers value candidates who can:
- Navigate ambiguity
- Adapt to new technologies and processes
- Remain productive during organizational changes
- Recover quickly from setbacks

[...]

## Regional Focus: Where Are the Opportunities?

### Asia-Pacific

- **Singapore**: Financial technology, cybersecurity, AI research
- **Japan**: Robotics, elderly care technology, clean energy
- **Australia**: Healthcare, mining technology, sustainable agriculture

### Europe

- **Germany**: Advanced manufacturing, automotive innovation, renewable energy
- **Estonia**: Digital governance, cybersecurity, e-commerce
- **Sweden**: Sustainable design, green technology, social innovation

### North America

- **Canada**: Healthcare, clean technology, digital media
- **United States**: Biotechnology, space technology, digital transformation

## How to Develop In-Demand Skills

1. **Continuous learning platforms**: Coursera, edX, LinkedIn Learning
2. **Professional certifications**: Industry-recognized credentials in your field
3. **International internships**: Gain experience while building cross-cultural competencies
4. **Remote work on global projects**: Contribute to international teams
5. **Language acquisition**: Invest in learning languages relevant to your target markets

## Conclusion

The global job market rewards those who can combine technical expertise with cross-cultural competencies. By developing skills that are in high demand internationally and understanding regional market needs, you can position yourself as a competitive candidate across borders.

Remember that while technical skills open doors, it's often the human skills—adaptability, communication, and problem-solving—that determine long-term career success in international contexts.
    `
  },
  {
    id: 5,
    slug: "student-life-in-canada-what-to-expect",
    title: "Student Life in Canada: What to Expect",
    excerpt: "A guide to student life in Canada, including information about accommodation, transportation, and cultural experiences.",
    image: "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    date: "April 12, 2025",
    author: {
      name: "Lisa Taylor",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      bio: "Lisa studied abroad in Canada for her Master's degree and now works as an international student advisor."
    },
    category: "Study Abroad",
    featured: false,
    readTime: "9 min read",
    tags: ["Canada", "Student Life", "International Students"],
    content: `
# Student Life in Canada: What to Expect

Canada has become one of the world's top destinations for international students, known for its high-quality education system, diverse culture, and post-graduation work opportunities. If you're considering studying in Canada, here's what you can expect from student life in the Great White North.

## Climate and Weather Preparedness

Canada is famous for its cold winters, but the climate varies significantly across this vast country:

- **British Columbia (Vancouver)**: Mild, rainy winters and warm summers
- **Prairie Provinces (Alberta, Saskatchewan, Manitoba)**: Cold winters with heavy snowfall and warm summers
- **Ontario and Quebec**: Four distinct seasons with cold, snowy winters and hot, humid summers
- **Atlantic Provinces**: Volatile weather with significant precipitation year-round

**Essential Winter Gear:**
- Insulated, waterproof winter coat
- Waterproof winter boots with good traction
- Thermal layers
- Hat, gloves, and scarf

## Housing Options

### On-Campus Residence

**Pros:**
- Convenient location
- Meal plans available
- Easier social integration
- Utilities and internet typically included

**Cons:**
- More expensive than some off-campus options
- Limited privacy
- Potential for noise
- Often closed during holidays

**Cost:** CAD $8,000-$15,000 per academic year

### Off-Campus Housing

**Shared Apartments/Houses:**
- Most affordable option
- More independence
- Opportunity to immerse in Canadian culture
- Responsibility for utilities and household management

**Cost:** CAD $500-$1,500 per month (varies significantly by city)

**Homestay:**
- Living with a Canadian family
- Cultural immersion
- Often includes meals
- Support system for new arrivals

**Cost:** CAD $800-$1,500 per month including meals

[...]

## Healthcare and Insurance

All international students in Canada must have health insurance:

- **Provincial Health Insurance**: Some provinces (BC, AB, MB, NL, ON) allow international students to access provincial healthcare after a waiting period
- **University Health Insurance Plans**: Mandatory at many institutions
- **Private Insurance**: Required in provinces without access to provincial healthcare

**Average Cost:** CAD $600-$900 per year

## Transportation

### Public Transit

Most Canadian cities have reliable public transportation:
- **Monthly Transit Pass**: CAD $90-$150
- **Student Discounts**: Available with valid student ID
- **Intercity Travel**: Train (VIA Rail), bus (Greyhound, Megabus), domestic flights

### Cycling and Walking

- Many Canadian cities are developing better cycling infrastructure
- Winter cycling is possible with proper equipment
- Walking is practical in urban centers for most of the year

[...]

## Working While Studying

International students can work up to 20 hours per week during regular academic sessions and full-time during scheduled breaks:

- **On-Campus Jobs**: Often the easiest to secure, but limited in number
- **Off-Campus Work**: Requires a valid study permit
- **Minimum Wage**: Varies by province (CAD $13.50-$16.00 per hour)
- **Common Student Jobs**: Retail, food service, campus research assistants, tutoring

## Cultural Adjustment Tips

- **Canadians value politeness**: "Please," "thank you," and "sorry" are used frequently
- **Punctuality is important**: Arrive on time for classes, appointments, and social gatherings
- **Tipping culture**: 15-20% at restaurants and for services is standard
- **Winter activities**: Embracing winter sports (skating, skiing, snowshoeing) helps combat winter blues
- **Multicultural environment**: Canada celebrates diversity, with many cultural festivals throughout the year

## Conclusion

Studying in Canada offers a unique blend of high-quality education, cultural diversity, and natural beauty. While adjusting to a new country always presents challenges, Canada's welcoming atmosphere and support systems for international students make the transition smoother.

By understanding what to expect and preparing accordingly, you can make the most of your Canadian educational experience—both academically and culturally.
    `
  },
  {
    id: 6,
    slug: "funding-international-education-scholarships-grants",
    title: "How to Fund Your International Education: Scholarships and Grants",
    excerpt: "Discover various funding options available for international students, including scholarships, grants, and financial aid programs.",
    image: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg",
    date: "April 5, 2025",
    author: {
      name: "Robert Fernandez",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      bio: "Robert specializes in international education financing and has helped students secure over $5 million in scholarships."
    },
    category: "Study Abroad",
    featured: true,
    readTime: "10 min read",
    tags: ["Scholarships", "Financial Aid", "Study Abroad"],
    content: `
# How to Fund Your International Education: Scholarships and Grants

Pursuing an international education is an investment in your future, but it comes with significant financial challenges. The good news is that numerous funding opportunities exist specifically for international students. This comprehensive guide will help you navigate scholarships, grants, and other financial resources to make your educational dreams more affordable.

## Understanding the Full Cost of International Education

Before exploring funding options, it's important to understand all potential costs:

- **Tuition fees**: Typically the largest expense, varying widely by country and institution
- **Living expenses**: Accommodation, food, transportation, utilities
- **Health insurance**: Often mandatory for international students
- **Travel costs**: Initial travel, holiday visits home
- **Visa and permit fees**: Application and renewal costs
- **Books and supplies**: Academic materials
- **Miscellaneous expenses**: Clothing, entertainment, communication

## Types of Financial Aid for International Students

### Merit-Based Scholarships

These scholarships reward academic, athletic, artistic, or leadership excellence:

- **University-specific scholarships**: Offered directly by institutions to attract top talent
- **Government scholarships**: Funded by host countries to promote international education
- **Private foundation scholarships**: Provided by organizations with specific missions or target demographics
- **Corporate scholarships**: Offered by multinational companies, often in related fields of study

### Need-Based Financial Aid

These programs consider your financial situation:

- **Hardship grants**: For students facing significant financial challenges
- **Country-specific aid**: For students from developing nations
- **Emergency funding**: For unexpected financial difficulties during your studies

### Country-Specific Opportunities

#### Studying in the United States
- **Fulbright Program**: Prestigious government-sponsored opportunity
- **EducationUSA**: Resource network with scholarship information
- **University funding**: US universities often offer significant financial aid packages

#### Studying in the United Kingdom
- **Chevening Scholarships**: Fully-funded scholarships for future leaders
- **Commonwealth Scholarships**: For students from Commonwealth countries
- **GREAT Scholarships**: Partnerships with UK institutions

[...]

## How to Find Scholarships

### Online Scholarship Databases
- International Education Financial Aid (IEFA)
- Scholarship Portal
- Study Portals
- Funding for US Study

### University Websites
Most institutions list scholarships and financial aid options for international students on dedicated web pages.

### Education Fairs and Events
Attend international education exhibitions where universities and scholarship providers often participate.

### Government Resources
Many countries have agencies dedicated to promoting their education systems internationally.

## Application Strategies for Maximum Success

### Start Early
Begin your scholarship search at least 12-18 months before your intended start date.

### Apply Broadly
Most successful students apply for multiple scholarships to increase their chances.

### Tailor Each Application
Customize your applications to match each scholarship's specific criteria and values.

### Prepare Strong Supporting Documents
- **Personal statement**: Clearly articulate your goals and why you deserve the funding
- **Letters of recommendation**: Request these from professors/employers who know you well
- **Academic transcripts**: Ensure these are official and translated if necessary
- **Financial documents**: Accurately demonstrate your financial need if applying for need-based aid

[...]

## Alternative Funding Sources

### Part-Time Work
Many countries allow international students to work a limited number of hours while studying.

### Education Loans
- **Home country loans**: Often offer favorable terms for international education
- **Host country loans**: May require a local guarantor
- **International student loan programs**: Specifically designed for global mobility

### Crowdfunding
Platforms like GoFundMe allow you to raise money for educational purposes from your network.

## Conclusion

Funding an international education requires research, planning, and persistence. By starting early, exploring all available options, and submitting strong applications, you can significantly reduce the financial burden of studying abroad.

Remember that many successful international students combine multiple funding sources—perhaps a partial scholarship, family support, personal savings, and part-time work—to finance their education. The key is to be proactive, organized, and thorough in your approach to finding financial support.
    `
  },
  {
    id: 7,
    slug: "day-in-life-international-student",
    title: "A Day in the Life of an International Student",
    excerpt: "Experience the typical day of an international student, from morning routines to study habits and social activities.",
    image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
    date: "March 28, 2025",
    author: "Maria Rodriguez",
    category: "Study Abroad",
    featured: false,
    readTime: "6 min read",
    tags: ["Student Life", "International Students", "Campus Life"]
  },
  {
    id: 8,
    slug: "working-while-studying-abroad",
    title: "Working While Studying Abroad: What You Need to Know",
    excerpt: "Learn about work regulations, finding opportunities, balancing work and studies, and building your international resume.",
    image: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg",
    date: "March 20, 2025",
    author: "Thomas Klein",
    category: "Study Abroad",
    featured: false,
    readTime: "7 min read",
    tags: ["Part-time Work", "Student Jobs", "Work Regulations"]
  },
  {
    id: 9,
    slug: "cultural-adjustment-overcoming-homesickness",
    title: "Cultural Adjustment: Overcoming Homesickness",
    excerpt: "Practical strategies and tips for international students dealing with homesickness and cultural adjustment challenges.",
    image: "https://images.pexels.com/photos/2774197/pexels-photo-2774197.jpeg",
    date: "March 15, 2025",
    author: "Aisha Patel",
    category: "Student Life",
    featured: false,
    readTime: "5 min read",
    tags: ["Mental Health", "Cultural Adjustment", "Homesickness"]
  },
  {
    id: 10,
    slug: "budgeting-study-abroad-experience",
    title: "Budgeting for Your Study Abroad Experience",
    excerpt: "Comprehensive guide to managing finances, saving money, and making the most of your budget while studying internationally.",
    image: "https://images.pexels.com/photos/47344/dollar-currency-money-us-dollar-47344.jpeg",
    date: "March 8, 2025",
    author: "Carlos Mendoza",
    category: "Study Abroad",
    featured: false,
    readTime: "8 min read",
    tags: ["Budgeting", "Student Finances", "Cost Management"]
  }
];

// Categories with count
export const blogCategories = [
  { name: "All", count: blogPosts.length },
  { name: "Study Abroad", count: blogPosts.filter(post => post.category === "Study Abroad").length },
  { name: "Visa Services", count: blogPosts.filter(post => post.category === "Visa Services").length },
  { name: "Recruitment", count: blogPosts.filter(post => post.category === "Recruitment").length },
  { name: "English Proficiency", count: blogPosts.filter(post => post.category === "English Proficiency").length },
  { name: "Student Life", count: blogPosts.filter(post => post.category === "Student Life").length },
  { name: "IELTS", count: 7 },
  { name: "Travel Tips", count: 9 }
];

// Trending topics
export const trendingTopics = [
  { name: "Scholarship Opportunities", count: 24 },
  { name: "Study in Canada", count: 18 },
  { name: "IELTS Preparation", count: 15 },
  { name: "Work While Studying", count: 12 }
];

// Helper functions
export const getRelatedPosts = (currentPostId: number, category: string, maxPosts: number = 3): BlogPost[] => {
  // First get posts with the same category
  let related = blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, maxPosts);
    
  // If we don't have enough, add other posts
  if (related.length < maxPosts) {
    const otherPosts = blogPosts
      .filter(post => post.id !== currentPostId && post.category !== category)
      .slice(0, maxPosts - related.length);
      
    related = [...related, ...otherPosts];
  }
  
  return related;
};

export const getPreviousAndNextPosts = (currentPostId: number): { previous: BlogPost | null, next: BlogPost | null } => {
  const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previous = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  return { previous, next };
}; 