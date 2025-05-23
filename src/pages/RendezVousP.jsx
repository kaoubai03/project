import React, { useState, useEffect } from 'react';
import { Menu, Search, PlusCircle, Filter, ChevronDown, Loader2, Calendar, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarP from '../components/layouts/sidebarP';
import styles from './css/RendezVousP.module.css';

const RendezVousP = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialiteFilter, setSpecialiteFilter] = useState('');
  const [formError, setFormError] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const [formData, setFormData] = useState({
    medecin: '',
    specialite: '',
    date: '',
    heure: '',
    notes: ''
  });

  const specialites = [
    'Cardiologie', 'Dermatologie', 'Généraliste', 'Pédiatrie', 'Radiologie'
  ];

  const medecinsParSpecialite = {
    'Cardiologie': ['Dr. Dupont', 'Dr. Laurent'],
    'Dermatologie': ['Dr. Martin', 'Dr. Petit'],
    'Généraliste': ['Dr. Legrand', 'Dr. Moreau'],
    'Pédiatrie': ['Dr. Bernard', 'Dr. Leroy'],
    'Radiologie': ['Dr. Simon', 'Dr. Michel']
  };

  const statusOptions = [
    { value: 'planifié', label: 'Planifié', icon: <Calendar size={16} /> },
    { value: 'confirmé', label: 'Confirmé', icon: <Check size={16} /> },
    { value: 'réalisé', label: 'Réalisé', icon: <Check size={16} /> },
    { value: 'annulé', label: 'Annulé', icon: <X size={16} /> }
  ];

  const generateAvailableHours = (date) => {
    if (!date) return [];
    const day = new Date(date).getDay();
    const hours = [];

    // Samedi: 9h-13h (pas de créneau à 13h)
    if (day === 6) {
      for (let h = 9; h < 13; h++) {
        for (let m = 0; m < 60; m += 15) {
          hours.push(`${h}:${m.toString().padStart(2, '0')}`);
        }
      }
    } 
    // Lundi-Vendredi: 9h-12h et 13h-16h (pas de créneau à 12h ni 16h)
    else if (day >= 1 && day <= 5) {
      // Matin: 9h-12h
      for (let h = 9; h < 12; h++) {
        for (let m = 0; m < 60; m += 15) {
          hours.push(`${h}:${m.toString().padStart(2, '0')}`);
        }
      }
      // Après-midi: 13h-16h
      for (let h = 13; h < 16; h++) {
        for (let m = 0; m < 60; m += 15) {
          hours.push(`${h}:${m.toString().padStart(2, '0')}`);
        }
      }
    }
    return hours;
  };

  const [heuresDisponibles, setHeuresDisponibles] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          medecin: 'Dr. Dupont',
          specialite: 'Cardiologie',
          date: '2025-06-16', // Lundi
          heure: '09:30',
          status: 'planifié',
          notes: 'Contrôle annuel'
        },
        {
          id: 2,
          medecin: 'Dr. Martin',
          specialite: 'Dermatologie',
          date: '2025-06-17', // Mardi
          heure: '14:00',
          status: 'confirmé',
          notes: 'Examen de routine'
        },
        {
          id: 3,
          medecin: 'Dr. Legrand',
          specialite: 'Généraliste',
          date: '2025-06-15', // Samedi
          heure: '10:00',
          status: 'réalisé',
          notes: 'Consultation générale'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (formData.date) {
      const heures = generateAvailableHours(formData.date);
      setHeuresDisponibles(heures);
      // Réinitialiser l'heure si elle n'est plus disponible
      if (formData.heure && !heures.includes(formData.heure)) {
        setFormData(prev => ({ ...prev, heure: '' }));
      }
    }
  }, [formData.date]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isDateDisabled = (date) => {
    if (!date) return false;
    const day = new Date(date).getDay();
    return day === 0; // Dimanche
  };

  const isSlotAvailable = (date, time) => {
    const count = appointments.filter(appt => 
      appt.id !== editingAppointment?.id &&
      appt.date === date && 
      appt.heure === time
    ).length;
    return count < 2;
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const { date, heure } = formData;

    if (isDateDisabled(date)) {
      setFormError("Les rendez-vous ne sont pas disponibles le dimanche.");
      return;
    }

    if (!isSlotAvailable(date, heure)) {
      setFormError("Ce créneau est déjà complet. Veuillez choisir un autre horaire.");
      return;
    }

    setLoading(true);
    setFormError('');

    setTimeout(() => {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        status: 'planifié'
      };
      setAppointments([...appointments, newAppointment]);
      setFormData({ medecin: '', specialite: '', date: '', heure: '', notes: '' });
      setShowCreateForm(false);
      setLoading(false);
    }, 500);
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    const { date, heure } = formData;

    if (isDateDisabled(date)) {
      setFormError("Les rendez-vous ne sont pas disponibles le dimanche.");
      return;
    }

    if (!isSlotAvailable(date, heure)) {
      setFormError("Ce créneau est déjà complet. Veuillez choisir un autre horaire.");
      return;
    }

    setLoading(true);
    setFormError('');

    setTimeout(() => {
      const updatedAppointments = appointments.map(appt => 
        appt.id === editingAppointment.id ? { ...formData, id: appt.id, status: appt.status } : appt
      );
      setAppointments(updatedAppointments);
      setFormData({ medecin: '', specialite: '', date: '', heure: '', notes: '' });
      setEditingAppointment(null);
      setLoading(false);
    }, 500);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setLoading(true);
    setTimeout(() => {
      const updatedAppointments = appointments.map(appt => 
        appt.id === appointmentId ? { ...appt, status: newStatus } : appt
      );
      setAppointments(updatedAppointments);
      setLoading(false);
    }, 300);
  };

  const markAsCompleted = (appointmentId) => {
    handleStatusChange(appointmentId, 'réalisé');
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      medecin: appointment.medecin,
      specialite: appointment.specialite,
      date: appointment.date,
      heure: appointment.heure,
      notes: appointment.notes || ''
    });
  };

  const cancelEdit = () => {
    setEditingAppointment(null);
    setFormData({ medecin: '', specialite: '', date: '', heure: '', notes: '' });
  };

  const filteredAppointments = appointments.filter(appt => {
    const searchMatch =
      appt.medecin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.specialite.toLowerCase().includes(searchTerm.toLowerCase());
    const specialiteMatch = specialiteFilter ? appt.specialite === specialiteFilter : true;
    const tabMatch =
      (activeTab === 'upcoming' && appt.status !== 'annulé' && appt.status !== 'réalisé') ||
      (activeTab === 'history' && appt.status === 'réalisé') ||
      (activeTab === 'cancelled' && appt.status === 'annulé');
    return searchMatch && specialiteMatch && tabMatch;
  });

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  const getScheduleInfo = (date) => {
    if (!date) return '';
    const day = new Date(date).getDay();
    if (day === 6) return "Samedi : 9h-13h (fermeture à 13h)";
    if (day >= 1 && day <= 5) return "Lundi-Vendredi : 9h-12h et 13h-16h (fermé 12h-13h)";
    return "Fermé le dimanche";
  };

  return (
    <div className={styles.rendezvousContainer}>
      <SidebarP 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />

      {sidebarOpen && <div className={styles.dashboardOverlay} onClick={closeSidebar}></div>}

      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <button className={styles.menuToggle} onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>Rendez-vous</h1>
          <button
            className={styles.createButton}
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              setFormError('');
              if (showCreateForm) cancelEdit();
            }}
            disabled={loading}
          >
            {loading ? <Loader2 className={styles.spinIcon} size={18} /> : <PlusCircle size={18} />}
            {editingAppointment ? 'Modification' : showCreateForm ? 'Masquer' : 'Nouveau rendez-vous'}
          </button>
        </header>

        {showCreateForm || editingAppointment ? (
          <form onSubmit={editingAppointment ? handleUpdateAppointment : handleCreateAppointment} className={styles.createForm}>
            <h3>{editingAppointment ? 'Modifier le rendez-vous' : 'Prendre un nouveau rendez-vous'}</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Spécialité *</label>
                <select
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez une spécialité</option>
                  {specialites.map((spec, i) => (
                    <option key={i} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
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
                    medecinsParSpecialite[formData.specialite]?.map((med, i) => (
                      <option key={i} value={med}>{med}</option>
                    ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className={isDateDisabled(formData.date) ? styles.disabledDate : ''}
                />
                {formData.date && (
                  <p className={isDateDisabled(formData.date) ? styles.dateWarning : styles.scheduleInfo}>
                    {getScheduleInfo(formData.date)}
                  </p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Heure *</label>
                <select
                  name="heure"
                  value={formData.heure}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.date || isDateDisabled(formData.date)}
                >
                  <option value="">Sélectionnez une heure</option>
                  {heuresDisponibles.map((heure) => {
                    const isDisabled = !isSlotAvailable(formData.date, heure);
                    return (
                      <option 
                        key={heure} 
                        value={heure}
                        disabled={isDisabled}
                        className={isDisabled ? styles.disabledTime : ''}
                      >
                        {heure}
                        {isDisabled && ' (Complet)'}
                      </option>
                    );
                  })}
                </select>
                {formData.date && !isDateDisabled(formData.date) && (
                  <p className={styles.timeNote}>
                    Créneaux disponibles toutes les 15 minutes
                  </p>
                )}
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Raison de la consultation..."
                />
              </div>
              {formError && <p className={styles.errorMessage}>{formError}</p>}
            </div>
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.cancelBtn} 
                onClick={() => {
                  if (editingAppointment) {
                    cancelEdit();
                  } else {
                    setShowCreateForm(false);
                  }
                  setFormError('');
                }}
              >
                Annuler
              </button>
              <button type="submit" className={styles.confirmBtn} disabled={loading}>
                {loading ? <Loader2 className={styles.spinIcon} size={16} /> : 
                 editingAppointment ? 'Mettre à jour' : 'Confirmer'}
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.searchFilterBar}>
            <div className={styles.searchBox}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Rechercher par médecin ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterDropdown}>
              <Filter size={18} />
              <select value={specialiteFilter} onChange={(e) => setSpecialiteFilter(e.target.value)}>
                <option value="">Toutes spécialités</option>
                {specialites.map((spec, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
              <ChevronDown size={16} />
            </div>
          </div>
        )}

        <div className={styles.tabs}>
          <button
            className={activeTab === 'upcoming' ? styles.active : ''}
            onClick={() => {
              setActiveTab('upcoming');
              setCurrentPage(1);
            }}
            disabled={loading}
          >
            À venir
          </button>
          <button
            className={activeTab === 'history' ? styles.active : ''}
            onClick={() => {
              setActiveTab('history');
              setCurrentPage(1);
            }}
            disabled={loading}
          >
            Historique
          </button>
          <button
            className={activeTab === 'cancelled' ? styles.active : ''}
            onClick={() => {
              setActiveTab('cancelled');
              setCurrentPage(1);
            }}
            disabled={loading}
          >
            Annulés
          </button>
        </div>

        <div className={styles.appointmentsList}>
          {loading ? (
            <div className={styles.loadingState}>
              <Loader2 className={styles.spinIcon} size={32} />
              <p>Chargement...</p>
            </div>
          ) : currentAppointments.length === 0 ? (
            <p className={styles.noAppointments}>Aucun rendez-vous trouvé.</p>
          ) : (
            currentAppointments.map(appt => (
              <div key={appt.id} className={`${styles.appointmentCard} ${styles[appt.status]}`}>
                <div className={styles.cardHeader}>
                  <div>
                    <strong>{appt.medecin}</strong> — {appt.specialite}
                    <span className={`${styles.statusBadge} ${styles[appt.status]}`}>
                      {statusOptions.find(s => s.value === appt.status)?.icon}
                      {appt.status}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    {appt.status === 'planifié' || appt.status === 'confirmé' ? (
                      <>
                        <button 
                          className={styles.editBtn}
                          onClick={() => handleEditAppointment(appt)}
                          disabled={loading}
                        >
                          Reprogrammer
                        </button>
                       {/* <button
                          className={styles.completeBtn}
                          onClick={() => markAsCompleted(appt.id)}
                          disabled={loading}
                        >
                          Marquer comme réalisé
                        </button> */}
                        <select
                          value={appt.status}
                          onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                          disabled={loading}
                          className={styles.statusSelect}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={styles.cardDetails}>
                  <p><strong>Date :</strong> {formatDate(appt.date)}</p>
                  <p><strong>Heure :</strong> {appt.heure}</p>
                  {appt.notes && <p><strong>Notes :</strong> {appt.notes}</p>}
                </div>
              </div>
            ))
          )}
        </div>

        {filteredAppointments.length > appointmentsPerPage && (
          <div className={styles.pagination}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`${styles.paginationButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RendezVousP;