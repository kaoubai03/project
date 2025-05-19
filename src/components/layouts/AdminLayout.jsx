// components/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarA from '../Admin/SidebarA';
import './AdminLayout.css'; // Fichier CSS spécifique

const AdminLayout = () => {
  return (
    <div className="admin-layout-container">
      <SidebarA />
      
      <main className="admin-main-content">
        <div className="content-wrapper">
          <Outlet /> {/* Contenu des routes enfants */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;