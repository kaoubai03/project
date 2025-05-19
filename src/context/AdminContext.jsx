// context/AdminContext.jsx
import { createContext, useContext, useState } from 'react';

// Création du contexte pour la gestion des admins
const AdminContext = createContext();

/**
 * Provider qui englobe l'application pour fournir le contexte d'administration
 * @param {Object} props - Les props du composant
 * @param {ReactNode} props.children - Les composants enfants à englober
 */
export const AdminProvider = ({ children }) => {
  // État pour stocker les informations de l'admin connecté
  const [admin, setAdmin] = useState(null);
  // État pour vérifier si l'admin est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Fonction de connexion simulée pour les administrateurs
   * @param {string} email - L'email de l'admin
   * @param {string} password - Le mot de passe de l'admin
   * @returns {Promise} Une promesse qui résout si la connexion réussit ou échoue
   */
  const loginAdmin = (email, password) => {
    return new Promise((resolve, reject) => {
      // Validation basique des champs
      if (!email || !password) {
        reject('Email et mot de passe sont requis');
        return;
      }

      // Simulation d'un appel API avec délai
      setTimeout(() => {
        // Vérification des identifiants (mock)
        if (email === 'admin@ehealth.com' && password === 'admin123') {
          const adminData = {
            email,
            role: 'admin', // Un seul rôle maintenant
            name: 'Administrateur Principal' // Nom par défaut
          };
          // Mise à jour des états
          setAdmin(adminData);
          setIsAuthenticated(true);
          resolve(adminData);
        } else {
          reject('Identifiants incorrects - Seul admin@ehealth.com est autorisé');
        }
      }, 500); // Délai réseau simulé
    });
  };

  /**
   * Fonction pour déconnecter l'admin
   * Réinitialise les états d'authentification
   */
  const logoutAdmin = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    // Ici vous pourriez ajouter une redirection ou nettoyer le localStorage
  };

  // Valeurs exposées par le contexte
  const contextValue = {
    admin,          // Les données de l'admin connecté
    isAuthenticated, // Booléen indiquant si l'admin est connecté
    loginAdmin,     // Fonction pour se connecter
    logoutAdmin,    // Fonction pour se déconnecter
    // Les fonctions pour gérer les sous-admins ont été retirées
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

/**
 * Hook personnalisé pour accéder au contexte d'administration
 * @returns {Object} Le contexte admin avec ses valeurs et méthodes
 */
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin doit être utilisé à l\'intérieur d\'un AdminProvider');
  }
  return context;
};