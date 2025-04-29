import React from 'react';
import { Navigate } from 'react-router-dom';
import { Activity, LogOut, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-container">
            <Activity className="logo-icon" />
            <span className="logo-text">eHealth<span>+</span></span>
          </div>
          
          <div className="user-actions">
            <span className="user-greeting">
              Bonjour, {user?.fullName}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              icon={<LogOut className="logout-icon" />}
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        {/* Account status banner */}
        {user?.role === 'doctor' && !user.isVerified && (
          <div className="verification-banner">
            <AlertTriangle className="alert-icon" />
            <div>
              <h3>Compte en attente de validation</h3>
              <p>
                Votre compte est en cours de vérification par nos administrateurs. 
                Vous recevrez un email dès que votre compte sera activé.
              </p>
            </div>
          </div>
        )}
        
        {/* Welcome section */}
        <div className="welcome-section">
          <h1>
            Bienvenue sur votre espace {user?.role === 'doctor' ? 'médecin' : 'patient'}
          </h1>
          <p>
            {user?.role === 'doctor' 
              ? 'Gérez vos patients et vos rendez-vous depuis votre tableau de bord.' 
              : 'Suivez vos rendez-vous et consultez vos informations médicales.'}
          </p>
        </div>
        
        {/* Dashboard content */}
        <div className="dashboard-grid">
          {[
            {
              title: user?.role === 'doctor' ? 'Mes patients' : 'Mes rendez-vous',
              count: '0',
              action: user?.role === 'doctor' ? 'Voir tous les patients' : 'Voir tous les rendez-vous'
            },
            {
              title: user?.role === 'doctor' ? 'Rendez-vous aujourd\'hui' : 'Mon dossier médical',
              count: '0',
              action: user?.role === 'doctor' ? 'Voir l\'agenda' : 'Consulter mon dossier'
            },
            {
              title: 'Messages',
              count: '0',
              action: 'Voir tous les messages'
            }
          ].map((item, index) => (
            <div key={index} className="dashboard-card">
              <h2>{item.title}</h2>
              <p className="card-count">{item.count}</p>
              <button className="card-action">
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;