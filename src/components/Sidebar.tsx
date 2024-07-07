import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full fixed top-0 left-0 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Menu</div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/materials">Materials</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/supplier-performance">Supplier Performance</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;