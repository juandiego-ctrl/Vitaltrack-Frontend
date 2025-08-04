import React, { useState } from 'react';
import styles from '../styles/CargueCancer.module.css';
import { FaQuestionCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const CargueCancer = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('Generalidades');
  const [filters, setFilters] = useState({ ips: '', cuenta: '', usuario: '', radicado: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showTable, setShowTable] = useState(false);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    alert(`Archivo seleccionado: ${e.target.files[0]?.name}`);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      alert(`Archivo cargado exitosamente: ${selectedFile.name}`);
    } else {
      alert('Por favor, seleccione un archivo primero.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

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
            Generalidades de la carga de soportes CAC. En esta opción se detalla el proceso para el reporte de soportes CAC en la plataforma SIGIRES, dirigido tanto a clientes con perfil IPS como clientes con perfil EPS.
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

      {/* Zona de carga */}
      <div className={styles.buttonsContainer}>
        <div className={styles.leftButtons}>
          <label className={styles.fileInputLabel}>
            Seleccionar archivo
            <input type="file" onChange={handleFileSelect} className={styles.fileInput} />
          </label>
          <button className={styles.button} onClick={handleFileUpload}>Cargar</button>
          <button className={styles.button}>Consultar progreso</button>
        </div>

        <div className={styles.statusBoxes}>
          <div className={`${styles.statusBox} ${styles.success}`}>Exitoso</div>
          <div className={`${styles.statusBox} ${styles.error}`}>Con errores</div>
          <div className={`${styles.statusBox} ${styles.noReport}`}>No reportó</div>
          <button className={styles.helpButton} onClick={toggleHelpModal}>
            <FaQuestionCircle /> ¿Ayuda?
          </button>
        </div>
      </div>

      {/* Modal ayuda */}
      {isHelpModalOpen && (
        <div className={styles.modalBackdrop} onClick={toggleHelpModal}>
          <div className={`${styles.modal} ${isExiting ? styles.modalExit : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Ayuda</h2>
              <button className={styles.closeButton} onClick={toggleHelpModal}>X</button>
            </div>
            <div className={styles.tabButtons}>
              <button className={`${styles.tabButton} ${activeTab === 'Generalidades' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Generalidades')}>Generalidades</button>
              <button className={`${styles.tabButton} ${activeTab === 'Documentos' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Documentos')}>Documentos</button>
            </div>
            <div className={styles.tabContent}>{renderTabContent()}</div>
          </div>
        </div>
      )}

      {/* Nombre y radicado archivo */}
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label className={styles.label}>Nombre de archivo</label>
          <input type="text" className={styles.input} placeholder="Ingrese el nombre del archivo" />
          <label className={styles.label}>Radicado</label>
          <input type="text" className={styles.input} placeholder="Ingrese el radicado" />
        </form>
      </div>

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <button className={styles.filterButton} onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Ocultar filtros' : 'Filtros'}
        </button>

        {showFilters && (
          <>
            <input type="text" name="ips" value={filters.ips} onChange={handleFilterChange} placeholder="IPS" className={styles.filterInput} />
            <input type="text" name="cuenta" value={filters.cuenta} onChange={handleFilterChange} placeholder="Cuenta" className={styles.filterInput} />
            <input type="text" name="usuario" value={filters.usuario} onChange={handleFilterChange} placeholder="Tipo Usuario" className={styles.filterInput} />
            <input type="text" name="radicado" value={filters.radicado} onChange={handleFilterChange} placeholder="Radicado" className={styles.filterInput} />
            <button className={styles.submitButton} onClick={handleSearch}>Buscar</button>
            <button className={styles.exportButton} onClick={handleExport}>Exportar tabla general</button>
          </>
        )}
      </div>

      {/* Tabla */}
      {showTable && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Radicado</th>
                <th>Cuenta CAC</th>
                <th>Nombre IPS</th>
                <th>Nombre archivo</th>
                <th>Fecha Cargue</th>
                <th>Soportes procesados</th>
                <th>Registros Cargados</th>
                <th>Consolidados</th>
                <th>Estado</th>
                <th>Vigente</th>
                <th>Usuario</th>
                <th>Login</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i} style={{ animationDelay: `${i * 0.1}s` }} className={styles.fadeInRow}>
                  <td>12345</td>
                  <td>Cáncer</td>
                  <td>IPS Ejemplo</td>
                  <td>CAC_CUENTA_20231212.xlsx</td>
                  <td>12/12/2024</td>
                  <td>100</td>
                  <td>95</td>
                  <td>5</td>
                  <td>Exitoso</td>
                  <td>Sí</td>
                  <td>Usuario1</td>
                  <td>user1@example.com</td>
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

