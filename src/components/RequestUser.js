import React, { useState } from 'react';
import styles from '../styles/RequestUser.module.css';
import Carousel from './Carousel';

const RequestUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    documentType: '',
    documentNumber: '',
    userType: '',
    ipsCode: '',
    eps: '',
    ipsName: '',
    email: '',
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <div className={styles.pageContainer}>
      <Carousel />
      <div className={styles.overlay}>
        <div className={styles.loginWrapper}>
          {messageSent ? (
            <div className={styles.centerMessageBox}>
              <p className={styles.successMessage}>
                El correo de solicitud de usuario fue enviado con éxito.<br />
                Debe esperar a que le asignen su usuario para ingresar a VitalTrack.
              </p>
              <button onClick={() => (window.location.href = '/')}>Volver</button>
            </div>
          ) : (
            <>
              <div className={styles.welcomeSection}>
                <h2>¡Solicita tu acceso!</h2>
                <p>Completa los datos requeridos para gestionar tu usuario en la plataforma VitalTrack.</p>
              </div>
              <div className={styles.formSection}>
                <h2 className={styles.title}>Solicitar Usuario</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="fullName">Nombre Completo</label>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="documentType">Tipo de Documento</label>
                      <select id="documentType" name="documentType" value={formData.documentType} onChange={handleInputChange} required>
                        <option value="">Seleccione...</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="documentNumber">Número de Documento</label>
                      <input type="text" id="documentNumber" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="userType">Tipo de Usuario</label>
                      <input type="text" id="userType" name="userType" value={formData.userType} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="ipsCode">Código Habilitación IPS</label>
                      <input type="text" id="ipsCode" name="ipsCode" value={formData.ipsCode} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="eps">EPS</label>
                      <input type="text" id="eps" name="eps" value={formData.eps} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="ipsName">Nombre IPS</label>
                      <input type="text" id="ipsName" name="ipsName" value={formData.ipsName} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Correo Electrónico</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.send}>Enviar</button>
                    <button type="button" className={styles.back} onClick={() => (window.location.href = '/')}>Volver</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestUser;
