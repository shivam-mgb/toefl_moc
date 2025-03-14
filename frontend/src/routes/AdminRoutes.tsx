import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Dashboard
import AdminDashboard from '../pages/admin/AdminDashboard';


// Speaking Pages
import SpeakingTasksOverview from '../pages/admin/speaking/SpeakingTasksOverview';
import SpeakingPromptsList from '../pages/admin/speaking/SpeakingPromptsList';
import AddSpeakingPrompt from '../pages/admin/speaking/AddSpeakingPrompt';
import EditSpeakingPrompt from '../pages/admin/speaking/EditSpeakingPrompt';

// Writing Pages
import WritingTasksOverview from '../pages/admin/writing/WritingTasksOverview';
import IntegratedPromptsList from '../pages/admin/writing/IntegratedPromptsList';
import AddIntegratedPrompt from '../pages/admin/writing/AddIntegratedPrompt';
import EditIntegratedPrompt from '../pages/admin/writing/EditIntegratedPrompt';
import IndependentPromptsList from '../pages/admin/writing/IndependentPromptsList';
import AddIndependentPrompt from '../pages/admin/writing/AddIndependentPrompt';
import EditIndependentPrompt from '../pages/admin/writing/EditIndependentPrompt';

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
      <Route path="/speaking/overview" element={<SpeakingTasksOverview />} />
      <Route path="/speaking/prompts" element={<SpeakingPromptsList />} />
      <Route path="/speaking/prompts/add/:taskType" element={<AddSpeakingPrompt />} />
      <Route path="/speaking/prompts/:id/edit" element={<EditSpeakingPrompt />} />

      {/* Writing Section */}
      <Route path="/writing" element={<Navigate to="/admin/writing/overview" replace />} />
      <Route path="/writing/overview" element={<WritingTasksOverview />} />
      <Route path="/writing/integrated" element={<IntegratedPromptsList />} />
      <Route path="/writing/integrated/add" element={<AddIntegratedPrompt />} />
      <Route path="/writing/integrated/:id/edit" element={<EditIntegratedPrompt />} />
      <Route path="/writing/independent" element={<IndependentPromptsList />} />
      <Route path="/writing/independent/add" element={<AddIndependentPrompt />} />
      <Route path="/writing/independent/:id/edit" element={<EditIndependentPrompt />} />

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