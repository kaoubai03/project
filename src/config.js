import axios from 'axios';

// 1. Configuration de base
export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 secondes avant timeout
});

// 2. Intercepteur pour gérer les tokens automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Gestion centralisée des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Gérer la déconnexion si token invalide
      localStorage.removeItem('token');
      window.location.reload(); // Ou rediriger vers /login
    }
    return Promise.reject(error);
  }
);

// 4. Services Patients
export const patientService = {
  login: (email, password) => 
    api.post('/patient/login', { Email_P: email, Mot_de_passeP: password }),
  
  register: (userData) => 
    api.post('/patient/signup', {
      CIN_P: userData.cin,
      Nom_P: userData.nom,
      Prenom_P: userData.prenom,
      Email_P: userData.email,
      Mot_de_passeP: userData.password,
      Numero_P: userData.telephone,
      Date_de_naissance: userData.dateNaissance
    }),
  
  getProfile: () => api.get('/patient/me')
};

// 5. Services Médecins
export const medecinService = {
  login: (email, password) => 
    api.post('/medecin/login', { Email_M: email, Mot_de_passeM: password }),
  
  register: (userData) => 
    api.post('/medecin/signup', {
      CIN_M: userData.cin,
      Nom_M: userData.nom,
      Prenom_M: userData.prenom,
      Email_M: userData.email,
      Mot_de_passeM: userData.password,
      Numero_M: userData.telephone,
      Specialite: userData.specialite
    }),  
  
  getProfile: () => api.get('/medecin/me')
};

//service admin i added
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      Email_Admin: email,
      Mot_de_passe_Admin: password
    });
    
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminData', JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur de connexion';
  }
};

export const getAdminProfile = async () => {
  const token = localStorage.getItem('adminToken');
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur de récupération du profil';
  }
};