// src/components/AgendarCitas.js
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../styles/AgendarCitas.module.css";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function AgendaCitas() {
  const medicosDisponibles = ["Dr. Pérez", "Dra. Gómez", "Dr. Ramírez"];

  const [form, setForm] = useState({
    paciente: "",
    medico: "",
    fecha: "",
    hora: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [events, setEvents] = useState([
    { title: "Dr. Pérez - Cita con Juan", date: "2025-08-20T10:00:00", color: "#007bff" },
    { title: "Dra. Gómez - Control María", date: "2025-08-21T14:30:00", color: "#28a745" },
  ]);

  // Colores por médico
  const coloresMedicos = {
    "Dr. Pérez": "#007bff",
    "Dra. Gómez": "#28a745",
    "Dr. Ramírez": "#ff9800",
  };

  const [busqueda, setBusqueda] = useState({ medico: "", fecha: "" });
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  // Filtro de calendario
  const [filtroMedico, setFiltroMedico] = useState("todos");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: `${form.medico} - Paciente: ${form.paciente}`,
      date: `${form.fecha}T${form.hora}`,
      color: coloresMedicos[form.medico] || "#50302c",
    };

    setEvents([...events, newEvent]);

    alert(
      `✅ Cita agendada con ${form.medico} para ${form.paciente} el ${form.fecha} a las ${form.hora}`
    );

    setForm({ paciente: "", medico: "", fecha: "", hora: "" });
  };

  const handleBusquedaChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const buscarHorasDisponibles = () => {
    if (!busqueda.medico || !busqueda.fecha) {
      alert("⚠️ Selecciona un médico y una fecha.");
      return;
    }

    const todasLasHoras = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const ocupadas = events
      .filter(
        (ev) =>
          ev.title.includes(busqueda.medico) &&
          ev.date.startsWith(busqueda.fecha)
      )
      .map((ev) => ev.date.split("T")[1].substring(0, 5));

    const disponibles = todasLasHoras.filter((hora) => !ocupadas.includes(hora));

    setHorasDisponibles(disponibles);

    // Auto-rellena médico y fecha en el formulario
    setForm((prev) => ({ ...prev, medico: busqueda.medico, fecha: busqueda.fecha }));
  };

  // Cuando se selecciona una hora disponible
  const seleccionarHora = (hora) => {
    setForm((prev) => ({ ...prev, hora }));
  };

  // 🔥 Aquí cambiamos: ahora oculta eventos de otros médicos
  const eventosFiltrados =
    filtroMedico === "todos"
      ? events
      : events.filter((ev) => ev.title.includes(filtroMedico));

  return (
    <div className={styles.agendaContainer}>
      <h2 className={styles.agendaTitle}>📅 Agendamiento de Citas</h2>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        {/* Formulario Izquierdo */}
        <form onSubmit={handleSubmit} className={styles.agendaForm}>
          <div className="mb-3">
            <label className="form-label">Paciente:</label>
            <input
              type="text"
              className="form-control"
              name="paciente"
              value={form.paciente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Médico:</label>
            <select
              className="form-control"
              name="medico"
              value={form.medico}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecciona un médico --</option>
              {medicosDisponibles.map((med, idx) => (
                <option key={idx} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha:</label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Hora:</label>
            <input
              type="time"
              className="form-control"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.agendarBtn}>
            Agendar
          </button>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar Sesión
          </button>
        </form>

        {/* Buscador Derecho */}
        <div className={styles.agendaForm}>
          <h4 className="text-center mb-3">🔎 Buscar Horas Disponibles</h4>

          <div className="mb-3">
            <label className="form-label">Médico:</label>
            <select
              className="form-control"
              name="medico"
              value={busqueda.medico}
              onChange={handleBusquedaChange}
              required
            >
              <option value="">-- Selecciona un médico --</option>
              {medicosDisponibles.map((med, idx) => (
                <option key={idx} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha:</label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={busqueda.fecha}
              onChange={handleBusquedaChange}
              required
            />
          </div>

          <button
            type="button"
            className={styles.agendarBtn}
            onClick={buscarHorasDisponibles}
          >
            Consultar
          </button>

          {/* Resultados */}
          <div className="mt-3">
            <h5>Horas disponibles:</h5>
            {horasDisponibles.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {horasDisponibles.map((hora, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.horaBtn}
                    onClick={() => seleccionarHora(hora)}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted">No hay horarios disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {/* Filtro de Médicos para el Calendario */}
      <div
        className={styles.calendarFilter}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "20px 0" }}
      >
        <label>👨‍⚕️ Filtrar por médico: </label>
        <select
          value={filtroMedico}
          onChange={(e) => setFiltroMedico(e.target.value)}
          className="form-control"
          style={{ maxWidth: 250 }}
        >
          <option value="todos">Todos</option>
          {medicosDisponibles.map((med, idx) => (
            <option key={idx} value={med}>
              {med}
            </option>
          ))}
        </select>
      </div>

      {/* Calendario */}
      <div className={styles.calendarCard}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={eventosFiltrados}
          height="600px"
        />
      </div>
    </div>
  );
}

export default AgendaCitas;
