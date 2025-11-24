import styles from "../styles/Medicamentos.module.css";
import React, { useState } from "react";


function Medicamentos() {
  const [form, setForm] = useState({
    paciente: "",
    medicamento: "",
    frecuencia: "",
    fechaInicio: "",
    fechaFin: "",
    telefono: "",
    correo: "",
  });

  const [lista, setLista] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://vitaltrack-backend-v5el.onrender.com/medicamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al guardar");

      alert(`✅ Medicamento registrado y recordatorios activados para ${form.paciente}`);
      
      // Opcional: agregar localmente también
      setLista([...lista, form]);

      // Reiniciar formulario
      setForm({
        paciente: "",
        medicamento: "",
        frecuencia: "",
        fechaInicio: "",
        fechaFin: "",
        telefono: "",
        correo: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar medicamento");
    }
  };


  return (
    <div className={styles.medicamentosContainer}>
      <h2 className={styles.title}>💊 Registro de Medicamentos</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
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
          <label className="form-label">Medicamento:</label>
          <input
            type="text"
            className="form-control"
            name="medicamento"
            value={form.medicamento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Frecuencia:</label>
          <select
            className="form-control"
            name="frecuencia"
            value={form.frecuencia}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona frecuencia --</option>
            <option value="Cada 8 horas">Cada 8 horas</option>
            <option value="Cada 12 horas">Cada 12 horas</option>
            <option value="Cada 24 horas">Cada 24 horas</option>
            <option value="1 vez al día">1 vez al día</option>
            <option value="2 veces al día">2 veces al día</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de fin:</label>
          <input
            type="date"
            className="form-control"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono (WhatsApp):</label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+573001234567"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo del paciente:</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <button type="submit" className={styles.btnGuardar}>
          Guardar
        </button>
      </form>

      {/* Listado de medicamentos guardados */}
      <div className={styles.listado}>
        <h3>📋 Medicamentos registrados</h3>
        {lista.length === 0 ? (
          <p className="text-muted">Aún no se han registrado medicamentos.</p>
        ) : (
          <ul>
            {lista.map((med, idx) => (
              <li key={idx}>
                <strong>{med.paciente}</strong> - {med.medicamento} ({med.frecuencia})  
                <br />
                📅 {med.fechaInicio} → {med.fechaFin}  
                <br />
                📞 {med.telefono}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Medicamentos;
