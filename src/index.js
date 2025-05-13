// src/main.jsx (ou index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { MessageProvider } from './context/MessageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
