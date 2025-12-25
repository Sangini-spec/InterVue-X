
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { InterviewLive } from './pages/InterviewLive';
import { ImageEditor } from './pages/ImageEditor';
import { VideoStudio } from './pages/VideoStudio';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Pricing } from './pages/Pricing';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { ResumeReview } from './pages/ResumeReview';
import { Profile } from './pages/Profile';
import { ContactUs } from './pages/ContactUs';
import { Jobs } from './pages/Jobs';
import { JobDetail } from './pages/JobDetail';
import { CreateInterview } from './pages/CreateInterview';
import { CompanyProfile } from './pages/CompanyProfile';
import { SalaryNegotiationSetup } from './pages/SalaryNegotiationSetup';
import { JobDescriptionInterview } from './pages/JobDescriptionInterview';
import { SystemDesignInterview } from './pages/SystemDesignInterview';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/interview" element={<InterviewLive />} />
          <Route path="/create-interview" element={<CreateInterview />} />
          <Route path="/job-description-interview" element={<JobDescriptionInterview />} />
          <Route path="/salary-negotiation" element={<SalaryNegotiationSetup />} />
          <Route path="/system-design-interview" element={<SystemDesignInterview />} />
          <Route path="/whiteboard" element={<ImageEditor />} />
          <Route path="/video-studio" element={<VideoStudio />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-review" element={<ResumeReview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
