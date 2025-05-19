import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Menu, X, Users, Calendar, Mail, 
  Plus, ClipboardList, Settings 
} from 'lucide-react';
import SidebarA from '../../components/layouts/Admins/SidebarA';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin } = useAdmin();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Données mock
  const stats = [
    { 
      title: "Utilisateurs inscrits", 
      value: "1,245", 
      icon: <Users size={24} className="stat-icon" />, 
      trend: "+12% ce mois",
      trendPositive: true
    },
    { 
      title: "Rendez-vous", 
      value: "328", 
      icon: <Calendar size={24} className="stat-icon" />, 
      trend: "+5% cette semaine",
      trendPositive: true
    },
    { 
      title: "Messages non lus", 
      value: "24", 
      icon: <Mail size={24} className="stat-icon" />, 
      trend: "À traiter",
      trendPositive: false
    }
  ];

  const recentActivities = [
    { id: 1, user: "Dr. Dupont", action: "Nouveau RDV programmé", time: "10 min ago" },
    { id: 2, user: "Patient Martin", action: "Compte créé avec succès", time: "25 min ago" },
    { id: 3, user: "Système", action: "Mise à jour terminée v1.2.3", time: "1h ago" }
  ];

  return (
    <div className="admin-app-container">
      <SidebarA 
        sidebarOpen={sidebarOpen} 
        closeSidebar={closeSidebar} 
      />
      
      <main className={`admin-main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="admin-header">
          <button 
            className="menu-toggle" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="header-content">
            <h1>Tableau de bord <span>Admin</span></h1>
            <p className="welcome-message">Bonjour, {admin?.name || 'Administrateur'}</p>
          </div>
        </header>

        <div className="dashboard-sections">
          {/* Section Statistiques */}
          <section className="stats-section">
            <h2 className="section-title">
              <span className="title-icon"><Users size={20} /></span>
              Statistiques globales
            </h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className={`stat-card ${stat.trendPositive ? 'positive' : 'alert'}`}>
                  <div className="stat-icon-container">
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <h3>{stat.title}</h3>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-trend">
                      {stat.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Activités récentes */}
          <section className="activities-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon"><Calendar size={20} /></span>
                Activités récentes
              </h2>
              <button className="view-all">Voir tout</button>
            </div>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-avatar">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">
                      <strong>{activity.user}</strong> - {activity.action}
                    </p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Actions rapides */}
          <section className="quick-actions-section">
            <h2 className="section-title">
              <span className="title-icon"><Settings size={20} /></span>
              Actions rapides
            </h2>
            <div className="action-buttons">
              <button className="action-btn">
                <Plus size={18} />
                <span>Créer utilisateur</span>
              </button>
              <button className="action-btn">
                <ClipboardList size={18} />
                <span>Voir les logs</span>
              </button>
              <button className="action-btn">
                <Settings size={18} />
                <span>Paramètres</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;