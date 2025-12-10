import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/ChatBotAvatar.module.css';
import { FaTimes } from 'react-icons/fa';
import botAvatar from '../assets/images/chatbot.avif';

const ChatBotAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const inputRef = useRef(null);

  // Respuestas predefinidas organizadas por categorías
  const respuestasPredeterminadas = {
    saludos: {
      'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
      'buenos dias': '¡Buenos días! ¿Cómo puedo asistirte?',
      'buenas tardes': '¡Buenas tardes! ¿En qué puedo ayudarte?',
      'buenas noches': '¡Buenas noches! ¿Necesitas algo antes de dormir?',
      'gracias': '¡Con gusto! Estoy aquí para ayudarte.',
      'adios': '¡Hasta luego! Que tengas un buen día.',
    },
    citas: {
      'agendar cita': 'Puedes agendar una cita desde la sección "Mis citas" del menú principal.',
      'cambiar cita': 'Para cambiar una cita, accede a "Mis citas" y selecciona la opción de modificar.',
      'cancelar cita': 'Puedes cancelar tu cita desde "Mis citas" en el menú principal.',
      'recordatorio cita': 'Te recordaremos tu cita por email y en la app.',
    },
    resultados: {
      'resultados': 'Los resultados de tus exámenes estarán disponibles en tu correo en un plazo de 48 horas.',
      'ver resultados': 'Accede a tu correo para ver los resultados de tus exámenes.',
      'tiempo resultados': 'Los resultados suelen estar disponibles en 24-48 horas.',
    },
    tratamientos: {
      'tratamiento': 'Cada tratamiento es personalizado. Por favor consulta con tu especialista para más detalles.',
      'medicamentos': 'Tu lista de medicamentos está en la sección "Medicamentos" de tu perfil.',
      'dosis': 'Consulta las dosis recomendadas con tu médico especialista.',
      'efectos secundarios': 'Si experimentas efectos secundarios, contacta inmediatamente a tu médico.',
    },
    soporte: {
      'olvide mi contraseña': 'Puedes restablecer tu contraseña comunicandote con nuestra area de soporte al correo vitaltrack@gmail.com',
      'problema login': 'Si tienes problemas para iniciar sesión, contacta a soporte en vitaltrack@gmail.com',
      'ayuda': 'Estoy aquí para ayudarte. ¿Qué necesitas?',
      'contacto': 'Puedes contactarnos al correo vitaltrack@gmail.com o al teléfono 123-456-7890.',
      'horario de atención': 'Nuestro horario de atención es de lunes a viernes, de 8:00 AM a 6:00 PM.',
    },
  };

  const obtenerRespuesta = (pregunta) => {
    const preguntaNormalizada = pregunta.toLowerCase().trim();
    for (const categoria in respuestasPredeterminadas) {
      for (const clave in respuestasPredeterminadas[categoria]) {
        if (preguntaNormalizada.includes(clave)) {
          return respuestasPredeterminadas[categoria][clave];
        }
      }
    }
    return 'Lo siento, aún estoy aprendiendo. Por favor consulta con un especialista.';
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }]);
      setQuestion('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

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
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.avatar} onClick={() => setIsOpen(!isOpen)}>
        <img src={botAvatar} alt="Bot Avatar" />
      </div>

      {isOpen && (
        <div className={styles.chatBox} role="dialog" aria-labelledby="chat-header" aria-modal="true">
          <div className={styles.header} id="chat-header">
            <span>VitalBot</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              title="Cerrar chat"
            >
              <FaTimes />
            </button>
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
