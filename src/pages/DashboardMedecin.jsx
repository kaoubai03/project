import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarM from '../components/layouts/SidebarM';
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
import styles from './css/DashboardMedecin.module.css';

const DashboardMedecin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

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
      path: "/Rendez-vousM",
      btnText: "Planifier"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "Messagerie Sécurisée", 
      description: "Communiquez de manière sécurisée avec vos patients",
      path: "/MessagerieM",
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
    <div className={styles.dashboard}>
      <SidebarM
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <button className={styles.menuToggle} onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>MedConsole</h1>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>DR</div>
            <span className={styles.userName}>Dr. Dupont</span>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          <div className={styles.welcomeBanner}>
            <h2>Bienvenue, Dr. Dupont</h2>
            <p>Votre portail professionnel de gestion médicale</p>
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
            <h3 className={styles.sectionTitle}>Outils Professionnels</h3>
            <div className={styles.featuresGrid}>
              {cardItems.map((card, index) => (
                <div className={`${styles.featureCard} ${card.title === "Support & Assistance" ? styles.supportCard : ''}`} key={index}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>{card.icon}</div>
                    <h4>{card.title}</h4>
                  </div>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <Link to={card.path} className={styles.cardAction}>
                    {card.btnText}
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

export default DashboardMedecin;