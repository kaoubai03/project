// SidebarP.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, User, Calendar, FileText, Notebook, MessageSquare,
  HelpCircle, Settings, LogOut, ChevronRight, X
} from 'lucide-react';
import './Sidebar.css'; // Utilise le même CSS que l'original

const SidebarP = ({ sidebarOpen, closeSidebar, activeIcon, setActiveIcon }) => {
  const menuItems = [
    { icon: <Home size={20} />, text: "Accueil", path: "/dashboard/patient" },
    { icon: <User size={20} />, text: "Profil", path: "/profile" },
    { icon: <Calendar size={20} />, text: "Rendez-vous", path: "/rendez-vousP" },
    { icon: <FileText size={20} />, text: "Documents", path: "/ordonnance" },
    { icon: <Notebook size={20} />, text: "Historique", path: "/carnet" },
    { icon: <MessageSquare size={20} />, text: "Messagerie", path: "/messagerie" },
    { icon: <HelpCircle size={20} />, text: "Support", path: "/support" },
    { icon: <Settings size={20} />, text: "Paramètres", path: "/settings" }
  ];

  return (
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

        <div className="logout-section">
          <Link
            to="/"
            className="logout-link"
            onClick={closeSidebar}
          >
            <span className="nav-icon"><LogOut size={20} /></span>
            <span className="nav-text">Déconnexion</span>
          </Link>
        </div>
      </nav>
    </aside>
    
  );
};

export default SidebarP;
