// src/pages/CrearUsuario.jsx
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel, } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "../styles/CrearUsuario.module.css";
import { useNavigate } from "react-router-dom";


const CrearUsuario = () => {
  const [form, setForm] = useState({
    // PACIENTE
    V1PrimerNom: "",
    V2SegundoNom: "",
    V3PrimerApe: "",
    V4SegundoApe: "",
    V5TipoID: "",
    V6NumID: "",
    V7FecNac: "",
    V8Sexo: "",
    V9Ocup: "",
    V10RegAfiliacion: "",
    V11CodEAPB: "",
    V12CodEtnia: "",
    V13GrupoPob: "",
    V14MpioRes: "",
    V15NumTel: "",
    V16FecAfiliacion: "",
    FechaIngreso: "",

    // DIAGNÓSTICOS
    V17CodCIE10: "",
    V18FecDiag: "",
    V21TipoEstDiag: "",
    V27HistTumor: "",
    V28GradoDifTum: "",
    V29EstadifTum: "",
    V40ObjTtoInicial: "",
    V41IntervMed: "",

    // ANTECEDENTES
    V42AntCancerPrim: "",
    V44TipoCancerAnt: "",

    // QUIMIOTERAPIA
    V45RecibioQuimio: "",
    V46NumFasesQuimio: "",
    V47NumCiclosQuimio: "",
    V53MedATC1: "",
    V54MedATC2: "",

    // CIRUGÍA
    V74RecibioCirugia: "",
    V75NumCirugias: "",
    V79UbicTempCir1: "",

    // RADIOTERAPIA
    V86RecibioRadioterapia: "",
    V87NumSesionesRadio: "",
    V89UbicTempEsq1Radio: "",

    // CUIDADOS PALIATIVOS
    V114RecibioCuidadoPaliativo: "",
    V123TipoSoporteNutricional: "",
    V124TerapiasComplementarias: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);

    // Aquí conectas con tu API NestJS
    // fetch("/api/pacientes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
  };
  const navigate = useNavigate();
    const volverHome = () => {
    navigate("/home"); // 👈 ruta de tu home
  };

  return (
        <div className={styles["crear-usuario-container"]}>
        <form onSubmit={handleSubmit}>
            <Tabs>
            <TabList>
                <Tab>Paciente</Tab>
                <Tab>Diagnósticos</Tab>
                <Tab>Antecedentes</Tab>
                <Tab>Quimioterapia</Tab>
                <Tab>Cirugía</Tab>
                <Tab>Radioterapia</Tab>
                <Tab>Paliativos</Tab>
            </TabList>

            {/* =================== PACIENTE =================== */}
            <TabPanel>
                <fieldset>
                <legend>Datos del Paciente</legend>
                    <h4>Primer Nombre</h4>
                <input name="V1PrimerNom" placeholder="Primer Nombre" value={form.V1PrimerNom} onChange={handleChange} />
                    <h4>Segundo Nombre</h4>
                <input name="V2SegundoNom" placeholder="Segundo Nombre" value={form.V2SegundoNom} onChange={handleChange} />
                    <h4>Primer Apellido</h4>
                <input name="V3PrimerApe" placeholder="Primer Apellido" value={form.V3PrimerApe} onChange={handleChange} />
                    <h4>Segundo Apellido</h4>
                <input name="V4SegundoApe" placeholder="Segundo Apellido" value={form.V4SegundoApe} onChange={handleChange} />
                    <h4>Tipo de Identificación</h4>
                <input name="V5TipoID" placeholder="Tipo ID" value={form.V5TipoID} onChange={handleChange} />
                    <h4>Número de Identificación</h4>
                <input name="V6NumID" placeholder="Número Identificación" value={form.V6NumID} onChange={handleChange} />
                    <h4>Fecha de nacimiento</h4>
                <input type="date" name="V7FecNac" value={form.V7FecNac} onChange={handleChange} />
                    <h4>Sexo</h4>
                <input name="V8Sexo" placeholder="Sexo (M/F)" value={form.V8Sexo} onChange={handleChange} />
                    <h4>Ocupación</h4>
                <input name="V9Ocup" placeholder="Ocupación" value={form.V9Ocup} onChange={handleChange} />
                    <h4>Régimen de Afiliación</h4>
                <input name="V10RegAfiliacion" placeholder="Régimen Afiliación" value={form.V10RegAfiliacion} onChange={handleChange} />
                    <h4>Código EPS</h4>
                <input name="V11CodEAPB" placeholder="Código EPS" value={form.V11CodEAPB} onChange={handleChange} />
                    <h4>Código Etnia</h4>
                <input name="V12CodEtnia" placeholder="Etnia" value={form.V12CodEtnia} onChange={handleChange} />
                    <h4>Grupo Poblacional</h4>
                <input name="V13GrupoPob" placeholder="Grupo Poblacional" value={form.V13GrupoPob} onChange={handleChange} />
                    <h4>Municipio Residencia</h4>
                <input name="V14MpioRes" placeholder="Municipio Residencia" value={form.V14MpioRes} onChange={handleChange} />
                    <h4>Número de Teléfono</h4>
                <input name="V15NumTel" placeholder="Teléfono" value={form.V15NumTel} onChange={handleChange} />
                <h4>Fecha de Afiliación</h4>
                <input type="date" name="V16FecAfiliacion" value={form.V16FecAfiliacion} onChange={handleChange} />
                <h4>Fecha de Ingreso</h4>
                <input type="date" name="FechaIngreso" value={form.FechaIngreso} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== DIAGNÓSTICOS =================== */}
            <TabPanel>
                <fieldset>
                <legend>Diagnósticos</legend>
                <input name="V17CodCIE10" placeholder="Código CIE10" value={form.V17CodCIE10} onChange={handleChange} />
                <input type="date" name="V18FecDiag" value={form.V18FecDiag} onChange={handleChange} />
                <input name="V21TipoEstDiag" placeholder="Tipo Estudio Diagnóstico" value={form.V21TipoEstDiag} onChange={handleChange} />
                <input name="V27HistTumor" placeholder="Histología Tumor" value={form.V27HistTumor} onChange={handleChange} />
                <input name="V28GradoDifTum" placeholder="Grado Diferenciación Tumor" value={form.V28GradoDifTum} onChange={handleChange} />
                <input name="V29EstadifTum" placeholder="Estadio Tumor" value={form.V29EstadifTum} onChange={handleChange} />
                <input name="V40ObjTtoInicial" placeholder="Objetivo Tto Inicial" value={form.V40ObjTtoInicial} onChange={handleChange} />
                <input name="V41IntervMed" placeholder="Intervención Médica" value={form.V41IntervMed} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== ANTECEDENTES =================== */}
            <TabPanel>
                <fieldset>
                <legend>Antecedentes</legend>
                <input name="V42AntCancerPrim" placeholder="Antecedente Cáncer Primario" value={form.V42AntCancerPrim} onChange={handleChange} />
                <input name="V44TipoCancerAnt" placeholder="Tipo Cáncer Antecedente" value={form.V44TipoCancerAnt} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== QUIMIOTERAPIA =================== */}
            <TabPanel>
                <fieldset>
                <legend>Quimioterapia</legend>
                <input name="V45RecibioQuimio" placeholder="Recibió Quimio (Sí/No)" value={form.V45RecibioQuimio} onChange={handleChange} />
                <input name="V46NumFasesQuimio" placeholder="Número Fases Quimio" value={form.V46NumFasesQuimio} onChange={handleChange} />
                <input name="V47NumCiclosQuimio" placeholder="Número Ciclos Quimio" value={form.V47NumCiclosQuimio} onChange={handleChange} />
                <input name="V53MedATC1" placeholder="Medicamento ATC1" value={form.V53MedATC1} onChange={handleChange} />
                <input name="V54MedATC2" placeholder="Medicamento ATC2" value={form.V54MedATC2} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== CIRUGÍA =================== */}
            <TabPanel>
                <fieldset>
                <legend>Cirugía</legend>
                <input name="V74RecibioCirugia" placeholder="Recibió Cirugía (Sí/No)" value={form.V74RecibioCirugia} onChange={handleChange} />
                <input name="V75NumCirugias" placeholder="Número Cirugías" value={form.V75NumCirugias} onChange={handleChange} />
                <input name="V79UbicTempCir1" placeholder="Ubicación Temporal Cirugía" value={form.V79UbicTempCir1} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== RADIOTERAPIA =================== */}
            <TabPanel>
                <fieldset>
                <legend>Radioterapia</legend>
                <input name="V86RecibioRadioterapia" placeholder="Recibió Radioterapia (Sí/No)" value={form.V86RecibioRadioterapia} onChange={handleChange} />
                <input name="V87NumSesionesRadio" placeholder="Número Sesiones" value={form.V87NumSesionesRadio} onChange={handleChange} />
                <input name="V89UbicTempEsq1Radio" placeholder="Ubicación Temporal Esquema 1" value={form.V89UbicTempEsq1Radio} onChange={handleChange} />
                </fieldset>
            </TabPanel>

            {/* =================== PALIATIVOS =================== */}
            <TabPanel>
                <fieldset>
                <legend>Cuidados Paliativos</legend>
                <input name="V114RecibioCuidadoPaliativo" placeholder="Recibió Cuidados Paliativos (Sí/No)" value={form.V114RecibioCuidadoPaliativo} onChange={handleChange} />
                <input name="V123TipoSoporteNutricional" placeholder="Tipo Soporte Nutricional" value={form.V123TipoSoporteNutricional} onChange={handleChange} />
                <input name="V124TerapiasComplementarias" placeholder="Terapias Complementarias" value={form.V124TerapiasComplementarias} onChange={handleChange} />
                </fieldset>
            </TabPanel>
            </Tabs>

            <button type="submit" className={styles["submit-btn"]}>Crear Usuario</button>
              <button
          type="button"
          onClick={volverHome}
          className={styles["back-btn"]}
        >
          Volver al Home
        </button>

        </form>
        </div>
  );
};

export default CrearUsuario;
