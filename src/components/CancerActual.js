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
  // 🔵 CONSULTAR TODOS LOS PACIENTES - ACTUALIZADO
  // ======================================================
  const fetchTodos = async (retries = 0) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/excelarchivo/consulta-general`);
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Respuesta del backend:", data);

      // ACTUALIZADO: Manejo simplificado de la respuesta
      let listaPacientes = [];
      
      if (data.ok && Array.isArray(data.pacientes)) {
        listaPacientes = data.pacientes;
      } else if (Array.isArray(data)) {
        listaPacientes = data;
      } else {
        // Si no encontramos pacientes, usar array vacío
        listaPacientes = [];
      }

      console.log(`✅ ${listaPacientes.length} pacientes cargados`);
      setRows(listaPacientes);
    } catch (err) {
      console.warn("⚠️ Error en fetchTodos:", err.message);
      
      if (retries < 3) {
        console.log(`🔄 Reintentando cargar pacientes (${retries + 1}/3)...`);
        await new Promise(r => setTimeout(r, 3000 * (retries + 1))); // Delay progresivo
        return fetchTodos(retries + 1);
      }
      
      console.error("❌ No se pudo cargar la lista de pacientes después de varios intentos");
      setRows([]);
      alert("No se pudo conectar con el servidor. Intenta recargar la página.");
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 🔵 CONSULTAR POR CÉDULA - CORREGIDO (SOLO CAMBIÉ ESTA PARTE)
  // ======================================================
  const fetchByCedula = async (cedula, retries = 0) => {
    setIsLoading(true);
    try {
      // ✅ CORREGIDO: Cambiar la ruta del backend
      const res = await fetch(`${API_BASE_URL}/paciente/historial/${cedula}`); // ← CAMBIÉ ESTA LÍNEA
      
      // Si es 404, el paciente no existe
      if (res.status === 404) {
        alert(`❌ No se encontró ningún paciente con la cédula: ${cedula}`);
        setRows([]);
        return;
      }

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("📊 Respuesta de historial:", data);

      // ✅ CORREGIDO: Manejo correcto de la respuesta del servicio de pacientes
      if (data.ok && data.data && data.data.paciente) {
        // Mostrar solo el paciente principal en un array
        const pacientes = [data.data.paciente];
        setRows(pacientes);
        
        alert(`✅ Paciente encontrado: ${data.data.paciente.V1PrimerNom} ${data.data.paciente.V3PrimerApe}`);
      } else {
        alert(`❌ No se encontró información válida para la cédula: ${cedula}`);
        setRows([]);
      }
    } catch (err) {
      console.warn("⚠️ Error en fetchByCedula:", err.message);
      
      if (retries < 2) {
        console.log(`🔄 Reintentando búsqueda (${retries + 1}/2)...`);
        await new Promise(r => setTimeout(r, 3000));
        return fetchByCedula(cedula, retries + 1);
      }
      
      alert("❌ Error al consultar paciente. Verifica tu conexión e intenta nuevamente.");
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 🔍 BOTÓN BUSCAR - MANTENIDO
  // ======================================================
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cedula = cedulaRef.current?.value?.trim();
    
    if (!cedula) {
      alert("⚠️ Por favor, ingresa un número de cédula para buscar.");
      return;
    }
    
    if (!/^\d+$/.test(cedula)) {
      alert("❌ Por favor, ingresa solo números para la cédula.");
      return;
    }
    
    console.log(`🔍 Buscando cédula: ${cedula}`);
    fetchByCedula(cedula);
  };

  // ======================================================
  // 📝 ABRIR MODAL DE EDICIÓN - MANTENIDO
  // ======================================================
  const abrirEdicion = (cedula) => {
    if (!cedula) {
      alert('❌ No se pudo obtener el número de documento del paciente.');
      return;
    }
    console.log('✅ Abriendo modal para documento:', cedula);
    setSelectedId(cedula);
  };

  // ======================================================
  // ❌ ELIMINAR - MANTENIDO (con mejora)
  // ======================================================
  const eliminar = async (cedula) => {
    if (!cedula) {
      alert('❌ No se puede eliminar: cédula no válida');
      return;
    }

    if (!window.confirm(`¿Estás seguro de que deseas eliminar al paciente con cédula ${cedula}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/paciente/${cedula}`, {
        method: "DELETE"
      });

      if (res.status === 404) {
        alert("❌ Función de eliminar no disponible en el backend actual");
        return;
      }

      const data = await res.json();

      if (data.ok) {
        alert("✅ Paciente eliminado correctamente.");
        fetchTodos(); // Recargar la lista
      } else {
        alert("❌ Error al eliminar: " + (data.mensaje || "Error desconocido"));
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      alert("❌ No se pudo eliminar el paciente. El servicio puede no estar disponible.");
    }
  };

  // ======================================================
  // 🖥 RENDER - MANTENIDO
  // ======================================================
  return (
    <div className={styles.container}>
      <h1>Gestión de Pacientes - Sistema Oncológico</h1>

      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '6px',
          margin: '10px 0'
        }}>
          ⏳ Cargando pacientes...
        </div>
      )}

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
          <input
            ref={cedulaRef}
            placeholder="Buscar por cédula (solo números)"
            className={styles.input}
            type="text"
            maxLength="20"
          />
          <button type="submit" className={styles.button1} disabled={isLoading}>
            🔍 Buscar
          </button>
        </form>
        
        <button onClick={fetchTodos} className={styles.button} disabled={isLoading}>
          🔄 Ver Todos
        </button>
        
        <button onClick={() => navigate(-1)} className={styles.button}>
          ⬅️ Regresar
        </button>
      </div>

      {/* Información de resultados */}
      {rows.length > 0 && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '6px',
          border: '1px solid #b3d9ff'
        }}>
          <strong>📊 Resultados de la búsqueda:</strong> {rows.length} paciente(s) encontrado(s)
        </div>
      )}

      {/* Tabla de resultados */}
      {rows.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Tipo ID</th>
                <th>Cédula</th>
                <th>Sexo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((p, i) => {
                const documento = p.V6NumID || p.V6NumId || p.documento || '';
                
                return (
                  <tr key={p._id || i}>
                    <td>{i + 1}</td>
                    <td>{p.V1PrimerNom || 'N/A'}</td>
                    <td>{p.V2SegundoNom || 'N/A'}</td>
                    <td>{p.V3PrimerApe || 'N/A'}</td>
                    <td>{p.V4SegundoApe || 'N/A'}</td>
                    <td>{p.V5TipoID || 'CC'}</td>
                    <td><strong>{documento}</strong></td>
                    <td>{p.V8Sexo || 'N/A'}</td>
                    <td>{p.V15NumTel || 'N/A'}</td>

                    <td style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => abrirEdicion(documento)}
                        className={styles.editButton}
                        disabled={!documento}
                        title="Editar paciente"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() => eliminar(documento)}
                        className={styles.deleteButton}
                        disabled={!documento}
                        title="Eliminar paciente"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            marginTop: '20px',
            border: '1px solid #dee2e6'
          }}>
            <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
              📋 No hay pacientes para mostrar. 
              {cedulaRef.current?.value ? ' Intenta con otra cédula o ' : ' '}
              <button 
                onClick={fetchTodos} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#007bff', 
                  textDecoration: 'underline', 
                  cursor: 'pointer' 
                }}
              >
                carga todos los pacientes
              </button>.
            </p>
          </div>
        )
      )}

      {/* MODAL DE EDICIÓN */}
      {selectedId && (
        <ModalPaciente
          documento={selectedId}
          onClose={() => {
            setSelectedId(null);
            fetchTodos();
          }}
        />
      )}
    </div>
  );
};

export default PacienteCRUD;