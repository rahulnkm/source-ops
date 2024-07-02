import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MaterialManagement from './components/MaterialManagement';
import PriceAnalysis from './components/PriceAnalysis';
import ScenarioAnalysis from './components/ScenarioAnalysis';
import Reports from './components/Reports';
import AlertSettings from './components/AlertSettings';
import SupplierPerformance from './components/SupplierPerformance';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
      <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Login onLogin={handleLogin} />} />
          <Route path="/materials" element={<Login onLogin={handleLogin} />} />
          <Route path="/price-analysis" element={<Login onLogin={handleLogin} />} />
          <Route path="/scenario-analysis" element={<Login onLogin={handleLogin} />} />
          <Route path="/reports" element={<Login onLogin={handleLogin} />} />
          <Route path="/alerta" element={<Login onLogin={handleLogin} />} />
          <Route path="/supplier-performance" element={<Login onLogin={handleLogin} />} />

          <Route path="/">
            {isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/login">
            {isLoggedIn ? <Navigate to="/login" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          </Route>

          {/* complete rest of the paths */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;