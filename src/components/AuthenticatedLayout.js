import React from 'react'; // Importa la librería React para utilizar JSX y construir componentes.
import { Navigate, Outlet } from 'react-router-dom'; // 'Navigate' redirige rutas y 'Outlet' renderiza rutas hijas.
import Menu from './Menu'; // Importa el componente del menú fijo.
import styles from '../styles/AuthenticatedLayout.module.css'; // Importa estilos específicos para este layout.

function AuthenticatedLayout() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Verifica si el usuario está autenticado desde localStorage.

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Si no está autenticado, redirige al inicio de sesión.
  }

  return (
    <div className={styles.authenticatedLayout}> {/* Contenedor principal del layout con clase estilizada. */}
      <Menu /> {/* Renderiza el menú fijo en la parte superior. */}
      <div className={styles.content}> {/* Contenedor para el contenido dinámico de las rutas hijas. */}
        <Outlet /> {/* Renderiza dinámicamente las rutas hijas definidas en React Router. */}
      </div>
    </div>
  );
}

export default AuthenticatedLayout; // Exporta este componente para su uso en otras partes del proyecto.