import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import styles from "../styles/AuthenticatedLayout.module.css";

function MedicoLayout() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const rol = localStorage.getItem("rol");
  const location = useLocation(); // 👈 aquí traemos la ruta actual

  if (!isAuthenticated) return <Navigate to="/" />;
  if (rol !== "medico") return <Navigate to="/no-autorizado" />;

  return (
    <div className={styles.authenticatedLayout}>
      {/* Solo muestra el menú si la ruta es exactamente /home */}
      {location.pathname === "/home" && <Menu />}

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default MedicoLayout;
