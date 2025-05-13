import React, { useState } from 'react';
import './Messagerie.css';

const Messagerie = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: 'Bonjour, comment ça va ?' },
    { id: 2, content: 'Ça va bien, merci ! Et toi ?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), content: newMessage.trim() }]);
    setNewMessage('');
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const editMessage = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  const saveEdit = () => {
    setMessages(messages.map(msg => msg.id === editId ? { ...msg, content: editContent } : msg));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditContent('');
  };

  return (
    <div className="messagerie">
      <h2>Messagerie</h2>

      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            {editId === msg.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="actions">
                  <button onClick={saveEdit}>Enregistrer</button>
                  <button onClick={cancelEdit} className="cancel">Annuler</button>
                </div>
              </>
            ) : (
              <>
                <p>{msg.content}</p>
                <div className="actions">
                  <button onClick={() => editMessage(msg.id, msg.content)}>Modifier</button>
                  <button onClick={() => deleteMessage(msg.id)} className="delete">Supprimer</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="composer">
        <textarea
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Messagerie;
