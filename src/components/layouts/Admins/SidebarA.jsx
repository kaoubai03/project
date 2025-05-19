// components/Admin/SidebarA.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import { 
  Home, Users, Calendar, MessageSquare, Menu, 
  FileText, Settings, LogOut, ChevronRight, X 
} from 'lucide-react';
import './SidebarA.css';

const SidebarA = ({ sidebarOpen, closeSidebar }) => {
  const { logoutAdmin, admin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
    closeSidebar();
  };

  const menuItems = [
    { icon: <Home size={20} />, label: "Tableau de bord", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "Gestion utilisateurs", path: "/admin/utilisateurs" },
    { icon: <Calendar size={20} />, label: "Rendez-vous", path: "/admin/rendezvous" },
    { icon: <MessageSquare size={20} />, label: "Messagerie", path: "/admin/messagerie" },
    { icon: <FileText size={20} />, label: "Rapports", path: "/admin/rapports" },
    { icon: <Settings size={20} />, label: "Paramètres", path: "/admin/parametres" }
  ];

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="admin-brand">
          <span>Admin</span>E-Health
        </div>
        <button className="close-sidebar" onClick={closeSidebar}>
          <X size={20} />
        </button>
      </div>

      <div className="admin-profile">
        <div className="admin-avatar">
          {admin?.name?.charAt(0) || 'A'}
        </div>
        <div className="admin-info">
          <p className="admin-name">{admin?.name || 'Administrateur'}</p>
          <p className="admin-email">{admin?.email || 'admin@ehealth.com'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeSidebar}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                <ChevronRight size={16} className="nav-chevron" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} className="nav-icon" />
          <span className="nav-text">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarA;