import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarP from '../components/layouts/sidebarP';
import { 
  Search,
  PlusCircle,
  Calendar,
  User,
  Clock,
  Frown,
  CheckCircle,
  RefreshCw,
  XCircle,
  Filter,
  ChevronDown,
  Loader2,
  Menu
  
} from 'lucide-react';
import './RendezVousP.css';

const RendezVousP = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialiteFilter, setSpecialiteFilter] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medecin: '',
    specialite: '',
    date: '',
    heure: '',
    notes: ''
  });

  // Sidebarcode
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Menu items pour la sidebar
  

  // Données simulées (remplacer par appel API en production)
  const specialites = [
    'Cardiologie',
    'Dermatologie',
    'Généraliste',
    'Pédiatrie',
    'Radiologie'
  ];

  const medecinsParSpecialite = {
    'Cardiologie': ['Dr. Dupont', 'Dr. Laurent'],
    'Dermatologie': ['Dr. Martin', 'Dr. Petit'],
    'Généraliste': ['Dr. Legrand', 'Dr. Moreau'],
    'Pédiatrie': ['Dr. Bernard', 'Dr. Leroy'],
    'Radiologie': ['Dr. Simon', 'Dr. Michel']
  };

  // Simuler le chargement initial
  useEffect(() => {
    setLoading(true);
    // Simuler appel API
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          medecin: 'Dr. Dupont',
          specialite: 'Cardiologie',
          date: '15/06/2023',
          heure: '09:30',
          status: 'confirmé',
          notes: 'Contrôle annuel'
        },
        {
          id: 2,
          medecin: 'Dr. Martin',
          specialite: 'Dermatologie',
          date: '17/06/2023',
          heure: '14:00',
          status: 'à confirmer',
          notes: 'Examen de routine'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = appt.medecin.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appt.specialite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialite = specialiteFilter ? appt.specialite === specialiteFilter : true;
    const matchesTab = 
      (activeTab === 'upcoming' && appt.status !== 'annulé') ||
      (activeTab === 'cancelled' && appt.status === 'annulé') ||
      (activeTab === 'history' && appt.status !== 'annulé');
    
    return matchesSearch && matchesSpecialite && matchesTab;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler appel API
    setTimeout(() => {
      const newAppointment = {
        id: appointments.length + 1,
        medecin: formData.medecin,
        specialite: formData.specialite,
        date: new Date(formData.date).toLocaleDateString('fr-FR'),
        heure: formData.heure,
        status: 'confirmé',
        notes: formData.notes
      };
      
      setAppointments([...appointments, newAppointment]);
      setFormData({
        medecin: '',
        specialite: '',
        date: '',
        heure: '',
        notes: ''
      });
      setShowCreateForm(false);
      setLoading(false);
    }, 500);
  };

  const handleStatusChange = (id, newStatus) => {
    setLoading(true);
    // Simuler appel API
    setTimeout(() => {
      setAppointments(appointments.map(appt => 
        appt.id === id ? { ...appt, status: newStatus } : appt
      ));
      setLoading(false);
    }, 300);
  };

  return (
    <div className="rendezvous-container">
      <SidebarP 
       sidebarOpen={sidebarOpen}
       toggleSidebar={toggleSidebar}
       closeSidebar={closeSidebar}
       activeIcon={activeIcon}
       setActiveIcon={setActiveIcon}
      />

      {/* Overlay pour mobile */}
      {sidebarOpen && <div className="dashboard-overlay" onClick={closeSidebar}></div>}

      {/* Modification du header pour inclure le menu toggle */}
          <div className="main-content">
            <header className="top-bar">
              <button className="menu-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
              </button>
     
        <h1>Rendez-vous</h1>
        <button 
          className="create-button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={loading}
        >
          {loading ? <Loader2 className="spin-icon" size={18} /> : <PlusCircle size={18} />}
          {showCreateForm ? 'Masquer' : 'Nouveau rendez-vous'}
        </button>
      </header>

      {/* Formulaire de création intégré à la recherche */}
      {showCreateForm && (
        <div className="search-create-container">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un médecin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          
          
          
          <form onSubmit={handleCreateAppointment} className="create-form">
            <h3>Prendre un nouveau rendez-vous</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Spécialité *</label>
                <select 
                  name="specialite" 
                  value={formData.specialite}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez une spécialité</option>
                  {specialites.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Médecin *</label>
                <select 
                  name="medecin" 
                  value={formData.medecin}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.specialite}
                >
                  <option value="">Sélectionnez un médecin</option>
                  {formData.specialite && 
                    medecinsParSpecialite[formData.specialite]?.map((med, index) => (
                      <option key={index} value={med}>{med}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Heure *</label>
                <input 
                  type="time" 
                  name="heure"
                  value={formData.heure}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Raison de la consultation..."
                />
              </div>
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setShowCreateForm(false)}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="confirm-btn"
                
                disabled={loading}
              >
                {loading ? <Loader2 className="spin-icon" size={16} /> : 'Confirmer le rendez-vous'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barre de recherche et filtres (visible quand le formulaire est fermé) */}
      {!showCreateForm && (
        <div className="search-filter-bar">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par médecin ou spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={18} />
            <select 
              value={specialiteFilter}
              onChange={(e) => setSpecialiteFilter(e.target.value)}
            >
              <option value="">Toutes spécialités</option>
              {specialites.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
      )}

      {/* Onglets */}
      <div className="tabs">
        <button 
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => setActiveTab('upcoming')}
          disabled={loading}
        >
          À venir
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
          disabled={loading}
        >
          Historique
        </button>
        <button 
          className={activeTab === 'cancelled' ? 'active' : ''}
          onClick={() => setActiveTab('cancelled')}
          disabled={loading}
        >
          Annulés
        </button>
      </div>

      {/* Liste des RDV */}
      <div className="appointments-list">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spin-icon" size={32} />
            <p>Chargement en cours...</p>
          </div>
        ) : filteredAppointments.length > 0 ? (
          filteredAppointments.map(appt => (
            <div key={appt.id} className={`appointment-card ${appt.status}`}>
              <div className="appt-header">
                <div className="medecin-info">
                  <User size={18} />
                  <div>
                    <h3>{appt.medecin}</h3>
                    <p>{appt.specialite}</p>
                  </div>
                </div>
                <div className={`status-badge ${appt.status}`}>
                  {appt.status === 'confirmé' && <CheckCircle size={16} />}
                  {appt.status === 'à confirmer' && <Clock size={16} />}
                  {appt.status === 'annulé' && <XCircle size={16} />}
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </div>
              </div>
              <div className="appt-details">
                <div className="date-time">
                  <Calendar size={16} />
                  <span>{appt.date} à {appt.heure}</span>
                </div>
                {appt.notes && <p className="notes">{appt.notes}</p>}
              </div>
              <div className="appt-actions">
                {appt.status === 'confirmé' && (
                  <>
                    <button 
                      className="action-btn cancel"
                      onClick={() => handleStatusChange(appt.id, 'annulé')}
                      disabled={loading}
                    >
                      <XCircle size={16} /> Annuler
                    </button>
                    <button 
                      className="action-btn reschedule"
                      onClick={() => handleStatusChange(appt.id, 'à confirmer')}
                      disabled={loading}
                    >
                      <RefreshCw size={16} /> Reporter
                    </button>
                  </>
                )}
                {appt.status === 'à confirmer' && (
                  <button 
                    className="action-btn confirm"
                    onClick={() => handleStatusChange(appt.id, 'confirmé')}
                    disabled={loading}
                  >
                    <CheckCircle size={16} /> Confirmer
                  </button>
                )}
                {appt.status === 'annulé' && (
                  <button 
                    className="action-btn reschedule"
                    onClick={() => handleStatusChange(appt.id, 'à confirmer')}
                    disabled={loading}
                  >
                    <RefreshCw size={16} /> Reprogrammer
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Frown size={48} />
            <h3>Aucun rendez-vous trouvé</h3>
            <p>{searchTerm || specialiteFilter ? 'Essayez de modifier vos critères de recherche' : 'Vous n\'avez aucun rendez-vous dans cette catégorie'}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RendezVousP;