import React, { useState } from 'react';
import styles from '../styles/Menu.module.css';
import { useNavigate } from 'react-router-dom';

import { FaHome, FaFileUpload, FaUser, FaNotesMedical } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import banner from '../assets/images/logo.png';

const Menu = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const handleMouseEnter = (item) => setActiveItem(item);
  const handleMouseLeave = () => setActiveItem(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className={styles.topHeader}>
      <header>
        {/* Logo centrado */}
        <div>
          <img src={banner} alt="VitalTrack Banner" className={styles.bannerImage} />
        </div>

        {/* Menú vertical en la parte superior derecha */}
        <nav className={styles.menuContainer}>
          <div
            className={styles.menuItem}
            onClick={() => navigate('/home')}
            onMouseEnter={() => setActiveItem('inicio')}
          >
            {activeItem === 'inicio' && <div className={styles.activeBubble} />}
            <FaHome size={30} />
          </div>

          <div
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter('cargue')}
            onMouseLeave={handleMouseLeave}
          >
            {activeItem === 'cargue' && <div className={styles.activeBubble} />}
            <FaFileUpload size={30} />
            {activeItem === 'cargue' && (
              <ul className={styles.subMenu}>
                <li onClick={() => navigate('/home/cargue-cancer')}>
                  Cargue masivo
                </li>
              </ul>
            )}
          </div>

          <div
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter('cuentas')}
            onMouseLeave={handleMouseLeave}
          >
            {activeItem === 'cuentas' && <div className={styles.activeBubble} />}
            <FaNotesMedical size={30} />
            {activeItem === 'cuentas' && (
              <ul className={styles.subMenu}>
                <li onClick={() => navigate('/home/cancer-actual')}>
                  Edición de registros
                </li>
              </ul>
            )}
          </div>

          <div
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter('crear usuario')}
            onMouseLeave={handleMouseLeave}
          >
            {activeItem === 'crear usuario' && <div className={styles.activeBubble} />}
            <FaUser size={30} />
            {activeItem === 'crear usuario' && (
              <ul className={styles.subMenu}>
                <li onClick={() => navigate('/home/crear-usuario')}>
                  Crear Usuario
                </li>
              </ul>
            )}
          </div>

          <div
            className={styles.menuItem}
            onMouseEnter={() => handleMouseEnter('perfil')}
            onMouseLeave={handleMouseLeave}
          >
            {activeItem === 'perfil' && <div className={styles.activeBubble} />}
            <IoIosLogOut size={35} />
            {activeItem === 'perfil' && (
              <ul className={styles.subMenu}>
                <li onClick={handleLogout}>Cerrar sesión</li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Menu;
