import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarM from '../components/layouts/SidebarM';
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
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import './RendezVousM.css';

const RendezVousM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // État pour le formulaire de nouveau RDV
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    date: '',
    heure: '',
    motif: '',
    notes: ''
  });

  // Données des patients pour l'autocomplétion
  const [patients, setPatients] = useState([
    'Jean Dupont',
    'Marie Lambert',
    'Paul Martin',
    'Sophie Bernard',
    'Lucie Petit',
    'Thomas Durand'
  ]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  // État des rendez-vous
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'Jean Dupont',
      date: '15/06/2023',
      heure: '09:30',
      motif: 'Consultation routine',
      status: 'confirmé',
      notes: 'Nouveau patient'
    },
    {
      id: 2,
      patient: 'Marie Lambert',
      date: '15/06/2023',
      heure: '10:15',
      motif: 'Suivi traitement',
      status: 'confirmé',
      notes: 'Allergie aux pénicillines'
    },
    {
      id: 3,
      patient: 'Paul Martin',
      date: '15/06/2023',
      heure: '11:00',
      motif: 'Douleurs abdominales',
      status: 'à confirmer',
      notes: 'Appeler pour confirmation'
    },
    {
      id: 4,
      patient: 'Sophie Bernard',
      date: '16/06/2023',
      heure: '08:45',
      motif: 'Vaccination',
      status: 'annulé',
      notes: 'Patient a reporté à juillet'
    },
    {
      id: 5,
      patient: 'Lucie Petit',
      date: '16/06/2023',
      heure: '14:30',
      motif: 'Bilan annuel',
      status: 'confirmé',
      notes: 'À faire prise de sang avant'
    },
    {
      id: 6,
      patient: 'Thomas Durand',
      date: '17/06/2023',
      heure: '16:15',
      motif: 'Certificat médical',
      status: 'à confirmer',
      notes: 'Pour club sportif'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Gestion des rendez-vous
  const confirmAppointment = (id) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? { ...appt, status: 'confirmé' } : appt
    ));
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? { ...appt, status: 'annulé' } : appt
    ));
  };

  const rescheduleAppointment = (id) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? { ...appt, status: 'à confirmer' } : appt
    ));
  };

  const addAppointment = (e) => {
    e.preventDefault();
    const newId = Math.max(...appointments.map(a => a.id)) + 1;
    setAppointments([
      ...appointments,
      {
        id: newId,
        ...newAppointment,
        status: 'confirmé'
      }
    ]);
    setNewAppointment({
      patient: '',
      date: '',
      heure: '',
      motif: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handlePatientSearch = (value) => {
    setNewAppointment({...newAppointment, patient: value});
    setFilteredPatients(
      value.length > 1 
        ? patients.filter(p => 
            p.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
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
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filtrage des rendez-vous
  const filteredAppointments = sortedAppointments.filter(appt => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appt.motif.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? appt.date === dateFilter : true;
    const matchesStatus = statusFilter ? appt.status === statusFilter : true;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // Dates uniques pour le filtre
  const uniqueDates = [...new Set(appointments.map(appt => appt.date))];

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
          <h1>Gestion des Rendez-vous</h1>
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
              <Filter size={16} />
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes dates</option>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
              <ChevronDown size={16} className="chevron-icon" />
            </div>
            
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Tous statuts</option>
                <option value="confirmé">Confirmé</option>
                <option value="à confirmer">À confirmer</option>
                <option value="annulé">Annulé</option>
              </select>
              <ChevronDown size={16} className="chevron-icon" />
            </div>
            
            <button 
              className="add-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus size={18} /> Nouveau RDV
            </button>
          </div>

          {/* Formulaire d'ajout */}
          {showAddForm && (
            <div className="add-form-container">
              <form onSubmit={addAppointment} className="add-form">
                <h3>Ajouter un nouveau rendez-vous</h3>
                
                <div className="form-group">
                  <label>Patient *</label>
                  <div className="patient-autocomplete">
                    <input
                      type="text"
                      value={newAppointment.patient}
                      onChange={(e) => handlePatientSearch(e.target.value)}
                      placeholder="Nom du patient"
                      required
                    />
                    {filteredPatients.length > 0 && (
                      <ul className="patient-suggestions">
                        {filteredPatients.map((patient, index) => (
                          <li 
                            key={index}
                            onClick={() => {
                              setNewAppointment({...newAppointment, patient});
                              setFilteredPatients([]);
                            }}
                          >
                            {patient}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Heure *</label>
                    <input
                      type="time"
                      value={newAppointment.heure}
                      onChange={(e) => setNewAppointment({...newAppointment, heure: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Motif *</label>
                  <input
                    type="text"
                    value={newAppointment.motif}
                    onChange={(e) => setNewAppointment({...newAppointment, motif: e.target.value})}
                    placeholder="Motif de la consultation"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    placeholder="Informations complémentaires"
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="confirm-btn"
                  >
                    Ajouter le RDV
                  </button>
                </div>
              </form>
            </div>
          )}

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
                        <th>Notes</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map(appt => (
                        <tr key={appt.id} className={`status-${appt.status}`}>
                          <td>
                            <div className="patient-info">
                              <User size={16} />
                              {appt.patient}
                            </div>
                          </td>
                          <td>{appt.date}</td>
                          <td>{appt.heure}</td>
                          <td>{appt.motif}</td>
                          <td>{appt.notes}</td>
                          <td>
                            <span className={`status-badge ${appt.status}`}>
                              {appt.status === 'confirmé' && <CheckCircle size={14} />}
                              {appt.status === 'à confirmer' && <Clock size={14} />}
                              {appt.status === 'annulé' && <XCircle size={14} />}
                              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="actions">
                              <div className="dropdown">
                                <button className="dropdown-toggle">
                                  <MoreVertical size={18} />
                                </button>
                                <div className="dropdown-menu">
                                  {appt.status === 'à confirmer' && (
                                    <button 
                                      className="dropdown-item confirm"
                                      onClick={() => confirmAppointment(appt.id)}
                                    >
                                      <CheckCircle size={16} /> Confirmer
                                    </button>
                                  )}
                                  {appt.status !== 'annulé' && (
                                    <button 
                                      className="dropdown-item cancel"
                                      onClick={() => cancelAppointment(appt.id)}
                                    >
                                      <XCircle size={16} /> Annuler
                                    </button>
                                  )}
                                  {appt.status !== 'à confirmer' && (
                                    <button 
                                      className="dropdown-item reschedule"
                                      onClick={() => rescheduleAppointment(appt.id)}
                                    >
                                      <RefreshCw size={16} /> Reporter
                                    </button>
                                  )}
                                </div>
                              </div>
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
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                      >
                        {number}
                      </button>
                    ))}
                    
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
                <h3>Aucun rendez-vous trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RendezVousM;