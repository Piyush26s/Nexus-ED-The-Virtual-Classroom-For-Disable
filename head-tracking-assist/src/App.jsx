import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import AIAssistant from './pages/AIAssistant';
import AccessibilityTools from './pages/AccessibilityTools';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { HeadTrackingProvider } from './context/HeadTrackingContext';
import { TrackingProvider } from './context/TrackingContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalFaceHUD from './components/GlobalFaceHUD';
import TeacherDashboard from './components/TeacherDashboard';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Notes from './pages/Notes';
import './index.css';

// Wrapper component to consume Context and handle side-effects
const AppContent = () => {
    const { settings } = useAccessibility();

    // Effect for high contrast body class
    React.useEffect(() => {
        if (settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [settings.highContrast]);

    return (
        <div className="app-main-wrapper">
            {/* Global Assistive Elements */}
            <GlobalFaceHUD />
            
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected Routes inside Layout */}
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/teacher" element={<Layout><TeacherDashboard /></Layout>} />
                <Route path="/courses" element={<Layout><MyCourses /></Layout>} />
                <Route path="/progress" element={<Layout><Progress /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                <Route path="/notes" element={<Layout><Notes /></Layout>} />
                <Route path="/ai-assistant" element={<Layout><AIAssistant /></Layout>} />
                <Route path="/accessibility" element={<Layout><AccessibilityTools /></Layout>} />
                
                {/* Fallbacks */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </div>
    );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <AccessibilityProvider>
            <HeadTrackingProvider enabled={false}>
              <TrackingProvider>
                <Router>
                  <AppContent />
                </Router>
              </TrackingProvider>
            </HeadTrackingProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
