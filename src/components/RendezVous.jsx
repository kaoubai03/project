import React, { useEffect, useState } from 'react';
import './RendezVous.css';

const RendezVous = () => {
  const [rendezVousList, setRendezVousList] = useState([]);
  const [form, setForm] = useState({ date: '', heure: '', medecin: '' });
  const [medecins, setMedecins] = useState([]);
  const [medecinSelectionne, setMedecinSelectionne] = useState(null);

  useEffect(() => {
    // Simule une liste de médecins avec disponibilité
    setMedecins([
      { id: 1, nom: 'Dr. Karim', specialite: 'Cardiologue', disponible: true },
      { id: 2, nom: 'Dr. Amira', specialite: 'Généraliste', disponible: false },
      { id: 3, nom: 'Dr. Salim', specialite: 'Pédiatre', disponible: true }
    ]);

    // Simule des rendez-vous existants
    setRendezVousList([
      { id: 1, date: '2025-05-10', heure: '10:00', medecin: 'Dr. Karim' },
      { id: 2, date: '2025-05-15', heure: '14:00', medecin: 'Dr. Amira' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMedecinSelect = (e) => {
    const selected = medecins.find((m) => m.id === parseInt(e.target.value));
    setForm({ ...form, medecin: selected.nom });
    setMedecinSelectionne(selected);
  };

  const ajouterRendezVous = () => {
    const nouveau = { ...form, id: Date.now() };
    setRendezVousList([...rendezVousList, nouveau]);
    setForm({ date: '', heure: '', medecin: '' });
    setMedecinSelectionne(null);
  };

  const annulerRendezVous = (id) => {
    setRendezVousList(rendezVousList.filter((rdv) => rdv.id !== id));
  };

  return (
    <div className="rendezvous-container">
      <h2 className="section-title">📅 Mes Rendez-vous</h2>
      <ul className="rdv-list">
        {rendezVousList.map((rdv) => (
          <li key={rdv.id} className="rdv-item">
            <span>{rdv.date} à {rdv.heure} avec <strong>{rdv.medecin}</strong></span>
            <button className="btn-annuler" onClick={() => annulerRendezVous(rdv.id)}>Annuler</button>
          </li>
        ))}
      </ul>

      <h3 className="section-title">➕ Prendre un nouveau rendez-vous</h3>
      <div className="form-rdv">
        <input type="date" name="date" value={form.date} onChange={handleInputChange} />
        <input type="time" name="heure" value={form.heure} onChange={handleInputChange} />

        <select onChange={handleMedecinSelect} value={medecins.find(m => m.nom === form.medecin)?.id || ''}>
          <option value="">-- Sélectionner un médecin --</option>
          {medecins.map((med) => (
            <option key={med.id} value={med.id}>
              {med.nom} - {med.specialite}
            </option>
          ))}
        </select>

        {medecinSelectionne && (
          <div className={`disponibilite ${medecinSelectionne.disponible ? 'dispo' : 'indispo'}`}>
            Disponibilité : {medecinSelectionne.disponible ? '✅ Disponible' : '❌ Indisponible'}
          </div>
        )}

        <button className="btn-ajouter" onClick={ajouterRendezVous} disabled={!form.date || !form.heure || !form.medecin}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default RendezVous;
