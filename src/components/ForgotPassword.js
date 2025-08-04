import React, { useState } from 'react';
import styles from '../styles/ForgotPassword.module.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setMessage('Los correos no coinciden');
      return;
    }

    setMessage(`Se ha enviado un recordatorio a ${email}`);
    setEmail('');
    setConfirmEmail('');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.overlay}>
        <div className={styles.loginWrapper}>
          <div className={styles.welcomeSection}>
            <h2>¡Recupera tu acceso!</h2>
            <p>Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu clave.</p>
          </div>
          <div className={styles.formSection}>
            <h2 className={styles.title}>Olvidé mi clave</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmEmail">Confirmar Correo</label>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.loginButton}>Enviar</button>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => (window.location.href = '/')}
                >
                  Volver
                </button>
              </div>
              {message && <p className={styles.successMessage}>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
