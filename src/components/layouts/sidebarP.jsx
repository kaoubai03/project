import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, User, Calendar, FileText, Notebook, MessageSquare,
  HelpCircle, Settings, LogOut, ChevronRight, X
} from 'lucide-react';
import styles from './SidebarP.module.css';

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
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.clinicLogo}>
          <span>Espace</span>Patient
        </div>
        <button className={styles.closeSidebar} onClick={closeSidebar}>
          <X size={20} />
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`${styles.navLink} ${activeIcon === index ? styles.active : ''}`}
                onClick={() => {
                  setActiveIcon(index);
                  closeSidebar();
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.text}</span>
                <ChevronRight size={16} className={styles.navChevron} />
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.logoutSection}>
          <Link
            to="/"
            className={styles.logoutLink}
            onClick={closeSidebar}
          >
            <span className={styles.navIcon}><LogOut size={20} /></span>
            <span className={styles.navText}>Déconnexion</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarP;