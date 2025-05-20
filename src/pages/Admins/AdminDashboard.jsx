import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, MessageSquare, Plus, 
  FileText, Settings, UserCheck, ClipboardList, BarChart
} from 'lucide-react';
import SidebarA from '../../components/layouts/Admins/SidebarA';
import ProfileMenu from '../../components/layouts/Admins/ProfilMenu';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  const admin = {
    name: 'Dr. Admin',
    email: 'admin@ehealth.com',
    lastLogin: new Date(),
    status: 'Actif',
    id: 'ADM-2025-001'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const stats = [
    { 
      title: "Utilisateurs inscrits", 
      value: "1,245", 
      icon: <Users size={24} className={styles.statIcon} />, 
      trend: "+12% ce mois",
      trendPositive: true
    },
    { 
      title: "Rendez-vous", 
      value: "328", 
      icon: <Calendar size={24} className={styles.statIcon} />, 
      trend: "+5% cette semaine",
      trendPositive: true
    },
    { 
      title: "Messages non lus", 
      value: "24", 
      icon: <MessageSquare size={24} className={styles.statIcon} />, 
      trend: "À traiter",
      trendPositive: false
    }
  ];

  const recentActivities = [
    { id: 1, user: "Dr. Dupont", action: "Nouveau RDV programmé", time: "10 min ago", timestamp: new Date(Date.now() - 10 * 60000) },
    { id: 2, user: "Patient Martin", action: "Compte créé avec succès", time: "25 min ago", timestamp: new Date(Date.now() - 25 * 60000) },
    { id: 3, user: "Système", action: "Mise à jour terminée v1.2.3", time: "1h ago", timestamp: new Date(Date.now() - 60 * 60000) }
  ];

  const formatActivityTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatActivityDate = (timestamp) => {
    return timestamp.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <div className={`${styles.adminAppContainer} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
      <SidebarA 
        sidebarOpen={sidebarOpen} 
        closeSidebar={closeSidebar} 
      />
      
      <main className={styles.adminMainContent}>
        <header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.menuToggle} 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <span className={styles.menuIcon}></span>
            </button>
            <div className={styles.headerContent}>
              <h1>Tableau de bord <span>Admin</span></h1>
              <p className={styles.welcomeMessage}>Bonjour, {admin.name}</p>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.currentDatetime}>
              {currentDateTime.toLocaleString('fr-FR', {
                weekday: 'long', 
                day: 'numeric', 
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <ProfileMenu admin={admin} />
          </div>
        </header>

        <div className={styles.dashboardSections}>
          <section className={styles.statsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleIcon}><BarChart size={20} /></span>
                Statistiques globales
              </h2>
            </div>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={`${styles.statCard} ${stat.trendPositive ? styles.positive : styles.alert}`}>
                  <div className={styles.statIconContainer}>
                    {stat.icon}
                  </div>
                  <div className={styles.statContent}>
                    <h3>{stat.title}</h3>
                    <p className={styles.statValue}>{stat.value}</p>
                    <p className={styles.statTrend}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.dashboardGrid}>
            <section className={styles.activitiesSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}><Calendar size={20} /></span>
                  Activités récentes
                </h2>
                <button className={styles.viewAll}>Voir tout</button>
              </div>
              <div className={styles.activityList}>
                {recentActivities.map(activity => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityAvatar}>
                      {activity.user.charAt(0)}
                    </div>
                    <div className={styles.activityDetails}>
                      <p className={styles.activityText}>
                        <strong>{activity.user}</strong> - {activity.action}
                      </p>
                      <div className={styles.activityMeta}>
                        <span className={styles.activityTime}>{activity.time}</span>
                        <span className={styles.activityTimestamp}>
                          <span className={styles.activityDate}>{formatActivityDate(activity.timestamp)}</span>
                          <span className={styles.activityHour}>{formatActivityTime(activity.timestamp)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.quickActionsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}><Settings size={20} /></span>
                  Actions rapides
                </h2>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.actionBtn}>
                  <UserCheck size={18} />
                  <span>Médecins en attente</span>
                  <span className={styles.actionBadge}>8</span>
                </button>
                <button className={styles.actionBtn}>
                  <Calendar size={18} />
                  <span>Gestion des RDV</span>
                </button>
                <button className={styles.actionBtn}>
                  <FileText size={18} />
                  <span>Générer un rapport</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;