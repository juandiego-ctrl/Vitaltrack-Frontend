import React, { useState, useEffect } from 'react';
import styles from '../styles/CargueCancer.module.css';
import { FaQuestionCircle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from "react-router-dom";
import IconosFlotantes from './IconosFlotantes';

const CargueCancer = () => {
  const navigate = useNavigate();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState('Generalidades');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documento, setDocumento] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);

  // Función para seleccionar/deseleccionar pacientes
  const toggleSelection = (id) => {
    setSelectedPatients(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };
  const [filters, setFilters] = useState({
    eps: '',
    sexo: '',
    fechaCreacionDesde: '',
    fechaCreacionHasta: '',
    tipoDocumento: ''
  });
  const [showFilters, setShowFilters] = useState(false);

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
    console.log('🚀 Iniciando carga de archivo...');
    console.log('Archivo seleccionado:', selectedFile);
    console.log('Documento:', documento);

    if (!selectedFile) {
      alert('Por favor, selecciona un archivo Excel antes de cargar.');
      return;
    }

    // Opcional: si no hay documento, usar un valor por defecto o permitir sin él
    // if (!documento) {
    //   alert('Por favor, ingresa el número de documento del titular para asociar los pacientes.');
    //   return;
    // }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('📤 Enviando a:', `${BACKEND_URL}/excelarchivo/cargar-pacientes`);

      // CORREGIDO: Usar la ruta correcta del backend
      const response = await fetch(`${BACKEND_URL}/excelarchivo/cargar-pacientes`, {
        method: 'POST',
        body: formData,
      });

      console.log('📡 Respuesta HTTP:', response.status, response.statusText);

      const data = await response.json();
      console.log('📤 Respuesta del servidor:', data);

      if (data.ok) {
        // ✅ NUEVO: Mostrar detalles del procesamiento
        const resultados = data.detalles?.resultados || {};
        alert(`✅ ${data.mensaje}

📊 Resumen del procesamiento:
• Pacientes: ${resultados.pacientes || 0}
• Diagnósticos: ${resultados.diagnosticos || 0}
• Antecedentes: ${resultados.antecedentes || 0}
• Quimioterapias: ${resultados.tratamientos?.quimioterapia || 0}
• Radioterapias: ${resultados.tratamientos?.radioterapia || 0}
• Cirugías: ${resultados.tratamientos?.cirugia || 0}
• Trasplantes: ${resultados.tratamientos?.trasplante || 0}
• Cuidados Paliativos: ${resultados.tratamientos?.paliativos || 0}

${resultados.errores?.length > 0 ? `⚠️ Errores: ${resultados.errores.length}` : ''}`);

        // Recargar la lista después de cargar
        fetchTodos();
      } else {
        alert(`❌ Error: ${data.mensaje || 'Error al cargar el archivo'}`);
      }
    } catch (error) {
      console.error('❌ Error al cargar el archivo:', error);
      alert(`No se pudo conectar con el servidor. Error: ${error.message}`);
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
  const handleExport = async () => {
    const patientsToExport = selectedPatients.length > 0 ? rows.filter(p => selectedPatients.includes(p.V6NumID)) : rows;

    if (patientsToExport.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    try {
      setIsLoading(true);

      // Crear workbook con múltiples hojas
      const workbook = XLSX.utils.book_new();

      // Hoja 1: Datos básicos de pacientes
      const datosBasicos = patientsToExport.map(paciente => ({
        'Primer Nombre': paciente.V1PrimerNom || '',
        'Segundo Nombre': paciente.V2SegundoNom || '',
        'Primer Apellido': paciente.V3PrimerApe || '',
        'Segundo Apellido': paciente.V4SegundoApe || '',
        'Tipo Documento': paciente.V5TipoID || 'CC',
        'Número Documento': paciente.V6NumID || '',
        'Sexo': paciente.V8Sexo || '',
        'Teléfono': paciente.V15NumTel || '',
        'Fecha Nacimiento': paciente.V7FecNac ? new Date(paciente.V7FecNac).toLocaleDateString() : '',
        'Ocupación': paciente.V9Ocup || '',
        'Régimen Afiliación': paciente.V10RegAfiliacion || '',
        'Código EAPB': paciente.V11CodEAPB || '',
        'Código Etnia': paciente.V12CodEtnia || '',
        'Grupo Poblacional': paciente.V13GrupoPob || '',
        'Municipio Residencia': paciente.V14MpioRes || '',
        'Fecha Afiliación': paciente.V16FecAfiliacion ? new Date(paciente.V16FecAfiliacion).toLocaleDateString() : '',
        'Fecha Ingreso': paciente.FechaIngreso ? new Date(paciente.FechaIngreso).toLocaleDateString() : ''
      }));

      const worksheetBasicos = XLSX.utils.json_to_sheet(datosBasicos);
      XLSX.utils.book_append_sheet(workbook, worksheetBasicos, 'Datos Básicos');

      // Para cada paciente, obtener datos completos usando el método de ModalPaciente
      for (const paciente of patientsToExport) {
        try {
          const documento = paciente.V6NumID;
          const url = `${BACKEND_URL}/excelarchivo/expediente/${documento}`;
          const response = await fetch(url);

          if (response.ok) {
            const result = await response.json();
            if (result.ok) {
              const data = result;

              // Hoja de Diagnósticos
              if (data.diagnosticos && data.diagnosticos.length > 0) {
                const diagnosticosData = data.diagnosticos.map(d => ({
                  'Número Documento': documento,
                  'Código CIE-10': d.V17CodCIE10 || '',
                  'Fecha Diagnóstico': d.V18FecDiag ? new Date(d.V18FecDiag).toLocaleDateString() : '',
                  'Fecha Remisión': d.V19FecRemision ? new Date(d.V19FecRemision).toLocaleDateString() : '',
                  'Fecha Ingreso Inst.': d.V20FecIngInst ? new Date(d.V20FecIngInst).toLocaleDateString() : '',
                  'Tipo Estudio Diagnóstico': d.V21TipoEstDiag || '',
                  'Motivo No Histopatológico': d.V22MotNoHistop || '',
                  'Fecha Recolección Muestra': d.V23FecRecMuestra ? new Date(d.V23FecRecMuestra).toLocaleDateString() : '',
                  'Fecha Informe Histopatológico': d.V24FecInfHistop ? new Date(d.V24FecInfHistop).toLocaleDateString() : '',
                  'Código Habilidad IPS': d.V25CodHabIPS || '',
                  'Fecha Primera Consulta': d.V26Fec1raCons ? new Date(d.V26Fec1raCons).toLocaleDateString() : '',
                  'Histología Tumor': d.V27HistTumor || '',
                  'Grado Diferenciación Tumor': d.V28GradoDifTum || '',
                  'Estadificación Tumor': d.V29EstadifTum || '',
                  'Fecha Estadificación': d.V30FecEstadif ? new Date(d.V30FecEstadif).toLocaleDateString() : '',
                  'Prueba HER2': d.V31PruebaHER2 || '',
                  'Fecha Prueba HER2': d.V32FecPruebaHER2 ? new Date(d.V32FecPruebaHER2).toLocaleDateString() : '',
                  'Resultado HER2': d.V33ResHER2 || '',
                  'Estadificación Dukes': d.V34EstadifDukes || '',
                  'Fecha Est. Dukes': d.V35FecEstDukes ? new Date(d.V35FecEstDukes).toLocaleDateString() : '',
                  'Estadificación Linf/Mielo': d.V36EstadifLinfMielo || '',
                  'Clasificación Gleason': d.V37ClasGleason || '',
                  'Clasificación Riesgo LL': d.V38ClasRiesgoLL || '',
                  'Fecha Clas. Riesgo': d.V39FecClasRiesgo ? new Date(d.V39FecClasRiesgo).toLocaleDateString() : '',
                  'Objetivo Tratamiento Inicial': d.V40ObjTtoInicial || '',
                  'Intervención Médica': d.V41IntervMed || '',
                  'Agrupador': d.agrupador || '',
                  'Observaciones': d.observaciones || ''
                }));

                const worksheetDiag = XLSX.utils.json_to_sheet(diagnosticosData);
                XLSX.utils.book_append_sheet(workbook, worksheetDiag, `Diagnósticos_${documento}`);
              }

              // Hoja de Antecedentes
              if (data.antecedentes && data.antecedentes.length > 0) {
                const antecedentesData = data.antecedentes.map(a => ({
                  'Número Documento': documento,
                  'Antecedente Cáncer Primario': a.V42AntCancerPrim || '',
                  'Fecha Diagnóstico': a.V43FecDiagAnt ? new Date(a.V43FecDiagAnt).toLocaleDateString() : '',
                  'Tipo Cáncer': a.V44TipoCancerAnt || ''
                }));

                const worksheetAnt = XLSX.utils.json_to_sheet(antecedentesData);
                XLSX.utils.book_append_sheet(workbook, worksheetAnt, `Antecedentes_${documento}`);
              }

              // Hoja de Quimioterapia
              if (data.tratamientos?.quimioterapia && data.tratamientos.quimioterapia.length > 0) {
                const quimioData = data.tratamientos.quimioterapia.map(q => ({
                  'Número Documento': documento,
                  'Recibió Quimioterapia': q.V45RecibioQuimio || '',
                  'Número Fases': q.V46NumFasesQuimio || '',
                  'Número Ciclos': q.V47NumCiclosQuimio || '',
                  'Fecha Inicio': q.V49FecIniEsq1 ? new Date(q.V49FecIniEsq1).toLocaleDateString() : '',
                  'Fecha Fin': q.V58FecFinTto ? new Date(q.V58FecFinTto).toLocaleDateString() : ''
                }));

                const worksheetQuimio = XLSX.utils.json_to_sheet(quimioData);
                XLSX.utils.book_append_sheet(workbook, worksheetQuimio, `Quimioterapia_${documento}`);
              }

              // Hoja de Radioterapia
              if (data.tratamientos?.radioterapia && data.tratamientos.radioterapia.length > 0) {
                const radioData = data.tratamientos.radioterapia.map(r => ({
                  'Número Documento': documento,
                  'Recibió Radioterapia': r.V86RecibioRadioterapia || '',
                  'Número Sesiones': r.V87NumSesionesRadio || '',
                  'Fecha Inicio Esq. 1': r.V88FecIniEsq1Radio ? new Date(r.V88FecIniEsq1Radio).toLocaleDateString() : '',
                  'Ubicación Temp. Esq. 1': r.V89UbicTempEsq1Radio || '',
                  'Tipo Radio Esq. 1': r.V90TipoRadioEsq1 || '',
                  'Num. IPS Radio Esq. 1': r.V91NumIPSRadioEsq1 || '',
                  'Cod. IPS Radio 1 Esq. 1': r.V92CodIPSRadio1Esq1 || '',
                  'Cod. IPS Radio 2 Esq. 1': r.V93CodIPSRadio2Esq1 || '',
                  'Fecha Fin Esq. 1': r.V94FecFinEsq1Radio ? new Date(r.V94FecFinEsq1Radio).toLocaleDateString() : '',
                  'Características Esq. 1': r.V95CaractEsq1Radio || '',
                  'Motivo Fin Esq. 1': r.V96MotFinEsq1Radio || '',
                  'Fecha Ini. Ult. Esq.': r.V97FecIniUltEsqRadio ? new Date(r.V97FecIniUltEsqRadio).toLocaleDateString() : '',
                  'Ubic. Temp. Ult. Esq.': r.V98UbicTempUltEsqRadio || '',
                  'Tipo Radio Ult. Esq.': r.V99TipoRadioUltEsq || '',
                  'Num. IPS Radio Ult. Esq.': r.V100NumIPSRadioUltEsq || '',
                  'Cod. IPS Radio 1 Ult. Esq.': r.V101CodIPSRadio1UltEsq || '',
                  'Cod. IPS Radio 2 Ult. Esq.': r.V102CodIPSRadio2UltEsq || '',
                  'Fecha Fin Ult. Esq.': r.V103FecFinUltEsqRadio ? new Date(r.V103FecFinUltEsqRadio).toLocaleDateString() : '',
                  'Características Ult. Esq.': r.V104CaractUltEsqRadio || '',
                  'Motivo Fin Ult. Esq.': r.V105MotFinUltEsqRadio || ''
                }));

                const worksheetRadio = XLSX.utils.json_to_sheet(radioData);
                XLSX.utils.book_append_sheet(workbook, worksheetRadio, `Radioterapia_${documento}`);
              }

              // Hoja de Cirugía Oncológica
              if (data.tratamientos?.cirugia && data.tratamientos.cirugia.length > 0) {
                const cirugiaData = data.tratamientos.cirugia.map(c => ({
                  'Número Documento': documento,
                  'Recibió Cirugía': c.V45RecibioQuimio || '', // Ajustar según campos reales
                  'Número Fases': c.V46NumFasesQuimio || '',
                  'Número Ciclos': c.V47NumCiclosQuimio || ''
                }));

                const worksheetCirugia = XLSX.utils.json_to_sheet(cirugiaData);
                XLSX.utils.book_append_sheet(workbook, worksheetCirugia, `Cirugía_${documento}`);
              }

              // Hoja de Trasplante
              if (data.tratamientos?.trasplante && data.tratamientos.trasplante.length > 0) {
                const trasplanteData = data.tratamientos.trasplante.map(t => ({
                  'Número Documento': documento,
                  'Recibió Trasplante': t.V106RecibioTrasplanteCM || '',
                  'Tipo Trasplante': t.V107TipoTrasplanteCM || '',
                  'Fecha Trasplante': t.V109FecTrasplanteCM ? new Date(t.V109FecTrasplanteCM).toLocaleDateString() : ''
                }));

                const worksheetTrasplante = XLSX.utils.json_to_sheet(trasplanteData);
                XLSX.utils.book_append_sheet(workbook, worksheetTrasplante, `Trasplante_${documento}`);
              }

              // Hoja de Cirugía Reconstructiva
              if (data.tratamientos?.cirugiaReconstructiva && data.tratamientos.cirugiaReconstructiva.length > 0) {
                const reconstData = data.tratamientos.cirugiaReconstructiva.map(r => ({
                  'Número Documento': documento,
                  'Recibió Cirugía Reconstructiva': r.V111RecibioCirugiaReconst || '',
                  'Fecha Cirugía': r.V112FecCirugiaReconst ? new Date(r.V112FecCirugiaReconst).toLocaleDateString() : '',
                  'Código IPS Cirugía': r.V113CodIPSCirugiaReconst || ''
                }));

                const worksheetReconst = XLSX.utils.json_to_sheet(reconstData);
                XLSX.utils.book_append_sheet(workbook, worksheetReconst, `Cirugía_Reconstructiva_${documento}`);
              }

              // Hoja de Cuidados Paliativos
              if (data.tratamientos?.cuidadosPaliativos && data.tratamientos.cuidadosPaliativos.length > 0) {
                const paliativosData = data.tratamientos.cuidadosPaliativos.map(p => ({
                  'Número Documento': documento,
                  'Recibió Cuidados Paliativos': p.V114RecibioCuidadoPaliativo || '',
                  'Médico Especialista': p.V114_1CP_MedEspecialista || '',
                  'Prof. Salud No Médico': p.V114_2CP_ProfSaludNoMed || '',
                  'Médico Otra Especialidad': p.V114_3CP_MedOtraEspecialidad || '',
                  'Médico General': p.V114_4CP_MedGeneral || '',
                  'Trabajo Social': p.V114_5CP_TrabajoSocial || '',
                  'Otro Prof. Salud': p.V114_6CP_OtroProfSalud || '',
                  'Fecha Primera Consulta CP': p.V115FecPrimConsCP ? new Date(p.V115FecPrimConsCP).toLocaleDateString() : '',
                  'Código IPS CP': p.V116CodIPS_CP || '',
                  'Valorado Psiquiatría': p.V117ValoradoPsiquiatria || '',
                  'Fecha Primera Consulta Psiquiatría': p.V118FecPrimConsPsiq ? new Date(p.V118FecPrimConsPsiq).toLocaleDateString() : '',
                  'Código IPS Psiquiatría': p.V119CodIPS_Psiq || '',
                  'Valorado Nutrición': p.V120ValoradoNutricion || '',
                  'Fecha Primera Consulta Nutrición': p.V121FecPrimConsNutr ? new Date(p.V121FecPrimConsNutr).toLocaleDateString() : '',
                  'Código IPS Nutrición': p.V122CodIPS_Nutr || '',
                  'Tipo Soporte Nutricional': p.V123TipoSoporteNutricional || '',
                  'Terapias Complementarias': p.V124TerapiasComplementarias || ''
                }));

                const worksheetPaliativos = XLSX.utils.json_to_sheet(paliativosData);
                XLSX.utils.book_append_sheet(workbook, worksheetPaliativos, `Paliativos_${documento}`);
              }
            }
          }
        } catch (error) {
          console.warn(`Error obteniendo datos completos para paciente ${paciente.V6NumID}:`, error);
        }
      }

      // Generar y descargar el archivo Excel
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const filename = selectedPatients.length > 0
        ? `pacientes_seleccionados_${new Date().toISOString().split('T')[0]}.xlsx`
        : `todos_pacientes_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, filename);
      alert(`✅ Archivo exportado correctamente con ${patientsToExport.length} paciente(s)`);

    } catch (error) {
      console.error('❌ Error exportando:', error);
      alert('Error al exportar el archivo');
    } finally {
      setIsLoading(false);
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
              <li>Selecciona un archivo Excel con datos completos de pacientes oncológicos</li>
              <li>Haz clic en "Cargar" para procesar automáticamente:
                <ul>
                  <li>✅ Datos básicos del paciente</li>
                  <li>✅ Información diagnóstica</li>
                  <li>✅ Antecedentes médicos</li>
                  <li>✅ Tratamientos (quimioterapia, radioterapia, cirugía, etc.)</li>
                </ul>
              </li>
              <li>Revisa el resumen detallado del procesamiento</li>
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
    <div className={styles.background}>
      <IconosFlotantes />
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
              disabled={!selectedFile || isLoading}
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

        {selectedFile && (
          <div style={{
            marginTop: '20px',
            marginBottom: '10px',
            padding: '12px 16px',
            backgroundColor: '#e8f5e8',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#2e7d32',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <span style={{ fontSize: '18px' }}>📄</span>
            <span>Archivo seleccionado:</span>
            <strong style={{ color: '#1b5e20' }}>{selectedFile.name}</strong>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#4caf50' }}>
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        )}

        {/* Modal de ayuda */}
        {isHelpModalOpen && (
          <div className={styles.modalBackdrop} onClick={toggleHelpModal}>
            <div
              className={`${styles.modal} ${isExiting ? styles.modalExit : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>🆘 Centro de Ayuda - Sistema de Pacientes Oncológicos</h2>
                <button className={styles.closeButton} onClick={toggleHelpModal}>✕</button>
              </div>
              <div className={styles.tabButtons}>
                <button
                  className={`${styles.tabButton} ${activeTab === 'Generalidades' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('Generalidades')}
                >
                  📖 Generalidades
                </button>
                <button
                  className={`${styles.tabButton} ${activeTab === 'Documentos' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('Documentos')}
                >
                  📋 Documentos
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



        {/* Tabla de Pacientes */}
        {showTable && rows.length > 0 && (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPatients(rows.map(p => p.V6NumID));
                        } else {
                          setSelectedPatients([]);
                        }
                      }}
                      checked={selectedPatients.length === rows.length && rows.length > 0}
                    />
                  </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(p.V6NumID)}
                        onChange={() => toggleSelection(p.V6NumID)}
                      />
                    </td>
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
    </div>
  );
};

export default CargueCancer;