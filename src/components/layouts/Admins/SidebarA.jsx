import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight, 
  X 
} from 'lucide-react';
import styles from './SidebarA.module.css';

const SidebarA = ({ sidebarOpen, closeSidebar }) => {
  const admin = {
    name: 'Dr. Admin',
    email: 'admin@ehealth.com'
  };
  
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Users size={20} />, label: "Patients", path: "/admin/patients" },
    { icon: <Users size={20} />, label: "Médecins", path: "/admin/medecins" },
    { icon: <Calendar size={20} />, label: "Rendez-Vous", path: "/admin/rendezvous" },
    { icon: <MessageSquare size={20} />, label: "Support", path: "/admin/support" },
    { icon: <FileText size={20} />, label: "Rapport", path: "/admin/rapports" }
  ];

  return (
    <aside className={`${styles.adminSidebar} ${sidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.adminBrand}>
          <span>Admin</span>E-Health
        </div>
        <button 
          className={styles.closeSidebar} 
          onClick={closeSidebar} 
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className={styles.adminProfile}>
        <div className={styles.adminAvatar}>
          {admin.name ? admin.name.charAt(0) : 'A'}
        </div>
        <div className={styles.adminInfo}>
          <p className={styles.adminName}>{admin.name || 'Administrateur'}</p>
          <p className={styles.adminEmail}>{admin.email || 'admin@ehealth.com'}</p>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.path}
                className={index === 0 ? styles.active : ''}
                onClick={(e) => {
                  if (index !== 0) {
                    e.preventDefault();
                  }
                  closeSidebar();
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.label}</span>
                <ChevronRight size={16} className={styles.navChevron} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} className={styles.navIcon} />
          <span className={styles.navText}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarA;
