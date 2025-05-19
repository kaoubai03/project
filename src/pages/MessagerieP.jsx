import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SidebarP from '../components/layouts/sidebarP';
import { 
  Menu,
  Search,
  ChevronDown,
  Paperclip,
  Send,
  X,
  FileText,
  Download,
  Bell,
  MessageSquare,
  User,

} from 'lucide-react';
import './css/MessagerieP.css';

const MessagerieP = () => {
  // États principaux
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // États pour la sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(0);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Données simulées des médecins
  const doctors = [
    { id: 1, name: 'Dr. Dupont', specialty: 'Cardiologue', avatar: 'DD' },
    { id: 2, name: 'Dr. Martin', specialty: 'Généraliste', avatar: 'DM' },
    { id: 3, name: 'Dr. Lambert', specialty: 'Pédiatre', avatar: 'DL' }
  ];

  // Chargement initial des données
  useEffect(() => {
    // Simuler le chargement des conversations
    const demoConversations = [
      {
        id: 1,
        doctorId: 1,
        lastMessage: 'Vos résultats sont normaux, on en parle à votre prochain RDV',
        lastMessageTime: '14:30',
        lastMessageDate: '15/05/2025',
        unread: false,
        messages: [
          {
            id: 1,
            sender: 'patient',
            text: 'Bonjour docteur, j\'ai reçu mes résultats d\'analyse',
            time: '10:15',
            date: '15/05/2025'
          },
          {
            id: 2,
            sender: 'doctor',
            text: 'Je les ai reçus, je vous envoie mon avis rapidement',
            time: '11:45',
            date: '15/05/2025'
          },
          {
            id: 3,
            sender: 'doctor',
            text: 'Vos résultats sont normaux, on en parle à votre prochain RDV',
            time: '14:30',
            date: '15/05/2025',
            attachment: {
              type: 'report',
              name: 'Resultats_analyse_15-05-2025.pdf',
              size: '1.2 MB'
            }
          }
        ]
      },
      {
        id: 2,
        doctorId: 2,
        lastMessage: 'Voici votre ordonnance pour les médicaments',
        lastMessageTime: '09:00',
        lastMessageDate: '14/05/2025',
        unread: true,
        messages: [
          {
            id: 1,
            sender: 'patient',
            text: 'Bonjour Docteur, pourriez-vous me renouveler mon ordonnance?',
            time: '16:20',
            date: '13/05/2025'
          },
          {
            id: 2,
            sender: 'doctor',
            text: 'Bien sûr, je vous l\'envoie demain matin',
            time: '17:45',
            date: '13/05/2025'
          },
          {
            id: 3,
            sender: 'doctor',
            text: 'Voici votre ordonnance pour les médicaments',
            time: '09:00',
            date: '14/05/2025',
            attachment: {
              type: 'prescription',
              name: 'Ordonnance_14-05-2025.pdf',
              size: '0.8 MB'
            }
          }
        ]
      },
      {
        id: 3,
        doctorId: 3,
        lastMessage: 'Merci pour les documents, tout est en ordre',
        lastMessageTime: '12:15',
        lastMessageDate: '12/05/2025',
        unread: false,
        messages: [
          {
            id: 1,
            sender: 'patient',
            text: 'Je vous ai envoyé les documents demandés par mail',
            time: '10:00',
            date: '12/05/2025',
            attachment: {
              type: 'file',
              name: 'Documents_medicalux.zip',
              size: '4.5 MB'
            }
          },
          {
            id: 2,
            sender: 'doctor',
            text: 'Merci pour les documents, tout est en ordre',
            time: '12:15',
            date: '12/05/2025'
          }
        ]
      }
    ];

    setConversations(demoConversations);
    setUnreadCount(demoConversations.filter(c => c.unread).length);
  }, []);

  // Scroll vers le bas des messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sélection d'une conversation
  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(conversation.messages);
    
    // Marquer comme lu si nécessaire
    if (conversation.unread) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === conversation.id) {
          return { ...conv, unread: false };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setUnreadCount(prev => prev - 1);
    }
  };

  // Envoi d'un nouveau message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('fr-FR')
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Mettre à jour la conversation dans la liste
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          lastMessageTime: newMsg.time,
          lastMessageDate: newMsg.date,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  // Gestion de la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Envoi de fichier
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newMsg = {
          id: messages.length + 1,
          sender: 'patient',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('fr-FR'),
          attachment: {
            type: 'file',
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
          }
        };
        
        setMessages([...messages, newMsg]);
        
        // Mettre à jour la conversation
        const updatedConversations = conversations.map(conv => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              lastMessage: `Fichier: ${file.name}`,
              lastMessageTime: newMsg.time,
              lastMessageDate: newMsg.date,
              messages: [...conv.messages, newMsg]
            };
          }
          return conv;
        });
        
        setConversations(updatedConversations);
      }
    };
    input.click();
  };

  // Téléchargement de fichier
  const handleDownload = (attachment) => {
    console.log(`Téléchargement du fichier: ${attachment.name}`);
    // En production: window.open(`/api/download/${attachment.id}`, '_blank');
  };

  // Filtrage des conversations
  const filteredConversations = conversations.filter(conv => {
    const doctor = doctors.find(d => d.id === conv.doctorId);
    return doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`messagerie-patient-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <sidebarP
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeItem={activeNavItem}
        setActiveItem={setActiveNavItem}
      />
                
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      {/* Sidebar */}
    
      <div className="conversations-sidebar">
        <div className="sidebar-header">
            <button className="menu-toggle" onClick={toggleSidebar}>
                        <Menu size={24} />
                      </button>
          <h2>Messagerie</h2>
          <div className="notification-badge">
            <Bell size={20} />
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </div>
        </div>

        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.map(conversation => {
            const doctor = doctors.find(d => d.id === conversation.doctorId);
            return (
              <div
                key={conversation.id}
                className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
                onClick={() => selectConversation(conversation)}
              >
                <div className="doctor-avatar">{doctor.avatar}</div>
                <div className="conversation-details">
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-specialty">{doctor.specialty}</div>
                  <div className="last-message">{conversation.lastMessage}</div>
                </div>
                <div className="conversation-meta">
                  <div className="last-time">{conversation.lastMessageTime}</div>
                  <div className="last-date">{conversation.lastMessageDate}</div>
                  {conversation.unread && <div className="unread-dot"></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone de discussion */}
      <div className="chat-container">
        {activeConversation ? (
          <>
            <div className="chat-header">
              <div className="doctor-info">
                <div className="doctor-avatar">
                  {doctors.find(d => d.id === activeConversation.doctorId)?.avatar}
                </div>
                <div>
                  <h3>{doctors.find(d => d.id === activeConversation.doctorId)?.name}</h3>
                  <p>{doctors.find(d => d.id === activeConversation.doctorId)?.specialty}</p>
                </div>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message, index) => {
                const showDate = index === 0 || message.date !== messages[index - 1].date;
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <div className="message-date">
                        {message.date}
                      </div>
                    )}
                    <div className={`message ${message.sender}`}>
                      <div className="message-content">
                        {message.attachment ? (
                          <div className="attachment">
                            <div className="attachment-icon">
                              {message.attachment.type === 'prescription' ? (
                                <FileText size={24} />
                              ) : (
                                <Paperclip size={24} />
                              )}
                            </div>
                            <div className="attachment-info">
                              <div className="attachment-name">{message.attachment.name}</div>
                              <div className="attachment-size">{message.attachment.size}</div>
                              <button 
                                className="download-btn"
                                onClick={() => handleDownload(message.attachment)}
                              >
                                <Download size={16} /> Télécharger
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p>{message.text}</p>
                        )}
                        <div className="message-time">{message.time}</div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <button 
                className="attachment-btn"
                onClick={handleFileUpload}
              >
                <Paperclip size={20} />
              </button>
              <textarea
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="no-conversation-selected">
            <MessageSquare size={48} />
            <h3>Sélectionnez une conversation</h3>
            <p>Choisissez une discussion dans la liste pour commencer à échanger</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagerieP;