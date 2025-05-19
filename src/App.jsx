import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import { MessageProvider } from './context/MessageContext';

// Layouts
import AuthLayout from './components/layouts/AuthLayout';
/*import PatientLayout from './components/layouts/PatientLayout';
import DoctorLayout from './components/layouts/DoctorLayout';*/
import ProtectedAdminRoute from './components/layouts/Admins/ProtectedAdminRoute';

// Pages publiques
import HomePage from './pages/HomePage';
import UserTypeSelection from './pages/UserTypeSelection';
import SignupPatient from './pages/SignupPatient';
import SignupDoctor from './pages/SignupDoctor';
import LoginPatient from './pages/LoginPatient';
import LoginDoctor from './pages/LoginMedecin';
import './App.css';

// Pages protégées (utilisateurs)
import DashboardPatient from './pages/DashboardPatient';
import DashboardMedecin from './pages/DashboardMedecin';
import ProfilMedical from './components/ProfilMedical';
import RendezVousP from './pages/RendezVousP';
import RendezVousM from './pages/RendezVousM';
import Messagerie from './pages/MessagerieM';
import MessagerieP from './pages/MessagerieP';

// Pages admin
import AdminLogin from './components/layouts/Admins/AdminLogin';
import AdminDashboard from './pages/Admins/AdminDashboard';
import LoginMedecin from './pages/LoginMedecin';

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <MessageProvider>
          <div className="app-container">
            <Routes>
              {/* ============================================ */}
              {/* Routes Publiques (Accessibles à tous) */}
              {/* ============================================ */}
              <Route element={<AuthLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/user-type" element={<UserTypeSelection mode="signup" />} />
                <Route path="/signup-patient" element={<SignupPatient />} />
                <Route path="/signup-doctor" element={<SignupDoctor />} />
                
                <Route path="/login/selection" element={<UserTypeSelection mode="login" />} />
                <Route path="/login/:userType" element={<LoginPatient />} />
                 <Route path="/login/:userType" element={<LoginMedecin />} />
                <Route path="/login/patient" element={<LoginPatient />} />
                <Route path="/login/doctor" element={<LoginMedecin />} />
              </Route>

              {/* ============================================ */}
              {/* Routes d'Administration */}
              {/* ============================================ */}
              {/* Route de connexion admin (publique) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Routes admin protégées */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <AuthLayout adminMode={true} />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                {/* Ajouter ici les futures routes admin (ex: gestion des utilisateurs) */}
              </Route>

              {/* ============================================ */}
              {/* Routes Patients (Protégées par UserContext) */}
              {/* ============================================ */}
              <Route path="/dashboard/patient" element={<DashboardPatient />}>
                <Route path="rendez-vousP" element={<RendezVousP />} />
                <Route path="messagerie" element={<MessagerieP />} />
                <Route path="profil" element={<ProfilMedical />} />
              </Route>

              
              <Route path="/dashboard/doctor" element={<DashboardMedecin />}>
                <Route path="rendez-vousM" element={<RendezVousM />} />
                <Route path="messagerie" element={<Messagerie />} />
                <Route path="profil" element={<ProfilMedical />} />
              </Route>

              {/* ============================================ */}
              {/* Redirections et Gestion des Erreurs */}
              {/* ============================================ */}
               <Route path="/profil-medical" element={<ProfilMedical />} />
            <Route path="/rendez-vousP" element={<RendezVousP />} />
            <Route path= "/rendez-vousM" element={<RendezVousM />} />
            <Route path="/MessagerieM" element={<Messagerie />} />
            <Route path="/messagerie-P" element={<MessagerieP />} />
              
              {/* Route de fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </MessageProvider>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;