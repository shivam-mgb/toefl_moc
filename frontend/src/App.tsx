import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SectionSelectionPage from './pages/SectionSelectionPage';
import ReadingSectionPage from './pages/ReadingSectionPage';
import ListeningSectionPage from './pages/ListeningSectionPage';
import SpeakingSectionPage from './pages/SpeakingSectionPage';
import WritingSectionPage from './pages/WritingSectionPage';
import ReviewPage from './pages/ReviewPage';
import AdminRoutes from './routes/AdminRoutes';

// CSS imports
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SectionSelectionPage />} />
        <Route path="/reading" element={<ReadingSectionPage />} />
        <Route path="/listening" element={<ListeningSectionPage />} />
        <Route path="/speaking" element={<SpeakingSectionPage />} />
        <Route path="/writing" element={<WritingSectionPage />} />
        <Route path="/review" element={<ReviewPage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Fallback route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
