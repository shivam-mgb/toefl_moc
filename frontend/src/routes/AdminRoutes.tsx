import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Dashboard
import AdminDashboard from '../pages/admin/AdminDashboard';

// Reading Section
import ReadingPassagesList from '../pages/admin/reading/ReadingPassagesList';
import AddReadingPassage from '../pages/admin/reading/AddReadingPassage';
import ReadingPassageDetail from '../pages/admin/reading/ReadingPassageDetail';
import EditReadingPassage from '../pages/admin/reading/EditReadingPassage';
import ReadingQuestionsList from '../pages/admin/reading/ReadingQuestionsList';
import AddReadingQuestion from '../pages/admin/reading/AddReadingQuestion';
import EditReadingQuestion from '../pages/admin/reading/EditReadingQuestion';

// Listening Section
import ListeningAudioList from '../pages/admin/listening/ListeningAudioList';
import AddListeningAudio from '../pages/admin/listening/AddListeningAudio';
import ListeningAudioDetail from '../pages/admin/listening/ListeningAudioDetail';
import ListeningQuestionsList from '../pages/admin/listening/ListeningQuestionsList';
import AddListeningQuestion from '../pages/admin/listening/AddListeningQuestion';
import EditListeningQuestion from '../pages/admin/listening/EditListeningQuestion';

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

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main admin dashboard */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Reading Section */}
      <Route path="/reading" element={<Navigate to="/admin/reading/passages" replace />} />
      <Route path="/reading/passages" element={<ReadingPassagesList />} />
      <Route path="/reading/passages/add" element={<AddReadingPassage />} />
      <Route path="/reading/passages/:id" element={<ReadingPassageDetail />} />
      <Route path="/reading/passages/:id/edit" element={<EditReadingPassage />} />
      <Route path="/reading/questions" element={<ReadingQuestionsList />} />
      <Route path="/reading/questions/add" element={<AddReadingQuestion />} />
      <Route path="/reading/questions/:id/edit" element={<EditReadingQuestion />} />

      {/* Listening Section */}
      <Route path="/listening" element={<Navigate to="/admin/listening/audio" replace />} />
      <Route path="/listening/audio" element={<ListeningAudioList />} />
      <Route path="/listening/audio/add" element={<AddListeningAudio />} />
      <Route path="/listening/audio/:id" element={<ListeningAudioDetail />} />
      <Route path="/listening/questions" element={<ListeningQuestionsList />} />
      <Route path="/listening/questions/add" element={<AddListeningQuestion />} />
      <Route path="/listening/questions/:id/edit" element={<EditListeningQuestion />} />

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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;