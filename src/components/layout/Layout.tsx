
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStore } from '../../stores/authStore';

const Layout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className={`${isAuthenticated ? 'pt-4' : 'pt-0'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
