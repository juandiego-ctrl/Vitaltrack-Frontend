import React, { useState, useEffect, useRef } from "react";
import style from "../styles/ModalPaciente.css";

const API_BASE_URL = "https://vitaltrack-backend-v5el.onrender.com";

// Agrega esta función al inicio del componente (fuera del componente o como función auxiliar)
const testEndpoints = async () => {
  const endpointsToTest = [
    { url: `${API_BASE_URL}/diagnostico/681148e04abe2392d8245cfd`, method: 'PUT' },
    { url: `${API_BASE_URL}/diagnostico/681148e04abe2392d8245cfd`, method: 'PATCH' },
    { url: `${API_BASE_URL}/diagnosticos/681148e04abe2392d8245cfd`, method: 'PUT' },
    { url: `${API_BASE_URL}/diagnosticos/681148e04abe2392d8245cfd`, method: 'PATCH' },
    { url: `${API_BASE_URL}/diagnostico`, method: 'POST' },
    { url: `${API_BASE_URL}/diagnosticos`, method: 'POST' },
  ];

  console.log('🔍 Probando endpoints...');
  
  for (const test of endpointsToTest) {
    try {
      console.log(`📡 Probando: ${test.method} ${test.url}`);
      const res = await fetch(test.url, {
        method: test.method,
        headers: { 'Content-Type': 'application/json' },
        body: test.method === 'GET' ? null : JSON.stringify({ test: true })
      });
      console.log(`✅ ${test.method} ${test.url}: ${res.status} ${res.statusText}`);
    } catch (error) {
      console.log(`❌ ${test.method} ${test.url}: ${error.message}`);
    }
  }
};




// Llama a esta función cuando necesites debuggear
// testEndpoints();

const ModalPaciente = ({ documento, onClose }) => {
  const [data, setData] = useState({
    paciente: null,
    diagnosticos: [],
    antecedentes: [],
    ttocx: [],
    ttoqt: [],
    ttort: [],
    ttotrasplante: [],
    archivos: [],
    ttocxreconst: [],
    ttopaliativos: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("paciente");
  const [editMode, setEditMode] = useState({});
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      if (!documento) return;
      
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/paciente/historial/${documento}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            alert(`⚠️ Paciente con cédula ${documento} no encontrado`);
            onClose();
            return;
          }
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const result = await res.json();
        
        if (result.ok && result.data) {
          const historialData = result.data;
          
          setData({
            paciente: historialData.paciente || null,
            diagnosticos: historialData.diagnosticos || [],
            antecedentes: historialData.antecedentes || [],
            ttocx: historialData.ttocx || [],
            ttoqt: historialData.ttoqt || [],
            ttort: historialData.ttort || [],
            ttotrasplante: historialData.ttotrasplante || [],
            archivos: historialData.archivos || [],
            ttocxreconst: historialData.ttocxreconst || [],
            ttopaliativos: historialData.ttopaliativos || []
          });
        } else {
          alert("Error en la estructura de datos recibida");
          onClose();
        }
      } catch (err) {
        console.error("❌ Error cargando historial:", err);
        alert("Error de conexión al cargar el historial");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, [documento, onClose]);

  // ========== FUNCIONES DE FORMATO DE FECHAS ==========

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    try {
      // Si ya es formato yyyy-MM-dd, retornar directamente
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }
      
      // Si es formato ISO, convertir a yyyy-MM-dd
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  const formatDateToISO = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString();
    } catch {
      return "";
    }
  };

  // ========== FUNCIONES DE NAVEGACIÓN ==========

  const scrollTabsLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollTabsRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const nextForm = () => {
    if (currentFormIndex < data[activeTab]?.length - 1) {
      setCurrentFormIndex(prev => prev + 1);
      setTimeout(() => {
        document.querySelector('.tab-content-inner')?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const prevForm = () => {
    if (currentFormIndex > 0) {
      setCurrentFormIndex(prev => prev - 1);
      setTimeout(() => {
        document.querySelector('.tab-content-inner')?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  // ========== FUNCIONES GENERALES ==========

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedArray = [...data[section]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      setData(prev => ({ ...prev, [section]: updatedArray }));
    } else {
      setData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

const handleSave = async (section, item = null, index = null) => {
  setSaving(true);
  
  try {
    let endpoint = "";
    let method = "POST";
    let bodyData = {};
    
    const dataToSave = index !== null ? data[section][index] : item;
    
    if (!documento) {
      alert("❌ Error: No se encontró el documento del paciente");
      setSaving(false);
      return;
    }
    
    if (!dataToSave) {
      alert("❌ No hay datos para guardar");
      setSaving(false);
      return;
    }
    
    console.log("🔍 Datos a guardar para", section, ":", dataToSave);
    
    switch(section) {
      case "paciente":
        // ✅ CORREGIDO: Usar el número de documento (V6NumID) en lugar del _id
        const cedulaPaciente = documento; // Esto es V6NumID
        endpoint = `${API_BASE_URL}/paciente/${cedulaPaciente}`;
        method = "PATCH";
        
        // Construir el DTO completo para el paciente
        bodyData = {
          V1PrimerNom: data.paciente.V1PrimerNom || "",
          V2SegundoNom: data.paciente.V2SegundoNom || "",
          V3PrimerApe: data.paciente.V3PrimerApe || "",
          V4SegundoApe: data.paciente.V4SegundoApe || "",
          V5TipoID: data.paciente.V5TipoID || "CC",
          V6NumID: data.paciente.V6NumID || cedulaPaciente, // ¡IMPORTANTE!
          V7FecNac: data.paciente.V7FecNac || "",
          V8Sexo: data.paciente.V8Sexo || "",
          V9Ocup: data.paciente.V9Ocup || "",
          V10RegAfiliacion: data.paciente.V10RegAfiliacion || "",
          V11CodEAPB: data.paciente.V11CodEAPB || "",
          V12CodEtnia: data.paciente.V12CodEtnia || "",
          V13GrupoPob: data.paciente.V13GrupoPob || "",
          V14MpioRes: data.paciente.V14MpioRes || "",
          V15NumTel: data.paciente.V15NumTel || "",
          V16FecAfiliacion: data.paciente.V16FecAfiliacion || "",
          FechaIngreso: data.paciente.FechaIngreso || new Date().toISOString()
        };
        break;
        
      case "diagnosticos":
        const diagnosticoId = dataToSave._id;
        
        // PARA DIAGNÓSTICOS: Verificar si existe endpoint de diagnóstico
        if (diagnosticoId && diagnosticoId !== "null") {
          // Si ya existe, actualizar usando el _id del diagnóstico
          endpoint = `${API_BASE_URL}/diagnostico/${diagnosticoId}`;
          method = "PATCH";
        } else {
          // Si es nuevo, crear con el número de documento
          endpoint = `${API_BASE_URL}/diagnostico`;
          method = "POST";
        }
        
        bodyData = {
          V17CodCIE10: dataToSave.V17CodCIE10 || "",
          V18FecDiag: dataToSave.V18FecDiag || "",
          V19FecRemision: dataToSave.V19FecRemision || "",
          V20FecIngInst: dataToSave.V20FecIngInst || "",
          V21TipoEstDiag: dataToSave.V21TipoEstDiag || "",
          V22MotNoHistop: dataToSave.V22MotNoHistop || "",
          V23FecRecMuestra: dataToSave.V23FecRecMuestra || "",
          V24FecInfHistop: dataToSave.V24FecInfHistop || "",
          V25CodHabIPS: dataToSave.V25CodHabIPS || "",
          V26Fec1raCons: dataToSave.V26Fec1raCons || "",
          V27HistTumor: dataToSave.V27HistTumor || "",
          V28GradoDifTum: dataToSave.V28GradoDifTum || "",
          V29EstadifTum: dataToSave.V29EstadifTum || "",
          V30FecEstadif: dataToSave.V30FecEstadif || "",
          V31PruebaHER2: dataToSave.V31PruebaHER2 || "",
          V32FecPruebaHER2: dataToSave.V32FecPruebaHER2 || "",
          V33ResHER2: dataToSave.V33ResHER2 || "",
          V34EstadifDukes: dataToSave.V34EstadifDukes || "",
          V35FecEstDukes: dataToSave.V35FecEstDukes || "",
          V36EstadifLinfMielo: dataToSave.V36EstadifLinfMielo || "",
          V37ClasGleason: dataToSave.V37ClasGleason || "",
          V38ClasRiesgoLL: dataToSave.V38ClasRiesgoLL || "",
          V39FecClasRiesgo: dataToSave.V39FecClasRiesgo || "",
          V40ObjTtoInicial: dataToSave.V40ObjTtoInicial || "",
          V41IntervMed: dataToSave.V41IntervMed || "",
          agrupador: dataToSave.agrupador || "",
          observaciones: dataToSave.observaciones || "",
          // ¡IMPORTANTE! Incluir el pacienteId para la relación
          pacienteId: documento,
          V6NumID: documento
        };
        break;
        
      // ... (las demás secciones se mantienen igual)
    }

    console.log(`📤 Enviando ${method} a: ${endpoint}`);
    console.log("📦 Datos enviados:", bodyData);

    const res = await fetch(endpoint, {
      method,
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyData),
    });

    console.log("📥 Respuesta HTTP:", res.status, res.statusText);
    
    let responseData = {};
    try {
      const text = await res.text();
      if (text) {
        responseData = JSON.parse(text);
      }
      console.log("📥 Datos respuesta:", responseData);
    } catch (jsonError) {
      console.log("📥 Respuesta no es JSON:", jsonError);
    }
    
    if (res.ok) {
      alert("✅ Guardado exitoso");
      await recargarHistorial();
      setEditMode({});
    } else {
      console.error("❌ Error detallado:", responseData);
      
      // Mostrar mensaje específico según el error
      let errorMessage = `❌ Error ${res.status}: `;
      
      if (responseData.mensaje) {
        errorMessage += responseData.mensaje;
      } else if (responseData.error) {
        errorMessage += responseData.error;
      } else {
        errorMessage += "No se pudo guardar";
      }
      
      if (res.status === 404) {
        errorMessage += `\n\nEndpoint: ${method} ${endpoint}`;
        errorMessage += `\n\nVerifica que la ruta exista en el backend.`;
      }
      
      alert(errorMessage);
    }
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    alert(`Error de conexión: ${error.message}`);
  } finally {
    setSaving(false);
  }
};

  const recargarHistorial = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/paciente/historial/${documento}`);
      if (res.ok) {
        const result = await res.json();
        if (result.ok && result.data) {
          const historialData = result.data;
          setData({
            paciente: historialData.paciente || null,
            diagnosticos: historialData.diagnosticos || [],
            antecedentes: historialData.antecedentes || [],
            ttocx: historialData.ttocx || [],
            ttoqt: historialData.ttoqt || [],
            ttort: historialData.ttort || [],
            ttotrasplante: historialData.ttotrasplante || [],
            archivos: historialData.archivos || [],
            ttocxreconst: historialData.ttocxreconst || [],
            ttopaliativos: historialData.ttopaliativos || []
          });
        }
      }
    } catch (error) {
      console.error("❌ Error recargando datos:", error);
    }
  };

  const handleDelete = async (section, id) => {
    if (!window.confirm("¿Está seguro de eliminar este registro?")) return;

    try {
      let endpoint = "";
      switch(section) {
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
        alert("✅ Registro eliminado");
        await recargarHistorial();
      } else {
        alert("❌ No se pudo eliminar");
      }
    } catch {
      alert("❌ Error de conexión al eliminar");
    }
  };

  const addNewItem = (section) => {
    const newItem = getDefaultItem(section);
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    setEditMode(prev => ({ ...prev, [section]: data[section].length }));
  };

  // Función para probar el endpoint de actualización
const testActualizacionPaciente = async () => {
  if (!data.paciente || !data.paciente.V6NumID) {
    alert("❌ No hay datos de paciente para probar");
    return;
  }
  
  console.log("🧪 Probando actualización de paciente...");
  console.log("📋 Datos del paciente:", data.paciente);
  console.log("🔢 V6NumID:", data.paciente.V6NumID);
  console.log("🆔 _id:", data.paciente._id);
  console.log("📝 documento prop:", documento);
  
  const testData = {
    V1PrimerNom: "TEST_" + (data.paciente.V1PrimerNom || "Nombre"),
    V6NumID: data.paciente.V6NumID
  };
  
  const endpoint = `${API_BASE_URL}/paciente/${data.paciente.V6NumID}`;
  console.log(`📤 Enviando PATCH a: ${endpoint}`);
  console.log("📦 Datos de prueba:", testData);
  
  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData)
    });
    
    console.log("📥 Respuesta:", res.status, res.statusText);
    
    if (res.ok) {
      const result = await res.json();
      console.log("✅ Éxito:", result);
      alert("✅ Endpoint funciona correctamente\nLuego podrás restaurar los datos originales");
    } else {
      const errorText = await res.text();
      console.error("❌ Error:", errorText);
      alert(`❌ Error ${res.status}: ${errorText}`);
    }
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    alert(`❌ Error de conexión: ${error.message}`);
  }
};

  const getDefaultItem = (section) => {
    const baseItem = {
      pacienteId: documento,
      V6NumID: documento,
      V6NumId: documento
    };
    
    switch(section) {
      case "diagnosticos":
        return {
          ...baseItem,
          V17CodCIE10: "",
          V18FecDiag: "",
          V19FecRemision: "",
          V20FecIngInst: "",
          V21TipoEstDiag: "",
          V22MotNoHistop: "",
          V23FecRecMuestra: "",
          V24FecInfHistop: "",
          V25CodHabIPS: "",
          V26Fec1raCons: "",
          V27HistTumor: "",
          V28GradoDifTum: "",
          V29EstadifTum: "",
          V30FecEstadif: "",
          V31PruebaHER2: "",
          V32FecPruebaHER2: "",
          V33ResHER2: "",
          V34EstadifDukes: "",
          V35FecEstDukes: "",
          V36EstadifLinfMielo: "",
          V37ClasGleason: "",
          V38ClasRiesgoLL: "",
          V39FecClasRiesgo: "",
          V40ObjTtoInicial: "",
          V41IntervMed: "",
          agrupador: "",
          observaciones: ""
        };
        
      case "antecedentes":
        return {
          ...baseItem,
          V42AntCancerPrim: "",
          V43FecDiagAnt: "",
          V44TipoCancerAnt: ""
        };
        
      case "ttocx":
        return {
          ...baseItem,
          V74RecibioCirugia: "",
          V75NumCirugias: "",
          V76FecPrimCir: "",
          V77CodIPSCir1: "",
          V78CodCUPSCir1: "",
          V79UbicTempCir1: "",
          V80FecUltCir: "",
          V81MotUltCir: "",
          V82CodIPSCir2: "",
          V83CodCUPSCir2: "",
          V84UbicTempCir2: "",
          V85EstVitalPostCir: ""
        };
        
      case "ttoqt":
        return {
          ...baseItem,
          V45RecibioQuimio: "",
          V46NumFasesQuimio: "",
          V47NumCiclosQuimio: "",
          V48UbicTempTto: "",
          V49FecIniEsq1: "",
          V50NumIPSQuimio: "",
          V51CodIPSQuimio1: "",
          V52CodIPSQuimio2: "",
          V53MedATC1: "",
          V54MedATC2: "",
          V55MedATC3: "",
          V56MedATC4: "",
          V57RecibioQuimioIntrat: "",
          V58FecFinTto: "",
          V59CaractTto: "",
          V60MotFinTto: "",
          V61UbicTempUltEsq: "",
          V62FecIniUltEsq: "",
          V63NumIPSUltEsq: "",
          V64CodIPSUltEsq1: "",
          V65CodIPSUltEsq2: "",
          V66NumMedUltEsq: "",
          V66_1MedATC_Ult1: "",
          V66_2MedATC_Ult2: "",
          V66_3MedATC_Ult3: "",
          V66_4MedATC_Ult4: "",
          V66_5MedATC_Ult5: "",
          V66_6MedATC_Ult6: "",
          V66_7MedATC_Ult7: "",
          V66_8MedATC_Ult8: "",
          V66_9MedATC_Ult9: "",
          V67MedAddUlt1: "",
          V68MedAddUlt2: "",
          V69MedAddUlt3: "",
          V70RecibioQuimioIntratUlt: "",
          V71FecFinUltEsq: "",
          V72CaractUltEsq: "",
          V73MotFinUltEsq: ""
        };
        
      case "ttort":
        return {
          ...baseItem,
          V86RecibioRadioterapia: "",
          V87NumSesionesRadio: "",
          V88FecIniEsq1Radio: "",
          V89UbicTempEsq1Radio: "",
          V90TipoRadioEsq1: "",
          V91NumIPSRadioEsq1: "",
          V92CodIPSRadio1Esq1: "",
          V93CodIPSRadio2Esq1: "",
          V94FecFinEsq1Radio: "",
          V95CaractEsq1Radio: "",
          V96MotFinEsq1Radio: "",
          V97FecIniUltEsqRadio: "",
          V98UbicTempUltEsqRadio: "",
          V99TipoRadioUltEsq: "",
          V100NumIPSRadioUltEsq: "",
          V101CodIPSRadio1UltEsq: "",
          V102CodIPSRadio2UltEsq: "",
          V103FecFinUltEsqRadio: "",
          V104CaractUltEsqRadio: "",
          V105MotFinUltEsqRadio: ""
        };
        
      case "ttotrasplante":
        return {
          ...baseItem,
          V106RecibioTrasplanteCM: "",
          V107TipoTrasplanteCM: "",
          V108UbicTempTrasplanteCM: "",
          V109FecTrasplanteCM: "",
          V110CodIPSTrasplanteCM: ""
        };
        
      case "ttocxreconst":
        return {
          ...baseItem,
          V111RecibioCirugiaReconst: "",
          V112FecCirugiaReconst: "",
          V113CodIPSCirugiaReconst: ""
        };
        
      case "ttopaliativos":
        return {
          ...baseItem,
          V114RecibioCuidadoPaliativo: "",
          V114_1CP_MedEspecialista: "",
          V114_2CP_ProfSaludNoMed: "",
          V114_3CP_MedOtraEspecialidad: "",
          V114_4CP_MedGeneral: "",
          V114_5CP_TrabajoSocial: "",
          V114_6CP_OtroProfSalud: "",
          V115FecPrimConsCP: "",
          V116CodIPS_CP: "",
          V117ValoradoPsiquiatria: "",
          V118FecPrimConsPsiq: "",
          V119CodIPS_Psiq: "",
          V120ValoradoNutricion: "",
          V121FecPrimConsNutr: "",
          V122CodIPS_Nutr: "",
          V123TipoSoporteNutricional: "",
          V124TerapiasComplementarias: ""
        };
        
      default:
        return baseItem;
    }
  };

  // Agrega este useEffect para ver la estructura real de los datos
useEffect(() => {
  if (data.diagnosticos && data.diagnosticos.length > 0) {
    console.log("🔍 Primer diagnóstico:", data.diagnosticos[0]);
    console.log("🔍 Campos del diagnóstico:", Object.keys(data.diagnosticos[0]));
    console.log("🔍 ID del primer diagnóstico:", data.diagnosticos[0]._id);
  }
}, [data.diagnosticos]);

  // ========== COMPONENTES DE FORMULARIO ==========

  const renderField = (label, value, onChange, type = "text", options = []) => {
    if (type === "date") {
      const formattedValue = formatDateForInput(value);
      return (
        <div className="form-field" key={label}>
          <label>{label}</label>
          <input
            type="date"
            value={formattedValue}
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
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div className="form-field" key={label}>
          <label>{label}</label>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
          />
        </div>
      );
    }
  };

  const renderFormSection = (section, fields, index = null) => {
    const item = index !== null ? data[section][index] : data[section];
    const isEditing = editMode[section] === index || (section === "paciente" && editMode[section]);
    
    return (
      <div className={`form-section ${isEditing ? 'editing' : ''}`}>
        <div className="form-section-header">
          <h4>{section === "paciente" ? "Datos del Paciente" : `Registro ${index + 1}`}</h4>
          <div className="form-actions">
            {!isEditing ? (
              <button onClick={() => setEditMode(prev => ({ ...prev, [section]: index }))} className="btn-edit">
                ✏️ Editar
              </button>
            ) : (
              <>
                <button onClick={() => handleSave(section, item, index)} className="btn-save" disabled={saving}>
                  {saving ? "🔄 Guardando..." : "💾 Guardar"}
                </button>
                <button onClick={() => setEditMode(prev => ({ ...prev, [section]: null }))} className="btn-cancel">
                  ❌ Cancelar
                </button>
              </>
            )}
            {section !== "paciente" && !isEditing && (
              <button onClick={() => handleDelete(section, item._id)} className="btn-delete">
                🗑️ Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="form-grid">
          {fields.map(field => {
            const value = item[field.key];
            const onChange = (newValue) => handleInputChange(section, field.key, newValue, index);
            
            return renderField(
              field.label,
              value,
              onChange,
              field.type || "text",
              field.options || []
            );
          })}
        </div>
      </div>
    );
  };

  // ========== DEFINICIÓN DE CAMPOS POR SECCIÓN ==========

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
    { key: "V20FecIngInst", label: "Fecha Ingreso Institución", type: "date" },
    { key: "V21TipoEstDiag", label: "Tipo Estudio Diagnóstico", type: "text" },
    { key: "V22MotNoHistop", label: "Motivo No Histopatología", type: "text" },
    { key: "V23FecRecMuestra", label: "Fecha Recolección Muestra", type: "date" },
    { key: "V24FecInfHistop", label: "Fecha Informe Histopatología", type: "date" },
    { key: "V25CodHabIPS", label: "Código Habilitación IPS", type: "text" },
    { key: "V26Fec1raCons", label: "Fecha Primera Consulta", type: "date" },
    { key: "V27HistTumor", label: "Histología Tumor", type: "text" },
    { key: "V28GradoDifTum", label: "Grado Diferenciación Tumor", type: "text" },
    { key: "V29EstadifTum", label: "Estadificación Tumor", type: "text" },
    { key: "V30FecEstadif", label: "Fecha Estadificación", type: "date" },
    { key: "V31PruebaHER2", label: "Prueba HER2", type: "text" },
    { key: "V32FecPruebaHER2", label: "Fecha Prueba HER2", type: "date" },
    { key: "V33ResHER2", label: "Resultado HER2", type: "text" },
    { key: "V34EstadifDukes", label: "Estadificación Dukes", type: "text" },
    { key: "V35FecEstDukes", label: "Fecha Estadificación Dukes", type: "date" },
    { key: "V36EstadifLinfMielo", label: "Estadificación Linfoma Mieloma", type: "text" },
    { key: "V37ClasGleason", label: "Clasificación Gleason", type: "text" },
    { key: "V38ClasRiesgoLL", label: "Clasificación Riesgo Linfoma", type: "text" },
    { key: "V39FecClasRiesgo", label: "Fecha Clasificación Riesgo", type: "date" },
    { key: "V40ObjTtoInicial", label: "Objetivo Tratamiento Inicial", type: "text" },
    { key: "V41IntervMed", label: "Intervención Médica", type: "text" },
    { key: "agrupador", label: "Agrupador", type: "text" },
    { key: "observaciones", label: "Observaciones", type: "text" }
  ];

  const antecedenteFields = [
    { key: "V42AntCancerPrim", label: "Antecedente Cáncer Primario", type: "text" },
    { key: "V43FecDiagAnt", label: "Fecha Diagnóstico Antecedente", type: "date" },
    { key: "V44TipoCancerAnt", label: "Tipo Cáncer Antecedente", type: "text" }
  ];

  const ttocxFields = [
    { key: "V74RecibioCirugia", label: "Recibió Cirugía", type: "text" },
    { key: "V75NumCirugias", label: "Número Cirugías", type: "text" },
    { key: "V76FecPrimCir", label: "Fecha Primera Cirugía", type: "date" },
    { key: "V77CodIPSCir1", label: "Código IPS Cirugía 1", type: "text" },
    { key: "V78CodCUPSCir1", label: "Código CUPS Cirugía 1", type: "text" },
    { key: "V79UbicTempCir1", label: "Ubicación Temporal Cirugía 1", type: "text" },
    { key: "V80FecUltCir", label: "Fecha Última Cirugía", type: "date" },
    { key: "V81MotUltCir", label: "Motivo Última Cirugía", type: "text" },
    { key: "V82CodIPSCir2", label: "Código IPS Cirugía 2", type: "text" },
    { key: "V83CodCUPSCir2", label: "Código CUPS Cirugía 2", type: "text" },
    { key: "V84UbicTempCir2", label: "Ubicación Temporal Cirugía 2", type: "text" },
    { key: "V85EstVitalPostCir", label: "Estado Vital Post Cirugía", type: "text" }
  ];

  const getFieldsForSection = (section) => {
    switch(section) {
      case "paciente": return pacienteFields;
      case "diagnosticos": return diagnosticoFields;
      case "antecedentes": return antecedenteFields;
      case "ttocx": return ttocxFields;
      default: return [];
    }
  };

  // ========== RENDER PRINCIPAL ==========

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-loading">
            <div>Cargando historial completo...</div>
            <div>Paciente: {documento}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data.paciente) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-error">
            <h3>⚠️ Error al cargar paciente</h3>
            <p>No se pudo cargar los datos del paciente con cédula: {documento}</p>
            <button onClick={onClose} className="btn-cancel">Cerrar</button>
          </div>
        </div>
      </div>
    );
  }

  const p = data.paciente;

  const tabs = [
    { key: "paciente", label: "Paciente", icon: "👤" },
    { key: "diagnosticos", label: "Diagnósticos", icon: "🩺", count: data.diagnosticos?.length || 0 },
    { key: "antecedentes", label: "Antecedentes", icon: "📋", count: data.antecedentes?.length || 0 },
    { key: "ttocx", label: "Cirugía", icon: "🔪", count: data.ttocx?.length || 0 },
    { key: "ttoqt", label: "Quimioterapia", icon: "💉", count: data.ttoqt?.length || 0 },
    { key: "ttort", label: "Radioterapia", icon: "☢️", count: data.ttort?.length || 0 },
    { key: "ttotrasplante", label: "Trasplante", icon: "❤️", count: data.ttotrasplante?.length || 0 },
    { key: "ttocxreconst", label: "Cirugía Reconstructiva", icon: "🔄", count: data.ttocxreconst?.length || 0 },
    { key: "ttopaliativos", label: "Cuidados Paliativos", icon: "🩹", count: data.ttopaliativos?.length || 0 },
    { key: "archivos", label: "Archivos", icon: "📁", count: data.archivos?.length || 0 },
  ];

  const renderTabContent = () => {
    const isMultiFormTab = ["diagnosticos", "antecedentes", "ttocx", "ttoqt"].includes(activeTab);
    const currentItems = data[activeTab] || [];
    
    switch(activeTab) {
      case "paciente":
        return (
          <div className="tab-content-inner">
            {renderFormSection("paciente", pacienteFields)}
          </div>
        );
      
      case "diagnosticos":
      case "antecedentes":
      case "ttocx":
      case "ttoqt":
        return (
          <div className="tab-content-inner">
            {isMultiFormTab && currentItems.length > 0 && (
              <div className="section-navigation">
                <button 
                  className="nav-btn" 
                  onClick={prevForm}
                  disabled={currentFormIndex === 0}
                >
                  ◀ Anterior
                </button>
                
                <div className="section-counter">
                  {currentFormIndex + 1} de {currentItems.length}
                </div>
                
                <button 
                  className="nav-btn" 
                  onClick={nextForm}
                  disabled={currentFormIndex === currentItems.length - 1}
                >
                  Siguiente ▶
                </button>

                <button 
  onClick={testActualizacionPaciente}
  style={{ 
    background: '#17a2b8', 
    color: 'white',
    margin: '10px',
    padding: '8px 12px'
  }}
>
  🧪 Probar Actualización
</button>
              </div>
            )}
            
            <div className="section-header">
              <h3>{activeTab === "diagnosticos" ? "Diagnósticos" : 
                   activeTab === "antecedentes" ? "Antecedentes" :
                   activeTab === "ttocx" ? "Cirugías Oncológicas" : "Quimioterapia"}</h3>
              <button onClick={() => addNewItem(activeTab)} className="btn-add-new">
                ➕ Agregar Nuevo
              </button>
            </div>
            
            {currentItems.length > 0 ? (
              renderFormSection(activeTab, getFieldsForSection(activeTab), currentFormIndex)
            ) : (
              <p className="no-data">No hay registros disponibles</p>
            )}
          </div>
        );
      
      case "ttort":
      case "ttotrasplante":
      case "ttocxreconst":
      case "ttopaliativos":
        return (
          <div className="tab-content-inner">
            <div className="section-header">
              <h3>{activeTab === "ttort" ? "Radioterapia" :
                   activeTab === "ttotrasplante" ? "Trasplantes" :
                   activeTab === "ttocxreconst" ? "Cirugías Reconstructivas" : "Cuidados Paliativos"}</h3>
              <button onClick={() => addNewItem(activeTab)} className="btn-add-new">
                ➕ Agregar Nuevo
              </button>
            </div>
            
            {currentItems.length > 0 ? (
              <div className="data-items-list">
                {currentItems.map((item, index) => (
                  <div key={index} className="data-item">
                    {Object.entries(item).map(([key, value]) => (
                      key !== '_id' && key !== '__v' && (
                        <p key={key}><strong>{key}:</strong> {value || "-"}</p>
                      )
                    ))}
                    <div className="data-item-actions">
                      <button onClick={() => setEditMode({[activeTab]: index})} className="btn-edit">
                        ✏️ Editar
                      </button>
                      <button onClick={() => handleDelete(activeTab, item._id)} className="btn-delete">
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No hay registros disponibles</p>
            )}
          </div>
        );
      
      case "archivos":
        return (
          <div className="tab-content-inner">
            <div className="section-header">
              <h3>Archivos Adjuntos</h3>
            </div>
            {data.archivos?.length > 0 ? (
              <div className="archivos-list">
                {data.archivos.map((a, i) => (
                  <div key={i} className="archivo-item">
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="archivo-link">
                      📄 {a.nombre || "Archivo"} 
                      {a.fecha && ` (${new Date(a.fecha).toLocaleDateString()})`}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No hay archivos adjuntos</p>
            )}
          </div>
        );
      
      default:
        return <div>Selecciona una pestaña</div>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {p.V1PrimerNom || ''} {p.V2SegundoNom || ''} {p.V3PrimerApe || ''} {p.V4SegundoApe || ''}
            <br />
            <small style={{ fontSize: '16px', color: '#666' }}>
              {p.V5TipoID || 'CC'}: {p.V6NumID || documento}
            </small>
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="tabs-navigation-wrapper">
          <button 
            className="tab-scroll-btn left" 
            onClick={scrollTabsLeft}
            title="Desplazar izquierda"
          >
            ◀
          </button>
          
          <div className="tabs-container" ref={tabsContainerRef}>
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={activeTab === tab.key ? "tab active" : "tab"}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setCurrentFormIndex(0);
                    setTimeout(() => {
                      document.querySelector('.tab-content-inner')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  title={tab.label}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                  {tab.count > 0 && <span className="badge">{tab.count}</span>}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            className="tab-scroll-btn right" 
            onClick={scrollTabsRight}
            title="Desplazar derecha"
          >
            ▶
          </button>
        </div>

        <div className="modal-body">
          {renderTabContent()}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">✖️ Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPaciente;