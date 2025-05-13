import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPatient.css';

const DashboardPatient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
        <h1>Mon Tableau de Bord</h1>
      </header>

      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link onClick={closeSidebar} to="/profile">👤 Modifier mes infos</Link></li>
          <li><Link onClick={closeSidebar} to="/rendezvous">📅 Prendre un rendez-vous</Link></li>
          <li><Link onClick={closeSidebar} to="/autorisation">✅ Autoriser un médecin</Link></li>
          <li><Link onClick={closeSidebar} to="/ordonnance">📄 Télécharger Ordonnances</Link></li>
          <li><Link onClick={closeSidebar} to="/carnet">📘 Carnet de Santé</Link></li>
          <li><Link onClick={closeSidebar} to="/messagerie">💬 Messagerie</Link></li>
        </ul>
      </nav>

      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}

      <main className={`dashboard-main ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="card-grid">
          <div className="card">
            <h2>👤 Modifier mes informations</h2>
            <p>Mettre à jour vos informations personnelles et médicales.</p>
            <Link to="/profile" className="btn">Modifier</Link>
          </div>
          <div className="card">
            <h2>📅 Prendre un rendez-vous</h2>
            <p>Planifier un rendez-vous avec un médecin de votre choix.</p>
            <Link to="/rendezvous" className="btn">Prendre RDV</Link>
          </div>
          <div className="card">
            <h2>✅ Autoriser un médecin</h2>
            <p>Donner des autorisations pour consulter vos informations.</p>
            <Link to="/autorisation" className="btn">Gérer</Link>
          </div>
          <div className="card">
            <h2>📄 Télécharger Ordonnances</h2>
            <p>Télécharger vos ordonnances en un clic.</p>
            <Link to="/ordonnance" className="btn">Télécharger</Link>
          </div>
          <div className="card">
            <h2>📘 Consulter mon Carnet de Santé</h2>
            <p>Consulter vos antécédents médicaux, traitements et plus.</p>
            <Link to="/carnet" className="btn">Consulter</Link>
          </div>
          <div className="card">
            <h2>💬 Envoyer un message</h2>
            <p>Communiquez avec votre médecin via la messagerie.</p>
            <Link to="/messagerie" className="btn">Envoyer</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPatient;
