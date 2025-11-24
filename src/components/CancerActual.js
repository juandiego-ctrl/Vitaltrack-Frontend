import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CancerActual.module.css';
import ModalPaciente from './ModalPaciente';

const API_BASE_URL = "https://vitaltrack-backend-v5el.onrender.com";

const PacienteCRUD = () => {
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cedulaRef = useRef(null);
  const navigate = useNavigate();

  // ======================================================
  // 🔄 CARGAR TODOS LOS PACIENTES AL INICIAR
  // ======================================================
  useEffect(() => {
    fetchTodos();
  }, []);

  // ======================================================
  // 🔵 CONSULTAR TODOS LOS PACIENTES
  // ======================================================
  const fetchTodos = async (retries = 0) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/excelarchivo/consulta-general`);
      const type = res.headers.get("content-type") || "";

      if (!res.ok || type.includes("text/html"))
        throw new Error("Backend despertando...");

      const data = await res.json();

      // Manejo de diferentes estructuras de respuesta
      let listaPacientes = [];
      if (Array.isArray(data.paciente)) {
        listaPacientes = data.paciente;
      } else if (Array.isArray(data.pacientes)) {
        listaPacientes = data.pacientes;
      } else if (data.ok && data.data && Array.isArray(data.data)) {
        listaPacientes = data.data;
      }

      console.log(`✅ ${listaPacientes.length} pacientes cargados`);
      setRows(listaPacientes);
    } catch (err) {
      if (retries < 5) {
        console.log(`⚠️ Reintentando cargar pacientes (${retries + 1}/5)...`);
        await new Promise(r => setTimeout(r, 3000));
        return fetchTodos(retries + 1);
      }
      alert("No se pudo cargar la lista de pacientes.");
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 🔵 CONSULTAR POR CÉDULA
  // ======================================================
  const fetchByCedula = async (cedula, retries = 0) => {
    try {
      const res = await fetch(`${API_BASE_URL}/excelarchivo/consulta-general/${cedula}`);
      const type = res.headers.get("content-type") || "";

      // Si es 404, el paciente no existe (no reintentar)
      if (res.status === 404) {
        alert(`No se encontró ningún paciente con la cédula: ${cedula}`);
        setRows([]);
        return;
      }

      // Si el backend está dormido o hay error del servidor, reintentar
      if (!res.ok || type.includes("text/html")) {
        throw new Error("Backend despertando o error del servidor...");
      }

      const data = await res.json();

      if (data.ok && Array.isArray(data.paciente) && data.paciente.length > 0) {
        setRows(data.paciente);
      } else {
        alert(`No se encontró información para la cédula: ${cedula}`);
        setRows([]);
      }
    } catch (err) {
      if (retries < 5) {
        console.log(`⚠️ Reintentando búsqueda (${retries + 1}/5)...`);
        await new Promise(r => setTimeout(r, 3000));
        return fetchByCedula(cedula, retries + 1);
      }
      alert("Error al consultar paciente. Intenta nuevamente.");
    }
  };

  // ======================================================
  // 🔍 BOTÓN BUSCAR
  // ======================================================
  const handleSearch = (e) => {
    if (e) e.preventDefault(); // Prevenir recarga de página
    const cedula = cedulaRef.current.value.trim();
    if (!cedula) return fetchTodos();
    fetchByCedula(cedula);
  };

  // ======================================================
  // 📝 ABRIR MODAL DE EDICIÓN
  // ======================================================
  const abrirEdicion = (cedula) => {
    if (!cedula) {
      alert('No se pudo obtener el número de documento del paciente.');
      return;
    }
    console.log('✅ Abriendo modal para documento:', cedula);
    setSelectedId(cedula);
  };

  // ======================================================
  // ❌ ELIMINAR
  // ======================================================
  const eliminar = async (cedula) => {
    if (!window.confirm("¿Eliminar este paciente?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/paciente/${cedula}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.ok) {
        alert("Paciente eliminado correctamente.");
        handleSearch();
      } else {
        alert("Error al eliminar.");
      }
    } catch (err) {
      alert("Error al eliminar.");
    }
  };

  // ======================================================
  // 🖥 RENDER
  // ======================================================
  return (
    <div className={styles.container}>
      <h1>CRUD Pacientes — CAC</h1>

      {isLoading && <div style={{ textAlign: 'center', padding: '20px' }}>⏳ Cargando...</div>}

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} style={{ display: 'inline-flex', gap: '10px' }}>
          <input
            ref={cedulaRef}
            placeholder="Buscar por cédula"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>🔍 Buscar</button>
        </form>
        <button onClick={fetchTodos} className={styles.button}>🔄 Ver Todos</button>
        <button onClick={() => navigate(-1)} className={styles.button}>⬅️ Regresar</button>
      </div>

      {rows.length > 0 && (
        <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
          <strong>Total de pacientes encontrados:</strong> {rows.length}
        </div>
      )}

      {rows.length > 0 ? (
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Primer Apellido</th>
              <th>Tipo ID</th>
              <th>Cédula</th>
              <th>Sexo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((p, i) => {
              // Debug: asegurarnos de que tenemos el documento correcto
              const documento = p.V6NumID || p.V6NumId || p.documento || '';
              
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.V1PrimerNom}</td>
                  <td>{p.V2SegundoNom}</td>
                  <td>{p.V3PrimerApe}</td>
                  <td>{p.V5TipoID}</td>
                  <td>{documento}</td>
                  <td>{p.V8Sexo}</td>

                  <td>
                    <button
                      onClick={() => {
                        console.log('📝 Editando paciente:', documento);
                        console.log('📋 Objeto completo:', p);
                        abrirEdicion(documento);
                      }}
                      style={{ color: 'blue', cursor: 'pointer' }}
                      disabled={!documento}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => {
                        console.log('🗑️ Eliminando paciente:', documento);
                        eliminar(documento);
                      }}
                      style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }}
                      disabled={!documento}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !isLoading && (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
              📋 No hay pacientes para mostrar. Realiza una búsqueda o espera a que carguen los datos.
            </p>
          </div>
        )
      )}

      {/* MODAL */}
      {selectedId && (
        <ModalPaciente
          documento={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

export default PacienteCRUD;