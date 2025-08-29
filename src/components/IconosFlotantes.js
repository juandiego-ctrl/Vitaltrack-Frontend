// src/components/IconosCarrusel.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserMd,
  FaHeartbeat,
  FaSyringe,
  FaStethoscope,
  FaVials
} from 'react-icons/fa';
import styles from '../styles/IconosFlotantes.module.css';

const iconos = [<FaUserMd />, <FaHeartbeat />, <FaSyringe />, <FaStethoscope />, <FaVials />];

const CarruselFila = ({ reverse = false }) => {
  const baseIcons = Array(50).fill(iconos).flat(); // Duplicamos más íconos para evitar huecos
  const totalIcons = [...baseIcons, ...baseIcons]; // Doble fila para animación continua

  return (
    <motion.div
      className={`${styles.row} ${reverse ? styles.reverse : ''}`}
      animate={{ x: reverse ? ['100%', '-100%'] : ['-100%', '100%'] }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 1000 // Ajusta la velocidad: más alto = más lento
      }}
    >
      {totalIcons.map((icon, i) => (
        <div key={i} className={styles.icon}>
          {icon}
        </div>
      ))}
    </motion.div>
  );
};

const IconosFlotantes = () => {
  const [filas, setFilas] = useState(0);

useEffect(() => {
  const filaHeight = 32;
  const alturaPantalla = window.innerHeight;
  const cantidad = Math.ceil(alturaPantalla / filaHeight);
  setFilas(cantidad);
}, []);


  return (
    <div className={styles.container}>
      {Array.from({ length: filas }).map((_, i) => (
        <CarruselFila key={i} reverse={i % 2 === 0} />
      ))}
    </div>
  );
};

export default IconosFlotantes;
