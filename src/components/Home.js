import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { FaHeadset } from 'react-icons/fa';

import image4 from '../assets/images/image4.jpg';
import image5 from '../assets/images/image5.jpg';
import image6 from '../assets/images/image6.jpg';
import paso1 from '../assets/images/paso1.jpg';
import paso2 from '../assets/images/paso2.jpg';
import paso3 from '../assets/images/paso3.jpg';
import paso4 from '../assets/images/paso4.jpg';
import paso5 from '../assets/images/paso5.jpg';

import homenajeImage from '../assets/images/homenaje.png';
import IconosFlotantes from '../components/IconosFlotantes';


const Home = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);

  const welcomeImages = [image4, image5, image6];
  const welcomeTexts = [
    'La prevención es el primer paso hacia la salud.',
    'Controlar el cáncer empieza con una detección oportuna.',
    'VitalTrack te acompaña en el camino hacia el bienestar.',
  ];
  const steps = [paso1, paso2, paso3, paso4, paso5];

  const handleSupportClick = () => setShowSupportModal(true);
  const handleAcceptClick = () => setShowSupportModal(false);

  const prevStep = () =>
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  const nextStep = () =>
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWelcomeIndex((prev) => (prev + 1) % welcomeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [welcomeImages.length]);

  return (
    <>
    <div className={styles.backgroundWrapper}>
      <IconosFlotantes />
        <div  className={styles.contentWrapper}>
          <div className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>
              BIENVENIDO A <span className={styles.homeTitleHighlight}>VITALTRACK</span>
            </h1>

            {/* Carrusel de bienvenida */}
            <div className={styles.homeWelcomeSection}>
              <div className={styles.homeWelcomeCarousel}>
                {welcomeImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Bienvenida ${index + 1}`}
                    className={`${styles.welcomeImage} ${
                      currentWelcomeIndex === index ? styles.visible : styles.hidden
                    }`}
                  />
                ))}
              </div>
              <p className={styles.carouselCaption}>
                {welcomeTexts[currentWelcomeIndex]}
              </p>
            </div>

            {/* Sección: ¿Cómo manejar nuestra plataforma? */}
            <div className={styles.sectionBox}>
              <h2 className={styles.sectionTitle}>¿Cómo manejar nuestra plataforma?</h2>
              <div className={styles.homeEducationContent}>
                <div className={styles.educationText}>
                  En las imágenes se verá reflejado cómo manejar nuestro aplicativo.
                  Si presenta algún fallo o algo no olvides comunicarte con soporte.
                  <br />
                  <button className={styles.supportButton} onClick={handleSupportClick}>
                    <FaHeadset /> Soporte
                  </button>
                </div>
                <div className={styles.educationalCarousel}>
                  <button className={styles.arrowButton} onClick={prevStep}>‹</button>
                  <img
                    src={steps[currentStep]}
                    alt={`Paso ${currentStep + 1}`}
                    className={styles.stepImage}
                  />
                  <button className={styles.arrowButton} onClick={nextStep}>›</button>
                </div>
              </div>
            </div>

            {/* Modal Soporte */}
            {showSupportModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <h2 className={styles.modalTitle}>Soporte</h2>
                  <p>Si presenta fallos, errores o algún problema con nuestra página, comunícate a la siguiente línea:</p>
                  <p>WhatsApp: 3003334455</p>
                  <p>Correo electrónico: servicioalcliente@vitaltrack.com</p>
                  <button className={styles.acceptButton} onClick={handleAcceptClick}>Aceptar</button>
                </div>
              </div>
            )}

            {/* Documentos */}
            <div className={styles.sectionBox}>
              <h2 className={styles.sectionTitle}>Documentos de interés</h2>
              <div className={styles.documentsContainer}>
                {/* Documento 1 */}
                <div className={styles.documentCard}>
                  <h3>Ley 1384 de 2010</h3>
                  <p>La Ley 1384 de 2010, también conocida como la Ley Sandra Ceballos, establece las acciones para el control integral del cáncer en Colombia.</p>
                  <button className={styles.readMoreButton}
                    onClick={() =>
                      window.open(
                        'https://cuentadealtocosto.org/wp-content/uploads/2019/10/Cancer-Atencion-Integral-Ley-1384-2010.pdf',
                        '_blank'
                      )}>
                    Leer más
                  </button>
                </div>

                {/* Documento 2 */}
                <div className={styles.documentCard}>
                  <h3>Resolución 0247 de 2014</h3>
                  <p>La Resolución 0247 de 2014 del Ministerio de Salud y Protección Social de Colombia establece el reporte de pacientes con cáncer a la Cuenta de Alto Costo.</p>
                  <button className={styles.readMoreButton}
                    onClick={() =>
                      window.open(
                        'https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%200247%20de%202014.pdf',
                        '_blank'
                      )}>
                    Leer más
                  </button>
                </div>

                {/* Documento 3 */}
                <div className={styles.documentCard}>
                  <h3>Resolución 3339 de 2019</h3>
                  <p>Por la cual se establece e implementa el mecanismo de cálculo y distribución de los recursos de la UPC para las EPS de los regímenes Contributivo y Subsidiado.</p>
                  <button className={styles.readMoreButton}
                    onClick={() =>
                      window.open(
                        'https://www.minsalud.gov.co/Normatividad_Nuevo/Resoluci%C3%B3n%20No.%203339%20de%202019.pdf',
                        '_blank'
                      )}>
                    Leer más
                  </button>
                </div>
              </div>
            </div>


            {/* Homenaje al personal de salud */}
            <div className={styles.sectionBox}>
              <h2 className={styles.sectionTitle}>Homenaje al Personal de Salud</h2>
              <div className={styles.tributeContent}>
                <img
                  src={homenajeImage}
                  alt="Personal de salud"
                  className={styles.tributeImage}
                />
                <p className={styles.tributeText}>
                  Gracias a todos los profesionales que con vocación, entrega y esfuerzo luchan por la vida cada día. <br />
                  Su compromiso inspira a construir una salud digna, humana y solidaria.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              VitalTrack: Cada dato cuenta, cada vida importa. 🤍
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default Home;
