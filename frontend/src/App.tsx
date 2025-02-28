import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListeningSectionPage from './pages/ListeningSectionPage';
import ListeningSectionIntroPage from './pages/ListeningSectionIntroPage';
import SpeakingSectionIntroPage from './pages/SpeakingSectionIntroPage';
import SpeakingSectionPage from './pages/SpeakingSectionPage';
import WritingSectionIntroPage from './pages/WritingSectionIntroPage';
import WritingSectionPage from './pages/WritingSectionPage';
import ReviewPage from './pages/ReviewPage';
import ReadingSectionPage from './pages/ReadingSectionPage';
import ReadingSectionIntroPage from './pages/ReadingSectionIntroPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reading-section-intro" replace />} />
        <Route path="/reading-section-intro" element={<ReadingSectionIntroPage />} />
        <Route path="/reading-section" element={<ReadingSectionPage />} />
        <Route path="/listening-section-intro" element={<ListeningSectionIntroPage />} />
        <Route path="/listening-section" element={<ListeningSectionPage />} />
        <Route path="/speaking-section-intro" element={<SpeakingSectionIntroPage />} />
        <Route path="/speaking-section" element={<SpeakingSectionPage />} />
        <Route path="/writing-section-intro" element={<WritingSectionIntroPage />} />
        <Route path="/writing-section" element={<WritingSectionPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
