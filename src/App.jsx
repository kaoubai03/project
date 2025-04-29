import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserTypeSelection from './pages/UserTypeSelection';
import SignupPatient from './pages/SignupPatient';
import SignupDoctor from './pages/SignupDoctor';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthLayout from './components/layouts/AuthLayout';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-type" element={<UserTypeSelection />} />
            <Route path="/signup-patient" element={<SignupPatient />} />
            <Route path="/signup-doctor" element={<SignupDoctor />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
