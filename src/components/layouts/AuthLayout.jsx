import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Heart, Activity, Stethoscope } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import './AuthLayout.css';

const AuthLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const isHomePage = location.pathname === '/';
  const isFormPage = ['/signup-patient', '/signup-doctor', '/login'].includes(location.pathname);

  return (
    <div className="auth-layout">
      {/* Header */}
      <header className="layout-header">
        <div className="header-container">
          <div className="logo-container">
            <Activity className="logo-icon" />
            <span className="logo-text">eHealth<span>+</span></span>
          </div>
          
          {isAuthenticated && (
            <nav className="main-nav">
              <a href="/dashboard" className="nav-link">
                Dashboard
              </a>
              <button 
                className="profile-button"
                onClick={() => console.log('Profile clicked')}
              >
                My Profile
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="layout-main">
        <div className={`content-container ${isFormPage ? 'form-width' : 'wide-width'}`}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <div className="footer-icons">
            <Heart className="footer-icon heart" />
            <Stethoscope className="footer-icon stethoscope" />
            <Activity className="footer-icon activity" />
          </div>
          <p>© {new Date().getFullYear()} eHealth+ | Privacy & Terms</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;