import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { FaUserCircle, FaTimesCircle } from 'react-icons/fa';
import RotatingText from './RotatingText';
import ChatBotAvatar from './ChatBotAvatar';
import IconosFlotantes from './IconosFlotantes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🚨 Simulación de credenciales de prueba
    if (username === 'medico' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('rol', 'medico');
      navigate('/home'); // 👉 médicos van a su interfaz
    } else if (username === 'auxiliar' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('rol', 'auxiliar');
      navigate('/auxiliar'); // 👉 auxiliares van a su interfaz
    } else {
      alert('❌ Credenciales incorrectas');
    }
  };

  return (
    <>
      <div className={styles.backgroundLogin}>
        <IconosFlotantes />
        <div className={styles.pageContainer}>
          <div className={styles.rotatingTextContainer}>
            <span className={styles.fixedText}>VITALTRACK&nbsp;</span>
            <RotatingText
              texts={[
                'Conectando esperanza...',
                'Cada dato cuenta una historia',
                'Juntos contra el cáncer',
                'Apoyo inteligente al tratamiento',
                'Optimización para salvar vidas',
                'Información precisa, decisiones certeras',
                'Cuidamos lo invisible',
                'Tecnología con propósito humano',
              ]}
              splitBy="none"
              rotationInterval={2500}
            />
          </div>

          <button
            className={styles.loginTopButton}
            onClick={() => setShowLogin(true)}
          >
            <FaUserCircle size={20} /> Iniciar sesión
          </button>

          {/* ✅ Modal de login */}
          {showLogin && (
            <div className={styles.overlay}>
              <div className={styles.loginWrapper}>
                <div className={styles.welcomeSection}>
                  <h2>¡Bienvenido a VitalTrack!</h2>
                </div>

                <div className={styles.formSection}>
                  <h2 className={styles.title}>Iniciar sesión</h2>
                  <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="username">Usuario</label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.links}>
                      <a href="/forgot-password" className={styles.link}>
                        Olvidé mi clave
                      </a>
                      <a href="/request-username" className={styles.link}>
                        Solicitar usuario
                      </a>
                    </div>

                    <button type="submit" className={styles.loginButton}>
                      Ingresar
                    </button>
                  </form>

                  <div className="text-end mt-3">
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowLogin(false)}
                    >
                      <FaTimesCircle size={18} /> Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <ChatBotAvatar />
      </div>
    </>
  );
};

export default Login;
