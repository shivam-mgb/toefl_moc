import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListeningSectionPage from './pages/ListeningSectionPage';
import ListeningSectionIntroPage from './pages/ListeningSectionIntroPage';
import SpeakingSectionIntroPage from './pages/SpeakingSectionIntroPage';
import SpeakingSectionPage from './pages/SpeakingSectionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/speaking-section-intro" replace />} />
        <Route path="/listening-section-intro" element={<ListeningSectionIntroPage />} />
        <Route path="/listening-section" element={<ListeningSectionPage />} />
        <Route path="/speaking-section-intro" element={<SpeakingSectionIntroPage />} />
        <Route path="/speaking-section" element={<SpeakingSectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
