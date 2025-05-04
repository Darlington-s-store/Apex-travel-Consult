import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import IeltsPage from './pages/IeltsPage';
import StudyAbroadPage from './pages/StudyAbroadPage';
import RecruitmentPage from './pages/RecruitmentPage';
import EnglishProficiencyPage from './pages/EnglishProficiencyPage';
import VisaServicesPage from './pages/VisaServicesPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookConsultationPage from './pages/BookConsultationPage';
import TestimonialsPage from './pages/TestimonialsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import FAQPage from './pages/FAQPage';
import ResourceCenterPage from './pages/ResourceCenterPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import BlogPostsPage from './pages/admin/BlogPostsPage';
import ServicesPage from './pages/admin/ServicesPage';
import JobsPage from './pages/admin/JobsPage';
import CoursesPage from './pages/admin/CoursesPage';
import CountriesPage from './pages/admin/CountriesPage';
import SettingsPage from './pages/admin/SettingsPage';
import CreateBlogPost from './pages/admin/CreateBlogPost';
import EditBlogPost from './pages/admin/EditBlogPost';
import AnalyticsDashboardPage from './pages/admin/AnalyticsDashboardPage';
import ReportGeneratorPage from './pages/admin/ReportGeneratorPage';
import EmailNotificationsPage from './pages/admin/EmailNotificationsPage';
import UserRolesPage from './pages/admin/UserRolesPage';
import BlogPostDetail from './pages/BlogPostDetail';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingScreen from './components/LoadingScreen';

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

// AppContent component to wrap all routes with the LoadingProvider
const AppContent = () => {
  return (
    <>
      <LoadingScreen minDuration={3000} />
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ielts" element={<IeltsPage />} />
          <Route path="study-abroad" element={<StudyAbroadPage />} />
          <Route path="recruitment" element={<RecruitmentPage />} />
          <Route path="english-proficiency" element={<EnglishProficiencyPage />} />
          <Route path="visa-services" element={<VisaServicesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostDetail />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book-consultation" element={<BookConsultationPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="success-stories" element={<SuccessStoriesPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="resources" element={<ResourceCenterPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<UserRolesPage />} />
          <Route path="posts" element={<BlogPostsPage />} />
          <Route path="posts/create" element={<CreateBlogPost />} />
          <Route path="posts/edit/:id" element={<EditBlogPost />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="analytics" element={<AnalyticsDashboardPage />} />
          <Route path="reports" element={<ReportGeneratorPage />} />
          <Route path="email" element={<EmailNotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}

export default App;