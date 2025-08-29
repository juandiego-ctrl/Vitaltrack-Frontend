import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // 👈 Agrega useLocation
import Menu from './Menu';
import styles from '../styles/AuthenticatedLayout.module.css';

function AuthenticatedLayout() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation(); // 👈 Hook para saber la ruta actual

  // 👇 esto te muestra siempre la ruta actual en la consola del navegador
  console.log("PATHNAME:", location.pathname);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.authenticatedLayout}>
      {/* SOLO muestra el menú si estás exactamente en /home */}
      {location.pathname === '/home' && <Menu />}

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}


export default AuthenticatedLayout;
