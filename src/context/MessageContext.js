import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const MessageContext = createContext();

// Provider pour envelopper toute l'application et donner accès au contexte
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Fonction pour ajouter un message
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook pour utiliser facilement le contexte
export const useMessages = () => {
  return useContext(MessageContext);
};
