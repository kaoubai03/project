// DashboardPatient.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Calendar, FileText, Notebook, MessageSquare, ChevronRight, CheckCircle2, HelpCircle, Stethoscope } from 'lucide-react';
import SidebarP from '../components/layouts/sidebarP';
import styles from './css/DashboardPatient.module.css';

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
      path: "/messagerie-P",
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
    <div className={styles.dashboard}>
      <SidebarP
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />

      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <button className={styles.menuToggle} onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>MyHealth</h1>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>JP</div>
            <span className={styles.userName}>Jean Patient</span>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          <div className={styles.welcomeBanner}>
            <h2>Bienvenue, Jean</h2>
            <p>Votre portail de santé personnalisé</p>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div className={styles.statCard} key={index}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <section className={styles.dashboardSection}>
            <h3 className={styles.sectionTitle}>Votre Profil</h3>
            <div className={styles.profileGrid}>
              {profileCards.map((card, index) => (
                <div className={styles.profileCard} key={index}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <Link to={card.path} className={styles.cardAction}>
                    {card.btnText} <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.dashboardSection}>
            <h3 className={styles.sectionTitle}>Services</h3>
            <div className={styles.featuresGrid}>
              {featureCards.map((card, index) => (
                <div className={`${styles.featureCard} ${card.title.includes('Support') ? styles.supportCard : ''}`} key={index}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <Link to={card.path} className={styles.cardAction}>
                    {card.btnText} <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {sidebarOpen && <div className={styles.dashboardOverlay} onClick={closeSidebar}></div>}
    </div>
  );
};

export default DashboardPatient;
