// src/components/ModalPacienteCompleto.jsx
import React, { useState, useEffect } from "react";
import style from "../styles/ModalPaciente.css";

const API_BASE_URL = "https://vitaltrack-backend-v5el.onrender.com";

const ModalPacienteCompleto = ({ documento, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/paciente/historial/${documento}`);
        if (!res.ok) {
          if (res.status === 404) {
            alert("Paciente no encontrado en la base de datos");
            onClose();
            return;
          }
          throw new Error("Error del servidor");
        }
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
        alert("Error de conexión. El paciente no está registrado en la BD.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (documento) cargarHistorial();
  }, [documento]);

  const guardarCambios = async () => {
    if (saving || !data?.paciente) return;
    setSaving(true);

    const pacienteEditado = {
      V1PrimerNom: data.paciente.V1PrimerNom?.trim(),
      V2SegundoNom: data.paciente.V2SegundoNom?.trim() || "",
      V3PrimerApe: data.paciente.V3PrimerApe?.trim(),
      V4SegundoApe: data.paciente.V4SegundoApe?.trim() || "",
      V5TipoID: data.paciente.V5TipoID,
      V6NumID: data.paciente.V6NumID,
      V8Sexo: data.paciente.V8Sexo,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/paciente/${documento}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pacienteEditado),
      });

      if (res.ok) {
        alert("Datos básicos actualizados correctamente");
        onClose();
      } else {
        const error = await res.json();
        alert("Error: " + (error.message || "No se pudo guardar"));
      }
    } catch {
      alert("Error de conexión al guardar");
    } finally {
      setSaving(false);
    }
  };

  const eliminarPaciente = async () => {
    if (!window.confirm("¿ELIMINAR PARA SIEMPRE este paciente y TODOS sus registros?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/paciente/${documento}`, { method: "DELETE" });
      if (res.ok) {
        alert("Paciente eliminado completamente");
        onClose();
      } else {
        alert("No se pudo eliminar");
      }
    } catch {
      alert("Error al eliminar");
    }
  };

  if (loading) return <div className="modal-loading">Cargando historial completo...</div>;
  if (!data) return null;

  const p = data.paciente;

  const tabs = [
    { key: "general", label: "Datos Básicos", icon: "Person" },
    { key: "diagnosticos", label: "Diagnósticos", icon: "Stethoscope", count: data.diagnosticos?.length || 0 },
    { key: "antecedentes", label: "Antecedentes", icon: "Clipboard", count: data.antecedentes?.length || 0 },
    { key: "ttocx", label: "Cirugía", icon: "Scalpel", count: data.ttocx?.length || 0 },
    { key: "ttoqt", label: "Quimioterapia", icon: "Syringe", count: data.ttoqt?.length || 0 },
    { key: "ttort", label: "Radioterapia", icon: "Radioactive", count: data.ttort?.length || 0 },
    { key: "ttotrasplante", label: "Trasplante", icon: "Heart", count: data.ttotrasplante?.length || 0 },
    { key: "archivos", label: "Archivos", icon: "Folder", count: data.archivos?.length || 0 },
  ];

  const renderTabla = (items, columnas) => {
    if (!items || items.length === 0) return <p className="no-data">Sin registros</p>;
    return (
      <table className="tabla-historial">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              {columnas.map((col) => (
                <td key={col.key}>{item[col.key] || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {p.V1PrimerNom} {p.V2SegundoNom} {p.V3PrimerApe} {p.V4SegundoApe} ({documento})
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.icon}</span> {tab.label}
              {tab.count > 0 && <span className="badge">{tab.count}</span>}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "general" && (
            <div className="form-grid">
              <div>
                <label>Primer Nombre</label>
                <input
                  value={p.V1PrimerNom || ""}
                  onChange={(e) => setData({ ...data, paciente: { ...p, V1PrimerNom: e.target.value } })}
                />
              </div>
              <div>
                <label>Segundo Nombre</label>
                <input
                  value={p.V2SegundoNom || ""}
                  onChange={(e) => setData({ ...data, paciente: { ...p, V2SegundoNom: e.target.value } })}
                />
              </div>
              <div>
                <label>Primer Apellido</label>
                <input
                  value={p.V3PrimerApe || ""}
                  onChange={(e) => setData({ ...data, paciente: { ...p, V3PrimerApe: e.target.value } })}
                />
              </div>
              <div>
                <label>Segundo Apellido</label>
                <input
                  value={p.V4SegundoApe || ""}
                  onChange={(e) => setData({ ...data, paciente: { ...p, V4SegundoApe: e.target.value } })}
                />
              </div>
              <div>
                <label>Tipo ID</label>
                <input value={p.V5TipoID || ""} disabled />
              </div>
              <div>
                <label>Cédula</label>
                <input value={documento} disabled />
              </div>
              <div>
                <label>Sexo</label>
                <input value={p.V8Sexo || ""} disabled />
              </div>
            </div>
          )}

          {activeTab === "diagnosticos" && renderTabla(data.diagnosticos, [
            { key: "fechaDiagnostico", label: "Fecha" },
            { key: "codigoCIE", label: "CIE-10" },
            { key: "descripcion", label: "Diagnóstico" },
          ])}

          {activeTab === "antecedentes" && renderTabla(data.antecedentes, [
            { key: "tipo", label: "Tipo" },
            { key: "descripcion", label: "Descripción" },
            { key: "fecha", label: "Fecha" },
          ])}

          {activeTab === "ttocx" && renderTabla(data.ttocx, [
            { key: "fechaCirugia", label: "Fecha" },
            { key: "tipoCirugia", label: "Procedimiento" },
            { key: "hallazgos", label: "Hallazgos" },
          ])}

          {activeTab === "ttoqt" && renderTabla(data.ttoqt, [
            { key: "fechaInicio", label: "Inicio" },
            { key: "esquema", label: "Esquema" },
            { key: "ciclos", label: "Ciclos" },
          ])}

          {activeTab === "ttort" && renderTabla(data.ttort, [
            { key: "fechaInicio", label: "Inicio" },
            { key: "dosisTotal", label: "Dosis" },
            { key: "sitio", label: "Sitio" },
          ])}

          {activeTab === "ttotrasplante" && renderTabla(data.ttotrasplante, [
            { key: "fechaTrasplante", label: "Fecha" },
            { key: "tipoTrasplante", label: "Tipo" },
          ])}

          {activeTab === "archivos" && (
            data.archivos?.length ? (
              <div className="archivos-list">
                {data.archivos.map((a, i) => (
                  <div key={i} className="archivo-item">
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.nombre || "Archivo"} {a.fecha && `(${new Date(a.fecha).toLocaleDateString()})`}
                    </a>
                  </div>
                ))}
              </div>
            ) : <p className="no-data">Sin archivos adjuntos</p>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={guardarCambios} disabled={saving} className="btn-save">
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button onClick={eliminarPaciente} className="btn-delete">
            Eliminar Paciente
          </button>
          <button onClick={onClose} className="btn-cancel">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPacienteCompleto;