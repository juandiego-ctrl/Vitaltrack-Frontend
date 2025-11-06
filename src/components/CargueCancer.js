import React, { useState } from 'react';
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
  const [showFilters, setShowFilters] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Filas de la tabla (simuladas o importadas)
  const [rows, setRows] = useState([]);

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

  const getMockRows = () => ([
    {
      id: 1,
      radicado: '12345',
      cuenta: 'Cáncer',
      ips: 'IPS Ejemplo 1',
      archivo: 'CAC_CUENTA_20250101.xlsx',
      fecha: '01/01/2025',
      soportes: 100,
      cargados: 95,
      consolidados: 5,
      estado: 'Exitoso',
      vigente: 'Sí',
      usuario: 'Juan Pérez',
      login: 'juan.perez@ejemplo.com',
      diligenciados: null,
      porcentaje: null,
    },
    {
      id: 2,
      radicado: '67890',
      cuenta: 'Cáncer',
      ips: 'IPS Ejemplo 2',
      archivo: 'CAC_CUENTA_20250103.xlsx',
      fecha: '03/01/2025',
      soportes: 80,
      cargados: 72,
      consolidados: 8,
      estado: 'En proceso',
      vigente: 'Sí',
      usuario: 'María López',
      login: 'maria.lopez@ejemplo.com',
      diligenciados: null,
      porcentaje: null,
    },
    {
      id: 3,
      radicado: '11223',
      cuenta: 'Cáncer',
      ips: 'IPS Ejemplo 3',
      archivo: 'CAC_CUENTA_20250105.xlsx',
      fecha: '05/01/2025',
      soportes: 60,
      cargados: 58,
      consolidados: 2,
      estado: 'Exitoso',
      vigente: 'Sí',
      usuario: 'Carlos Díaz',
      login: 'carlos.diaz@ejemplo.com',
      diligenciados: null,
      porcentaje: null,
    },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simula resultados al buscar
    setRows(getMockRows());
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

  const handleConsultarProgreso = () => {
    // Si no hay filas (ni tabla), las simulamos y mostramos la tabla
    if (rows.length === 0) {
      const base = getMockRows();
      setRows(base);
      setShowTable(true);
    }

    // Genera progreso simulado para cada fila (0..124 -> %)
    setRows(prev =>
      prev.map(r => {
        const diligenciados = Math.floor(Math.random() * (TOTAL_VARIABLES + 1));
        const porcentaje = Math.round((diligenciados / TOTAL_VARIABLES) * 100);
        return { ...r, diligenciados, porcentaje };
      })
    );
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
          <button className={styles.button1} onClick={handleFileUpload}>Cargar</button>
          <button className={styles.button1} onClick={handleConsultarProgreso}>Consultar progreso</button>
          <button className={styles.button1} onClick={() => navigate(-1)}>Regresar</button>
        </div>
        <div className={styles.statusBoxes}>
          <button className={styles.helpButton} onClick={toggleHelpModal}>
            <FaQuestionCircle /> ¿Ayuda?
          </button>
        </div>
      </div>

      {/* Modal ayuda */}
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

      {/* Buscador por documento */}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSearch}>
          <label className={styles.label}>NUMERO DE DOCUMENTO</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Consulta de paciente, por numero de cedula"
          />
          <button className={styles.submitButton1}>Buscar</button>
        </form>
      </div>

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
          type="button"
        >
          {showFilters ? 'Ocultar filtros' : 'Filtros'}
        </button>

        {showFilters && (
          <>
            <input type="text" name="ips" value={filters.ips} onChange={handleFilterChange} placeholder="IPS" className={styles.filterInput} />
            <input type="text" name="cuenta" value={filters.cuenta} onChange={handleFilterChange} placeholder="Cuenta" className={styles.filterInput} />
            <input type="text" name="usuario" value={filters.usuario} onChange={handleFilterChange} placeholder="Tipo Usuario" className={styles.filterInput} />
            <input type="text" name="radicado" value={filters.radicado} onChange={handleFilterChange} placeholder="Radicado" className={styles.filterInput} />
            <button className={styles.exportButton} onClick={handleExport} type="button">Exportar tabla general</button>
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
                <th>Usuario (progreso)</th>
                <th>Login</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id ?? i} className={styles.fadeInRow} style={{ animationDelay: `${i * 0.06}s` }}>
                  <td>{r.radicado}</td>
                  <td>{r.cuenta}</td>
                  <td>{r.ips}</td>
                  <td>{r.archivo}</td>
                  <td>{r.fecha}</td>
                  <td>{r.soportes}</td>
                  <td>{r.cargados}</td>
                  <td>{r.consolidados}</td>
                  <td>{r.estado}</td>
                  <td>{r.vigente}</td>
                  <td>
                    <div className={styles.userCell}>
                      <span className={styles.userName}>{r.usuario}</span>
                      {r.porcentaje == null ? (
                        <span className={styles.progressPlaceholder}>—</span>
                      ) : (
                        <>
                          <div className={styles.progressWrap}>
                            <div className={styles.progressTrack}>
                              <div
                                className={styles.progressFill}
                                style={{ width: `${r.porcentaje}%` }}
                                aria-label={`Progreso ${r.porcentaje}%`}
                              />
                            </div>
                            <span className={styles.progressPct}>{r.porcentaje}%</span>
                          </div>
                          <span className={styles.progressMini}>
                            {r.diligenciados}/{TOTAL_VARIABLES}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{r.login}</td>
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
