// src/components/RecordatoriosCitas.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/RecordatoriosCitas.module.css";

function RecordatoriosCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState({});
  const API_URL = "https://vitaltrack-backend-v5el.onrender.com";

  // Cargar todas las citas reales desde MongoDB
  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const res = await fetch(`${API_URL}/citas`);
        const data = await res.json();

        // Filtrar solo citas futuras o de hoy
        const hoy = new Date().setHours(0, 0, 0, 0);
        const citasFiltradas = data.filter((cita) => {
          const fechaCita = new Date(cita.fecha);
          return fechaCita >= hoy;
        });

        setCitas(citasFiltradas);
      } catch (err) {
        console.error("Error cargando citas:", err);
        alert("Error al cargar citas");
      }
    };

    cargarCitas();
  }, []);

  const enviarRecordatorio = async (cita) => {
    const datos = {
      paciente: cita.pacienteId || cita.paciente || 'Paciente',
      medico: cita.medicoId || cita.medico || 'Médico',
      fecha: cita.fecha.split('T')[0], // ← Aseguramos formato YYYY-MM-DD
      hora: cita.horaInicio || cita.hora,
      correo: cita.correoPaciente?.trim() // ← ESTE ES EL CAMPO REAL QUE TIENES
    };

    // Validación estricta
    if (!datos.correo || !datos.correo.includes('@') || datos.correo.length < 5) {
      alert(`Este paciente no tiene correo válido:\n${datos.paciente}\nCorreo: ${datos.correo || 'ninguno'}`);
      return;
    }

    // Bloqueamos el botón mientras envía
    setLoading(prev => ({ ...prev, [cita._id]: true }));

    try {
      const response = await fetch(`${API_URL}/citas/recordatorio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const result = await response.json();

      if (result.success) {
        alert(`Recordatorio enviado a ${datos.correo}`);
      } else {
        alert('Error del servidor: ' + (result.message || 'Desconocido'));
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(prev => ({ ...prev, [cita._id]: false }));
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.recordatoriosContainer}>
      <h2 className={styles.title}>Recordatorios de Citas</h2>
      <p>Total de citas próximas: <strong>{citas.length}</strong></p>

      {citas.length === 0 ? (
        <p>No hay citas próximas</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita._id}>
                <td>{cita.pacienteId || cita.paciente}</td>
                <td>{cita.medicoId || cita.medico}</td>
                <td>{formatearFecha(cita.fecha)}</td>
                <td>{cita.horaInicio || cita.hora}</td>
                <td>
                  <small>{cita.correoPaciente}</small>
                </td>
                <td>
                  <button
                    className={styles.btnRecordatorio}
                    onClick={() => enviarRecordatorio(cita)}
                    disabled={loading[cita._id]}
                    style={{
                      opacity: loading[cita._id] ? 0.6 : 1,
                      cursor: loading[cita._id] ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading[cita._id] ? "Enviando..." : "Enviar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecordatoriosCitas;