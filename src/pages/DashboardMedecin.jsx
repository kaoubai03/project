import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu,
  X,
  FileText,
  Pill,
  Stethoscope,
  NotebookText,
  CalendarPlus,
  MessageSquare,
  User,
  Home,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import './DashboardMedecin.css';

const DashboardMedecin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { icon: <Home size={20} />, text: "Accueil", path: "/dashboard/doctor" },
    { icon: <FileText size={20} />, text: "Compte Rendu", path: "/compte-rendu" },
    { icon: <Pill size={20} />, text: "Ordonnances", path: "/ordonnance" },
    { icon: <Stethoscope size={20} />, text: "Informations Médicales", path: "/informations-medicales" },
    { icon: <NotebookText size={20} />, text: "Historique Patients", path: "/historique-patient" },
    { icon: <CalendarPlus size={20} />, text: "Gestion RDV", path: "/rendez-vous" },
    { icon: <MessageSquare size={20} />, text: "Messagerie", path: "/messagerie" },
    { icon: <Settings size={20} />, text: "Paramètres", path: "/parametres" },
    { icon: <HelpCircle size={20} />, text: "Support", path: "/support" },
    { icon: <User size={20} />, text: "Mon Profil", path: "/profil-medecin" }
  ];

  const cardItems = [
    { 
      icon: <FileText size={24} />, 
      title: "Compte Rendu Médical", 
      description: "Rédigez et enregistrez un compte rendu pour vos consultations",
      path: "/compte-rendu",
      btnText: "Rédiger"
    },
    { 
      icon: <Pill size={24} />, 
      title: "Prescrire une Ordonnance", 
      description: "Prescrivez une ordonnance pour vos patients en quelques clics",
      path: "/ordonnance",
      btnText: "Prescrire"
    },
    { 
      icon: <Stethoscope size={24} />, 
      title: "Dossier Médical", 
      description: "Ajoutez de nouvelles informations médicales pour un patient",
      path: "/informations-medicales",
      btnText: "Compléter"
    },
    { 
      icon: <NotebookText size={24} />, 
      title: "Historique Patients", 
      description: "Consultez l'historique médical complet d'un patient",
      path: "/historique-patient",
      btnText: "Consulter"
    },
    { 
      icon: <CalendarPlus size={24} />, 
      title: "Gestion des RDV", 
      description: "Planifiez et gérez les rendez-vous de vos patients",
      path: "/rendez-vous",
      btnText: "Planifier"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "Messagerie Sécurisée", 
      description: "Communiquez de manière sécurisée avec vos patients",
      path: "/messagerie",
      btnText: "Ouvrir"
    },
    { 
      icon: <HelpCircle size={24} />, 
      title: "Support & Assistance", 
      description: "Contactez notre équipe pour toute question technique",
      path: "/support",
      btnText: "Contacter"
    }
  ];

  const stats = [
    { icon: <CalendarPlus size={20} />, value: 5, label: "RDV Aujourd'hui" },
    { icon: <FileText size={20} />, value: 3, label: "Comptes Rendus" },
    { icon: <MessageSquare size={20} />, value: 2, label: "Messages" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="clinic-logo">
            <span>Espace</span>Médecin
          </div>
          <button className="close-sidebar" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${activeItem === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem(index);
                    closeSidebar();
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Bouton Déconnexion */}
          <div className="logout-section">
            <Link 
              to="/" 
              className="logout-link"
              onClick={() => {
                // Logique de déconnexion
                closeSidebar();
              }}
            >
              <span className="nav-icon"><LogOut size={20} /></span>
              <span className="nav-text">Déconnexion</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>MedConsole</h1>
          <div className="user-profile">
            <div className="user-avatar">DR</div>
            <span className="user-name">Dr. Dupont</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="welcome-banner">
            <h2>Bienvenue, Dr. Dupont</h2>
            <p>Votre portail professionnel de gestion médicale</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <section className="dashboard-section">
            <h3 className="section-title">Outils Professionnels</h3>
            <div className="features-grid">
              {cardItems.map((card, index) => (
                <div className={`feature-card ${card.title === "Support & Assistance" ? "support-card" : ""}`} key={index}>
                  <div className="card-header">
                    <div className="card-icon">{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className="card-description">{card.description}</p>
                  <Link to={card.path} className="card-action">
                    {card.btnText}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default DashboardMedecin;