import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MaterialManagement from './components/MaterialManagement';
import PriceAnalysis from './components/PriceAnalysis';
import ScenarioAnalysis from './components/ScenarioAnalysis';
import Reports from './components/Reports';
import AlertSettings from './components/AlertSettings';
import SupplierPerformance from './components/SupplierPerformance';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/materials" element={isLoggedIn ? <MaterialManagement /> : <Navigate to="/login" />} />
          <Route path="/price-analysis" element={isLoggedIn ? <PriceAnalysis /> : <Navigate to="/login" />} />
          <Route path="/scenario-analysis" element={isLoggedIn ? <ScenarioAnalysis /> : <Navigate to="/login" />} />
          <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/alert-settings" element={isLoggedIn ? <AlertSettings /> : <Navigate to="/login" />} />
          <Route path="/supplier-performance" element={isLoggedIn ? <SupplierPerformance /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;