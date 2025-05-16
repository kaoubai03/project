import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserTypeSelection from './pages/UserTypeSelection';
import SignupPatient from './pages/SignupPatient';
import SignupDoctor from './pages/SignupDoctor';
import Login from './pages/Login';
import DashboardPatient from './pages/DashboardPatient';
import DashboardMedecin from './pages/DashboardMedecin';
import AuthLayout from './components/layouts/AuthLayout';
import { UserProvider } from './context/UserContext';
import ProfilMedical from './components/ProfilMedical';
import RendezVousP from './pages/RendezVousP';
import RendezVousM from './pages/RendezVousM';
import Messagerie from './pages/MessagerieM';
import MessagerieP from './pages/MessagerieP';
import { MessageProvider } from './context/MessageContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <MessageProvider>
        <div className="app-container">
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/user-type" element={<UserTypeSelection mode="signup" />} />
              <Route path="/signup-patient" element={<SignupPatient />} />
              <Route path="/signup-doctor" element={<SignupDoctor />} />
              <Route path="/login" element={<Navigate to="/login/selection" />} />
              <Route path="/login/selection" element={<UserTypeSelection mode="login" />} />
              <Route path="/login/:userType" element={<Login />} />
            </Route>

            {/* Dashboards séparés */}
            <Route path="/dashboard/patient" element={<DashboardPatient />}>
              <Route path= "rendez-vousP" element={<RendezVousP />} />
              <Route path="MessagerieP" element={<MessagerieP />} />
            </Route>
            <Route path="/dashboard/doctor" element={<DashboardMedecin />}>
              <Route path= "rendez-vousM" element={<RendezVousM />} />
              <Route path="MessagerieM" element={<Messagerie />} />
            </Route>

            <Route path="/profil-medical" element={<ProfilMedical />} />
            <Route path="/rendez-vousP" element={<RendezVousP />} />
            <Route path= "/rendez-vousM" element={<RendezVousM />} />
            <Route path="/MessagerieM" element={<Messagerie />} />
            <Route path="/MessagerieP" element={<MessagerieP />} />
           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
