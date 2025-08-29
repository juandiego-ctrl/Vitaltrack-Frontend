import React, { useState } from "react";
import styles from "../styles/RecordatoriosCitas.module.css";


function RecordatoriosCitas() {
  // Citas de ejemplo (en práctica vendrían desde backend)
  const [citas] = useState([
    { id: 1, paciente: "Juan Pérez", medico: "Dr. Gómez", fecha: "2025-08-28", hora: "10:00" },
    { id: 2, paciente: "María López", medico: "Dra. Ruiz", fecha: "2025-08-28", hora: "14:30" },
    { id: 3, paciente: "Carlos Díaz", medico: "Dr. Pérez", fecha: "2025-08-29", hora: "09:00" },
  ]);

  const enviarRecordatorio = (cita) => {
    // Aquí conectas con backend (ej: Twilio, WhatsApp API)
    alert(
      `✅ Recordatorio enviado a ${cita.paciente} para su cita con ${cita.medico} el ${cita.fecha} a las ${cita.hora}`
    );
  };

  return (
    <>
      {/* Tabla de recordatorios */}
      <div className={styles.recordatoriosContainer}>
        <h2 className={styles.title}>📢 Recordatorios de Citas</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>
                  <button
                    className={styles.btnRecordatorio}
                    onClick={() => enviarRecordatorio(cita)}
                  >
                    Enviar Recordatorio
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecordatoriosCitas;
