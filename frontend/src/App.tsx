import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListeningSectionPage from './pages/ListeningSectionPage';
import ListeningSectionIntroPage from './pages/ListeningSectionIntroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/listening-section-intro" replace />} />
        <Route path="/listening-section-intro" element={<ListeningSectionIntroPage />} />
        <Route path="/listening-section" element={<ListeningSectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
