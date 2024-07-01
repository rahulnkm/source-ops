import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />


          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/materials">
            {isLoggedIn ? <MaterialManagement /> : <Redirect to="/" />}
          </Route>
          <Route path="/price-analysis">
            {isLoggedIn ? <PriceAnalysis /> : <Redirect to="/" />}
          </Route>
          <Route path="/scenario-analysis">
            {isLoggedIn ? <ScenarioAnalysis /> : <Redirect to="/" />}
          </Route>
          <Route path="/reports">
            {isLoggedIn ? <Reports /> : <Redirect to="/" />}
          </Route>
          <Route path="/alerts">
            {isLoggedIn ? <AlertSettings /> : <Redirect to="/" />}
          </Route>
          <Route path="/supplier-performance">
            {isLoggedIn ? <SupplierPerformance /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;