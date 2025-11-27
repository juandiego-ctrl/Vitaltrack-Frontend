import React, { useState, useEffect } from 'react';
import styles from '../styles/CargueCancer.module.css';
import { FaQuestionCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";

const CargueCancer = () => {
  const navigate = useNavigate();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('Generalidades');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documento, setDocumento] = useState('');
  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = "https://vitaltrack-backend-v5el.onrender.com";

  // 🔹 Cargar todos los registros al montar el componente
  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Obtiene todos los pacientes desde el backend - CORREGIDO
  async function fetchTodos(retryCount = 0) {
    const url = `${BACKEND_URL}/excelarchivo/consulta-general`;
    setIsLoading(true);

    try {
      console.log("📡 Consultando pacientes desde:", url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Datos cargados correctamente:", data);

      // CORREGIDO: Manejo correcto de la respuesta
      let listaPacientes = [];

      if (data.ok && Array.isArray(data.pacientes)) {
        listaPacientes = data.pacientes;
      } else if (Array.isArray(data)) {
        listaPacientes = data;
      } else {
        listaPacientes = [];
      }

      console.log("📋 Total de pacientes cargados:", listaPacientes.length);
      setRows(listaPacientes);
      setShowTable(true);
      setIsLoading(false);
      return listaPacientes;

    } catch (error) {
      console.warn("⚠️ Error cargando pacientes:", error.message);

      if (retryCount < 3) {
        const delay = Math.min(3000 * (retryCount + 1), 10000);
        console.log(`Reintentando conexión (${retryCount + 1}/3) en ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        return fetchTodos(retryCount + 1);
      } else {
        console.error("❌ Fallo después de 3 intentos");
        setRows([]);
        setIsLoading(false);
      }
    }
  }

  const toggleHelpModal = () => {
    if (isHelpModalOpen) {
      setIsExiting(true);
      setTimeout(() => {
        setIsHelpModalOpen(false);
        setIsExiting(false);
      }, 300);
    } else {
      setIsHelpModalOpen(true);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    alert(`Archivo seleccionado: ${e.target.files[0]?.name}`);
  };

  // 📤 Cargar archivo Excel al backend - CORREGIDO
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo Excel antes de cargar.');
      return;
    }

    if (!documento) {
      alert('Por favor, ingresa el número de documento del titular para asociar los pacientes.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      // CORREGIDO: Usar la ruta correcta del backend
      const response = await fetch(`${BACKEND_URL}/excelarchivo/cargar-pacientes/${documento}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('📤 Respuesta del servidor:', data);

      if (data.ok) {
        alert(`✅ ${data.mensaje}`);
        // Recargar la lista después de cargar
        fetchTodos();
      } else {
        alert(`❌ Error: ${data.mensaje || 'Error al cargar el archivo'}`);
      }
    } catch (error) {
      console.error('❌ Error al cargar el archivo:', error);
      alert('No se pudo conectar con el servidor. Verifica tu conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 Búsqueda por documento - CORREGIDO (SOLO CAMBIÉ ESTA PARTE)
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!documento) {
      alert('Ingrese un número de documento para consultar.');
      return;
    }

    // Validar que sea numérico
    if (!/^\d+$/.test(documento)) {
      alert('Por favor, ingresa solo números para el documento.');
      return;
    }

    try {
      setIsLoading(true);
      
      // ✅ CORREGIDO: Cambiar la ruta del backend
      const url = `${BACKEND_URL}/paciente/historial/${documento}`; // ← CAMBIÉ ESTA LÍNEA
      console.log(`🔍 Consultando documento: ${url}`);

      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontró información para este documento.');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Datos consultados:', data);

      // ✅ CORREGIDO: Manejo correcto de la respuesta del servicio de pacientes
      if (data.ok && data.data && data.data.paciente) {
        // Mostrar solo el paciente principal en un array
        const pacientes = [data.data.paciente];
        setRows(pacientes);
        setShowTable(true);
        
        alert(`✅ Paciente encontrado: ${data.data.paciente.V1PrimerNom} ${data.data.paciente.V3PrimerApe}`);
      } else {
        alert('No se encontró información de pacientes para este documento.');
        setRows([]);
        setShowTable(false);
      }

    } catch (error) {
      console.error('❌ Error en búsqueda:', error.message);
      alert(`Error al consultar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Exportar tabla visible a Excel - MEJORADO
  const handleExport = () => {
    if (rows.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    try {
      // Crear datos limpios para exportar
      const datosExportar = rows.map(paciente => ({
        'Primer Nombre': paciente.V1PrimerNom || '',
        'Segundo Nombre': paciente.V2SegundoNom || '',
        'Primer Apellido': paciente.V3PrimerApe || '',
        'Segundo Apellido': paciente.V4SegundoApe || '',
        'Tipo Documento': paciente.V5TipoID || 'CC',
        'Número Documento': paciente.V6NumID || '',
        'Sexo': paciente.V8Sexo || '',
        'Teléfono': paciente.V15NumTel || '',
        'Fecha Nacimiento': paciente.V7FecNac ? new Date(paciente.V7FecNac).toLocaleDateString() : ''
      }));

      const worksheet = XLSX.utils.json_to_sheet(datosExportar);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `pacientes_${new Date().toISOString().split('T')[0]}.xlsx`);
      alert('✅ Archivo exportado correctamente');
    } catch (error) {
      console.error('❌ Error exportando:', error);
      alert('Error al exportar el archivo');
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'Generalidades') {
      return (
        <div>
          <p className={styles.paragraph}>
            Sistema de gestión de pacientes oncológicos. Permite cargar pacientes masivamente 
            mediante archivos Excel y consultar expedientes individuales por número de documento.
          </p>
          <div className={styles.instructions}>
            <h4>Instrucciones:</h4>
            <ol>
              <li>Ingresa el número de documento del titular</li>
              <li>Selecciona un archivo Excel con los datos de los pacientes</li>
              <li>Haz clic en "Cargar" para subir el archivo</li>
              <li>Usa la búsqueda para consultar pacientes específicos</li>
            </ol>
          </div>
        </div>
      );
    } else if (activeTab === 'Documentos') {
      return (
        <div className={styles.documentsTab}>
          <button
            className={styles.linkButton}
            onClick={() =>
              window.open(
                'https://procex.co/archivos/manuales/CAC/CARGAS_ADICIONALES/CARGA_SOPORTES_CAC.pdf',
                '_blank'
              )
            }
          >
            📋 Instructivo de Carga
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Pacientes Oncológicos</h1>

      {isLoading && (
        <div className={styles.loader}>
          ⏳ {rows.length > 0 ? 'Procesando...' : 'Conectando con el servidor...'}
        </div>
      )}

      <div className={styles.buttonsContainer}>
        <div className={styles.leftButtons}>
          <label className={styles.fileInputLabel}>
            📁 Seleccionar archivo Excel
            <input 
              type="file" 
              accept=".xlsx,.xls" 
              onChange={handleFileSelect} 
              className={styles.fileInput} 
            />
          </label>
          <button 
            className={styles.button1} 
            onClick={handleFileUpload}
            disabled={!selectedFile || !documento || isLoading}
          >
            {isLoading ? '📤 Cargando...' : '📤 Cargar'}
          </button>
          <button className={styles.button1} onClick={() => navigate(-1)}>↩️ Regresar</button>
          <button 
            className={styles.button1} 
            onClick={handleExport}
            disabled={rows.length === 0}
          >
            📊 Exportar Excel
          </button>
        </div>

        <div className={styles.statusBoxes}>
          <button className={styles.helpButton} onClick={toggleHelpModal}>
            <FaQuestionCircle /> ¿Ayuda?
          </button>
        </div>
      </div>

      {/* Modal de ayuda */}
      {isHelpModalOpen && (
        <div className={styles.modalBackdrop} onClick={toggleHelpModal}>
          <div
            className={`${styles.modal} ${isExiting ? styles.modalExit : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Ayuda - Sistema de Pacientes</h2>
              <button className={styles.closeButton} onClick={toggleHelpModal}>✕</button>
            </div>
            <div className={styles.tabButtons}>
              <button
                className={`${styles.tabButton} ${activeTab === 'Generalidades' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('Generalidades')}
              >
                Generalidades
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'Documentos' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('Documentos')}
              >
                Documentos
              </button>
            </div>
            <div className={styles.tabContent}>{renderTabContent()}</div>
          </div>
        </div>
      )}

      {/* Buscador */}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSearch}>
          <label className={styles.label}>NÚMERO DE DOCUMENTO</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ingrese cédula para buscar o cargar pacientes"
            value={documento}
            onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ''))} // Solo números
          />
          <button 
            type="submit" 
            className={styles.submitButton1}
            disabled={isLoading}
          >
            🔍 Buscar
          </button>
        </form>
      </div>

      {/* Información de resultados */}
      {rows.length > 0 && (
        <div className={styles.resultsInfo}>
          <strong>📊 Pacientes encontrados:</strong> {rows.length} registro(s)
          <button 
            onClick={() => {
              setRows([]);
              setShowTable(false);
              setDocumento('');
            }} 
            className={styles.clearButton}
          >
            ✕ Limpiar
          </button>
        </div>
      )}

      {/* Tabla de Pacientes */}
      {showTable && rows.length > 0 && (
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h3>📋 Lista de Pacientes</h3>
            <span className={styles.countBadge}>{rows.length}</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Tipo Doc</th>
                <th>Número Doc</th>
                <th>Sexo</th>
                <th>Teléfono</th>
                <th>Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p._id || i}>
                  <td>{i + 1}</td>
                  <td>{p.V1PrimerNom || 'N/A'}</td>
                  <td>{p.V2SegundoNom || 'N/A'}</td>
                  <td>{p.V3PrimerApe || 'N/A'}</td>
                  <td>{p.V4SegundoApe || 'N/A'}</td>
                  <td>{p.V5TipoID || 'CC'}</td>
                  <td><strong>{p.V6NumID || 'N/A'}</strong></td>
                  <td>{p.V8Sexo || 'N/A'}</td>
                  <td>{p.V15NumTel || 'N/A'}</td>
                  <td>{p.V7FecNac ? new Date(p.V7FecNac).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTable && rows.length === 0 && (
        <div className={styles.noData}>
          📭 No se encontraron registros. Intenta cargar un archivo Excel o realizar una búsqueda.
        </div>
      )}
    </div>
  );
};

export default CargueCancer;