// DashboardPatient.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Calendar, FileText, Notebook, MessageSquare, ChevronRight, CheckCircle2, HelpCircle, Stethoscope } from 'lucide-react';
import SidebarP from '../components/layouts/sidebarP';
import './DashboardPatient.css';

const DashboardPatient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const profileCards = [
    {
      icon: <User size={24} />,
      title: "Informations Personnelles",
      description: "Mettez à jour vos coordonnées et informations de contact",
      path: "/profile/personal",
      btnText: "Modifier"
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Profil Médical",
      description: "Gérez vos antécédents médicaux et traitements",
      path: "/profile/medical",
      btnText: "Compléter"
    }
  ];

  const featureCards = [
    {
      icon: <Calendar size={24} />,
      title: "Gestion des Rendez-vous",
      description: "Prenez et gérez vos rendez-vous en ligne",
      path: "/rendez-vousP",
      btnText: "Accéder"
    },
    {
      icon: <CheckCircle2 size={24} />,
      title: "Autorisations",
      description: "Contrôlez l'accès à vos données médicales",
      path: "/autorisation",
      btnText: "Gérer"
    },
    {
      icon: <FileText size={24} />,
      title: "Documents Médicaux",
      description: "Vos ordonnances et résultats d'analyses",
      path: "/ordonnance",
      btnText: "Consulter"
    },
    {
      icon: <Notebook size={24} />,
      title: "Historique de Santé",
      description: "Votre carnet de santé complet",
      path: "/carnet",
      btnText: "Ouvrir"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Messagerie Sécurisée",
      description: "Échangez avec vos professionnels de santé",
      path: "/messagerie",
      btnText: "Ouvrir"
    },
    {
      icon: <HelpCircle size={24} />,
      title: "Support & Assistance",
      description: "Contactez notre équipe pour toute question",
      path: "/support",
      btnText: "Contacter"
    }
  ];

  const stats = [
    { icon: <Calendar size={20} />, value: 2, label: "RDV à venir" },
    { icon: <FileText size={20} />, value: 5, label: "Documents" },
    { icon: <MessageSquare size={20} />, value: 3, label: "Messages" }
  ];

  return (
    <div className="dashboard">
      <SidebarP
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />

      <div className="main-content">
        <header className="top-bar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>MyHealth</h1>
          <div className="user-profile">
            <div className="user-avatar">JP</div>
            <span className="user-name">Jean Patient</span>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-banner">
            <h2>Bienvenue, Jean</h2>
            <p>Votre portail de santé personnalisé</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <section className="dashboard-section">
            <h3 className="section-title">Votre Profil</h3>
            <div className="profile-grid">
              {profileCards.map((card, index) => (
                <div className="profile-card" key={index}>
                  <div className="card-header">
                    <div className="card-icon">{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className="card-description">{card.description}</p>
                  <Link to={card.path} className="card-action">
                    {card.btnText} <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h3 className="section-title">Services</h3>
            <div className="features-grid">
              {featureCards.map((card, index) => (
                <div className={`feature-card ${card.title.includes('Support') ? 'support-card' : ''}`} key={index}>
                  <div className="card-header">
                    <div className="card-icon">{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className="card-description">{card.description}</p>
                  <Link to={card.path} className="card-action">
                    {card.btnText} <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default DashboardPatient;
