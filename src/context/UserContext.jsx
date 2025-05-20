import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // 🔐 Connexion
const login = async (email, password, userType) => {
  let url;
  if (userType === 'medecin' || userType === 'doctor') {
    url = 'http://localhost:5000/api/medecin/login';
  } else if (userType === 'patient') {
    url = 'http://localhost:5000/api/auth/login/patient';
  } else {
    throw new Error("Type d'utilisateur inconnu");
  }

  try {
    const response = await axios.post(url, { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

 

  // 👤 Inscription patient
  const registerPatient = async (patientData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/patient/', patientData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // 👨‍⚕️ Inscription médecin
const registerDoctor = async (doctorData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/medecin/signup',
      doctorData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  // 🚪 Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      token,
      login,
      logout,
      registerPatient,
      registerDoctor,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
