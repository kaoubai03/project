import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  User, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Notebook, 
  MessageSquare,
  ChevronRight,
  X,
  Home,
  Settings,
  HelpCircle,
  Stethoscope,
  LogOut
} from 'lucide-react';
import './DashboardPatient.css';

const DashboardPatient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { icon: <Home size={20} />, text: "Accueil", path: "/dashboard/patient" },
    { icon: <User size={20} />, text: "Profil", path: "/profile" },
    { icon: <Calendar size={20} />, text: "Rendez-vous", path: "/rendez-vous" }, // Modifié pour correspondre à la nouvelle route
    { icon: <FileText size={20} />, text: "Documents", path: "/ordonnance" },
    { icon: <Notebook size={20} />, text: "Historique", path: "/carnet" },
    { icon: <MessageSquare size={20} />, text: "Messagerie", path: "/messagerie" },
    { icon: <HelpCircle size={20} />, text: "Support", path: "/support" },
    { icon: <Settings size={20} />, text: "Paramètres", path: "/settings" }
  ];

  const profileCards = [
    { icon: <User size={24} />, title: "Informations Personnelles", 
      description: "Mettez à jour vos coordonnées et informations de contact", path: "/profile/personal", btnText: "Modifier" },
    { icon: <Stethoscope size={24} />, title: "Profil Médical", 
      description: "Gérez vos antécédents médicaux et traitements", path: "/profile/medical", btnText: "Compléter" }
  ];

  const featureCards = [
    { 
      icon: <Calendar size={24} />, 
      title: "Gestion des Rendez-vous", 
      description: "Prenez et gérez vos rendez-vous en ligne", 
      path: "/rendez-vous", // Modifié pour correspondre à la nouvelle route
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
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="clinic-logo">
            <span>Espace</span>Patient
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
                  className={`nav-link ${activeIcon === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIcon(index);
                    closeSidebar();
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                  <ChevronRight size={16} className="nav-chevron" />
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
                // Ajoutez ici la logique de déconnexion
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
          <h1>MyHealth</h1>
          <div className="user-profile">
            <div className="user-avatar">JP</div>
            <span className="user-name">Jean Patient</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="welcome-banner">
            <h2>Bienvenue, Jean</h2>
            <p>Votre portail de santé personnalisé</p>
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

          {/* Profile Section */}
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

          {/* Features Section */}
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

      {/* Overlay pour mobile */}
      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default DashboardPatient;