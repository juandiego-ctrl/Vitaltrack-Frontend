import React, { useState, useEffect } from "react";
import style from "../styles/ModalPaciente.css";

const API_BASE_URL = "https://vitaltrack-backend-v5el.onrender.com";

const ModalPaciente = ({ documento, onClose }) => {
  const [data, setData] = useState({
    paciente: null,
    diagnosticos: [],
    antecedentes: [],
    ttocx: [],            // Quimioterapia
    ttoqt: [],            // Cirugía Oncológica
    ttort: [],            // Radioterapia
    ttotrasplante: [],
    archivos: [],
    ttocxreconst: [],
    ttopaliativos: [],
    citas: [],
    medicamentos: [],
    zipsSoportes: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("paciente");
  const [editMode, setEditMode] = useState({});

  // ==============================================================
  // CARGA INICIAL
  // ==============================================================
  const cargarHistorial = async () => {
    if (!documento) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/excelarchivo/expediente/${documento}`);

      if (!res.ok) {
        if (res.status === 404) {
          alert(`Paciente con cédula ${documento} no encontrado`);
          onClose();
          return;
        }
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();

      if (result.ok) {
        setData({
          paciente: result.datosPersonales?.[0] || null,
          diagnosticos: result.diagnosticos || [],
          antecedentes: result.antecedentes || [],
          ttocx: result.tratamientos?.quimioterapia || [],
          ttoqt: result.tratamientos?.cirugia || [],
          ttort: result.tratamientos?.radioterapia || [],
          ttotrasplante: result.tratamientos?.trasplante || [],
          archivos: result.archivosPacientes || [],
          ttocxreconst: result.tratamientos?.cirugiaReconstructiva || [],
          ttopaliativos: result.tratamientos?.cuidadosPaliativos || [],
          citas: result.citas || [],
          medicamentos: result.medicamentos || [],
          zipsSoportes: result.zipsSoportes || []
        });
      } else {
        alert("Error en la respuesta del servidor");
        onClose();
      }
    } catch (err) {
      alert("Error de conexión al cargar el historial");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, [documento, onClose]);

  // ==============================================================
  // RECARGAR DESPUÉS DE GUARDAR/ELIMINAR
  // ==============================================================
  const recargarHistorial = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/excelarchivo/expediente/${documento}`);
      if (res.ok) {
        const result = await res.json();
        if (result.ok) {
          setData({
            paciente: result.datosPersonales?.[0] || null,
            diagnosticos: result.diagnosticos || [],
            antecedentes: result.antecedentes || [],
            ttocx: result.tratamientos?.quimioterapia || [],
            ttoqt: result.tratamientos?.cirugia || [],
            ttort: result.tratamientos?.radioterapia || [],
            ttotrasplante: result.tratamientos?.trasplante || [],
            archivos: result.archivosPacientes || [],
            ttocxreconst: result.tratamientos?.cirugiaReconstructiva || [],
            ttopaliativos: result.tratamientos?.cuidadosPaliativos || [],
            citas: result.citas || [],
            medicamentos: result.medicamentos || [],
            zipsSoportes: result.zipsSoportes || []
          });
        }
      }
    } catch (error) {
      console.error("Error recargando:", error);
    }
  };

  // ==============================================================
  // FORMATOS DE FECHA
  // ==============================================================
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateToISO = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString();
  };

  // ==============================================================
  // MANEJO DE CAMBIOS EN INPUTS
  // ==============================================================
  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updated = [...data[section]];
      updated[index] = { ...updated[index], [field]: value };
      setData(prev => ({ ...prev, [section]: updated }));
    } else {
      setData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  // ==============================================================
  // GUARDAR (PACIENTE, DIAGNÓSTICOS Y TRATAMIENTOS)
  // ==============================================================
  const handleSave = async (section, item = null, index = null) => {
    setSaving(true);

    try {
      let endpoint = "";
      let method = "POST";
      let bodyData = {};

      const dataToSave = index !== null ? data[section][index] : item || data[section];

      if (!documento) {
        alert("Error: No se encontró el documento del paciente");
        setSaving(false);
        return;
      }

      if (!dataToSave) {
        alert("No hay datos para guardar");
        setSaving(false);
        return;
      }

      switch (section) {
        case "paciente":
          endpoint = `${API_BASE_URL}/paciente/${documento}`;
          method = "PATCH";
          bodyData = {
            V1PrimerNom: dataToSave.V1PrimerNom || "",
            V2SegundoNom: dataToSave.V2SegundoNom || "",
            V3PrimerApe: dataToSave.V3PrimerApe || "",
            V4SegundoApe: dataToSave.V4SegundoApe || "",
            V5TipoID: dataToSave.V5TipoID || "CC",
            V6NumID: documento,
            V7FecNac: dataToSave.V7FecNac || "",
            V8Sexo: dataToSave.V8Sexo || "",
            V9Ocup: dataToSave.V9Ocup || "",
            V10RegAfiliacion: dataToSave.V10RegAfiliacion || "",
            V11CodEAPB: dataToSave.V11CodEAPB || "",
            V12CodEtnia: dataToSave.V12CodEtnia || "",
            V13GrupoPob: dataToSave.V13GrupoPob || "",
            V14MpioRes: dataToSave.V14MpioRes || "",
            V15NumTel: dataToSave.V15NumTel || "",
            V16FecAfiliacion: dataToSave.V16FecAfiliacion || "",
            FechaIngreso: dataToSave.FechaIngreso || new Date().toISOString()
          };
          break;

        case "diagnosticos":
          const diagId = dataToSave._id;
          if (diagId && diagId !== "null") {
            endpoint = `${API_BASE_URL}/diagnostico/${diagId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/diagnostico`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            pacienteId: documento,
            V6NumID: documento
          };
          break;

        case "antecedentes":
          const antId = dataToSave._id;
          if (antId && antId !== "null") {
            endpoint = `${API_BASE_URL}/antecedentes/${antId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/antecedentes`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumId: documento
          };
          break;

        case "ttocx":
          const ttocxId = dataToSave._id;
          if (ttocxId && ttocxId !== "null") {
            endpoint = `${API_BASE_URL}/ttocx/${ttocxId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttocx`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        case "ttoqt":
          const ttoqtId = dataToSave._id;
          if (ttoqtId && ttoqtId !== "null") {
            endpoint = `${API_BASE_URL}/ttoqt/${ttoqtId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttoqt`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        case "ttort":
          const ttortId = dataToSave._id;
          if (ttortId && ttortId !== "null") {
            endpoint = `${API_BASE_URL}/ttort/${ttortId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttort`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        case "ttotrasplante":
          const ttotrasplanteId = dataToSave._id;
          if (ttotrasplanteId && ttotrasplanteId !== "null") {
            endpoint = `${API_BASE_URL}/ttotrasplante/${ttotrasplanteId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttotrasplante`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        case "ttocxreconst":
          const ttocxreconstId = dataToSave._id;
          if (ttocxreconstId && ttocxreconstId !== "null") {
            endpoint = `${API_BASE_URL}/ttocxreconstructiva/${ttocxreconstId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttocxreconstructiva`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        case "ttopaliativos":
          const ttopaliativosId = dataToSave._id;
          if (ttopaliativosId && ttopaliativosId !== "null") {
            endpoint = `${API_BASE_URL}/ttopaliativos/${ttopaliativosId}`;
            method = "PATCH";
          } else {
            endpoint = `${API_BASE_URL}/ttopaliativos`;
            method = "POST";
          }
          bodyData = {
            ...dataToSave,
            V6NumID: documento
          };
          break;

        default:
          alert("Sección no soportada aún para guardar");
          setSaving(false);
          return;
      }

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      let responseData = {};
      try {
        const text = await res.text();
        if (text) responseData = JSON.parse(text);
      } catch {}

      if (res.ok) {
        alert("Guardado exitoso");
        await recargarHistorial();
        setEditMode({});
      } else {
        let msg = `Error ${res.status}: `;
        msg += responseData.mensaje || responseData.error || "No se pudo guardar";
        if (res.status === 404) msg += `\nEndpoint: ${method} ${endpoint}`;
        alert(msg);
      }
    } catch (err) {
      alert(`Error de conexión: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ==============================================================
  // ELIMINAR
  // ==============================================================
  const handleDelete = async (section, id) => {
    if (!window.confirm("¿Está seguro de eliminar este registro?")) return;

    try {
      let endpoint = "";
      switch (section) {
        case "diagnosticos": endpoint = `${API_BASE_URL}/diagnostico/${id}`; break;
        case "antecedentes": endpoint = `${API_BASE_URL}/antecedentes/${id}`; break;
        case "ttocx": endpoint = `${API_BASE_URL}/ttocx/${id}`; break;
        case "ttoqt": endpoint = `${API_BASE_URL}/ttoqt/${id}`; break;
        case "ttort": endpoint = `${API_BASE_URL}/ttort/${id}`; break;
        case "ttotrasplante": endpoint = `${API_BASE_URL}/ttotrasplante/${id}`; break;
        case "ttocxreconst": endpoint = `${API_BASE_URL}/ttocxreconstructiva/${id}`; break;
        case "ttopaliativos": endpoint = `${API_BASE_URL}/ttopaliativos/${id}`; break;
        default: return;
      }

      const res = await fetch(endpoint, { method: "DELETE" });

      if (res.ok) {
        alert("Registro eliminado");
        await recargarHistorial();
      } else {
        alert("No se pudo eliminar");
      }
    } catch {
      alert("Error de conexión al eliminar");
    }
  };

  // ==============================================================
  // AGREGAR NUEVO ITEM
  // ==============================================================
  const addNewItem = (section) => {
    const newItem = getDefaultItem(section);
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    setEditMode(prev => ({ ...prev, [section]: data[section].length }));
  };

  // ==============================================================
  // ITEM POR DEFECTO
  // ==============================================================
  const getDefaultItem = (section) => {
    const base = { pacienteId: documento, V6NumID: documento, V6NumId: documento };

    switch (section) {
      case "diagnosticos":
        return { ...base, V17CodCIE10: "", V18FecDiag: "", observaciones: "", agrupador: "" };
      case "antecedentes":
        return { ...base, V42AntCancerPrim: "", V43FecDiagAnt: "", V44TipoCancerAnt: "" };
      case "ttocx":
        return { ...base, V45RecibioQuimio: "", V46NumFasesQuimio: "", V47NumCiclosQuimio: "", V49FecIniEsq1: "" };
      case "ttoqt":
        return { ...base, V45RecibioQuimio: "", V46NumFasesQuimio: "", V47NumCiclosQuimio: "" };
      case "ttort":
        return { ...base, V86RecibioRadioterapia: "", V87NumSesionesRadio: "", V88FecIniEsq1Radio: "" };
      case "ttotrasplante":
        return { ...base, V106RecibioTrasplanteCM: "", V107TipoTrasplanteCM: "", V109FecTrasplanteCM: "" };
      case "ttocxreconst":
        return { ...base, V111RecibioCirugiaReconst: "", V112FecCirugiaReconst: "" };
      case "ttopaliativos":
        return { ...base, V114RecibioCuidadoPaliativo: "", V115FecPrimConsCP: "" };
      default:
        return base;
    }
  };

  // ==============================================================
  // CAMPOS POR SECCIÓN
  // ==============================================================
  const pacienteFields = [
    { key: "V1PrimerNom", label: "Primer Nombre", type: "text" },
    { key: "V2SegundoNom", label: "Segundo Nombre", type: "text" },
    { key: "V3PrimerApe", label: "Primer Apellido", type: "text" },
    { key: "V4SegundoApe", label: "Segundo Apellido", type: "text" },
    { key: "V5TipoID", label: "Tipo ID", type: "text" },
    { key: "V6NumID", label: "Número ID", type: "text" },
    { key: "V7FecNac", label: "Fecha Nacimiento", type: "date" },
    { key: "V8Sexo", label: "Sexo", type: "select", options: [
      { value: "Masculino", label: "Masculino" },
      { value: "Femenino", label: "Femenino" },
      { value: "Otro", label: "Otro" }
    ]},
    { key: "V9Ocup", label: "Ocupación", type: "text" },
    { key: "V10RegAfiliacion", label: "Régimen Afiliación", type: "text" },
    { key: "V11CodEAPB", label: "Código EAPB", type: "text" },
    { key: "V12CodEtnia", label: "Código Etnia", type: "text" },
    { key: "V13GrupoPob", label: "Grupo Poblacional", type: "text" },
    { key: "V14MpioRes", label: "Municipio Residencia", type: "text" },
    { key: "V15NumTel", label: "Teléfono", type: "text" },
    { key: "V16FecAfiliacion", label: "Fecha Afiliación", type: "date" },
    { key: "FechaIngreso", label: "Fecha Ingreso", type: "date" }
  ];

  const diagnosticoFields = [
    { key: "V17CodCIE10", label: "Código CIE-10", type: "text" },
    { key: "V18FecDiag", label: "Fecha Diagnóstico", type: "date" },
    { key: "V19FecRemision", label: "Fecha Remisión", type: "date" },
    { key: "V20FecIngInst", label: "Fecha Ingreso Inst.", type: "date" },
    { key: "V21TipoEstDiag", label: "Tipo Estudio Diagnóstico", type: "text" },
    { key: "V22MotNoHistop", label: "Motivo No Histopatológico", type: "text" },
    { key: "V23FecRecMuestra", label: "Fecha Recolección Muestra", type: "date" },
    { key: "V24FecInfHistop", label: "Fecha Informe Histopatológico", type: "date" },
    { key: "V25CodHabIPS", label: "Código Habilidad IPS", type: "text" },
    { key: "V26Fec1raCons", label: "Fecha Primera Consulta", type: "date" },
    { key: "V27HistTumor", label: "Histología Tumor", type: "text" },
    { key: "V28GradoDifTum", label: "Grado Diferenciación Tumor", type: "text" },
    { key: "V29EstadifTum", label: "Estadificación Tumor", type: "text" },
    { key: "V30FecEstadif", label: "Fecha Estadificación", type: "date" },
    { key: "V31PruebaHER2", label: "Prueba HER2", type: "text" },
    { key: "V32FecPruebaHER2", label: "Fecha Prueba HER2", type: "date" },
    { key: "V33ResHER2", label: "Resultado HER2", type: "text" },
    { key: "V34EstadifDukes", label: "Estadificación Dukes", type: "text" },
    { key: "V35FecEstDukes", label: "Fecha Est. Dukes", type: "date" },
    { key: "V36EstadifLinfMielo", label: "Estadificación Linf/Mielo", type: "text" },
    { key: "V37ClasGleason", label: "Clasificación Gleason", type: "text" },
    { key: "V38ClasRiesgoLL", label: "Clasificación Riesgo LL", type: "text" },
    { key: "V39FecClasRiesgo", label: "Fecha Clas. Riesgo", type: "date" },
    { key: "V40ObjTtoInicial", label: "Objetivo Tratamiento Inicial", type: "text" },
    { key: "V41IntervMed", label: "Intervención Médica", type: "text" },
    { key: "agrupador", label: "Agrupador", type: "text" },
    { key: "observaciones", label: "Observaciones", type: "text" }
  ];

  const antecedenteFields = [
    { key: "V42AntCancerPrim", label: "Antecedente Cáncer Primario", type: "text" },
    { key: "V43FecDiagAnt", label: "Fecha Diagnóstico", type: "date" },
    { key: "V44TipoCancerAnt", label: "Tipo Cáncer", type: "text" }
  ];

  const ttocxFields = [
    { key: "V45RecibioQuimio", label: "Recibió Quimioterapia", type: "text" },
    { key: "V46NumFasesQuimio", label: "Número Fases", type: "number" },
    { key: "V47NumCiclosQuimio", label: "Número Ciclos", type: "number" },
    { key: "V49FecIniEsq1", label: "Fecha Inicio", type: "date" },
    { key: "V58FecFinTto", label: "Fecha Fin", type: "date" }
  ];

  const ttoqtFields = [
    { key: "V45RecibioQuimio", label: "Recibió Quimio", type: "text" },
    { key: "V46NumFasesQuimio", label: "Número Fases", type: "text" },
    { key: "V47NumCiclosQuimio", label: "Número Ciclos", type: "text" }
  ];

  const ttortFields = [
    { key: "V86RecibioRadioterapia", label: "Recibió Radioterapia", type: "text" },
    { key: "V87NumSesionesRadio", label: "Número Sesiones", type: "number" },
    { key: "V88FecIniEsq1Radio", label: "Fecha Inicio Esq. 1", type: "date" },
    { key: "V89UbicTempEsq1Radio", label: "Ubicación Temp. Esq. 1", type: "text" },
    { key: "V90TipoRadioEsq1", label: "Tipo Radio Esq. 1", type: "text" },
    { key: "V91NumIPSRadioEsq1", label: "Num. IPS Radio Esq. 1", type: "number" },
    { key: "V92CodIPSRadio1Esq1", label: "Cod. IPS Radio 1 Esq. 1", type: "text" },
    { key: "V93CodIPSRadio2Esq1", label: "Cod. IPS Radio 2 Esq. 1", type: "text" },
    { key: "V94FecFinEsq1Radio", label: "Fecha Fin Esq. 1", type: "date" },
    { key: "V95CaractEsq1Radio", label: "Características Esq. 1", type: "text" },
    { key: "V96MotFinEsq1Radio", label: "Motivo Fin Esq. 1", type: "text" },
    { key: "V97FecIniUltEsqRadio", label: "Fecha Ini. Ult. Esq.", type: "date" },
    { key: "V98UbicTempUltEsqRadio", label: "Ubic. Temp. Ult. Esq.", type: "text" },
    { key: "V99TipoRadioUltEsq", label: "Tipo Radio Ult. Esq.", type: "text" },
    { key: "V100NumIPSRadioUltEsq", label: "Num. IPS Radio Ult. Esq.", type: "number" },
    { key: "V101CodIPSRadio1UltEsq", label: "Cod. IPS Radio 1 Ult. Esq.", type: "text" },
    { key: "V102CodIPSRadio2UltEsq", label: "Cod. IPS Radio 2 Ult. Esq.", type: "text" },
    { key: "V103FecFinUltEsqRadio", label: "Fecha Fin Ult. Esq.", type: "date" },
    { key: "V104CaractUltEsqRadio", label: "Características Ult. Esq.", type: "text" },
    { key: "V105MotFinUltEsqRadio", label: "Motivo Fin Ult. Esq.", type: "text" }
  ];

  const ttotrasplanteFields = [
    { key: "V106RecibioTrasplanteCM", label: "Recibió Trasplante", type: "text" },
    { key: "V107TipoTrasplanteCM", label: "Tipo Trasplante", type: "text" },
    { key: "V109FecTrasplanteCM", label: "Fecha Trasplante", type: "date" }
  ];

  const ttocxreconstFields = [
    { key: "V111RecibioCirugiaReconst", label: "Recibió Cirugía Reconstructiva", type: "text" },
    { key: "V112FecCirugiaReconst", label: "Fecha Cirugía", type: "date" },
    { key: "V113CodIPSCirugiaReconst", label: "Código IPS Cirugía", type: "text" }
  ];

  const ttopaliativosFields = [
    { key: "V114RecibioCuidadoPaliativo", label: "Recibió Cuidados Paliativos", type: "text" },
    { key: "V114_1CP_MedEspecialista", label: "Médico Especialista", type: "text" },
    { key: "V114_2CP_ProfSaludNoMed", label: "Prof. Salud No Médico", type: "text" },
    { key: "V114_3CP_MedOtraEspecialidad", label: "Médico Otra Especialidad", type: "text" },
    { key: "V114_4CP_MedGeneral", label: "Médico General", type: "text" },
    { key: "V114_5CP_TrabajoSocial", label: "Trabajo Social", type: "text" },
    { key: "V114_6CP_OtroProfSalud", label: "Otro Prof. Salud", type: "text" },
    { key: "V115FecPrimConsCP", label: "Fecha Primera Consulta CP", type: "date" },
    { key: "V116CodIPS_CP", label: "Código IPS CP", type: "text" },
    { key: "V117ValoradoPsiquiatria", label: "Valorado Psiquiatría", type: "text" },
    { key: "V118FecPrimConsPsiq", label: "Fecha Primera Consulta Psiquiatría", type: "date" },
    { key: "V119CodIPS_Psiq", label: "Código IPS Psiquiatría", type: "text" },
    { key: "V120ValoradoNutricion", label: "Valorado Nutrición", type: "text" },
    { key: "V121FecPrimConsNutr", label: "Fecha Primera Consulta Nutrición", type: "date" },
    { key: "V122CodIPS_Nutr", label: "Código IPS Nutrición", type: "text" },
    { key: "V123TipoSoporteNutricional", label: "Tipo Soporte Nutricional", type: "text" },
    { key: "V124TerapiasComplementarias", label: "Terapias Complementarias", type: "text" }
  ];

  const getFieldsForSection = (section) => {
    switch (section) {
      case "paciente": return pacienteFields;
      case "diagnosticos": return diagnosticoFields;
      case "antecedentes": return antecedenteFields;
      case "ttocx": return ttocxFields;
      case "ttoqt": return ttoqtFields;
      case "ttort": return ttortFields;
      case "ttotrasplante": return ttotrasplanteFields;
      case "ttocxreconst": return ttocxreconstFields;
      case "ttopaliativos": return ttopaliativosFields;
      default: return [];
    }
  };

  // ==============================================================
  // RENDER DE CAMPOS
  // ==============================================================
  const renderField = (label, value, onChange, type = "text", options = []) => {
    if (type === "date") {
      const formatted = formatDateForInput(value);
      return (
        <div className="form-field" key={label}>
          <label>{label}</label>
          <input
            type="date"
            value={formatted}
            onChange={(e) => onChange(formatDateToISO(e.target.value))}
          />
        </div>
      );
    } else if (type === "select") {
      return (
        <div className="form-field" key={label}>
          <label>{label}</label>
          <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">Seleccionar...</option>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      );
    } else {
      return (
        <div className="form-field" key={label}>
          <label>{label}</label>
          <input
            type={type === "number" ? "number" : "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
          />
        </div>
      );
    }
  };

  // ==============================================================
  // RENDER DE SECCIÓN DE FORMULARIO
  // ==============================================================
  const renderFormSection = (section, fields, index = null) => {
    const item = index !== null ? data[section][index] : data[section];
    const isEditing = editMode[section] === (index ?? true);

    return (
      <div className={`form-section ${isEditing ? 'editing' : ''}`}>
        <div className="form-section-header">
          <h4>{section === "paciente" ? "Datos del Paciente" : `Registro ${index + 1}`}</h4>
          <div className="form-actions">
            {!isEditing ? (
              <button onClick={() => setEditMode(prev => ({ ...prev, [section]: index ?? true }))} className="btn-edit">
                Editar
              </button>
            ) : (
              <>
                <button onClick={() => handleSave(section, item, index)} className="btn-save" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar"}
                </button>
                <button onClick={() => setEditMode(prev => ({ ...prev, [section]: null }))} className="btn-cancel">
                  Cancelar
                </button>
              </>
            )}
            {section !== "paciente" && !isEditing && item._id && (
              <button onClick={() => handleDelete(section, item._id)} className="btn-delete">
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="form-grid">
          {fields.map(f => {
            const val = item[f.key];
            const onCh = (newVal) => handleInputChange(section, f.key, newVal, index);
            return renderField(f.label, val, onCh, f.type, f.options || []);
          })}
        </div>
      </div>
    );
  };

  // ==============================================================
  // PESTAÑAS
  // ==============================================================
  const tabs = [
    { key: "paciente", label: "Paciente", icon: "Person", count: 1 },
    { key: "diagnosticos", label: "Diagnósticos", icon: "Stethoscope", count: data.diagnosticos?.length || 0 },
    { key: "antecedentes", label: "Antecedentes", icon: "Clipboard", count: data.antecedentes?.length || 0 },
    { key: "ttocx", label: "Quimioterapia", icon: "Syringe", count: data.ttocx?.length || 0 },
    { key: "ttoqt", label: "Cirugía Oncológica", icon: "Scalpel", count: data.ttoqt?.length || 0 },
    { key: "ttort", label: "Radioterapia", icon: "Radiation", count: data.ttort?.length || 0 },
    { key: "ttotrasplante", label: "Trasplante", icon: "Heart", count: data.ttotrasplante?.length || 0 },
    { key: "ttocxreconst", label: "Cirugía Reconst.", icon: "Redo", count: data.ttocxreconst?.length || 0 },
    { key: "ttopaliativos", label: "Paliativos", icon: "Bandage", count: data.ttopaliativos?.length || 0 },
  ];

  // ==============================================================
  // RENDER CONTENIDO DE PESTAÑA
  // ==============================================================
  const renderTabContent = () => {
    const items = data[activeTab] || [];

    if (activeTab === "paciente") {
      return <div className="tab-content-inner">{renderFormSection("paciente", pacienteFields)}</div>;
    }

    if (["diagnosticos", "antecedentes", "ttocx", "ttoqt", "ttort", "ttotrasplante", "ttocxreconst", "ttopaliativos"].includes(activeTab)) {
      return (
        <div className="tab-content-inner">
          <div className="section-header">
            <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
            <button onClick={() => addNewItem(activeTab)} className="btn-add-new">
              Agregar Nuevo
            </button>
          </div>
          {items.length > 0 ? (
            items.map((_, i) => (
              <div key={i}>{renderFormSection(activeTab, getFieldsForSection(activeTab), i)}</div>
            ))
          ) : (
            <p className="no-data">No hay registros</p>
          )}
        </div>
      );
    }

    // Puedes ir ampliando las demás pestañas cuando las necesites
    return <div className="tab-content-inner"><p>Sección en desarrollo</p></div>;
  };

  // ==============================================================
  // RENDER FINAL
  // ==============================================================
  if (loading) return <div className="modal-overlay"><div className="modal-content"><div className="modal-loading">Cargando...</div></div></div>;
  if (!data.paciente) return <div className="modal-overlay"><div className="modal-content"><div className="modal-error">Paciente no encontrado</div></div></div>;

  const p = data.paciente;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {p.V1PrimerNom} {p.V2SegundoNom} {p.V3PrimerApe} {p.V4SegundoApe}
            <br />
            <small>{p.V5TipoID || 'CC'}: {p.V6NumID || documento}</small>
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(t => (
              <button
                key={t.key}
                className={activeTab === t.key ? "tab active" : "tab"}
                onClick={() => setActiveTab(t.key)}
              >
                <span className="tab-icon">{t.icon}</span>
                <span className="tab-label">{t.label}</span>
                {t.count > 0 && <span className="badge">{t.count}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-body">
          {renderTabContent()}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPaciente;