import React from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaPills, FaBell, FaSignOutAlt, FaUserNurse } from "react-icons/fa";
import styles from "../styles/AuthenticatedLayout2.module.css";
import banner from "../assets/images/logo.png";

function AuxiliarLayout() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const rol = localStorage.getItem("rol");
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (rol !== "auxiliar") return <Navigate to="/no-autorizado" />;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={styles.authenticatedLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <FaUserNurse size={28} className={styles.sidebarIconLogo} />
          <h2>Auxiliar</h2>
        </div>

        <nav>
          <ul className={styles.sidebarMenu}>
            <li>
              <Link
                to="/auxiliar"
                className={location.pathname === "/auxiliar" ? styles.active : ""}
              >
                <FaCalendarAlt className={styles.icon} />
                Agendar Citas
              </Link>
            </li>
            <li>
              <Link
                to="/auxiliar/medicamentos"
                className={location.pathname === "/auxiliar/medicamentos" ? styles.active : ""}
              >
                <FaPills className={styles.icon} />
                Medicamentos
              </Link>
            </li>
            <li>
              <Link
                to="/auxiliar/recordatorios"
                className={location.pathname === "/auxiliar/recordatorios" ? styles.active : ""}
              >
                <FaBell className={styles.icon} />
                Recordatorios
              </Link>
            </li>
          </ul>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt className={styles.icon} /> Cerrar Sesión
        </button>
      </aside>

      {/* Contenedor principal */}
      <div className={styles.mainContent}>
        {/* Encabezado con logo */}
        <div className={styles.topHeader}>
          <img src={banner} alt="VitalTrack Banner" className={styles.bannerImage} />
        </div>

        {/* Contenido dinámico */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuxiliarLayout;
