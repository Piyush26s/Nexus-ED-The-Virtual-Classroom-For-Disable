import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import AIAssistant from './pages/AIAssistant';
import AccessibilityTools from './pages/AccessibilityTools';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { HeadTrackingProvider } from './context/HeadTrackingContext';
import { TrackingProvider } from './context/TrackingContext';
import GlobalFaceHUD from './components/GlobalFaceHUD';
import VoiceCommand from './components/VoiceCommand';
import TeacherDashboard from './components/TeacherDashboard';
import './index.css';

// Wrapper component to consume Context
const AppContent = () => {
  const { settings } = useAccessibility();

  // Effect for high contrast
  React.useEffect(() => {
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [settings.highContrast]);

  return (
    <HeadTrackingProvider enabled={settings.headTracking}>
      {settings.headTracking && <GlobalFaceHUD />}
      <VoiceCommand />
      <TrackingProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/teacher" element={<Layout><TeacherDashboard /></Layout>} />
          <Route path="/courses" element={<Layout><MyCourses /></Layout>} />
          <Route path="/ai-assistant" element={<Layout><AIAssistant /></Layout>} />
          <Route path="/accessibility" element={<Layout><AccessibilityTools /></Layout>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </TrackingProvider>
    </HeadTrackingProvider>
  );
}

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <Router>
          <AppContent />
        </Router>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;
