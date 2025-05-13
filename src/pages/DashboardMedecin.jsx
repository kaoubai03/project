import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardMedecin.css';

const DashboardMedecin = () => {
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
        <h1>Tableau de Bord Médecin</h1>
      </header>

      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link onClick={closeSidebar} to="/compte-rendu">📝 Compte Rendu Médical</Link></li>
          <li><Link onClick={closeSidebar} to="/ordonnance">💊 Prescrire une Ordonnance</Link></li>
          <li><Link onClick={closeSidebar} to="/informations-medicales">🩺 Ajouter Informations Médicales</Link></li>
          <li><Link onClick={closeSidebar} to="/historique-patient">📚 Historique Médical du Patient</Link></li>
          <li><Link onClick={closeSidebar} to="/rendezvous">📅 Ajouter un Rendez-vous</Link></li>
          <li><Link onClick={closeSidebar} to="/messagerie">💬 Messagerie</Link></li>
        </ul>
      </nav>

      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}

      <main className={`dashboard-main ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="card-grid">
          <div className="card">
            <h2>📝 Compte Rendu Médical</h2>
            <p>Rédigez et enregistrez un compte rendu pour vos consultations.</p>
            <Link to="/compte-rendu" className="btn">Rédiger</Link>
          </div>
          <div className="card">
            <h2>💊 Prescrire une Ordonnance</h2>
            <p>Prescrivez une ordonnance pour vos patients en quelques clics.</p>
            <Link to="/ordonnance" className="btn">Prescrire</Link>
          </div>
          <div className="card">
            <h2>🩺 Ajouter Informations Médicales</h2>
            <p>Ajoutez de nouvelles informations médicales pour un patient.</p>
            <Link to="/informations-medicales" className="btn">Ajouter</Link>
          </div>
          <div className="card">
            <h2>📚 Historique Médical du Patient</h2>
            <p>Consultez l'historique médical complet d'un patient.</p>
            <Link to="/historique-patient" className="btn">Consulter</Link>
          </div>
          <div className="card">
            <h2>📅 Ajouter un Rendez-vous</h2>
            <p>Planifiez un rendez-vous pour un patient.</p>
            <Link to="/rendezvous" className="btn">Planifier</Link>
          </div>
          <div className="card">
            <h2>💬 Envoyer un Message</h2>
            <p>Envoyez un message sécurisé à un patient.</p>
            <Link to="/messagerie" className="btn">Envoyer</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMedecin;
