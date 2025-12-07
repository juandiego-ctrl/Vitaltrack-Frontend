// src/components/CrearUsuario.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "../styles/CrearUsuario.module.css";
import IconosFlotantes from "./IconosFlotantes";
import { crearPaciente } from "../api/pacientes";

// ====================== Definición de todos los campos ======================
const campos = [
  // PACIENTE
  { name: "V1PrimerNom", label: "Primer Nombre*", tab: 0, obligatorio: true },
  { name: "V2SegundoNom", label: "Segundo Nombre", tab: 0 },
  { name: "V3PrimerApe", label: "Primer Apellido*", tab: 0, obligatorio: true },
  { name: "V4SegundoApe", label: "Segundo Apellido", tab: 0 },
  { name: "V5TipoID", label: "Tipo ID*", tab: 0, obligatorio: true },
  { name: "V6NumID", label: "Número ID*", tab: 0, obligatorio: true },
  { name: "V7FecNac", label: "Fecha Nacimiento*", tab: 0, type: "date", obligatorio: true },
  { name: "V8Sexo", label: "Sexo", tab: 0 },
  { name: "V9Ocup", label: "Ocupación", tab: 0 },
  { name: "V10RegAfiliacion", label: "Reg Afiliación", tab: 0 },
  { name: "V11CodEAPB", label: "Cod EAPB", tab: 0 },
  { name: "V12CodEtnia", label: "Cod Etnia", tab: 0 },
  { name: "V13GrupoPob", label: "Grupo Poblacional", tab: 0 },
  { name: "V14MpioRes", label: "Municipio Residencia", tab: 0 },
  { name: "V15NumTel", label: "Teléfono", tab: 0 },
  { name: "V16FecAfiliacion", label: "Fecha Afiliación", tab: 0, type: "date" },
  { name: "FechaIngreso", label: "Fecha Ingreso", tab: 0, type: "date" },

  // DIAGNÓSTICOS
  { name: "V17CodCIE10", label: "Código CIE10*", tab: 1, obligatorio: true },
  { name: "V18FecDiag", label: "Fecha Diagnóstico*", tab: 1, type: "date", obligatorio: true },
  { name: "V19FecRemision", label: "Fecha Remisión", tab: 1, type: "date" },
  { name: "V20FecIngInst", label: "Fecha Ingreso Institución", tab: 1, type: "date" },
  { name: "V21TipoEstDiag", label: "Tipo Est Diagnóstico", tab: 1 },
  { name: "V22MotNoHistop", label: "Motivo No Histopatología", tab: 1 },
  { name: "V23FecRecMuestra", label: "Fecha Recepción Muestra", tab: 1, type: "date" },
  { name: "V24FecInfHistop", label: "Fecha Informe Histopatológico", tab: 1, type: "date" },
  { name: "V25CodHabIPS", label: "Cod Habilitación IPS", tab: 1 },
  { name: "V26Fec1raCons", label: "Fecha Primera Consulta", tab: 1, type: "date" },
  { name: "V27HistTumor", label: "Historia Tumor", tab: 1 },
  { name: "V28GradoDifTum", label: "Grado Dif Tumor", tab: 1 },
  { name: "V29EstadifTum", label: "Estadio Tumor", tab: 1 },
  { name: "V30FecEstadif", label: "Fecha Estadificación", tab: 1, type: "date" },
  { name: "V31PruebaHER2", label: "Prueba HER2", tab: 1 },
  { name: "V32FecPruebaHER2", label: "Fecha Prueba HER2", tab: 1, type: "date" },
  { name: "V33ResHER2", label: "Resultado HER2", tab: 1 },
  { name: "V34EstadifDukes", label: "Estadio Dukes", tab: 1 },
  { name: "V35FecEstDukes", label: "Fecha Estadio Dukes", tab: 1, type: "date" },
  { name: "V36EstadifLinfMielo", label: "Estadificación Linf Mielo", tab: 1 },
  { name: "V37ClasGleason", label: "Clasificación Gleason", tab: 1 },
  { name: "V38ClasRiesgoLL", label: "Clasificación Riesgo LL", tab: 1 },
  { name: "V39FecClasRiesgo", label: "Fecha Clasificación Riesgo", tab: 1, type: "date" },
  { name: "V40ObjTtoInicial", label: "Objetivo Tto Inicial", tab: 1 },
  { name: "V41IntervMed", label: "Intervención Médica", tab: 1 },
  { name: "agrupador", label: "Agrupador", tab: 1 },
  { name: "observaciones", label: "Observaciones", tab: 1 },

  // ANTECEDENTES
  { name: "V42AntCancerPrim", label: "Antecedente Cáncer*", tab: 2, obligatorio: true },
  { name: "V43FecDiagAnt", label: "Fecha Diagnóstico Antecedente", tab: 2, type: "date" },
  { name: "V44TipoCancerAnt", label: "Tipo Cáncer Antecedente", tab: 2 },

  // QUIMIOTERAPIA
  { name: "V45RecibioQuimio", label: "Recibió Quimio*", tab: 3, obligatorio: true },
  { name: "V46NumFasesQuimio", label: "Número Fases Quimio", tab: 3, type: "number" },
  { name: "V47NumCiclosQuimio", label: "Número Ciclos Quimio", tab: 3, type: "number" },
  { name: "V48UbicTempTto", label: "Ubicación Temporal", tab: 3 },
  { name: "V49FecIniEsq1", label: "Fecha Inicio Esquema 1", tab: 3, type: "date" },
  { name: "V50NumIPSQuimio", label: "Número IPS Quimio", tab: 3, type: "number" },
  { name: "V51CodIPSQuimio1", label: "Cod IPS Quimio1", tab: 3 },
  { name: "V52CodIPSQuimio2", label: "Cod IPS Quimio2", tab: 3 },
  { name: "V53MedATC1", label: "Med ATC1", tab: 3 },
  { name: "V54MedATC2", label: "Med ATC2", tab: 3 },
  { name: "V55MedATC3", label: "Med ATC3", tab: 3 },
  { name: "V56MedATC4", label: "Med ATC4", tab: 3 },
  { name: "V57RecibioQuimioIntrat", label: "Recibió Quimio Intratecal", tab: 3 },
  { name: "V58FecFinTto", label: "Fecha Fin Tratamiento", tab: 3, type: "date" },
  { name: "V59CaractTto", label: "Caract Tratamiento", tab: 3 },
  { name: "V60MotFinTto", label: "Motivo Fin Tto", tab: 3 },
  { name: "V61UbicTempUltEsq", label: "Ubicación Último Esquema", tab: 3 },
  { name: "V62FecIniUltEsq", label: "Fecha Inicio Último Esquema", tab: 3, type: "date" },
  { name: "V63NumIPSUltEsq", label: "Número IPS Último Esquema", tab: 3, type: "number" },
  { name: "V64CodIPSUltEsq1", label: "Cod IPS Último Esquema 1", tab: 3 },
  { name: "V65CodIPSUltEsq2", label: "Cod IPS Último Esquema 2", tab: 3 },
  { name: "V66NumMedUltEsq", label: "Número Med Ult Esquema", tab: 3, type: "number" },
  { name: "V66_1MedATC_Ult1", label: "Med ATC Ult1", tab: 3 },
  { name: "V66_2MedATC_Ult2", label: "Med ATC Ult2", tab: 3 },
  { name: "V66_3MedATC_Ult3", label: "Med ATC Ult3", tab: 3 },
  { name: "V66_4MedATC_Ult4", label: "Med ATC Ult4", tab: 3 },
  { name: "V66_5MedATC_Ult5", label: "Med ATC Ult5", tab: 3 },
  { name: "V66_6MedATC_Ult6", label: "Med ATC Ult6", tab: 3 },
  { name: "V66_7MedATC_Ult7", label: "Med ATC Ult7", tab: 3 },
  { name: "V66_8MedATC_Ult8", label: "Med ATC Ult8", tab: 3 },
  { name: "V66_9MedATC_Ult9", label: "Med ATC Ult9", tab: 3 },
  { name: "V67MedAddUlt1", label: "Med Add Ult1", tab: 3 },
  { name: "V68MedAddUlt2", label: "Med Add Ult2", tab: 3 },
  { name: "V69MedAddUlt3", label: "Med Add Ult3", tab: 3 },
  { name: "V70RecibioQuimioIntratUlt", label: "Recibió Quimio Intrat Ult", tab: 3 },
  { name: "V71FecFinUltEsq", label: "Fecha Fin Ult Esquema", tab: 3, type: "date" },
  { name: "V72CaractUltEsq", label: "Caract Ult Esquema", tab: 3 },
  { name: "V73MotFinUltEsq", label: "Motivo Fin Ult Esquema", tab: 3 },

  // CIRUGÍA
  { name: "V74RecibioCirugia", label: "Recibió Cirugía*", tab: 4, obligatorio: true },
  { name: "V75NumCirugias", label: "Número Cirugías", tab: 4, type: "number" },
  { name: "V76FecPrimCir", label: "Fecha Primera Cirugía", tab: 4, type: "date" },
  { name: "V77CodIPSCir1", label: "Cod IPS Cirugía 1", tab: 4 },
  { name: "V78CodCUPSCir1", label: "Cod CUP Cirugía 1", tab: 4 },
  { name: "V79UbicTempCir1", label: "Ubicación Temporal Cir 1", tab: 4 },
  { name: "V80FecUltCir", label: "Fecha Última Cirugía", tab: 4, type: "date" },
  { name: "V81MotUltCir", label: "Motivo Última Cirugía", tab: 4 },
  { name: "V82CodIPSCir2", label: "Cod IPS Cirugía 2", tab: 4 },
  { name: "V83CodCUPSCir2", label: "Cod CUP Cirugía 2", tab: 4 },
  { name: "V84UbicTempCir2", label: "Ubicación Temporal Cir 2", tab: 4 },
  { name: "V85EstVitalPostCir", label: "Estado Vital Post Cirugía", tab: 4 },

  // CIRUGÍA RECONSTRUCTIVA
  { name: "V111RecibioCirugiaReconst", label: "Recibió Cirugía Reconst", tab: 4 },
  { name: "V112FecCirugiaReconst", label: "Fecha Cirugía Reconst", tab: 4, type: "date" },
  { name: "V113CodIPSCirugiaReconst", label: "Cod IPS Cirugía Reconst", tab: 4 },

  // RADIOTERAPIA
  { name: "V86RecibioRadioterapia", label: "Recibió Radioterapia*", tab: 5, obligatorio: true },
  { name: "V87NumSesionesRadio", label: "Número Sesiones", tab: 5, type: "number" },
  { name: "V88FecIniEsq1Radio", label: "Fecha Inicio Esquema 1 Radio", tab: 5, type: "date" },
  { name: "V89UbicTempEsq1Radio", label: "Ubicación Temporal Esq1 Radio", tab: 5 },
  { name: "V90TipoRadioEsq1", label: "Tipo Radio Esq1", tab: 5 },
  { name: "V91NumIPSRadioEsq1", label: "Número IPS Radio Esq1", tab: 5, type: "number" },
  { name: "V92CodIPSRadio1Esq1", label: "Cod IPS Radio 1 Esq1", tab: 5 },
  { name: "V93CodIPSRadio2Esq1", label: "Cod IPS Radio 2 Esq1", tab: 5 },
  { name: "V94FecFinEsq1Radio", label: "Fecha Fin Esquema 1 Radio", tab: 5, type: "date" },
  { name: "V95CaractEsq1Radio", label: "Caract Esquema 1 Radio", tab: 5 },
  { name: "V96MotFinEsq1Radio", label: "Motivo Fin Esq1 Radio", tab: 5 },
  { name: "V97FecIniUltEsqRadio", label: "Fecha Inicio Último Esquema Radio", tab: 5, type: "date" },
  { name: "V98UbicTempUltEsqRadio", label: "Ubicación Último Esquema Radio", tab: 5 },
  { name: "V99TipoRadioUltEsq", label: "Tipo Último Esquema Radio", tab: 5 },
  { name: "V100NumIPSRadioUltEsq", label: "Número IPS Último Esquema Radio", tab: 5, type: "number" },
  { name: "V101CodIPSRadio1UltEsq", label: "Cod IPS Último Esq Radio 1", tab: 5 },
  { name: "V102CodIPSRadio2UltEsq", label: "Cod IPS Último Esq Radio 2", tab: 5 },
  { name: "V103FecFinUltEsqRadio", label: "Fecha Fin Último Esquema Radio", tab: 5, type: "date" },
  { name: "V104CaractUltEsqRadio", label: "Caract Último Esquema Radio", tab: 5 },
  { name: "V105MotFinUltEsqRadio", label: "Motivo Último Esquema Radio", tab: 5 },

  // PALIATIVOS
  { name: "V114RecibioCuidadoPaliativo", label: "Recibió Cuidados Paliativos*", tab: 6, obligatorio: true },
  { name: "V114_1CP_MedEspecialista", label: "Med Especialista", tab: 6 },
  { name: "V114_2CP_ProfSaludNoMed", label: "Prof Salud No Med", tab: 6 },
  { name: "V114_3CP_MedOtraEspecialidad", label: "Med Otra Especialidad", tab: 6 },
  { name: "V114_4CP_MedGeneral", label: "Med General", tab: 6 },
  { name: "V114_5CP_TrabajoSocial", label: "Trabajo Social", tab: 6 },
  { name: "V114_6CP_OtroProfSalud", label: "Otro Prof Salud", tab: 6 },
  { name: "V115FecPrimConsCP", label: "Fecha Primera Consulta Paliativos", tab: 6, type: "date" },
  { name: "V116CodIPS_CP", label: "Cod IPS Paliativos", tab: 6 },
  { name: "V117ValoradoPsiquiatria", label: "Valorado Psiquiatría", tab: 6 },
  { name: "V118FecPrimConsPsiq", label: "Fecha Primera Consulta Psiq", tab: 6, type: "date" },
  { name: "V119CodIPS_Psiq", label: "Cod IPS Psiq", tab: 6 },
  { name: "V120ValoradoNutricion", label: "Valorado Nutrición", tab: 6 },
  { name: "V121FecPrimConsNutr", label: "Fecha Primera Consulta Nutrición", tab: 6, type: "date" },
  { name: "V122CodIPS_Nutr", label: "Cod IPS Nutrición", tab: 6 },
  { name: "V123TipoSoporteNutricional", label: "Tipo Soporte Nutricional", tab: 6 },
  { name: "V124TerapiasComplementarias", label: "Terapias Complementarias", tab: 6 },

  // TRASPLANTE
  { name: "V106RecibioTrasplanteCM", label: "Recibió Trasplante*", tab: 6 },
  { name: "V107TipoTrasplanteCM", label: "Tipo Trasplante", tab: 6 },
  { name: "V108UbicTempTrasplanteCM", label: "Ubicación Trasplante", tab: 6 },
  { name: "V109FecTrasplanteCM", label: "Fecha Trasplante", tab: 6, type: "date" },
  { name: "V110CodIPSTrasplanteCM", label: "Cod IPS Trasplante", tab: 6 },
];

// ====================== Funciones auxiliares ======================
const limpiarPayload = (data) => {
  const limpio = { ...data };
  
  // Eliminar campos vacíos o convertir null/undefined a string vacío
  Object.keys(limpio).forEach(key => {
    if (limpio[key] === null || limpio[key] === undefined || limpio[key] === 'Invalid Date') {
      limpio[key] = "";
    }
    
    // Si es string, eliminar espacios en blanco
    if (typeof limpio[key] === 'string') {
      limpio[key] = limpio[key].trim();
    }
  });
  
  return limpio;
};

const transformarFechas = (data) => {
  const transformado = { ...data };
  
  // Identificar todos los campos tipo 'date'
  const camposFecha = campos.filter(c => c.type === 'date');
  
  // Transformar cada campo fecha
  camposFecha.forEach(campoFecha => {
    const valor = transformado[campoFecha.name];
    
    if (valor && valor.trim() !== "") {
      try {
        const fecha = new Date(valor);
        if (!isNaN(fecha.getTime())) {
          // Formato ISO para el backend
          transformado[campoFecha.name] = fecha.toISOString();
        } else {
          transformado[campoFecha.name] = "";
        }
      } catch (error) {
        console.warn(`Error al transformar fecha ${campoFecha.name}:`, error);
        transformado[campoFecha.name] = "";
      }
    } else {
      transformado[campoFecha.name] = "";
    }
  });
  
  // Asegurar FechaIngreso si está vacío
  if (!transformado.FechaIngreso || transformado.FechaIngreso.trim() === "") {
    transformado.FechaIngreso = new Date().toISOString();
  }
  
  return transformado;
};

// ====================== Componente ======================
const CrearUsuario = () => {
  const navigate = useNavigate();
  const initialState = Object.fromEntries(campos.map(c => [c.name, ""]));
  const [form, setForm] = useState(initialState);
  const [activeTab, setActiveTab] = useState(0);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [errorBackend, setErrorBackend] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: false });
    if (errorBackend) setErrorBackend(null);
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    campos.forEach(c => {
      if (c.obligatorio && !form[c.name]?.trim()) {
        nuevosErrores[c.name] = true;
      }
    });
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorBackend(null);

    // Validar campos obligatorios
    const camposFaltantes = validarCampos();
    if (Object.keys(camposFaltantes).length > 0) {
      setErrores(camposFaltantes);
      const tabIndex = campos.find((c) => camposFaltantes[c.name])?.tab || 0;
      setActiveTab(tabIndex);
      alert("Faltan campos obligatorios. Revisa los campos resaltados.");
      setCargando(false);
      return;
    }

    try {
      // Limpiar y transformar datos
      const datosLimpios = limpiarPayload(form);
      const payload = transformarFechas(datosLimpios);

      console.log("📤 Enviando payload al backend:", payload);

      // Enviar al backend
      const res = await crearPaciente(payload);
      console.log("✅ Respuesta del backend:", res);

      if (res.ok || res.status === 200 || res.status === 201) {
        alert("Usuario creado correctamente ✅");
        setForm(initialState);
        setErrores({});
        setActiveTab(0);
      } else {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      console.error("❌ Error al crear paciente:", err);
      
      // Manejar errores de Axios con más detalle
      if (err.response) {
        const { status, data } = err.response;
        console.error("Detalles del error del backend:", data);
        
        let mensajeError = `Error ${status}: `;
        
        if (data && typeof data === 'object') {
          // Intentar extraer mensaje específico del backend
          if (data.message) {
            mensajeError += data.message;
          } else if (data.error) {
            mensajeError += data.error;
          } else if (Array.isArray(data.errors)) {
            mensajeError += data.errors.join(', ');
          } else {
            mensajeError += JSON.stringify(data);
          }
        } else if (data) {
          mensajeError += data;
        } else {
          mensajeError += "Error en el servidor";
        }
        
        setErrorBackend(mensajeError);
        alert(mensajeError);
      } else if (err.request) {
        // Error de red
        setErrorBackend("Error de conexión. Verifica tu red e intenta nuevamente.");
        alert("Error de conexión. Verifica tu red e intenta nuevamente.");
      } else {
        // Error en la configuración de la petición
        setErrorBackend(err.message);
        alert(`Error: ${err.message}`);
      }
    } finally {
      setCargando(false);
    }
  };

  const inputClass = (campo) => 
    errores[campo] 
      ? `${styles.inputError} ${styles.inputField}` 
      : styles.inputField;

  return (
    <div className={styles.backgroundCrearUsuario}>
      <IconosFlotantes />
      <div className={styles["crear-usuario-container"]}>
        <h2>Crear Nuevo Usuario</h2>
        
        {errorBackend && (
          <div className={styles.errorMessage}>
            <strong>Error del backend:</strong> {errorBackend}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
            <TabList>
              <Tab>Paciente</Tab>
              <Tab>Diagnósticos</Tab>
              <Tab>Antecedentes</Tab>
              <Tab>Quimioterapia</Tab>
              <Tab>Cirugía</Tab>
              <Tab>Radioterapia</Tab>
              <Tab>Paliativos</Tab>
            </TabList>

            {[...Array(7)].map((_, i) => (
              <TabPanel key={i}>
                <div className={styles.formGrid}>
                  {campos.filter(c => c.tab === i).map(c => (
                    <div key={c.name} className={styles.inputGroup}>
                      <label htmlFor={c.name}>
                        {c.label}
                        {c.obligatorio && <span className={styles.required}>*</span>}
                      </label>
                      <input
                        id={c.name}
                        name={c.name}
                        type={c.type || "text"}
                        placeholder={c.label}
                        value={form[c.name]}
                        onChange={handleChange}
                        className={inputClass(c.name)}
                        disabled={cargando}
                      />
                      {errores[c.name] && (
                        <span className={styles.errorText}>
                          Este campo es obligatorio
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </Tabs>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles["back-btn"]}
              onClick={() => navigate(-1)}
            >
              ⬅️ Regresar
            </button>

            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={cargando}
            >
              {cargando ? "Creando..." : "Crear Usuario"}
            </button>

            <button
              type="button"
              className={styles["reset-btn"]}
              onClick={() => {
                if (window.confirm("¿Estás seguro de limpiar todos los campos?")) {
                  setForm(initialState);
                  setErrores({});
                  setErrorBackend(null);
                }
              }}
              disabled={cargando}
            >
              Limpiar Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;