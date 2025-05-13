import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock authentication functions
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      console.log('Logging in with:', email, password);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, create a mock user
      const mockUser = {
        id: '123456',
        email,
        fullName: 'Demo User',
        role: email.includes('doctor') ? 'doctor' : 'patient',
        isVerified: email.includes('doctor') ? false : true,
        ...(email.includes('doctor') ? { professionalNumber: 'DOC12345' } : {})
      };
      
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const registerPatient = async (userData) => {
    try {
      console.log('Registering patient:', userData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(36).slice(2),
        email: userData.email,
        fullName: userData.fullName,
        role: 'patient',
        isVerified: true
      };
      
      setUser(mockUser);
      return mockUser;  
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const registerDoctor = async (userData) => {
    try {
      console.log('Registering doctor:', userData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(36).slice(2),
        email: userData.email,
        fullName: userData.fullName,
        role: 'doctor',
        isVerified: false,
        professionalNumber: userData.professionalNumber,
        documentUrl: userData.document ? URL.createObjectURL(userData.document) : undefined
      };
      
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout,
        registerPatient,
        registerDoctor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};