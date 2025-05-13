import React, { useState, useEffect } from 'react';
import './ProfilMedical.css';

const ProfilMedical = () => {
  const [profil, setProfil] = useState({
    age: '',
    sexe: '',
    groupeSanguin: '',
    antecedents: '',
    allergies: '',
    traitements: '',
    donneesVitales: '',
    vaccins: ''
  });

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    // Simule les données reçues d'une API
    setProfil({
      age: '32',
      sexe: 'Homme',
      groupeSanguin: 'O+',
      antecedents: 'Asthme',
      allergies: 'Pollen',
      traitements: 'Ventoline',
      donneesVitales: 'Tension: 12/8, Pouls: 70',
      vaccins: 'COVID-19, Hépatite B'
    });

    setCanEdit(true); // Autorise l'édition
  }, []);

  const handleChange = (e) => {
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Données mises à jour :', profil);
    // Envoi vers l'API ici
  };

  return (
    <div className="profil-container">
      <h2 className="title">🩺 Mon Profil Médical</h2>
      <div className="profil-grid">
        {Object.entries(profil).map(([key, value]) => (
          <div key={key} className="profil-field">
            <label className="field-label">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <textarea
              className="field-input"
              name={key}
              value={value}
              onChange={handleChange}
              disabled={!canEdit}
              rows={key === 'donneesVitales' || key === 'antecedents' ? 3 : 2}
            />
          </div>
        ))}
      </div>
      {canEdit && (
        <button className="update-button" onClick={handleSubmit}>
          💾 Mettre à jour
        </button>
      )}
    </div>
  );
};

export default ProfilMedical;
