import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/ChatBotAvatar.module.css';
import { FaTimes } from 'react-icons/fa';
import botAvatar from '../assets/images/chatbot.avif';

const ChatBotAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const inputRef = useRef(null);

  // Respuestas predefinidas según palabras clave o preguntas exactas
  const respuestasPredeterminadas = {
    'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
    'agendar cita': 'Puedes agendar una cita desde la sección "Mis citas" del menú principal.',
    'resultados': 'Los resultados de tus exámenes estarán disponibles en tu perfil en un plazo de 48 horas.',
    'tratamiento': 'Cada tratamiento es personalizado. Por favor consulta con tu especialista para más detalles.',
    'gracias': '¡Con gusto! Estoy aquí para ayudarte.',
  };

  const obtenerRespuesta = (pregunta) => {
    const preguntaNormalizada = pregunta.toLowerCase().trim();
    for (const clave in respuestasPredeterminadas) {
      if (preguntaNormalizada.includes(clave)) {
        return respuestasPredeterminadas[clave];
      }
    }
    return 'Lo siento, aún estoy aprendiendo. Por favor consulta con un especialista.';
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }]);
      setQuestion('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleAsk = () => {
    if (!question.trim() || loading || cooldown) return;

    const userMessage = { sender: 'user', text: question };
    const botReply = obtenerRespuesta(question);

    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setCooldown(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setLoading(false);
    }, 800); // Simula tiempo de respuesta

    setTimeout(() => setCooldown(false), 1500); // Enfría para evitar spam
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAsk();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.avatar} onClick={() => setIsOpen(!isOpen)}>
        <img src={botAvatar} alt="Bot Avatar" />
      </div>

      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <span>VitalBot</span>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.message}>Escribiendo...</div>}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={question}
              ref={inputRef}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || cooldown}
            />
            <button onClick={handleAsk} disabled={loading || cooldown}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotAvatar;
