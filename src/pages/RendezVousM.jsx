import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Calendar,
  User,
  Clock,
  CheckCircle,
  RefreshCw,
  XCircle,
  Search,
  ChevronDown,
  Frown,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Clipboard,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import SidebarM from '../components/layouts/SidebarM';
import './css/RendezVousM.css';

const RendezVousM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // État pour la modale de changement de statut
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusAction, setStatusAction] = useState('');
  const [statusNote, setStatusNote] = useState('');

  // Données des rendez-vous confirmés seulement
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Jean Dupont',
      date: '2023-06-15',
      heure: '09:30',
      motif: 'Consultation routine',
      status: 'confirmé',
      notes: 'Nouveau patient',
      patientInfo: '45 ans, allergies: pénicilline'
    },
    {
      id: 2,
      patient: 'Marie Lambert',
      date: '2023-06-15',
      heure: '10:15',
      motif: 'Suivi traitement',
      status: 'confirmé',
      notes: 'Allergie aux pénicillines',
      patientInfo: '32 ans, enceinte - 5ème mois'
    },
    {
      id: 5,
      patient: 'Lucie Petit',
      date: '2023-06-16',
      heure: '14:30',
      motif: 'Bilan annuel',
      status: 'confirmé',
      notes: 'À faire prise de sang avant',
      patientInfo: '28 ans, antécédents familiaux diabète'
    },
    {
      id: 7,
      patient: 'Thomas Durand',
      date: '2023-06-17',
      heure: '16:15',
      motif: 'Certificat médical',
      status: 'confirmé',
      notes: 'Pour club sportif',
      patientInfo: '19 ans, sportif de haut niveau'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Gestion des statuts avec note
  const handleStatusChange = (action) => {
    setStatusAction(action);
    setModalOpen(true);
  };

  const confirmStatusChange = () => {
    const updatedAppointments = appointments.map(appt => {
      if (appt.id === selectedAppointment.id) {
        return {
          ...appt,
          status: statusAction === 'annulé' ? 'annulé' : 
                  statusAction === 'réalisé' ? 'réalisé' : appt.status,
          notes: statusNote ? `${appt.notes}\n[${new Date().toLocaleDateString()}] ${statusAction}: ${statusNote}` : appt.notes
        };
      }
      return appt;
    });

    setAppointments(updatedAppointments);
    setModalOpen(false);
    setStatusNote('');
  };

  // Tri des rendez-vous
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortConfig.key) {
      // Tri spécial pour les dates
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filtrage des rendez-vous (uniquement confirmés)
  const filteredAppointments = sortedAppointments.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appt.motif.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? appt.date === dateFilter : true;
    
    return matchesSearch && matchesDate && appt.status === 'confirmé';
  });

  // Pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // Dates uniques pour le filtre
  const uniqueDates = [...new Set(appointments.map(appt => appt.date))];

  // Formatage de la date pour l'affichage
  const formatDisplayDate = (dateStr) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className={`medecin-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <SidebarM
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeItem={activeNavItem}
        setActiveItem={setActiveNavItem}
      />
                
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>Planning des Rendez-vous</h1>
          <div className="user-profile">
            <div className="avatar">DR</div>
          </div>
        </header>

        <div className="content-container">
          {/* Filtres */}
          <div className="filters-container">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un patient ou motif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <Calendar size={16} />
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes dates</option>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>{formatDisplayDate(date)}</option>
                ))}
              </select>
              <ChevronDown size={16} className="chevron-icon" />
            </div>
          </div>

          {/* Liste des RDV */}
          <div className="appointments-container">
            {currentAppointments.length > 0 ? (
              <>
                <div className="responsive-table">
                  <table>
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('patient')}>
                          <span>Patient <ArrowUpDown size={14} /></span>
                        </th>
                        <th onClick={() => requestSort('date')}>
                          <span>Date <ArrowUpDown size={14} /></span>
                        </th>
                        <th onClick={() => requestSort('heure')}>
                          <span>Heure <ArrowUpDown size={14} /></span>
                        </th>
                        <th>Motif</th>
                        <th>Informations patient</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map(appt => (
                        <tr key={appt.id}>
                          <td>
                            <div className="patient-info">
                              <User size={16} />
                              <span className="patient-name">{appt.patient}</span>
                            </div>
                          </td>
                          <td>{formatDisplayDate(appt.date)}</td>
                          <td>{appt.heure}</td>
                          <td>
                            <div className="motif-cell">
                              <Clipboard size={14} />
                              <span>{appt.motif}</span>
                            </div>
                            {appt.notes && (
                              <div className="notes-tooltip">
                                <MessageSquare size={12} />
                                <span className="tooltip-text">{appt.notes}</span>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="patient-info-cell">
                              {appt.patientInfo}
                            </div>
                          </td>
                          <td>
                            <div className="actions">
                              <button 
                                className="action-btn completed"
                                onClick={() => {
                                  setSelectedAppointment(appt);
                                  handleStatusChange('réalisé');
                                }}
                              >
                                <CheckCircle size={16} /> Réalisé
                              </button>
                              <button 
                                className="action-btn canceled"
                                onClick={() => {
                                  setSelectedAppointment(appt);
                                  handleStatusChange('annulé');
                                }}
                              >
                                <XCircle size={16} /> Annuler
                              </button>
                              <button 
                                className="action-btn rescheduled"
                                onClick={() => {
                                  setSelectedAppointment(appt);
                                  handleStatusChange('reprogrammé');
                                }}
                              >
                                <RefreshCw size={16} /> Reporter
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <Frown size={48} />
                <h3>Aucun rendez-vous confirmé</h3>
                <p>Votre planning est vide pour les critères sélectionnés</p>
              </div>
            )}
          </div>
        </div>

        {/* Modale de changement de statut */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="status-modal">
              <h3>
                {statusAction === 'réalisé' && <CheckCircle size={20} />}
                {statusAction === 'annulé' && <XCircle size={20} />}
                {statusAction === 'reprogrammé' && <RefreshCw size={20} />}
                Marquer comme {statusAction}
              </h3>
              
              <div className="modal-content">
                <p>
                  <strong>Patient:</strong> {selectedAppointment?.patient}<br />
                  <strong>Date:</strong> {selectedAppointment?.date} à {selectedAppointment?.heure}<br />
                  <strong>Motif:</strong> {selectedAppointment?.motif}
                </p>
                
                <div className="form-group">
                  <label>
                    <AlertCircle size={16} /> Note (optionnel):
                  </label>
                  <textarea
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder={`Raison ${statusAction === 'annulé' ? 'de l\'annulation' : statusAction === 'reprogrammé' ? 'du report' : 'de la consultation'}`}
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Annuler
                </button>
                <button 
                  className="confirm-btn"
                  onClick={confirmStatusChange}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RendezVousM;