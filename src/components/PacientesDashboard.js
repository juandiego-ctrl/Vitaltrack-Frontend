// src/components/PacientesDashboard.js
import { useEffect, useState } from "react";
import { 
  fetchPacientes, 
  crearPaciente, 
  eliminarPaciente, 
  actualizarPaciente, 
  fetchHistorial 
} from "../api/pacientes";


function PacientesDashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoID, setNuevoID] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [editingNombre, setEditingNombre] = useState("");
  const [historial, setHistorial] = useState(null);

  // ⚡ Cargar pacientes al iniciar
  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    const data = await fetchPacientes();
    setPacientes(data);
  };

  // ⚡ Crear paciente
  const handleCrearPaciente = async () => {
    if (!nuevoID || !nuevoNombre) return alert("Ingrese ID y nombre");

    const nuevoPaciente = { V6NumID: nuevoID, nombre: nuevoNombre };
    await crearPaciente(nuevoPaciente);

    setNuevoID("");
    setNuevoNombre("");
    cargarPacientes();
  };

  // ⚡ Eliminar paciente
  const handleEliminarPaciente = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este paciente?")) return;

    await eliminarPaciente(id);
    cargarPacientes();
  };

  // ⚡ Iniciar edición
  const handleEditarPaciente = (paciente) => {
    setEditingID(paciente.V6NumID);
    setEditingNombre(paciente.nombre);
  };

  // ⚡ Guardar edición
  const handleGuardarEdicion = async () => {
    if (!editingNombre) return alert("Ingrese un nombre válido");
    await actualizarPaciente(editingID, { nombre: editingNombre });
    setEditingID(null);
    setEditingNombre("");
    cargarPacientes();
  };

  // ⚡ Ver historial completo
  const handleVerHistorial = async (id) => {
    const data = await fetchHistorial(id);
    setHistorial(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pacientes Dashboard</h2>

      {/* Crear paciente */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cédula"
          value={nuevoID}
          onChange={(e) => setNuevoID(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleCrearPaciente}>Agregar Paciente</button>
      </div>

      {/* Lista de pacientes */}
      <ul>
        {pacientes.map((p) => (
          <li key={p.V6NumID} style={{ marginBottom: "10px" }}>
            {editingID === p.V6NumID ? (
              <>
                <input 
                  type="text" 
                  value={editingNombre} 
                  onChange={(e) => setEditingNombre(e.target.value)} 
                />
                <button onClick={handleGuardarEdicion}>Guardar</button>
                <button onClick={() => setEditingID(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{p.nombre}</strong> - {p.V6NumID} {" "}
                <button onClick={() => handleEditarPaciente(p)}>Editar</button>
                <button onClick={() => handleEliminarPaciente(p.V6NumID)}>Eliminar</button>
                <button onClick={() => handleVerHistorial(p.V6NumID)}>Ver Historial</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Historial */}
      {historial && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <h3>Historial del paciente: {historial.paciente?.nombre}</h3>

          <h4>Diagnósticos:</h4>
          <ul>
            {historial.diagnosticos?.map((d, i) => <li key={i}>{d.descripcion}</li>)}
          </ul>

          <h4>Antecedentes:</h4>
          <ul>
            {historial.antecedentes?.map((a, i) => <li key={i}>{a.descripcion}</li>)}
          </ul>

          <h4>Archivos:</h4>
          <ul>
            {historial.archivos?.map((f, i) => <li key={i}>{f.nombre}</li>)}
          </ul>

          <h4>Tratamientos:</h4>
          <ul>
            {historial.ttocx?.map((t, i) => <li key={i}>TTOCX: {t.descripcion}</li>)}
            {historial.ttopaliativos?.map((t, i) => <li key={i}>Ttopaliativos: {t.descripcion}</li>)}
            {historial.ttort?.map((t, i) => <li key={i}>Ttort: {t.descripcion}</li>)}
            {historial.ttotrasplante?.map((t, i) => <li key={i}>Ttotrasplante: {t.descripcion}</li>)}
            {historial.ttocxreconst?.map((t, i) => <li key={i}>TtocxReconst: {t.descripcion}</li>)}
            {historial.ttoqt?.map((t, i) => <li key={i}>Ttoqt: {t.descripcion}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PacientesDashboard;
