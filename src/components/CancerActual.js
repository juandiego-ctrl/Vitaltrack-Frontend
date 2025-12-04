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

      // ✅ CORREGIDO: Los pacientes están en data.pacientes
      let listaPacientes = [];
      
      if (data.ok && Array.isArray(data.pacientes)) {
        listaPacientes = data.pacientes;
        console.log(`✅ Encontrados ${listaPacientes.length} pacientes en data.pacientes`);
      } else if (Array.isArray(data)) {
        listaPacientes = data;
        console.log(`✅ Encontrados ${listaPacientes.length} pacientes directamente en el array`);
      } else {
        console.warn("⚠️ No se encontró la lista de pacientes en la respuesta:", data);
        listaPacientes = [];
      }

      console.log(`✅ Total de ${listaPacientes.length} pacientes cargados`);
      
      // ✅ Verificar que los datos tienen la estructura correcta
      if (listaPacientes.length > 0) {
        const primerPaciente = listaPacientes[0];
        console.log("📋 Primer paciente:", primerPaciente);
        console.log("📋 Campos disponibles:", Object.keys(primerPaciente));
      }
      
      setRows(listaPacientes);
    } catch (err) {
      console.warn("⚠️ Error en fetchTodos:", err.message);
      
      if (retries < 3) {
        console.log(`🔄 Reintentando cargar pacientes (${retries + 1}/3)...`);
        await new Promise(r => setTimeout(r, 3000 * (retries + 1)));
        return fetchTodos(retries + 1);
      }
      
      console.error("❌ No se pudo cargar la lista de pacientes");
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
    
    const cedulaLimpia = cedula.toString().trim();
    console.log(`🔍 Buscando paciente con cédula: "${cedulaLimpia}"`);
    
    try {
      // PRIMERO: Intentar con endpoint de paciente directo
      const res = await fetch(`${API_BASE_URL}/paciente/${cedulaLimpia}`);
      
      if (res.status === 404) {
        // SEGUNDO: Si no funciona, probar con endpoint de historial
        console.log("⚠️ No encontrado en /paciente/, intentando /paciente/historial/");
        const resHistorial = await fetch(`${API_BASE_URL}/paciente/historial/${cedulaLimpia}`);
        
        if (resHistorial.status === 404) {
          alert(`❌ No se encontró ningún paciente con la cédula: ${cedulaLimpia}`);
          setRows([]);
          return;
        }

        if (!resHistorial.ok) {
          throw new Error(`Error ${resHistorial.status}: ${resHistorial.statusText}`);
        }

        const historialData = await resHistorial.json();
        console.log("📊 Respuesta de historial:", historialData);
        
        // Extraer paciente del historial
        let pacienteEncontrado = null;
        
        if (historialData.ok && historialData.paciente) {
          // Caso: {ok: true, paciente: {...}}
          pacienteEncontrado = historialData.paciente;
        } else if (historialData.data && historialData.data.paciente) {
          // Caso: {data: {paciente: {...}}}
          pacienteEncontrado = historialData.data.paciente;
        } else if (historialData.V6NumID) {
          // Caso: El objeto paciente viene directamente
          pacienteEncontrado = historialData;
        }
        
        if (pacienteEncontrado) {
          console.log("✅ Paciente encontrado en historial:", pacienteEncontrado);
          setRows([pacienteEncontrado]);
          alert(`✅ Paciente encontrado: ${pacienteEncontrado.V1PrimerNom || ''} ${pacienteEncontrado.V3PrimerApe || ''}`);
        } else {
          alert(`❌ No se encontró información válida para la cédula: ${cedulaLimpia}`);
          setRows([]);
        }
        return;
      }

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const responseData = await res.json();
      console.log("📊 Respuesta de paciente:", responseData);

      // Manejo de la respuesta del endpoint /paciente/:cedula
      let pacienteEncontrado = null;
      
      if (responseData && responseData.V6NumID) {
        // Caso: El objeto paciente viene directamente
        pacienteEncontrado = responseData;
      } else if (responseData.ok && responseData.data && responseData.data.V6NumID) {
        // Caso: {ok: true, data: {...}}
        pacienteEncontrado = responseData.data;
      } else if (responseData.data && responseData.data.V6NumID) {
        // Caso: {data: {...}}
        pacienteEncontrado = responseData.data;
      }

      if (pacienteEncontrado) {
        console.log("✅ Paciente encontrado en /paciente/:cedula:", pacienteEncontrado);
        setRows([pacienteEncontrado]);
        alert(`✅ Paciente encontrado: ${pacienteEncontrado.V1PrimerNom || ''} ${pacienteEncontrado.V3PrimerApe || ''}`);
      } else {
        alert(`❌ No se encontró información para la cédula: ${cedulaLimpia}`);
        setRows([]);
      }
    } catch (err) {
      console.error("❌ Error en fetchByCedula:", err);
        
      if (retries < 2) {
        console.log(`🔄 Reintentando búsqueda (${retries + 1}/2)...`);
        await new Promise(r => setTimeout(r, 2000 * (retries + 1)));
        return fetchByCedula(cedula, retries + 1);
      }
        
      alert("❌ Error al consultar paciente. Verifica tu conexión.");
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

// ✅ Función auxiliar para buscar por historial
const buscarPorHistorial = async (cedula) => {
  try {
    const res = await fetch(`${API_BASE_URL}/paciente/historial/${cedula}`);
    
    if (res.status === 404) {
      alert(`❌ No se encontró ningún paciente con la cédula: ${cedula}`);
      setRows([]);
      return;
    }

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    console.log("📊 Respuesta de historial:", data);

    // ✅ CORREGIDO: Según tu backend, el paciente está en data.paciente
    if (data.ok && data.paciente) {
      setRows([data.paciente]);
      alert(`✅ Paciente encontrado: ${data.paciente.V1PrimerNom || ''} ${data.paciente.V3PrimerApe || ''}`);
    } else {
      alert(`❌ No se encontró información válida para la cédula: ${cedula}`);
      setRows([]);
    }
  } catch (err) {
    console.error("❌ Error en buscarPorHistorial:", err);
    throw err;
  }
};

  // ======================================================
  // 🔍 BOTÓN BUSCAR - MANTENIDO
  // ======================================================
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const inputCedula = cedulaRef.current?.value?.trim();
    
    if (!inputCedula) {
      alert("⚠️ Por favor, ingresa un número de cédula para buscar.");
      return;
    }
    
    if (!/^\d+$/.test(inputCedula)) {
      alert("❌ Por favor, ingresa solo números para la cédula.");
      return;
    }
    
    console.log(`🔍 Buscando cédula: ${inputCedula}`);
    fetchByCedula(inputCedula);
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