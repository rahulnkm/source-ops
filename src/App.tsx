import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Materials from './components/Materials';
import SupplierPerformance from './components/SupplierPerformance';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import { useAppContext } from './context/AppContext';

interface AppContentProps {
  isLoggedIn: boolean;
  handleLogin: () => void;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
    </Router>
  );
};

const AppContent: React.FC<AppContentProps> = ({ isLoggedIn, handleLogin }) => {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const showSidebar = isLoggedIn && location.pathname !== '/';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {showSidebar && isSidebarOpen && <Sidebar />}
      <div className={showSidebar && isSidebarOpen ? "flex-1 ml-64 p-4" : "flex-1 p-4"}>
        {showSidebar && (
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/materials" element={isLoggedIn ? <Materials /> : <Navigate to="/login" />} />
          <Route path="/supplier-performance" element={isLoggedIn ? <SupplierPerformance /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;