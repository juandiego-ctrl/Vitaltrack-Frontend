// src/components/AgendarCitas.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../styles/AgendarCitas.module.css";

function AgendaCitas() {
  const API_BASE_URL = "https://vitaltrack-backend-v5el.onrender.com";

  const [form, setForm] = useState({
    paciente: "",
    medico: "",
    fecha: "",
    hora: "",
    correo: "",
  });

  const [events, setEvents] = useState([]);
  const [busqueda, setBusqueda] = useState({ medico: "", fecha: "" });
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [filtroMedico] = useState("todos");

  // Estado para el modal
  const [modalEditar, setModalEditar] = useState({
    visible: false,
    citaId: null,
    horaActual: "",
    medico: "",
    paciente: "",
  });

  const medicosDisponibles = ["Dr. Pérez", "Dra. Gómez", "Dr. Ramírez"];

  const coloresMedicos = {
    "Dr. Pérez": "#007bff",
    "Dra. Gómez": "#28a745",
    "Dr. Ramírez": "#ff9800",
  };

  // ------------------------------------------------------------------
  // 1️⃣ Cargar citas reales desde MongoDB
  // ------------------------------------------------------------------
  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/citas`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        console.log("DEBUG: respuesta /citas:", data);

        const nombreDisplay = (field) => {
          if (!field) return "";
          if (typeof field === "object") {
            return field.nombre || field.name || field.nombreCompleto || "";
          }
          return field;
        };

        const eventosMongo = data.map((cita) => {
          let fechaISO = "";
          if (!cita.fecha) {
            fechaISO = new Date().toISOString().slice(0, 10);
          } else {
            const f = new Date(cita.fecha);
            if (!isNaN(f)) {
              fechaISO = f.toISOString().slice(0, 10);
            } else {
              fechaISO = String(cita.fecha).slice(0, 10);
            }
          }

          const hora =
            cita.horaInicio ||
            cita.hora ||
            (cita.horaInicio && cita.horaInicio.substring(0, 5)) ||
            "09:00";

          const pacienteNombre =
            nombreDisplay(cita.paciente) ||
            nombreDisplay(cita.pacienteId) ||
            nombreDisplay(cita.pacienteId?.nombre) ||
            nombreDisplay(cita.pacienteNombre) ||
            "Paciente";

          const medicoNombre =
            nombreDisplay(cita.medico) ||
            nombreDisplay(cita.medicoId) ||
            nombreDisplay(cita.medicoId?.nombre) ||
            nombreDisplay(cita.medicoNombre) ||
            "Médico";

          const startTime = `${fechaISO}T${hora}:00`;

          return {
            id: cita._id || `${fechaISO}-${hora}-${Math.random().toString(36).slice(2, 7)}`,
            title: `${medicoNombre} - ${pacienteNombre}`,
            start: startTime,
            color: cita.color || "#50302c",
            extendedProps: {
              _id: cita._id,
              citaId: cita._id,
              horaInicio: hora,
              fecha: fechaISO,
              medico: medicoNombre,
              paciente: pacienteNombre,
              raw: cita,
            },
          };
        });

        console.log("DEBUG: eventos procesados:", eventosMongo);
        setEvents(eventosMongo);
      } catch (err) {
        console.error("Error cargando citas:", err);
      }
    };

    cargarCitas();
  }, []);

  // ---------------------------------------------------------
  // 🔥 Editar cita - Abre el modal
  // ---------------------------------------------------------
  const editarCita = (eventInfo) => {
    const citaId = eventInfo.extendedProps?._id || eventInfo.extendedProps?.citaId;
    const horaActual = eventInfo.extendedProps?.horaInicio || "09:00";
    const medico = eventInfo.extendedProps?.medico || "";
    const paciente = eventInfo.extendedProps?.paciente || "";

    console.log("DEBUG editarCita - citaId:", citaId);

    if (!citaId) {
      alert("❌ Error: No se pudo obtener el ID de la cita");
      return;
    }

    setModalEditar({
      visible: true,
      citaId,
      horaActual,
      medico,
      paciente,
    });
  };

  // ---------------------------------------------------------
  // 💾 Guardar edición desde el modal
  // ---------------------------------------------------------
  const guardarEdicion = async () => {
    const nuevaHora = document.getElementById("nuevaHora").value;

    if (!nuevaHora) {
      alert("⚠️ Debes ingresar una hora válida");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/citas/${modalEditar.citaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horaInicio: nuevaHora }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();

      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === modalEditar.citaId
            ? {
              ...ev,
              start: `${data.fecha}T${data.horaInicio}:00`,
              title: `${data.medico || ev.extendedProps.medico} - ${data.paciente || ev.extendedProps.paciente}`,
              extendedProps: {
                ...ev.extendedProps,
                horaInicio: data.horaInicio,
              },
            }
            : ev
        )
      );

      alert("✅ Cita actualizada correctamente");
      setModalEditar({ visible: false, citaId: null, horaActual: "", medico: "", paciente: "" });
    } catch (error) {
      console.error("Error editando cita:", error);
      alert("❌ No se pudo editar la cita: " + error.message);
    }
  };

  // ---------------------------------------------------------
  // 🔥 Cancelar cita
  // ---------------------------------------------------------
  const cancelarCita = async (eventInfo) => {
    const citaId = eventInfo.extendedProps?._id || eventInfo.extendedProps?.citaId;
    const tituloEvento = eventInfo.title || "esta cita";

    console.log("DEBUG cancelarCita - citaId:", citaId);

    if (!citaId) {
      alert("❌ Error: No se pudo obtener el ID de la cita");
      console.error("Evento completo:", eventInfo);
      return;
    }

    const confirmar = window.confirm(
      `¿Seguro que deseas CANCELAR la cita de ${tituloEvento}?`
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_BASE_URL}/citas/${citaId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      setEvents((prev) => prev.filter((ev) => ev.id !== citaId));

      alert("🗑️ Cita eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando cita:", error);
      alert("❌ No se pudo cancelar la cita: " + error.message);
    }
  };

  // ---------------------------------------------------------
  // 🔥 Al hacer click en evento
  // ---------------------------------------------------------
  const handleEventClick = (clickInfo) => {
    console.log("DEBUG handleEventClick - clickInfo:", clickInfo);

    const opcion = prompt(
      "Seleccione una opción:\n1 - Editar cita\n2 - Cancelar cita\n\nIngrese número:"
    );

    if (opcion === "1") {
      editarCita({
        extendedProps: clickInfo.event.extendedProps,
        title: clickInfo.event.title,
      });
    } else if (opcion === "2") {
      cancelarCita({
        extendedProps: clickInfo.event.extendedProps,
        title: clickInfo.event.title,
      });
    }
  };

  // ------------------------------------------------------------------
  // 2️⃣ Guardar nueva cita en MongoDB
  // ------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCita = {
      pacienteId: form.paciente,
      medicoId: form.medico,
      fecha: form.fecha,
      horaInicio: form.hora,
      horaFin: form.hora,
      motivo: "Consulta médica",
      correoPaciente: form.correo,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCita),
      });

      const data = await response.json();

      setEvents([
        ...events,
        {
          id: data._id,
          title: `${data.medicoId} - Paciente: ${data.pacienteId}`,
          start: `${data.fecha}T${data.horaInicio}:00`,
          color: coloresMedicos[data.medicoId] || "#50302c",
          extendedProps: {
            _id: data._id,
            citaId: data._id,
            horaInicio: data.horaInicio,
            fecha: data.fecha,
            medico: data.medicoId,
            paciente: data.pacienteId,
          },
        },
      ]);

      alert("✅ Cita guardada");

      setForm({ paciente: "", medico: "", fecha: "", hora: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("❌ No se pudo guardar la cita");
    }
  };

  // ------------------------------------------------------------------
  // 3️⃣ Buscar horas disponibles
  // ------------------------------------------------------------------
  const buscarHorasDisponibles = () => {
    if (!busqueda.medico || !busqueda.fecha) {
      alert("Selecciona médico y fecha");
      return;
    }

    const horasBase = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const ocupadas = events
      .filter(
        (ev) =>
          ev.title.includes(busqueda.medico) &&
          ev.start.startsWith(busqueda.fecha)
      )
      .map((e) => e.start.split("T")[1].substring(0, 5));

    const libres = horasBase.filter((h) => !ocupadas.includes(h));

    setHorasDisponibles(libres);

    setForm((prev) => ({
      ...prev,
      medico: busqueda.medico,
      fecha: busqueda.fecha,
    }));
  };

  const seleccionarHora = (hora) => setForm((prev) => ({ ...prev, hora }));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBusquedaChange = (e) =>
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });

  const eventosFiltrados =
    filtroMedico === "todos"
      ? events
      : events.filter((ev) => ev.title.includes(filtroMedico));

  return (
    <div className={styles.agendaContainer}>
      <h2 className={styles.agendaTitle}>📅 Agendamiento de Citas</h2>

      {/* 🎨 Modal para editar */}
      {modalEditar.visible && (
        <div className={styles.modalOverlay} onClick={() => setModalEditar({ ...modalEditar, visible: false })}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>✏️ Editar Cita</h3>
              <button
                className={styles.modalClose}
                onClick={() => setModalEditar({ ...modalEditar, visible: false })}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalInfo}>
                <p><strong>👨‍⚕️ Médico:</strong> {modalEditar.medico}</p>
                <p><strong>👤 Paciente:</strong> {modalEditar.paciente}</p>
                <p><strong>🕐 Hora actual:</strong> {modalEditar.horaActual}</p>
              </div>

              <label className={styles.modalLabel}>Nueva hora:</label>
              <input
                id="nuevaHora"
                type="time"
                defaultValue={modalEditar.horaActual}
                className={styles.modalInput}
              />
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.modalBtnCancel}
                onClick={() => setModalEditar({ ...modalEditar, visible: false })}
              >
                Cancelar
              </button>
              <button
                className={styles.modalBtnSave}
                onClick={guardarEdicion}
              >
                💾 Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.agendaForm}>
          <label>Paciente:</label>
          <input
            type="text"
            name="paciente"
            className="form-control"
            value={form.paciente}
            onChange={handleChange}
            required
          />

          <label>Médico:</label>
          <select
            name="medico"
            className="form-control"
            value={form.medico}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona --</option>
            {medicosDisponibles.map((m, idx) => (
              <option key={idx} value={m}>
                {m}
              </option>
            ))}
          </select>

          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={form.fecha}
            onChange={handleChange}
            required
          />

          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            className="form-control"
            value={form.hora}
            onChange={handleChange}
            required
          />

          <label>Correo del paciente:</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            placeholder="paciente@gmail.com"
            value={form.correo || ""}
            onChange={handleChange}
            required
          />

          <button className={styles.agendarBtn}>Agendar</button>
        </form>

        {/* Buscador horas */}
        <div className={styles.agendaForm}>
          <h4>Buscar horas disponibles</h4>

          <label>Médico:</label>
          <select
            name="medico"
            className="form-control"
            value={busqueda.medico}
            onChange={handleBusquedaChange}
          >
            <option value="">-- Selecciona --</option>
            {medicosDisponibles.map((m, idx) => (
              <option key={idx} value={m}>
                {m}
              </option>
            ))}
          </select>

          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={busqueda.fecha}
            onChange={handleBusquedaChange}
          />

          <button
            type="button"
            className={styles.agendarBtn}
            onClick={buscarHorasDisponibles}
          >
            Consultar
          </button>

          <h5>Horas disponibles:</h5>
          {horasDisponibles.map((h, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.horaBtn}
              onClick={() => seleccionarHora(h)}
            >
              {h}
            </button>
          ))}
        </div>
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
          eventClick={handleEventClick}
          height="600px"
        />
      </div>
    </div>
  );
}

export default AgendaCitas;