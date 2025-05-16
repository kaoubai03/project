import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SidebarM from '../components/layouts/SidebarM';
import { 
  Menu,
  Search,
  ChevronDown,
  Paperclip,
  Send,
  X,
  FileText,
  Stethoscope,
  Upload,
  Clock,
  CheckCircle,
  MessageSquare,
  Bell,
  Tag,
  Download
} from 'lucide-react';
import './MessagerieM.css';

const MessagerieM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(6);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadCount, setUnreadCount] = useState(3);
  const [labelFilter, setLabelFilter] = useState(null);
  const [showLabelMenuForMessage, setShowLabelMenuForMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Données des labels
  const [labels] = useState([
    { id: 1, name: 'Urgent', color: '#e74c3c' },
    { id: 2, name: 'Ordonnance', color: '#3498db' },
    { id: 3, name: 'Compte rendu', color: '#2ecc71' },
    { id: 4, name: 'Suivi', color: '#f39c12' },
    { id: 5, name: 'Demande de RDV', color: '#9b59b6' },
    { id: 6, name: 'Envoyé au patient', color: '#1abc9c' }
  ]);

  // Données simulées des patients
  const patients = [
    { id: 1, name: 'Ikram Elharchaoui', avatar: 'IE', lastSeen: 'En ligne' },
    { id: 2, name: 'Youssef Kaoubai', avatar: 'YK', lastSeen: 'Hier 14:30' },
    { id: 3, name: 'Taha Elarfaoui', avatar: 'TE', lastSeen: 'Lundi 09:15' }
  ];

  useEffect(() => {
    // Simuler le chargement des conversations
    const demoConversations = [
      {
        id: 1,
        patientId: 1,
        lastMessage: 'Merci docteur pour vos conseils',
        lastMessageTime: '10:30',
        unread: false,
        messages: [
          { 
            id: 1, 
            sender: 'patient', 
            text: 'Bonjour docteur, je ne me sens pas bien', 
            time: '09:15', 
            date: '14/05/2025',
            labels: [1] // Urgent
          },
          { 
            id: 2, 
            sender: 'doctor', 
            text: 'Bonjour Jean, quels sont vos symptômes?', 
            time: '09:30', 
            date: '14/05/2025' 
          },
          { 
            id: 3, 
            sender: 'patient', 
            text: 'De la fièvre et des maux de tête', 
            time: '10:00', 
            date: '14/05/2025' 
          },
          { 
            id: 4, 
            sender: 'doctor', 
            text: 'Prenez du paracétamol et reposez-vous', 
            time: '10:15', 
            date: '14/05/2025',
            labels: [4] // Suivi
          },
          { 
            id: 5, 
            sender: 'patient', 
            text: 'Merci docteur pour vos conseils', 
            time: '10:30', 
            date: '14/05/2025' 
          }
        ]
      },
      {
        id: 2,
        patientId: 2,
        lastMessage: 'Les résultats sont normaux?',
        lastMessageTime: 'Hier 14:30',
        unread: true,
        messages: [
          { 
            id: 1, 
            sender: 'patient', 
            text: 'Docteur, j\'ai reçu mes résultats', 
            time: '14:00', 
            date: '13/05/2025',
            labels: [3] // Compte rendu
          },
          { 
            id: 2, 
            sender: 'patient', 
            text: 'Les résultats sont normaux?', 
            time: '14:30', 
            date: '13/05/2025' 
          }
        ]
      },
      {
        id: 3,
        patientId: 3,
        lastMessage: 'Je vous envoie mon ordonnance',
        lastMessageTime: 'Lundi 09:15',
        unread: false,
        messages: [
          { 
            id: 1, 
            sender: 'doctor', 
            text: 'Bonjour Paul, voici votre ordonnance', 
            time: '09:00', 
            date: '12/05/2025', 
            attachment: { 
              type: 'prescription', 
              name: 'Ordonnance_12-05-2025.pdf',
              size: '245 KB'
            },
            labels: [2] // Ordonnance
          },
          { 
            id: 2, 
            sender: 'patient', 
            text: 'Je vous envoie mon ordonnance', 
            time: '09:15', 
            date: '12/05/2025' 
          }
        ]
      }
    ];

    setConversations(demoConversations);
    if (demoConversations.length > 0) {
      setActiveConversation(demoConversations[0]);
      setMessages(demoConversations[0].messages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'doctor',
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
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(conversation.messages);
    
    // Marquer comme lu
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

  const handleAttachment = (type) => {
    setShowAttachmentMenu(false);
    switch(type) {
      case 'prescription':
        console.log("Redirection vers les ordonnances");
        break;
      case 'report':
        console.log("Redirection vers les comptes rendus");
        break;
      case 'device':
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const newMsg = {
              id: messages.length + 1,
              sender: 'doctor',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: new Date().toLocaleDateString('fr-FR'),
              attachment: {
                type: 'file',
                name: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB'
              }
            };
            setMessages([...messages, newMsg]);
          }
        };
        input.click();
        break;
      default:
        break;
    }
  };

  const toggleMessageLabel = (messageId, labelId) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        const currentLabels = msg.labels || [];
        const labelExists = currentLabels.some(l => l.id === labelId);
        
        return {
          ...msg,
          labels: labelExists 
            ? currentLabels.filter(l => l.id !== labelId)
            : [...currentLabels, labels.find(l => l.id === labelId)]
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: updatedMessages
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setShowLabelMenuForMessage(null);
  };

  const handleDownload = (attachment) => {
    console.log(`Téléchargement de ${attachment.name}`);
    // En production: window.open(`/api/download/${attachment.id}`, '_blank');
  };

  const getFilteredMessages = () => {
    if (!labelFilter) return messages;
    return messages.filter(msg => 
      msg.labels && msg.labels.some(l => l.id === labelFilter)
    );
  };

  const filteredConversations = conversations.filter(conv => {
    const patient = patients.find(p => p.id === conv.patientId);
    return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`messagerie-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <SidebarM
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        activeItem={activeNavItem}
        setActiveItem={setActiveNavItem}
      />
                
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1>Messagerie</h1>
          <div className="header-actions">
            <div className="notification-badge">
              <Bell size={20} />
              {unreadCount > 0 && <span>{unreadCount}</span>}
            </div>
            <div className="user-profile">
              <div className="avatar">DR</div>
            </div>
          </div>
        </header>

        <div className="messagerie-content">
          <div className={`conversations-list ${activeConversation ? 'active' : ''}`}>
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ChevronDown size={16} className="chevron-icon" />
            </div>

            <div className="label-filter">
              <select 
                value={labelFilter || ''}
                onChange={(e) => setLabelFilter(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Tous les messages</option>
                {labels.map(label => (
                  <option key={label.id} value={label.id}>
                    {label.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="conversations">
              {filteredConversations.map(conversation => {
                const patient = patients.find(p => p.id === conversation.patientId);
                return (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
                    onClick={() => selectConversation(conversation)}
                  >
                    <div className="patient-avatar">{patient.avatar}</div>
                    <div className="conversation-details">
                      <div className="patient-name">{patient.name}</div>
                      <div className="last-message">{conversation.lastMessage}</div>
                    </div>
                    <div className="conversation-meta">
                      <div className="last-time">{conversation.lastMessageTime}</div>
                      {conversation.unread && <div className="unread-badge"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {activeConversation && (
            <div className="chat-container">
              <div className="chat-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {patients.find(p => p.id === activeConversation.patientId)?.avatar}
                  </div>
                  <div>
                    <h3>{patients.find(p => p.id === activeConversation.patientId)?.name}</h3>
                    <p>{patients.find(p => p.id === activeConversation.patientId)?.lastSeen}</p>
                  </div>
                </div>
              </div>

              <div className="messages-container">
                {getFilteredMessages().map((message, index) => {
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
                                  <FileText size={20} />
                                ) : (
                                  <Paperclip size={20} />
                                )}
                              </div>
                              <div className="attachment-info">
                                <div className="attachment-name">{message.attachment.name}</div>
                                {message.attachment.size && (
                                  <div className="attachment-size">{message.attachment.size}</div>
                                )}
                                <div className="attachment-actions">
                                  <button 
                                    className="download-link"
                                    onClick={() => handleDownload(message.attachment)}
                                  >
                                    <Download size={14} /> Télécharger
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p>{message.text}</p>
                          )}
                          
                          {message.labels && message.labels.length > 0 && (
                            <div className="message-labels">
                              {message.labels.map(label => (
                                <span 
                                  key={label.id} 
                                  className="label-badge"
                                  style={{ backgroundColor: label.color }}
                                >
                                  {label.name}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="message-time">
                            {message.time}
                            <button 
                              className="add-label-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowLabelMenuForMessage(
                                  showLabelMenuForMessage === message.id ? null : message.id
                                );
                              }}
                            >
                              <Tag size={14} />
                            </button>
                            
                            {showLabelMenuForMessage === message.id && (
                              <div className="label-menu">
                                {labels.map(label => (
                                  <button
                                    key={label.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleMessageLabel(message.id, label.id);
                                    }}
                                    className={`label-option ${
                                      message.labels?.some(l => l.id === label.id) ? 'selected' : ''
                                    }`}
                                    style={{ '--label-color': label.color }}
                                  >
                                    {label.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="message-input-container">
                <div className="attachment-menu-container">
                  <button 
                    className="attachment-btn"
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  >
                    <Paperclip size={20} />
                  </button>
                  {showAttachmentMenu && (
                    <div className="attachment-menu">
                      <button onClick={() => handleAttachment('prescription')}>
                        <FileText size={16} /> Ordonnance
                      </button>
                      <button onClick={() => handleAttachment('report')}>
                        <Stethoscope size={16} /> Compte rendu
                      </button>
                      <button onClick={() => handleAttachment('device')}>
                        <Upload size={16} /> Depuis l'appareil
                      </button>
                    </div>
                  )}
                </div>
                <textarea
                  placeholder="Écrivez un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="send-btn" onClick={handleSendMessage}>
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagerieM;