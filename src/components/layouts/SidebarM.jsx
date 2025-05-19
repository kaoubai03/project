import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Pill, Stethoscope, NotebookText,
  CalendarPlus, MessageSquare, User, Home,
  Settings, HelpCircle, LogOut, X
} from 'lucide-react';
import styles from './SidebarM.module.css';

const SidebarM = ({ sidebarOpen, closeSidebar, activeItem, setActiveItem }) => {
  const menuItems = [
    { icon: <Home size={20} />, text: "Accueil", path: "/dashboard/doctor" },
    { icon: <FileText size={20} />, text: "Compte Rendu", path: "/compte-rendu" },
    { icon: <Pill size={20} />, text: "Ordonnances", path: "/ordonnance" },
    { icon: <Stethoscope size={20} />, text: "Informations Médicales", path: "/informations-medicales" },
    { icon: <NotebookText size={20} />, text: "Historique Patients", path: "/historique-patient" },
    { icon: <CalendarPlus size={20} />, text: "Gestion RDV", path: "/rendez-vousM" },
    { icon: <MessageSquare size={20} />, text: "Messagerie", path: "/MessagerieM" },
    { icon: <Settings size={20} />, text: "Paramètres", path: "/parametres" },
    { icon: <HelpCircle size={20} />, text: "Support", path: "/support" },
    { icon: <User size={20} />, text: "Mon Profil", path: "/profil-medecin" }
  ];

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.clinicLogo}>
          <span>Espace</span>Médecin
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
                className={`${styles.navLink} ${activeItem === index ? styles.active : ''}`}
                onClick={() => {
                  setActiveItem(index);
                  closeSidebar();
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.logoutSection}>
          <Link
            to="/"
            className={styles.logoutLink}
            onClick={() => {
              closeSidebar();
            }}
          >
            <span className={styles.navIcon}><LogOut size={20} /></span>
            <span className={styles.navText}>Déconnexion</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarM;