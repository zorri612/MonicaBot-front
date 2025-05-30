import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import './chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');
  const chatBoxRef = useRef(null);

  

  useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTo({
  top: chatBoxRef.current.scrollHeight,
  behavior: 'smooth'
});
  }
}, [messages]);

  useEffect(() => {
 
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error obteniendo historial', err);
      }
    };

    fetchHistory();
  }, []);

  const handleReset = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chat/reset', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      alert(data.message);
      setMessages([]);
    } catch (err) {
      console.error('Error al reiniciar historial:', err);
      alert('No se pudo reiniciar la conversación');
    }
  };

  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: 'user', message: input };
    setMessages([...messages, newMessage]);
    setInput('');
    

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/send',
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
        
      );
       

        

      const botResponse = { sender: 'bot', message: res.data.message };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error enviando mensaje', err);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/export',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      alert('Error enviando historial');
    }
  };

  return (
    <div className="chat-container">
      <header>
        <h2>Mónica, tu ferretera de confianza (o desconfianza)</h2>
        <button className="reset-btn" onClick={handleReset}>Reiniciar conversación</button>
      </header>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.message}
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="sendmail-btn" onClick={handleExport}>Enviar historial al correo</button>
       
          <button className="logout-btn" ><a href="/"> Cerrar sesión</a> </button>
       
      </div>
    </div>
  );
}

export default Chat;
