import React, { useState, useEffect } from 'react';
import styles from '../styles/CargueCancer.module.css';
import { FaQuestionCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";

const TOTAL_VARIABLES = 124;

const CargueCancer = () => {
  const navigate = useNavigate();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('Generalidades');
  const [filters, setFilters] = useState({ ips: '', cuenta: '', usuario: '', radicado: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [documento, setDocumento] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = "https://vitaltrack-backend-v5el.onrender.com";

  // 🔹 Cargar todos los registros al montar el componente
  useEffect(() => {
    fetchTodos();
  }, []);



// 🔹 Obtiene todos los pacientes desde el backend
async function fetchTodos(retryCount = 0) {
  const url = `${BACKEND_URL}/excelarchivo/consulta-general`;
  setIsLoading(true);

  try {
    console.log("📡 Consultando pacientes desde:", url);
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || contentType.includes("text/html")) {
      throw new Error("El backend aún está despertando en Render...");
    }

    const data = await response.json();
    console.log("✅ Datos cargados correctamente:", data);

    // ✅ Si la respuesta tiene pacientes, los usamos
    let listaPacientes = [];

    if (Array.isArray(data.paciente)) {
      listaPacientes = data.paciente;
    } else if (Array.isArray(data.pacientes)) {
      listaPacientes = data.pacientes;
    } else if (data.ok && data.data && Array.isArray(data.data)) {
      listaPacientes = data.data;
    }

    console.log("📋 Total de pacientes cargados:", listaPacientes.length);
    setRows(listaPacientes);
    setShowTable(true);
    setIsLoading(false);
    return listaPacientes;

  } catch (error) {
    console.warn("⚠️ Error cargando pacientes:", error.message);

    if (retryCount < 5) {
      console.log(`Reintentando conexión (${retryCount + 1}/5)...`);
      await new Promise((r) => setTimeout(r, 3000));
      return fetchTodos(retryCount + 1);
    } else {
      alert("No fue posible conectar con el servidor. Intenta nuevamente en unos segundos.");
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

  // 📤 Cargar archivo Excel al backend
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo Excel antes de cargar.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('V6NumId', documento || '0'); // puedes vincular la cédula si se desea

      const response = await fetch(`${BACKEND_URL}/excelarchivo/cargue-general/${documento || 0}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('📤 Respuesta del servidor:', data);

      if (data.ok) {
        alert('Archivo cargado correctamente.');
        fetchTodos();
      } else {
        alert('Error al cargar el archivo.');
      }
    } catch (error) {
      console.error('❌ Error al cargar el archivo:', error);
      alert('No se pudo subir el archivo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!documento) {
      alert('Ingrese un número de documento para consultar.');
      return;
    }

    try {
      setIsLoading(true);
      const url = `${BACKEND_URL}/excelarchivo/consulta-general/${documento}`;
      console.log(`🔍 Consultando documento: ${url}`);

      const response = await fetch(url);
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('El backend aún está despertando en Render...');
      }

      if (!response.ok) {
        throw new Error('No se encontró información para este número de documento.');
      }

      const data = await response.json();
      console.log('📊 Datos consultados:', data);

      if (data.ok && Array.isArray(data.paciente)) {
        setRows(data.paciente);
        setShowTable(true);
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

  // 🔹 Exportar tabla visible a Excel
  const handleExport = () => {
    const table = document.querySelector('table');
    if (!table) return;
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Reporte' });
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'tabla_cargue_cac.xlsx');
  };

  const renderTabContent = () => {
    if (activeTab === 'Generalidades') {
      return (
        <div>
          <p className={styles.paragraph}>
            Generalidades de la carga de soportes CAC. En esta opción se detalla el proceso
            para el reporte de soportes CAC en la plataforma SIGIRES, dirigido tanto a clientes
            con perfil IPS como clientes con perfil EPS.
          </p>
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
            Instructivo
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cargue de soportes CAC</h1>

      {isLoading && <div className={styles.loader}>⏳ Conectando con el servidor...</div>}

      <div className={styles.buttonsContainer}>
        <div className={styles.leftButtons}>
          <label className={styles.fileInputLabel}>
            Seleccionar archivo
            <input type="file" onChange={handleFileSelect} className={styles.fileInput} />
          </label>
          <button className={styles.button1} onClick={handleFileUpload}>Cargar</button>
          <button className={styles.button1} onClick={() => navigate(-1)}>Regresar</button>
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
              <h2>Ayuda</h2>
              <button className={styles.closeButton} onClick={toggleHelpModal}>X</button>
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
          <label className={styles.label}>NUMERO DE DOCUMENTO</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Consulta de paciente, por número de cédula"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
          <button className={styles.submitButton1}>Buscar</button>
        </form>
      </div>

      {/* Tabla de Paciente */}
      {showTable && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Tipo Documento</th>
                <th>Número Documento</th>
                <th>Sexo</th>
                <th>Teléfono</th>
                <th>Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p._id ?? i}>
                  <td>{i + 1}</td>
                  <td>{p.V1PrimerNom}</td>
                  <td>{p.V2SegundoNom}</td>
                  <td>{p.V3PrimerApe}</td>
                  <td>{p.V4SegundoApe}</td>
                  <td>{p.V5TipoID}</td>
                  <td>{p.V6NumID}</td>
                  <td>{p.V8Sexo}</td>
                  <td>{p.V15NumTel}</td>
                  <td>{new Date(p.V7FecNac).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CargueCancer;
