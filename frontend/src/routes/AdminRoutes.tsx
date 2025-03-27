import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Dashboard
import AdminDashboard from '../pages/admin/AdminDashboard';


// Section Creation Pages
import SectionCreationLanding from '../pages/admin/section-creation/SectionCreationLanding';
import CreateReadingSection from '../pages/admin/section-creation/CreateReadingSection';
import CreateListeningSection from '../pages/admin/section-creation/CreateListeningSection';
import CreateSpeakingSection from '../pages/admin/section-creation/CreateSpeakingSection';
import CreateWritingSection from '../pages/admin/section-creation/CreateWritingSection';

// Test Results
import TestResultsList from '../pages/admin/TestResultList';


// Testing paths
import AdminPanel from '../pages/AdminPanel';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main admin dashboard */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Speaking Section */}
      <Route path="/speaking" element={<Navigate to="/admin/speaking/overview" replace />} />

      {/* Writing Section */}
      <Route path="/writing" element={<Navigate to="/admin/writing/overview" replace />} />

      {/* Section Creation */}
      <Route path="/section-creation" element={<SectionCreationLanding />} />
      <Route path="/section-creation/reading" element={<CreateReadingSection />} />
      <Route path="/section-creation/listening" element={<CreateListeningSection />} />
      <Route path="/section-creation/speaking" element={<CreateSpeakingSection />} />
      <Route path="/section-creation/writing" element={<CreateWritingSection />} />

      {/* Test Results */}
      <Route path="/test-results" element={<TestResultsList />} />

      {/* Testing paths */}
      <Route path="/what" element={<AdminPanel />} />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;