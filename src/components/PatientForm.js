
import React, { useState } from 'react';
import styles from '../styles/PatientForm.module.css';
import { FaChevronDown } from "react-icons/fa";


const PatientForm = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('1')}>
            <span className={styles.accordionTitle}>Sección 1: Datos Básicos del Usuario</span>
            <span className={styles.accordionArrow}>
            <FaChevronDown
            className={openSections['1'] ? styles.rotateArrow : ''}
            />
            </span>
          </div>
          {openSections['1'] && (
            <div className={styles.accordionContent}>
<>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">1. Primer nombre del usuario:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={styles.input}
            placeholder="Ingrese el primer nombre"
          />
        </div>

        {/* Variable 2 */}
        <div className={styles.formGroup}>
          <label htmlFor="secondName">2. Segundo nombre del usuario:</label>
          <input
            type="text"
            id="secondName"
            name="secondName"
            className={styles.input}
            placeholder="Ingrese el segundo nombre o NONE"
          />
        </div>

        {/* Variable 3 */}
        <div className={styles.formGroup}>
          <label htmlFor="firstLastName">3. Primer apellido del usuario:</label>
          <input
            type="text"
            id="firstLastName"
            name="firstLastName"
            className={styles.input}
            placeholder="Ingrese el primer apellido"
          />
        </div>

        {/* Variable 4 */}
        <div className={styles.formGroup}>
          <label htmlFor="secondLastName">4. Segundo apellido del usuario:</label>
          <input
            type="text"
            id="secondLastName"
            name="secondLastName"
            className={styles.input}
            placeholder="Ingrese el segundo apellido o NOAP"
          />
        </div>

        {/* Variable 5 */}
        <div className={styles.formGroup}>
          <label htmlFor="idType">5. Tipo de Identificación del usuario:</label>
          <select id="idType" name="idType" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="CC">Cédula ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="CD">Carné diplomático</option>
            <option value="PA">Pasaporte</option>
            <option value="SC">Salvoconducto de permanencia</option>
            <option value="PT">Permiso temporal de permanencia</option>
            <option value="PE">Permiso Especial de Permanencia</option>
            <option value="RC">Registro civil</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CN">Certificado de nacido vivo</option>
            <option value="AS">Adulto sin identificar</option>
            <option value="MS">Menor sin identificar</option>
            <option value="DE">Documento extranjero</option>
            <option value="SI">Sin identificación</option>
          </select>
        </div>

        {/* Variable 6 */}
        <div className={styles.formGroup}>
          <label htmlFor="idNumber">6. Número de Identificación del usuario:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            className={styles.input}
            placeholder="Ingrese el número de identificación"
          />
        </div>

        {/* Variable 7 */}
        <div className={styles.formGroup}>
          <label htmlFor="birthDate">7. Fecha de nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            className={styles.input}
          />
        </div>

        {/* Variable 8 */}
        <div className={styles.formGroup}>
          <label htmlFor="gender">8. Sexo:</label>
          <select id="gender" name="gender" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>

        {/* Variable 9 */}
        <div className={styles.formGroup}>
          <label htmlFor="occupation">9. Ocupación:</label>
          <select id="occupation" name="occupation" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="9999">No existe información</option>
            <option value="9998">No Aplica</option>
          </select>
        </div>

        {/* Variable 10 */}
        <div className={styles.formGroup}>
          <label htmlFor="regimen">10. Régimen de afiliación al SGSSS:</label>
          <select id="regimen" name="regimen" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="C">Régimen Contributivo</option>
            <option value="S">Régimen Subsidiado</option>
            <option value="P">Regímenes de excepción</option>
            <option value="E">Régimen especial</option>
            <option value="N">No asegurado</option>
          </select>
        </div>

        {/* Variable 11 */}
        <div className={styles.formGroup}>
          <label htmlFor="eapbCode">11. Código de la EAPB:</label>
          <input
            type="text"
            id="eapbCode"
            name="eapbCode"
            className={styles.input}
            placeholder="Ingrese el código de la EAPB"
          />
        </div>

        {/* Variable 12 */}
        <div className={styles.formGroup}>
          <label htmlFor="ethnicity">12. Código pertenencia étnica:</label>
          <select id="ethnicity" name="ethnicity" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="1">Indígena</option>
            <option value="2">ROM (gitano)</option>
            <option value="3">Raizal</option>
            <option value="4">Palenquero</option>
            <option value="5">Afrocolombiano</option>
            <option value="6">Ninguna</option>
          </select>
        </div>

        {/* Variable 13 */}
        <div className={styles.formGroup}>
          <label htmlFor="populationGroup">13. Grupo poblacional:</label>
          <select id="populationGroup" name="populationGroup" className={styles.input}>
            <option value="">Seleccione</option>
            <option value="1">Indigentes</option>
            <option value="2">Población infantil a cargo del ICBF</option>
            <option value="3">Madres comunitarias</option>
            <option value="4">Artistas, autores, compositores</option>
            <option value="5">Otro grupo poblacional</option>
            <option value="6">Recién Nacidos</option>
            <option value="7">Persona en situación de discapacidad</option>
            <option value="8">Desmovilizados</option>
            <option value="9">Desplazados</option>
            <option value="10">Población ROM</option>
            <option value="11">Población raizal</option>
            <option value="12">Población en centros psiquiátricos</option>
            <option value="13">Migratorio</option>
            <option value="14">Población en centros carcelarios</option>
            <option value="15">Población rural no migratoria</option>
            <option value="16">Afrocolombiano</option>
            <option value="31">Adulto mayor</option>
            <option value="32">Cabeza de familia</option>
            <option value="33">Mujer embarazada</option>
            <option value="34">Mujer lactante</option>
            <option value="35">Trabajador urbano</option>
            <option value="36">Trabajador rural</option>
            <option value="37">Víctima de violencia armada</option>
            <option value="38">Jóvenes vulnerables rurales</option>
            <option value="39">Jóvenes vulnerables urbanos</option>
            <option value="50">Persona en situación de discapacidad del sistema nervioso</option>
            <option value="51">Persona en situación de discapacidad de los ojos</option>
            <option value="52">Persona en situación de discapacidad de los oídos</option>
            <option value="53">Persona en situación de discapacidad de los demás órganos de los sentidos (olfato, tacto y gusto)</option>
            <option value="54">Persona en situación de discapacidad de la voz y el habla</option>
            <option value="55">Persona en situación de discapacidad del sistema cardiorrespiratorio y las defensas</option>
            <option value="56">Persona en situación de discapacidad de la digestión, el metabolismo, las hormonas</option>
            <option value="57">Persona en situación de discapacidad del sistema genital y reproductivo</option>
            <option value="58">Persona en situación de discapacidad del movimiento del cuerpo, manos, brazos, piernas</option>
            <option value="59">Persona en situación de discapacidad de la piel</option>
            <option value="60">Persona en situación de discapacidad de otro tipo</option>
            <option value="61">No definido</option>
            <option value="62">Comunidad indígena</option>
            <option value="63">Población migrante de la República Bolivariana de Venezuela</option>
          </select>
        </div>

        {/* Variable 14 */}
        <div className={styles.formGroup}>
          <label htmlFor="municipality">14. Municipio de residencia:</label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            className={styles.input}
            placeholder="Ingrese el municipio"
          />
        </div>

        {/* Variable 15 */}
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">15. Número telefónico del paciente:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={styles.input}
            placeholder="Ingrese el número telefónico"
          />
        </div>

        {/* Variable 16 */}
        <div className={styles.formGroup}>
          <label htmlFor="affiliationDate">16. Fecha de afiliación a la EAPB:</label>
          <input
            type="date"
            id="affiliationDate"
            name="affiliationDate"
            className={styles.input}
          />
        </div>
        </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('2')}>
            <span className={styles.accordionTitle}>Sección 2: Diagnóstico, estadificación y objetivos del tratamiento inicial</span>
            <span className={styles.accordionArrow}>
            <FaChevronDown
            className={openSections['2'] ? styles.rotateArrow : ''}
            />
            </span>
          </div>
          {openSections['2'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 17 */}
    <div className={styles.formGroup}>
      <label htmlFor="cieCode">17. Código CIE - 10 de la neoplasia:</label>
      <input
        type="text"
        id="cieCode"
        name="cieCode"
        className={styles.input}
        placeholder="Ingrese el código CIE-10"
      />
    </div>

    {/* Variable 18 */}
    <div className={styles.formGroup}>
      <label htmlFor="diagnosisDate">18. Fecha de diagnóstico del cáncer reportado:</label>
      <input
        type="date"
        id="diagnosisDate"
        name="diagnosisDate"
        className={styles.input}
      />
    </div>

    {/* Variable 19 */}
    <div className={styles.formGroup}>
      <label htmlFor="referralDate">
        19. Fecha de la nota de remisión o interconsulta del médico:
      </label>
      <input
        type="date"
        id="referralDate"
        name="referralDate"
        className={styles.input}
      />
    </div>

    {/* Variable 20 */}
    <div className={styles.formGroup}>
      <label htmlFor="admissionDate">20. Fecha de ingreso a la institución:</label>
      <input
        type="date"
        id="admissionDate"
        name="admissionDate"
        className={styles.input}
      />
    </div>

    {/* Variable 21 */}
    <div className={styles.formGroup}>
      <label htmlFor="diagnosisType">21. Tipo de estudio diagnóstico:</label>
      <select id="diagnosisType" name="diagnosisType" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="5">5: Inmunohistoquímica</option>
        <option value="6">6: Citometría de flujo</option>
        <option value="7">7: Clínica exclusivamente</option>
        <option value="8">8: Otro</option>
        <option value="9">9: Genética</option>
        <option value="10">10: Patología básica</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 22 */}
    <div className={styles.formGroup}>
      <label htmlFor="noHistopathologyReason">
        22. Motivo por el cual no se realizó histopatología:
      </label>
      <select
        id="noHistopathologyReason"
        name="noHistopathologyReason"
        className={styles.input}
      >
        <option value="">Seleccione</option>
        <option value="1">1: Clínica, usuario con coagulopatía</option>
        <option value="2">2: Clínica, debido a localización del tumor</option>
        <option value="3">3: Clínica, debido al estado funcionaldel usuario</option>
        <option value="4">4: Negativa del usuario</option>
        <option value="5">5: Administrativa</option>
        <option value="6">6: Clínica por reporte de imágenes</option>
        <option value="98">98: Tiene confirmación por histopatología</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 23 */}
    <div className={styles.formGroup}>
      <label htmlFor="sampleCollectionDate">
        23. Fecha de recolección de muestra:
      </label>
      <input
        type="date"
        id="sampleCollectionDate"
        name="sampleCollectionDate"
        className={styles.input}
      />
    </div>

    {/* Variable 24 */}
    <div className={styles.formGroup}>
      <label htmlFor="histopathologyDate">
        24. Fecha de informe histopatológico:
      </label>
      <input
        type="date"
        id="histopathologyDate"
        name="histopathologyDate"
        className={styles.input}
      />
    </div>

    {/* Variable 25 */}
    <div className={styles.formGroup}>
      <label htmlFor="ipsCode">
        25. Código de habilitación de la IPS:
      </label>
      <input
        type="text"
        id="ipsCode"
        name="ipsCode"
        className={styles.input}
        placeholder="Ingrese el código de habilitación"
      />
    </div>

    {/* Variable 26 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstConsultationDate">
        26. Fecha de primera consulta con médico tratante:
      </label>
      <input
        type="date"
        id="firstConsultationDate"
        name="firstConsultationDate"
        className={styles.input}
      />
    </div>

    {/* Variable 27 */}
    <div className={styles.formGroup}>
      <label htmlFor="tumorHistology">
        27. Histología del tumor en muestra de biopsia o quirúrgica:
      </label>
      <select id="tumorHistology" name="tumorHistology" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Adenocarcinoma, con o sin otra especificación</option>
        <option value="2">2: Carcinoma escamocelular (epidermoide)</option>
        <option value="3">3: Carcinoma de células basales (basocelular)</option>
        <option value="4">4: Carcinoma, con o sin otra especificación</option>
        <option value="5">5: Oligodendroglioma, con o sin otra especificación</option>
        <option value="6">6: Astrocitoma, con o sin otra especificación</option>
        <option value="7">7: Ependimoma, con o sin otra especificación</option>
        <option value="8">8: Neuroblastoma, con o sin otra especificación</option>
        <option value="9">9: Meduloblastoma, con o sin otra especificación</option>
        <option value="10">10: Hepatoblastoma, con o sin otra especificación</option>
        <option value="11">11: Rabdomiosarcoma, con o sin otra especificación</option>
        <option value="12">12: Leiomiosarcoma, con o sin otra especificación</option>
        <option value="13">13: Osteosarcoma, con o sin otra especificación</option>
        <option value="14">14: Fibrosarcoma, con o sin otra especificación</option>
        <option value="15">15: Angiosarcoma, con o sin otra especificación</option>
        <option value="16">16: Condrosarcoma, con o sin otra especificación</option>
        <option value="17">17: Otros sarcomas, con o sin otra especificación</option>
        <option value="18">18: Pancreatoblastoma, con o sin otra especificación</option>
        <option value="19">19: Blastoma pleuropulmonar, con o sin otra especificación</option>
        <option value="20">20: Otros tipos histológicos</option>
        <option value="23">23: Melanoma</option>
        <option value="24">24: Carcinoma papilar de tiroides</option>
        <option value="98">98: No se realizó estudio histopatológico</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 28 */}
    <div className={styles.formGroup}>
      <label htmlFor="tumorDifferentiation">
        28. Grado de diferenciación del tumor sólido maligno:
      </label>
      <select
        id="tumorDifferentiation"
        name="tumorDifferentiation"
        className={styles.input}
      >
        <option value="">Seleccione</option>
        <option value="1">1: Bien diferenciado (grado 1)</option>
        <option value="2">2: Moderadamente diferenciado (grado 2)</option>
        <option value="3">3: Mal diferenciado (grado 3)</option>
        <option value="4">4: Anaplásico o indiferenciado (grado 4)</option>
        <option value="94">94: Reporte no incluye diferenciación celular</option>
        <option value="95">95: No es sólido (cáncer hematolinfático)</option>
        <option value="98">98: No se realizó estudio histopatológico</option>
        <option value="99">99: No hay información</option>
      </select>
    </div>

    {/* Variable 29 */}
    <div className={styles.formGroup}>
      <label htmlFor="solidTumorStaging">
        29. Si es tumor sólido, cuál fue la primera estadificación basada en TNM, FIGO, u otras compatibles con esta numeración según tumor:
      </label>
      <select id="solidTumorStaging" name="solidTumorStaging" className={styles.input}>
        <option value="">Seleccione</option>
        <optgroup label="Cáncer de Mama y Cáncer Gástrico">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="2">2: ec IA o 1A</option>
          <option value="5">5: ec IB o 1b</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="20">20: ec IV o 4</option>
        </optgroup>
        <optgroup label="Cáncer de Próstata">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="1">1: ec I o 1</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB</option>
          <option value="15">15: ec IIC o 2c</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="21">21: ec IVA o 4a</option>
          <option value="22">22: ec IVB o 4b</option>
        </optgroup>
        <optgroup label="Cáncer de Pulmón (8ª Edición TNM)">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="3">3: ec IA1</option>
          <option value="4">4: ec IA2</option>
          <option value="36">36: ec IA3</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB o 2b</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="21">21: ec IVA o 4a</option>
          <option value="22">22: ec IVB o 4b</option>
        </optgroup>
        <optgroup label="Melanoma">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="2">2: ec IA o 1A</option>
          <option value="5">5: ec IB o 1b</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB o 2b</option>
          <option value="15">15: ec IIC o 2c</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="29">29: ec IIID o 3d</option>
          <option value="20">20: ec IV o 4</option>
        </optgroup>
        <optgroup label="Cáncer de Colon y Recto">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="1">1: ec I o 1</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB o 2b</option>
          <option value="15">15: ec IIC o 2c</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="21">21: ec IVA o 4a</option>
          <option value="22">22: ec IVB o 4b</option>
          <option value="23">23: ec IVC o 4c</option>
        </optgroup>
        <optgroup label="Cáncer Anal (Colon y Recto)">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="1">1: ec I o 1</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="14">14: ec IIB o 2b</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="20">20: ec IV o 4</option>
        </optgroup>
        <optgroup label="Cáncer de Cérvix (FIGO)">
          <option value="0">0: estadio clínico (ec) 0 (tumor in situ)</option>
          <option value="1">1: ec I o 1</option>
          <option value="2">2: ec IA o 1A</option>
          <option value="3">3: ec IA1</option>
          <option value="4">4: ec IA2</option>
          <option value="5">5: ec IB o 1b</option>
          <option value="6">6: ec IB1</option>
          <option value="7">7: ec IB2</option>
          <option value="30">30: ec IB3</option>
          <option value="10">10: ec II o 2</option>
          <option value="11">11: ec IIA o 2a</option>
          <option value="12">12: ec IIA1</option>
          <option value="13">13: ec IIA2</option>
          <option value="14">14: ec IIB o 2b</option>
          <option value="16">16: ec III o 3</option>
          <option value="17">17: ec IIIA o 3a</option>
          <option value="18">18: ec IIIB o 3b</option>
          <option value="19">19: ec IIIC o 3c</option>
          <option value="27">27: ec IIIC1</option>
          <option value="28">28: ec IIIC2</option>
          <option value="21">21: ec IVA o 4a</option>
          <option value="22">22: ec IVB o 4b</option>
        </optgroup>
        <optgroup label="Otras Opciones">
          <option value="8">8: ec IC o 1c</option>
          <option value="9">9: ec IS o 1s</option>
          <option value="24">24: ec 4S (neuroblastoma)</option>
          <option value="25">25: ec V o 5</option>
          <option value="31">31: ec IC1</option>
          <option value="32">32: ec IC2</option>
          <option value="33">33: ec IC3</option>
          <option value="34">34: ec IIIA1</option>
          <option value="35">35: ec IIIA2</option>
          <option value="98">98: No Aplica (basocelular, hematológico o SNC)</option>
          <option value="99">99: Desconocido</option>
        </optgroup>
      </select>
    </div>

    {/* Variable 30 */}
    <div className={styles.formGroup}>
      <label htmlFor="stagingDate">
        30. Fecha en que se realizó esta estadificación:
      </label>
      <input
        type="date"
        id="stagingDate"
        name="stagingDate"
        className={styles.input}
      />
    </div>

    {/* Variable 31 */}
    <div className={styles.formGroup}>
      <label htmlFor="her2Test">
        31. Para cáncer de mama, ¿se realizó la prueba HER2 antes del tratamiento?:
      </label>
      <select id="her2Test" name="her2Test" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí se le realizó</option>
        <option value="2">2: No se le realizó</option>
        <option value="97">97: No Aplica (cáncer de mama in situ)</option>
        <option value="98">98: No Aplica (no es cáncer de mama)</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 32 */}
    <div className={styles.formGroup}>
      <label htmlFor="her2TestDate">
        32. Fecha de realización de la única o última prueba HER2:
      </label>
      <input
        type="date"
        id="her2TestDate"
        name="her2TestDate"
        className={styles.input}
      />
    </div>

    {/* Variable 33 */}
    <div className={styles.formGroup}>
      <label htmlFor="her2TestResult">
        33. Resultado de la única o última prueba HER2:
      </label>
      <select id="her2TestResult" name="her2TestResult" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: +++ (positivo)</option>
        <option value="2">2: ++ (equívoco o indeterminado)</option>
        <option value="3">3: + (negativo)</option>
        <option value="4">4: 0 (negativo)</option>
        <option value="97">97: No Aplica (cáncer de mama in situ)</option>
        <option value="98">98: No Aplica (no es cáncer de mama)</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 34 */}
    <div className={styles.formGroup}>
      <label htmlFor="dukesStaging">
        34. Para cáncer colorrectal, estadificación de Dukes:
      </label>
      <select id="dukesStaging" name="dukesStaging" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: A</option>
        <option value="2">2: B</option>
        <option value="3">3: C</option>
        <option value="4">4: D</option>
        <option value="98">98: No Aplica</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 35 */}
    <div className={styles.formGroup}>
      <label htmlFor="dukesDate">
        35. Fecha en que se realizó la estadificación de Dukes:
      </label>
      <input
        type="date"
        id="dukesDate"
        name="dukesDate"
        className={styles.input}
      />
    </div>

    {/* Variable 36 */}
    <div className={styles.formGroup}>
      <label htmlFor="lymphomaStaging">
        36. Estadificación clínica en linfoma no Hodgkin o Hodgkin:
      </label>
      <select
        id="lymphomaStaging"
        name="lymphomaStaging"
        className={styles.input}
      >
        <option value="">Seleccione</option>
        <option value="1">1: Estadio I</option>
        <option value="2">2: Estadio II</option>
        <option value="3">3: Estadio III</option>
        <option value="4">4: Estadio IV</option>
        <option value="5">5: Estadio IA</option>
        <option value="6">6: Estadio IB</option>
        <option value="7">7: Estadio IIA</option>
        <option value="8">8: Estadio IIB</option>
        <option value="9">9: Estadio IIIA</option>
        <option value="10">10: Estadio IIIB</option>
        <option value="11">11: Estadio IVA</option>
        <option value="12">12: Estadio IVB</option>
        <option value="13">13: Extranodal cualquier estadio</option>
        <option value="14">14: Primario SNC</option>
        <option value="15">15: Primario Mediastinal</option>
        <option value="16">16: Primario de otros órganos</option>
        <option value="98">No Aplica</option>
        <option value="99">Desconocido</option>
      </select>
    </div>

    {/* Variable 37 */}
    <div className={styles.formGroup}>
    <label htmlFor="gleasonScore">
        37. Para cáncer de próstata, valor de clasificación de la escala Gleason en el momento del diagnóstico:
    </label>
    <select id="gleasonScore" name="gleasonScore" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="11">11: Gleason ≤ 6 (≤ 3+3)</option>
        <option value="12">12: Gleason 7 (3+4)</option>
        <option value="13">13: Gleason 7 (4+3)</option>
        <option value="14">14: Gleason 8 (4+4, 3+5 o 5+3)</option>
        <option value="15">15: Gleason 9 o 10 (4+5, 5+4 o 5+5)</option>
        <option value="97">97: Es cáncer de próstata, No hay información (diagnóstico clínico)</option>
        <option value="98">98: No es cáncer de próstata</option>
        <option value="99">99: Es cáncer de próstata, No hay información (diagnóstico histopatológico)</option>
    </select>
    </div>

    {/* Variable 38 */}
    <div className={styles.formGroup}>
    <label htmlFor="riskClassification">
        38. Clasificación del riesgo (leucemias, linfomas, mieloma múltiple o sólidos pediátricos):
    </label>
    <select id="riskClassification" name="riskClassification" className={styles.input}>
        <option value="">Seleccione</option>
        <optgroup label="Clasificación de riesgo en linfoma no Hodgkin">
        <option value="1">1: Bajo riesgo</option>
        <option value="2">2: Riesgo intermedio bajo</option>
        <option value="3">3: Intermedio</option>
        <option value="4">4: Riesgo intermedio alto</option>
        <option value="5">5: Riesgo alto</option>
        </optgroup>
        <optgroup label="Clasificación de riesgo en linfoma de Hodgkin">
        <option value="1">1: Bajo riesgo</option>
        <option value="5">5: Riesgo alto</option>
        </optgroup>
        <optgroup label="Clasificación del riesgo en adultos (LLA, LMA y MM)">
        <option value="1">1: Riesgo estándar, bajo</option>
        <option value="3">3: Riesgo intermedio</option>
        <option value="5">5: Riesgo alto</option>
        </optgroup>
        <optgroup label="Clasificación del riesgo en Pediatría (LLA y LMA)">
        <option value="1">1: Riesgo estándar,favorable, bajo riesgo</option>
        <option value="3">3: Riesgo intermedio</option>
        <option value="5">5: Riesgo alto, desfavorable</option>
        </optgroup>
        <option value="98">No Aplica (no es leucemia ni linfoma)</option>
        <option value="99">Desconocido</option>
    </select>
    </div>

    {/* Variable 39 */}
    <div className={styles.formGroup}>
    <label htmlFor="riskClassificationDate">
        39. Fecha de clasificación de riesgo:
    </label>
    <input
        type="date"
        id="riskClassificationDate"
        name="riskClassificationDate"
        className={styles.input}
    />
    </div>

    {/* Variable 40 */}
    <div className={styles.formGroup}>
    <label htmlFor="treatmentObjective">
        40. Objetivo (o intención) del tratamiento médico inicial:
    </label>
    <select id="treatmentObjective" name="treatmentObjective" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Curación</option>
        <option value="2">2: Paliación (intención paliativa)</option>
        <option value="99">99: Desconocido</option>
    </select>
    </div>

    {/* Variable 41 */}
    <div className={styles.formGroup}>
    <label htmlFor="medicalIntervention">
        41. Intervención médica durante el periodo de reporte:
    </label>
    <select id="medicalIntervention" name="medicalIntervention" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Observación previa a tratamiento</option>
        <option value="2">2: Ofrecer tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída</option>
        <option value="3">3: Observación o seguimiento oncológico luego de tratamiento inicial</option>
        <option value="4">4: 1 y 2 únicamente</option>
        <option value="5">5: 2 y 3 únicamente</option>
        <option value="6">6: 1, 2 y 3</option>
        <option value="99">99: No hay intervención en el periodo</option>
    </select>
    </div>
  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('3')}>
            <span className={styles.accordionTitle}>Sección 3: Antecedentes al Diagnóstico del Cáncer Reportado</span>
            <span className={styles.accordionArrow}>
            <FaChevronDown
            className={openSections['3'] ? styles.rotateArrow : ''}
            />
            </span>
          </div>
          {openSections['3'] && (
            <div className={styles.accordionContent}>
<div>
    {/* Variable 42 */}
    <div className={styles.formGroup}>
      <label htmlFor="otherPrimaryCancer">
        42. ¿Tiene antecedente o padece de otro cáncer primario (es decir, tiene o tuvo otro tumor maligno diferente al que está notificando)?
      </label>
      <select id="otherPrimaryCancer" name="otherPrimaryCancer" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí</option>
        <option value="2">2: No</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 43 */}
    <div className={styles.formGroup}>
      <label htmlFor="diagnosisDateOtherCancer">
        43. Fecha de diagnóstico del otro cáncer primario:
      </label>
      <input
        type="date"
        id="diagnosisDateOtherCancer"
        name="diagnosisDateOtherCancer"
        className={styles.input}
      />
    </div>

    {/* Variable 44 */}
    <div className={styles.formGroup}>
      <label htmlFor="cie10OtherCancer">
        44. Tipo (CIE-10) de ese cáncer antecedente o concurrente:
      </label>
      <input
        type="text"
        id="cie10OtherCancer"
        name="cie10OtherCancer"
        className={styles.input}
        placeholder="Ingrese el código CIE-10"
      />
    </div>
  </div>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('4')}>
            <span className={styles.accordionTitle}>Sección 4: Información específica de terapia sistémica e intratecal en el periodo de reporte actual</span>
            <span className={styles.accordionArrow}>
            <FaChevronDown
            className={openSections['4'] ? styles.rotateArrow : ''}
            />
            </span>
          </div>
          {openSections['4'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 45 */}
    <div className={styles.formGroup}>
      <label htmlFor="therapyReceived">
        45. ¿Recibió el usuario quimioterapia u otra terapia sistémica?
      </label>
      <select id="therapyReceived" name="therapyReceived" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 46 */}
    <div className={styles.formGroup}>
      <label htmlFor="therapyPhases">
        46. ¿Cuántas fases de quimioterapia recibió el usuario en este periodo de reporte?
      </label>
      <select id="therapyPhases" name="therapyPhases" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="0">0: Es cáncer hematolinfático</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 46.1 */}
    <div className={styles.formGroup}>
      <label htmlFor="prefase">
        46.1. ¿El usuario recibió la fase Prefase o Citorreducción inicial?
      </label>
      <select id="prefase" name="prefase" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
      </select>
    </div>

    {/* Variable 46.2 */}
    <div className={styles.formGroup}>
      <label htmlFor="induccion">
        46.2. ¿El usuario recibió la fase de quimioterapia denominada Inducción?
      </label>
      <select id="induccion" name="induccion" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
      </select>
    </div>

    {/* Variable 46.3 */}
    <div className={styles.formGroup}>
      <label htmlFor="intensificacion">
        46.3. ¿El usuario recibió la fase de quimioterapia denominada Intensificación?
      </label>
      <select id="intensificacion" name="intensificacion" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
      </select>
    </div>
            {/* Variable 46.4 */}
    <div className={styles.formGroup}>
    <label htmlFor="chemoPhaseConsolidation">
        46.4. El usuario recibió en este periodo la fase de quimioterapia denominada Consolidación:
    </label>
    <select id="chemoPhaseConsolidation" name="chemoPhaseConsolidation" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
    </select>
    </div>

    {/* Variable 46.5 */}
    <div className={styles.formGroup}>
    <label htmlFor="chemoPhaseReinduction">
        46.5. El usuario recibió en este periodo la fase de quimioterapia denominada Reinducción:
    </label>
    <select id="chemoPhaseReinduction" name="chemoPhaseReinduction" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
    </select>
    </div>

    {/* Variable 46.6 */}
    <div className={styles.formGroup}>
    <label htmlFor="chemoPhaseMaintenance">
        46.6. El usuario recibió en este periodo la fase de quimioterapia denominada Mantenimiento:
    </label>
    <select id="chemoPhaseMaintenance" name="chemoPhaseMaintenance"className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
    </select>
    </div>

    {/* Variable 46.7 */}
    <div className={styles.formGroup}>
    <label htmlFor="chemoPhaseLongMaintenance">
        46.7. El usuario recibió en este periodo la fase de quimioterapia denominada Mantenimiento largo o final:
    </label>
    <select id="chemoPhaseLongMaintenance" name="chemoPhaseLongMaintenance" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
    </select>
    </div>

    {/* Variable 46.8 */}
    <div className={styles.formGroup}>
    <label htmlFor="chemoPhaseOther">
        46.8. El usuario recibió en este periodo Otra fase de quimioterapia denominada diferente a las anteriores:
    </label>
    <select id="chemoPhaseOther" name="chemoPhaseOther" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="97">97: No Aplica</option>
    </select>
    </div>

    {/* Variable 47 */}
    <div className={styles.formGroup}>
      <label htmlFor="cyclesNumber">
        47. Número de ciclos iniciados y administrados en el periodo de reporte:
      </label>
      <input type="number" id="cyclesNumber" name="cyclesNumber" className={styles.input} placeholder="Ingrese el número de ciclos"/>
    </div>

    {/* Variable 48 */}
    <div className={styles.formGroup}>
      <label htmlFor="therapyLocation">
        48. Ubicación temporal del primer o único esquema de quimioterapia:
      </label>
      <select id="therapyLocation" name="therapyLocation" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Neoadyuvancia (manejo inicial prequirúrgico)</option>
        <option value="2">2: Tratamiento inicial curativo o sin cirugía sugerida</option>
        <option value="3">3: Adyuvancia (manejo inicial postquirúrgico)</option>
        <option value="11">11: Manejo de recaída</option>
        <option value="12">12: Manejo de enfermedad metastásica</option>
        <option value="13">13: Manejo paliativo</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 49 */}
    <div className={styles.formGroup}>
      <label htmlFor="startDate">
        49. Fecha de inicio del primer o único esquema de quimioterapia:
      </label>
      <input type="date" id="startDate" name="startDate" className={styles.input}/>
    </div>

    {/* Variable 50 */}
    <div className={styles.formGroup}>
      <label htmlFor="ipsCount">
        50. Número de IPS que suministran el primer esquema de quimioterapia:
      </label>
      <input type="number" id="ipsCount" name="ipsCount" className={styles.input} placeholder="Ingrese el número de IPS"/>
    </div>

    {/* Variable 51 */}
    <div className={styles.formGroup}>
      <label htmlFor="ipsCode1">
        51. Código de la IPS1 que suministra el primer o único esquema de quimioterapia:
      </label>
      <input type="text" id="ipsCode1" name="ipsCode1" className={styles.input} placeholder="Ingrese el código de habilitación de la IPS"/>
    </div>

    {/* Variable 52 */}
    <div className={styles.formGroup}>
      <label htmlFor="ipsCode2">
        52. Código de la IPS2 que suministra el primer o único esquema de quimioterapia:
      </label>
      <input type="text" id="ipsCode2" name="ipsCode2" className={styles.input} placeholder="Ingrese el código de habilitación de la IPS"/>
    </div>

    {/* Variable 53 */}
    <div className={styles.formGroup}>
      <label htmlFor="antineoplasticDrugsCount">
        53. ¿Cuántos medicamentos antineoplásicos o terapia hormonal se propusieron como manejo?
      </label>
      <input type="number" id="antineoplasticDrugsCount" name="antineoplasticDrugsCount" className={styles.input} placeholder="Ingrese el número de medicamentos"/>
    </div>

    {/* Variable 53.1 */}
    <div className={styles.formGroup}>
      <label htmlFor="drugCode1">
        53.1. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input type="text" id="drugCode1" name="drugCode1" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.2 */}
    <div className={styles.formGroup}>
      <label htmlFor="drugCode2">
        53.2. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input type="text" id="drugCode2" name="drugCode2" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Repite el mismo patrón para las variables 53.3 a 53.9 */}
    <div className={styles.formGroup}>
      <label htmlFor="drugCode3">
        53.3. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input type="text" id="drugCode3" name="drugCode3" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.4 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_4">
        53.4. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_4" name="dmedicationATC_53_4" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.5 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_5">
        53.5. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_5" name="dmedicationATC_53_5" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.6 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_6">
        53.6. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_6" name="dmedicationATC_53_6" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.7 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_7">
        53.7. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_7" name="dmedicationATC_53_7" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.8 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_8">
        53.8. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_8" name="dmedicationATC_53_8" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 53.9 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_53_9">
        53.9. Medicamento antineoplásico administrado al usuario- PRIMER o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_53_9" name="dmedicationATC_53_9" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 54 */}
    <div className={styles.formGroup}>
      <label htmlFor="additionalDrug1">
        54. Medicamento antineoplásico adicional al reportado en variables 53.1 a 53.9:
      </label>
      <input type="text" id="additionalDrug1" name="additionalDrug1" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 55 */}
    <div className={styles.formGroup}>
      <label htmlFor="additionalDrug2">
        55. Medicamento antineoplásico adicional 2:
      </label>
      <input type="text" id="additionalDrug2" name="additionalDrug2" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 56 */}
    <div className={styles.formGroup}>
      <label htmlFor="medicationATC_56">
        56. Medicamento Antineoplásico o terapia hormonal para el cáncer, adicional a los reportados en las variables 53.1 a 53.9 - 3 administrado al usuario- primer o único esquema del periodo de reporte:
      </label>
      <input type="text" id="medicationATC_56" name="medicationATC_56" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 57 */}
    <div className={styles.formGroup}>
      <label htmlFor="intrathecalTherapy">
        57. ¿Recibió quimioterapia intratecal?
      </label>
      <select id="intrathecalTherapy" name="intrathecalTherapy" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 58 */}
    <div className={styles.formGroup}>
      <label htmlFor="endDateFirstScheme">
        58. Fecha de finalización del primer esquema:
      </label>
      <input type="date" id="endDateFirstScheme" name="endDateFirstScheme" className={styles.input}/>
    </div>

    {/* Variable 59 */}
    <div className={styles.formGroup}>
      <label htmlFor="schemeStatus">
        59. Características actuales del primer esquema:
      </label>
      <select id="schemeStatus" name="schemeStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Finalizado, esquema completo según medicamentos programados</option>
        <option value="2">2: Finalizado, esquema incompleto pero finalizado por algún motivo</option>
        <option value="3">3: No finalizado, esquema incompleto, pero aún bajo tratamiento</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 60 */}
    <div className={styles.formGroup}>
      <label htmlFor="endReason">
        60. Motivo de finalización prematura del esquema:
      </label>
      <select id="endReason" name="endReason" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Toxicidad de medicamentos</option>
        <option value="2">2: Otros motivos médicos</option>
        <option value="3">3: Muerte</option>
        <option value="4">4: Cambio de EPS</option>
        <option value="5">5: Decisión del usuario, abandonó la terapia</option>
        <option value="6">6: No hay disponibilidad de medicamentos</option>
        <option value="7">7: Otros motivos administrativos</option>
        <option value="8">8: Otras causas no contempladas</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 61 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemePosition">
        61. Ubicación temporal del último esquema de quimioterapia o terapia sistémica:
      </label>
      <select id="lastSchemePosition" name="lastSchemePosition" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Neoadyuvancia (manejo inicial prequirúrgico)</option>
        <option value="2">2: Tratamiento inicial curativo sin cirugía sugerida</option>
        <option value="3">3: Adyuvancia (manejo inicial postquirúrgico)</option>
        <option value="11">11: Manejo de progresión o recaída</option>
        <option value="12">12: Manejo de enfermedad metastásica</option>
        <option value="13">13: Cambio por toxicidad</option>
        <option value="14">14: Manejo paliativo</option>
        <option value="97">97: Solo recibió un esquema en este periodo</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 62 */} 
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemeStartDate">
        62. Fecha de inicio del último esquema:
      </label>
      <input type="date" id="lastSchemeStartDate" name="lastSchemeStartDate" className={styles.input}/>
    </div>

    {/* Variable 63 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemeIpsCount">
        63. Número de IPS que suministran el último esquema:
      </label>
      <input type="number" id="lastSchemeIpsCount" name="lastSchemeIpsCount" className={styles.input} placeholder="Ingrese el número de IPS"/>
    </div>

    {/* Variable 64 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastIpsCode1">
        64. Código de la IPS1 que suministra el último esquema:
      </label>
      <input type="text" id="lastIpsCode1" name="lastIpsCode1" className={styles.input} placeholder="Ingrese el código de habilitación de la IPS"
      />
    </div>

    {/* Variable 65 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastIpsCode2">
        65. Código de la IPS2 que suministra el último esquema:
      </label>
      <input type="text" id="lastIpsCode2" name="lastIpsCode2" className={styles.input} placeholder="Ingrese el código de habilitación de la IPS"/>
    </div>

    {/* Variable 66 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastAntineoplasticDrugsCount">
        66. ¿Cuántos medicamentos antineoplásicos o terapia hormonal se propusieron en el último esquema?
      </label>
      <input type="number" id="lastAntineoplasticDrugsCount" name="lastAntineoplasticDrugsCount" className={styles.input} placeholder="Ingrese el número de medicamentos"/>
    </div>

    {/* Variable 66.1 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode1">
        66.1. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input type="text" id="lastDrugCode1" name="lastDrugCode1" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.2 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode2">
        66.2. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input type="text" id="lastDrugCode2" name="lastDrugCode2" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.3 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode3">
        66.3. Medicamento antineoplásico administrado (Código ATC):
      </label>
      <input
        type="text"
        id="lastDrugCode3"
        name="lastDrugCode3"
        className={styles.input}
        placeholder="Ingrese el código ATC"
      />
    </div>

    {/* Variable 66.4 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode4">
        66.4. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode4" name="lastDrugCode4" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.5 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode5">
        66.5. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode5" name="lastDrugCode5" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.6 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode6">
        66.6. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode6" name="lastDrugCode6" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.7 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode7">
        66.7. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode7" name="lastDrugCode7" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.8 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode8">
        66.8. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode8" name="lastDrugCode8" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 66.9 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastDrugCode9">
        66.9. Medicamento antineoplásico administrado al usuario- ÚLTIMO esquema del periodo de reporte (Código ATC):
      </label>
      <input type="text" id="lastDrugCode9" name="lastDrugCode9" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 67 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastAdditionalDrug1">
        67. Medicamento antineoplásico adicional al último esquema:
      </label>
      <input type="text" id="lastAdditionalDrug1" name="lastAdditionalDrug1" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 68 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastAdditionalDrug2">
        68. Medicamento antineoplásico adicional 2 al último esquema:
      </label>
      <input type="text" id="lastAdditionalDrug2" name="lastAdditionalDrug2" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 69 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastAdditionalDrug3">
        69. Medicamento antineoplásico adicional 3 al último esquema:
      </label>
      <input type="text" id="lastAdditionalDrug3" name="lastAdditionalDrug3" className={styles.input} placeholder="Ingrese el código ATC"/>
    </div>

    {/* Variable 70 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastIntrathecalTherapy">
        70. ¿Recibió quimioterapia intratecal en el último esquema?
      </label>
      <select id="lastIntrathecalTherapy" name="lastIntrathecalTherapy" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="2">2: No recibió</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 71 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemeEndDate">
        71. Fecha de finalización del último esquema:
      </label>
      <input type="date" id="lastSchemeEndDate" name="lastSchemeEndDate" className={styles.input}/>
    </div>

    {/* Variable 72 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemeStatus">
        72. Características actuales del último esquema:
      </label>
      <select id="lastSchemeStatus" name="lastSchemeStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Finalizado, esquema completo según medicamentos programados</option>
        <option value="2">2: Finalizado, esquema incompleto pero finalizado por algún motivo</option>
        <option value="3">3: No finalizado, esquema incompleto, pero aún bajo tratamiento </option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 73 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSchemeEndReason">
        73. Motivo de la finalización del último esquema:
      </label>
      <select id="lastSchemeEndReason" name="lastSchemeEndReason" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Toxicidad de medicamentos</option>
        <option value="2">2: Otros motivos médicos</option>
        <option value="3">3: Muerte</option>
        <option value="4">4:Cambio de EPS</option>
        <option value="5">5: Decisión del usuario, abandonó la terapia</option>
        <option value="6">6: No hay disponibilidad de medicamentos</option>
        <option value="7">7: Otros motivos administrativos</option>
        <option value="8">8: Otras causas no contempladas</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>
  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('5')}>
            <span className={styles.accordionTitle}>Sección 5: Información específica de cirugía en el periodo de reporte actual</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['5'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['5'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 74 */}
    <div className={styles.formGroup}>
      <label htmlFor="surgeryPerformed">
        74. ¿Fue sometido el usuario a una o más cirugías curativas o paliativas como parte del manejo del cáncer durante este periodo de reporte?:
      </label>
      <select id="surgeryPerformed" name="surgeryPerformed" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Si fue sometido al menos a una cirugía durante este periodo</option>
        <option value="2">2: No recibió cirugía</option>
      </select>
    </div>

    {/* Variable 75 */}
    <div className={styles.formGroup}>
      <label htmlFor="numSurgeries">
        75. Número de cirugías a las que fue sometido el usuario durante el periodo de reporte actual:
      </label>
      <input type="number" id="numSurgeries" name="numSurgeries" className={styles.input} placeholder="Ingrese el número de cirugías"/>
    </div>

    {/* Variable 76 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstSurgeryDate">
        76. Fecha de realización de la primera cirugía en este periodo de reporte:
      </label>
      <input type="date" id="firstSurgeryDate" name="firstSurgeryDate" className={styles.input}/>
    </div>

    {/* Variable 77 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstSurgeryIPS">
        77. Código de la IPS que realizó la primera cirugía de este periodo de reporte:
      </label>
      <input type="text" id="firstSurgeryIPS" name="firstSurgeryIPS" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 78 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstSurgeryCode">
        78. Código de primera cirugía en este periodo de reporte:
      </label>
      <input type="text" id="firstSurgeryCode" name="firstSurgeryCode" className={styles.input} placeholder="Ingrese el código CUPS"/>
    </div>

    {/* Variable 79 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstSurgeryTiming">
        79. Ubicación temporal de esta primera cirugía en relación al manejo oncológico:
      </label>
      <select id="firstSurgeryTiming" name="firstSurgeryTiming" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Parte del manejo inicial para el cáncer (tratamiento inicial curativo)</option>
        <option value="5">5: Manejo de recaída</option>
        <option value="6">6: Manejo de enfermedad metastásica</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 80 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSurgeryDate">
        80. Fecha de realización de la última cirugía o cirugía de reintervención en este periodo de reporte:
      </label>
      <input type="date" id="lastSurgeryDate" name="lastSurgeryDate" className={styles.input}/>
    </div>

    {/* Variable 81 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSurgeryReason">
        81. Motivo de haber realizado la última cirugía de este periodo de reporte:
      </label>
      <select id="lastSurgeryReason" name="lastSurgeryReason" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía</option>
        <option value="2">2: Complicaciones debida a la primera cirugía o siguientes</option>
        <option value="3">3: Complicaciones por otras condiciones médicas no relacionadas a la cirugía</option>
        <option value="5">5: 1 y 3</option>
        <option value="6">6: 2 y 3</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 82 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSurgeryIPS">
        82. Código de la IPS que realiza la última cirugía en este periodo de reporte:
      </label>
      <input type="text" id="lastSurgeryIPS" name="lastSurgeryIPS" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 83 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSurgeryCode">
        83. Código de última cirugía en este periodo de reporte:
      </label>
      <input type="text" id="lastSurgeryCode" name="lastSurgeryCode" className={styles.input} placeholder="Ingrese el código CUPS"/>
    </div>

    {/* Variable 84 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastSurgeryTiming">
        84. Ubicación temporal de esta última cirugía en relación al manejo oncológico, en este periodo de reporte:
      </label>
      <select id="lastSurgeryTiming" name="lastSurgeryTiming" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Parte del manejo inicial para el cáncer (manejo inicial curativo)</option>
        <option value="5">5: Manejo de recaída</option>
        <option value="6">6: Manejo de enfermedad metastásica</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 85 */}
    <div className={styles.formGroup}>
      <label htmlFor="surgeryVitalStatus">
        85. Estado vital al finalizar la única o última cirugía de este periodo de reporte:
      </label>
      <select id="surgeryVitalStatus" name="surgeryVitalStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Vivo</option>
        <option value="2">2: Fallecido</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>
  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('6')}>
            <span className={styles.accordionTitle}>Sección 6: Información específica de radioterapia en el periodo de reporte actual</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['6'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['6'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 86 */}
    <div className={styles.formGroup}>
      <label htmlFor="radiotherapyPerformed">
        86. ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?:
      </label>
      <select id="radiotherapyPerformed" name="radiotherapyPerformed" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió algún tipo de radioterapia</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 87 */}
    <div className={styles.formGroup}>
      <label htmlFor="numRadiotherapySessions">
        87. Número de sesiones de radioterapia recibidas en el periodo:
      </label>
      <input type="number" id="numRadiotherapySessions" name="numRadiotherapySessions" className={styles.input} placeholder="Ingrese el número de sesiones"/>
    </div>

    {/* Variable 88 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyDate">
        88. Fecha de inicio de primer o único esquema de cualquier tipo de radioterapia suministrado en el periodo:
      </label>
      <input type="date" id="firstRadiotherapyDate" name="firstRadiotherapyDate" className={styles.input}/>
    </div>

    {/* Variable 89 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyTiming">
        89. Ubicación temporal del primer o único esquema de cualquier tipo de radioterapia en este periodo:
      </label>
      <select id="firstRadiotherapyTiming" name="firstRadiotherapyTiming" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Neoadyuvancia (manejo inicial prequirúrgico)</option>
        <option value="2">2: Tratamiento inicial curativo sin cirugía sugerida</option>
        <option value="3">3: Adyuvancia (manejo inicial postquirúrgico)</option>
        <option value="11">11: Manejo de recaída</option>
        <option value="12">12: Manejo de enfermedad metastásica</option>
        <option value="13">13: Manejo paliativo</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 90 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyType">
        90. Tipo de radioterapia aplicada en este primer o único esquema:
      </label>
      <input type="text" id="firstRadiotherapyType" name="firstRadiotherapyType" className={styles.input} placeholder="Ingrese el código CUPS"/>
    </div>

    {/* Variable 91 */}
    <div className={styles.formGroup}>
      <label htmlFor="numRadiotherapyIPS">
        91. Número de IPS que suministran este primer o único esquema de radioterapia:
      </label>
      <input type="number" id="numRadiotherapyIPS" name="numRadiotherapyIPS" className={styles.input} placeholder="Ingrese el número de IPS"/>
    </div>

    {/* Variable 92 */}
    <div className={styles.formGroup}>
      <label htmlFor="radiotherapyIPS1">
        92. Código de la IPS1 que suministra la radioterapia de este primer o único esquema:
      </label>
      <input type="text" id="radiotherapyIPS1" name="radiotherapyIPS1" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 93 */}
    <div className={styles.formGroup}>
      <label htmlFor="radiotherapyIPS2">
        93. Código de la IPS2 que suministra la radioterapia de este primer o único esquema:
      </label>
      <input
        type="text"
        id="radiotherapyIPS2"
        name="radiotherapyIPS2" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 94 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyEndDate">
        94. Fecha de finalización de primer o único esquema de radioterapia:
      </label>
      <input type="date" id="firstRadiotherapyEndDate" name="firstRadiotherapyEndDate" className={styles.input}/>
    </div>

    {/* Variable 95 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyStatus">
        95. Características actuales de este primer o único esquema de radioterapia:
      </label>
      <select id="firstRadiotherapyStatus" name="firstRadiotherapyStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Finalizado, dosis completa de radioterapia prescrita</option>
        <option value="2">2: Finalizado, dosis incompleta pero finalizada por algún motivo</option>
        <option value="3">3: No finalizado, esquema incompleto, pero aún bajo tratamiento</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 96 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstRadiotherapyEndReason">
        96. Motivo de la finalización de este primer o único esquema de radioterapia:
      </label>
      <select id="firstRadiotherapyEndReason" name="firstRadiotherapyEndReason" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Toxicidad</option>
        <option value="2">2: Otros motivos médicos</option>
        <option value="3">3: Muerte</option>
        <option value="4">4: Cambio de EPS</option>
        <option value="5">5: Decisión del usuario</option>
        <option value="6">6: Otros motivos administrativos</option>
        <option value="7">7: Otras causas no contempladas</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 97 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyStartDate">
        97. Fecha de inicio del último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual:
      </label>
      <input type="date" id="lastRadiotherapyStartDate" name="lastRadiotherapyStartDate" className={styles.input}/>
    </div>

    {/* Variable 98 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyTiming">
        98. Ubicación temporal/intención del último esquema de cualquier tipo de radioterapia suministrado en el periodo actual en relación al tratamiento oncológico:
      </label>
      <select id="lastRadiotherapyTiming" name="lastRadiotherapyTiming" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Neoadyuvancia (manejo inicial prequirúrgico)</option>
        <option value="2">2: Tratamiento inicial curativo sin cirugía sugerida</option>
        <option value="3">3: Adyuvancia (manejo inicial postquirúrgico)</option>
        <option value="11">11: Manejo de recaída</option>
        <option value="12">12: Manejo de enfermedad metastásica</option>
        <option value="13">13: Manejo paliativo (sin manejo de recaída ni enfermedad metastásica)</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 99 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyType">
        99. Tipo de radioterapia aplicada en el último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual:
      </label>
      <input type="text" id="lastRadiotherapyType" name="lastRadiotherapyType" className={styles.input} placeholder="Ingrese el código CUPS"/>
    </div>

    {/* Variable 100 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyIPSCount">
        100. Número de IPS que suministran este último esquema de cualquier tipo de radioterapia en el periodo de reporte actual:
      </label>
      <input type="number" id="lastRadiotherapyIPSCount" name="lastRadiotherapyIPSCount" className={styles.input} placeholder="Ingrese el número de IPS"/>
    </div>

    {/* Variable 101 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyIPS1">
        101. Código de la IPS1 que suministra último esquema de cualquier tipo de radioterapia en el periodo de reporte actual:
      </label>
      <input type="text" id="lastRadiotherapyIPS1" name="lastRadiotherapyIPS1" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 102 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyIPS2">
        102. Código de la IPS2 que suministra último esquema de cualquier tipo de radioterapia en el periodo de reporte actual:
      </label>
      <input type="text" id="lastRadiotherapyIPS2" name="lastRadiotherapyIPS2" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 103 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyEndDate">
        103. Fecha de finalización del último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual:
      </label>
      <input type="date" id="lastRadiotherapyEndDate" name="lastRadiotherapyEndDate" className={styles.input}/>
    </div>

    {/* Variable 104 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyStatus">
        104. Características actuales de este último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual:
      </label>
      <select id="lastRadiotherapyStatus" name="lastRadiotherapyStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1:Finalizado, dosis completa de radioterapia prescrita</option>
        <option value="2">2:Finalizado, dosis incompleta pero finalizada por algún motivo</option>
        <option value="3">3: No finalizado, esquema incompleto, pero aún bajo tratamiento</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 105 */}
    <div className={styles.formGroup}>
      <label htmlFor="lastRadiotherapyEndReason">
        105. Motivo de la finalización de este último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual:
      </label>
      <select id="lastRadiotherapyEndReason" name="lastRadiotherapyEndReason" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Toxicidad</option>
        <option value="2">2: Otros motivos médicos</option>
        <option value="3">3: Muerte</option>
        <option value="4">4: Cambio de EPS</option>
        <option value="5">5: Decisión del usuario, abandono la terapia</option>
        <option value="6">6: Otros motivos administrativos</option>
        <option value="7">7: Otras causas no contempladas</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('7')}>
            <span className={styles.accordionTitle}>Sección 7: Información específica de trasplante de células madre hematopoyéticas (incluye médula ósea) en el periodo de reporte actual</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['7'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['7'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 106 */}
    <div className={styles.formGroup}>
      <label htmlFor="receivedTransplant">
        106. ¿Recibió el usuario trasplante de células progenitoras hematopoyética dentro del periodo de reporte actual?
      </label>
      <select id="receivedTransplant" name="receivedTransplant" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 107 */}
    <div className={styles.formGroup}>
      <label htmlFor="transplantType">
        107. Tipo de trasplante recibido:
      </label>
      <select id="transplantType" name="transplantType" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Autólogo</option>
        <option value="2">2: Alogénico de donante idéntico relacionado</option>
        <option value="3">3: Alogénico de donante no idéntico relacionado</option>
        <option value="4">4: Alogénico de donante idéntico no relacionado</option>
        <option value="5">5: Alogénico de donante no idéntico no relacionado</option>
        <option value="6">6: Alogénico de cordón umbilical idéntico familiar</option>
        <option value="7">7: Alogénico de cordón umbilical idéntico no familiar</option>
        <option value="8">8: Alogénico de cordón no idéntico no familiar</option>
        <option value="9">9: Alogénico de dos unidades de cordón</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 108 */}
    <div className={styles.formGroup}>
      <label htmlFor="transplantTiming">
        108. Ubicación temporal de este trasplante en relación al manejo oncológico:
      </label>
      <select id="transplantTiming" name="transplantTiming" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="95">95: Recaída</option>
        <option value="96">96: Refractariedad</option>
        <option value="97">97: Esquema de consolidación</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 109 */}
    <div className={styles.formGroup}>
      <label htmlFor="transplantDate">
        109. Fecha del trasplante:
      </label>
      <input type="date" id="transplantDate" name="transplantDate" className={styles.input}/>
    </div>

    {/* Variable 110 */}
    <div className={styles.formGroup}>
      <label htmlFor="transplantIPSCode">
        110. Código de la IPS que realizó este trasplante:
      </label>
      <input type="text" id="transplantIPSCode" name="transplantIPSCode" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>
      </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('8')}>
            <span className={styles.accordionTitle}>Sección 8: Información específica de tratamiento complementario en el periodo de reporte actual</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['8'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['8'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 111 */}
    <div className={styles.formGroup}>
      <label htmlFor="receivedReconstructiveSurgery">
        111. ¿El usuario recibió cirugía reconstructiva en el periodo de reporte actual?
      </label>
      <select id="receivedReconstructiveSurgery" name="receivedReconstructiveSurgery" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí recibió cirugía</option>
        <option value="98">98: No Aplica</option>
      </select>
    </div>

    {/* Variable 112 */}
    <div className={styles.formGroup}>
      <label htmlFor="reconstructiveSurgeryDate">
        112. Fecha de la cirugía reconstructiva:
      </label>
      <input type="date" id="reconstructiveSurgeryDate" name="reconstructiveSurgeryDate" className={styles.input}/>
    </div>

    {/* Variable 113 */}
    <div className={styles.formGroup}>
      <label htmlFor="reconstructiveSurgeryIPS">
        113. Código de la IPS que realizó cirugía reconstructiva:
      </label>
      <input type="text" id="reconstructiveSurgeryIPS" name="reconstructiveSurgeryIPS" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 114 */}
    <div className={styles.formGroup}>
      <label htmlFor="receivedPalliativeCare">
        114. ¿El usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual?
      </label>
      <select id="receivedPalliativeCare" name="receivedPalliativeCare" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.1 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareSpecialist1">
        114.1. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por médico especialista en cuidado paliativo.
      </label>
      <select id="palliativeCareSpecialist1" name="palliativeCareSpecialist1" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.2 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareSpecialist2">
        114.2. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por profesional de la salud (no médico, incluye psicólogo) especialista en cuidado paliativo.
      </label>
      <select id="palliativeCareSpecialist2" name="palliativeCareSpecialist2" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.3 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareSpecialist3">
        114.3. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por médico especialista, otra especialidad.
      </label>
      <select id="palliativeCareSpecialist3" name="palliativeCareSpecialist3" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.4 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareGeneralPractitioner">
        114.4. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por médico general.
      </label>
      <select id="palliativeCareGeneralPractitioner" name="palliativeCareGeneralPractitioner" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.5 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareSocialWork">
        114.5. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por trabajo social.
      </label>
      <select id="palliativeCareSocialWork" name="palliativeCareSocialWork" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 114.6 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareOtherProfessional">
        114.6. El usuario recibió consulta o procedimiento de cuidado paliativo en el periodo de reporte actual, por otro profesional de salud (no médico, incluye psicólogo) no especializado.
      </label>
      <select id="palliativeCareOtherProfessional" name="palliativeCareOtherProfessional" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No recibió</option>
      </select>
    </div>

    {/* Variable 115 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstPalliativeCareDate">
        115. Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo de reporte actual:
      </label>
      <input type="date" id="firstPalliativeCareDate" name="firstPalliativeCareDate" className={styles.input}/>
    </div>

    {/* Variable 116 */}
    <div className={styles.formGroup}>
      <label htmlFor="palliativeCareIPSCode">
        116. Código de la IPS donde recibe la atención de cuidado paliativo:
      </label>
      <input type="text" id="palliativeCareIPSCode" name="palliativeCareIPSCode" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 117 */}
    <div className={styles.formGroup}>
      <label htmlFor="psychiatryConsult">
        117. ¿Ha sido valorado el usuario por el servicio de psiquiatría en el periodo de reporte actual?
      </label>
      <select id="psychiatryConsult" name="psychiatryConsult" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No, se ordenó, pero está pendiente</option>
        <option value="98">98: No aplica, no se ha ordenado valoración por psiquiatría</option>
      </select>
    </div>

    {/* Variable 118 */}
    <div className={styles.formGroup}>
      <label htmlFor="firstPsychiatryDate">
        118. Fecha de primera consulta con el servicio de psiquiatría:
      </label>
      <input type="date" id="firstPsychiatryDate" name="firstPsychiatryDate" className={styles.input}/>
    </div>

    {/* Variable 119 */}
    <div className={styles.formGroup}>
      <label htmlFor="psychiatryIPSCode">
        119. Código de la IPS donde recibió la primera valoración de psiquiatría:
      </label>
      <input type="text" id="psychiatryIPSCode" name="psychiatryIPSCode" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 120 */}
    <div className={styles.formGroup}>
      <label htmlFor="nutritionConsult">
        120. ¿Fue valorado el usuario por profesional en nutrición en el periodo de reporte actual?
      </label>
      <select id="nutritionConsult" name="nutritionConsult" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí fue valorado</option>
        <option value="2">2: No, se ordenó, pero está pendiente</option>
        <option value="98">98: No aplica, no se ha ordenado valoración por nutrición</option>
      </select>
    </div>

    {/* Variable 121 */}
    <div className={styles.formGroup}>
      <label htmlFor="nutritionConsultDate">
        121. Fecha de consulta inicial con nutrición en el periodo de reporte actual:
      </label>
      <input type="date" id="nutritionConsultDate" name="nutritionConsultDate" className={styles.input}/>
    </div>

    {/* Variable 122 */}
    <div className={styles.formGroup}>
      <label htmlFor="nutritionIPSCode">
        122. Código de la IPS donde recibió la valoración por nutrición:
      </label>
      <input type="text" id="nutritionIPSCode" name="nutritionIPSCode" className={styles.input} placeholder="Ingrese el código de la IPS"/>
    </div>

    {/* Variable 123 */}
    <div className={styles.formGroup}>
      <label htmlFor="nutritionalSupport">
        123. ¿El usuario recibió soporte nutricional?
      </label>
      <select id="nutritionalSupport" name="nutritionalSupport" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Si recibió soporte nutricional enteral</option>
        <option value="2">2: Si recibió soporte nutricional, parenteral</option>
        <option value="3">3: Si recibió soporte nutricional enteral y parenteral</option>
        <option value="4">4: No recibió soporte nutricional</option>
      </select>
    </div>

    {/* Variable 124 */}
    <div className={styles.formGroup}>
      <label htmlFor="complementaryTherapies">
        124. ¿El usuario ha recibido terapias complementarias para su rehabilitación?
      </label>
      <select id="complementaryTherapies" name="complementaryTherapies" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Si, Terapia física</option>
        <option value="2">2: Si, terapia de lenguaje</option>
        <option value="3">3: Si, Terapia ocupacional</option>
        <option value="5">5: 1 y 2</option>
        <option value="6">6: 1 y 3</option>
        <option value="7">7: 2 y 3</option>
        <option value="8">8: 1, 2 y 3</option>
        <option value="98">98: No aplica, no se han ordenado terapias</option>
      </select>
    </div>

  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('9')}>
            <span className={styles.accordionTitle}>Sección 9: Situación actual del usuario (a la fecha de corte -1º de enero de 2024)</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['9'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['9'] && (
            <div className={styles.accordionContent}>
<>
  {/* Variable 125 */}
  <div className={styles.formGroup}>
    <label htmlFor="currentTreatment">
      125. Tipo de tratamiento que está recibiendo el usuario a la fecha de corte (el día 01/01/2024):
    </label>
    <select id="currentTreatment" name="currentTreatment" className={styles.input}>
      <option value="">Seleccione</option>
      <option value="1">1: Radioterapia</option>
      <option value="2">2: Terapia sistémica (incluye quimioterapia, anticuerpos monoclonales, terapia biológica, terapia hormonal)</option>
      <option value="3">3: Cirugía (reporte solo cuando el procedimiento se haya realizado a partir del 1 de noviembre de 2023)</option>
      <option value="4">4: 1 y 2</option>
      <option value="5">5: 1 y 3</option>
      <option value="6">6: 2 y 3</option>
      <option value="7">7: Manejo expectante pretratamiento</option>
      <option value="8">8: En seguimiento, luego de tratamiento durante el periodo</option>
      <option value="9">9: Antecedente de cáncer (no recibió ningún tratamiento, pero tiene como mínimo una consulta de seguimiento relacionada con el cáncer dentro del periodo)</option>
      <option value="10">10: 1, 2 y 3</option>
      <option value="11">11: Manejo de cuidado paliativo o terapia complementaria</option>
      <option value="98">98: No Aplica (paciente se encuentra fallecido, abandonó el tratamiento, alta voluntaria o se encuentra desafiliado)</option>
    </select>
  </div>
  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('10')}>
            <span className={styles.accordionTitle}>Sección 10: Resultado final de manejo oncológico en este periodo de reporte</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['10'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['10'] && (
            <div className={styles.accordionContent}>
<>
    {/* Variable 126 */}
    <div className={styles.formGroup}>
      <label htmlFor="oncologyOutcome">
        126. Resultado final del manejo oncológico en este periodo de reporte:
      </label>
      <select id="oncologyOutcome" name="oncologyOutcome" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Pseudoprogresión (aplica solo para inmunoterapia)</option>
        <option value="2">2: Progresión o recaída</option>
        <option value="3">3: Respuesta parcial</option>
        <option value="4">4: Respuesta completa</option>
        <option value="5">5: Enfermedad estable</option>
        <option value="6">6: Abandono del tratamiento o alta voluntaria</option>
        <option value="7">7: Paciente en seguimiento por antecedente de cáncer</option>
        <option value="8">8: Pendiente iniciar el tratamiento luego del diagnóstico o (fue definido por especialista o aún está pendiente por valoración oncológica inicial, en la cual se defina el tratamiento)</option>
        <option value="97">97: No aplicable en este periodo, aún bajo tratamiento inicial</option>
        <option value="98">98: No aplicable en este periodo, aún bajo tratamiento de recaída</option>
        <option value="99">99: No aplica, el paciente se encuentra fallecido o desafiliado</option>
      </select>
    </div>

    {/* Variable 127 */}
    <div className={styles.formGroup}>
      <label htmlFor="vitalStatus">
        127. Estado vital al finalizar este periodo de reporte:
      </label>
      <select id="vitalStatus" name="vitalStatus" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Vivo</option>
        <option value="2">2: Fallecido</option>
        <option value="99">99: Desconocido</option>
      </select>
    </div>

    {/* Variable 128 */}
    <div className={styles.formGroup}>
      <label htmlFor="administrativeChange">
        128. Novedad ADMINISTRATIVA del usuario respecto al reporte anterior:
      </label>
      <select id="administrativeChange" name="administrativeChange" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="0">0: No presenta novedad con respecto al reporte anterior (vivo y afiliado a la entidad)</option>
        <option value="1">1: Usuario ingresó a la EAPB en el periodo de reporte y ya tenía el diagnóstico de cáncer</option>
        <option value="2">2: Usuario con nuevo diagnóstico entre 2023-01-02 y 2024-01-01</option>
        <option value="3">3: Usuario con diagnóstico antiguo de cáncer no incluido en el reporte anterior</option>
        <option value="4">4: Usuario que falleció</option>
        <option value="5">5: Usuario que se desafilió</option>
        <option value="6">6: Usuario para eliminar de la base de datos  por corrección luego de auditoría interna o de CAC</option>
        <option value="7">7: Usuario que firmo alta voluntaria del tratamiento</option>
        <option value="8">8: Usuario con cambio de tipo o número de ID</option>
        <option value="9">9: Usuario abandonó el tratamiento y es imposible de ubicar</option>
        <option value="10">10: Usuario no incluido en reporte anterior y está fallecido en el momento del reporte actual</option>
        <option value="11">11: Traslado de IPS</option>
        <option value="12">12: Usuario q ue es notificado con dos o más cánceres en este periodo</option>
        <option value="13">13: Usuario no incluido en reporte anterior y está desafiliado en el momento del reporte actual</option>
        <option value="15">15: Comunidad migrante de la República de Venezuela</option>
        <option value="16">16: Cambio de CIE-10</option>
        <option value="17">17: Usuario identificado por cruce con fuentes externas, con diagnóstico de cáncer no gestionado por la EAPB.</option>
        <option value="18">18: Diagnóstico descartado o fallecido/desafiliado sin confirmación</option>
        <option value="19">19:  Paciente trasladado que fue glosado en periodo anterior, que no fue gestionado por la entidad en el periodo actua</option>
      </select>
    </div>

    {/* Variable 129 */}
    <div className={styles.formGroup}>
      <label htmlFor="clinicalChange">
        129. Novedad clínica del usuario a la fecha de corte:
      </label>
      <select id="clinicalChange" name="clinicalChange" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Usuario en manejo inicial curativo</option>
        <option value="3">3: Usuario finalizó tratamiento inicial y está en seguimiento</option>
        <option value="8">8: Abandono de tratamiento</option>
        <option value="9">9: Usuario firmó alta voluntaria</option>
        <option value="10">10: Usuario en manejo expectante antes de tratamiento</option>
        <option value="11">11:  Usuario que está en manejo paliativo (incluye manejo de metástasis o de recaída)</option>
        <option value="12">12: Usuario fallecido o desafiliado</option>
      </select>
    </div>

    {/* Variable 130 */}
    <div className={styles.formGroup}>
      <label htmlFor="disaffiliationDate">
        130. Fecha de desafiliación de la EAPB:
      </label>
      <input type="date" id="disaffiliationDate" name="disaffiliationDate" className={styles.input}/>
    </div>

    {/* Variable 131 */}
    <div className={styles.formGroup}>
      <label htmlFor="deathDate">131. Fecha de muerte:</label>
      <input type="date" id="deathDate" name="deathDate" className={styles.input} />
    </div>

    {/* Variable 132 */}
    <div className={styles.formGroup}>
      <label htmlFor="deathCause">
        132. Causa de muerte:
      </label>
      <select id="deathCause" name="deathCause" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Muerte asociada al cáncer</option>
        <option value="2">2: Muerte por patología no relacionada al cáncer</option>
        <option value="3">3: Muerte por causa externa</option>
        <option value="4">4: Muerte por causa no conocida</option>
        <option value="98">98: No Aplica, usuario vivo o se desconoce su estado vital</option>
      </select>
    </div>

    {/* Variable 133 */}
    <div className={styles.formGroup}>
      <label htmlFor="uniqueCode">
        133. Código único de identificación (BDUA-BDEX-PVS):
      </label>
      <input type="text" id="uniqueCode" name="uniqueCode" className={styles.input} placeholder="Ingrese el código único"/>
    </div>

    {/* Variable 134 */}
    <div className={styles.formGroup}>
      <label htmlFor="cutOffDate">134. Fecha de Corte:</label>
      <input type="text" id="cutOffDate" name="cutOffDate" className={styles.input} defaultValue="2024-01-01" readOnly/>
    </div>
    </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('11')}>
            <span className={styles.accordionTitle}>Sección 11: Resultado final de manejo oncológico en este periodo de reporte</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['11'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['11'] && (
            <div className={styles.accordionContent}>
<>
    {/* Fecha de revisión del caso */}
    <div className={styles.formGroup}>
      <label htmlFor="caseReviewDate">Fecha de revisión del caso:</label>
      <input type="date" id="caseReviewDate" name="caseReviewDate" className={styles.input}/>
    </div>

    {/* IPS Médico especialista */}
    <div className={styles.formGroup}>
      <label htmlFor="specialistIPS">IPS Médico especialista (nombre del médico):</label>
      <input type="text" id="specialistIPS" name="specialistIPS" className={styles.input} placeholder="Ingrese el nombre del médico"/>
    </div>

    {/* Histología */}
    <div className={styles.formGroup}>
      <label htmlFor="histology">Histología:</label>
      <input type="text" id="histology" name="histology" className={styles.input} placeholder="Ingrese el detalle de la histología"/>
    </div>

    {/* Observaciones */}
    <div className={styles.formGroup}>
      <label htmlFor="observations">Observaciones:</label>
      <textarea
        id="observations"
        name="observations"
        className={styles.input}
        placeholder="Ingrese las observaciones"
        rows="3"
      ></textarea>
    </div>

    {/* Categorización */}
    <div className={styles.formGroup}>
      <label htmlFor="categorization">Categorización:</label>
      <select id="categorization" name="categorization" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Incidente</option>
        <option value="2">2: Prevalente</option>
      </select>
    </div>

    {/* Categorización según equipo de cáncer */}
    <div className={styles.formGroup}>
      <label htmlFor="teamCategorization">
        Categorización según equipo de cáncer:
      </label>
      <select id="teamCategorization" name="teamCategorization" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: No recibió tratamiento</option>
        <option value="2">2: Información incompleta</option>
        <option value="3">3: Validar por clínica</option>
      </select>
    </div>

    {/* Agrupador */}
    <div className={styles.formGroup}>
      <label htmlFor="grouping">Agrupador:</label>
      <input type="text" id="grouping" name="grouping" className={styles.input} placeholder="Ingrese el agrupador"/>
    </div>

    {/* Usuario en Avicena */}
    <div className={styles.formGroup}>
      <label htmlFor="avicenaUser">Usuario en Avicena:</label>
      <select id="avicenaUser" name="avicenaUser" className={styles.input}>
        <option value="">Seleccione</option>
        <option value="1">1: Sí</option>
        <option value="2">2: No</option>
      </select>
    </div>

    {/* Usuario creación */}
    <div className={styles.formGroup}>
      <label htmlFor="creationUser">Usuario creación:</label>
      <input type="text" id="creationUser" name="creationUser" className={styles.input} placeholder="Ingrese el usuario de creación"/>
    </div>

    {/* Fecha creación */}
    <div className={styles.formGroup}>
      <label htmlFor="creationDate">Fecha creación:</label>
      <input type="date" id="creationDate" name="creationDate" className={styles.input}/>
    </div>

    {/* Usuario última modificación */}
    <div className={styles.formGroup}>
      <label htmlFor="lastModificationUser">Usuario última modificación:</label>
      <input type="text" id="lastModificationUser" name="lastModificationUser" className={styles.input} placeholder="Ingrese el usuario de última modificación"/>
    </div>

    {/* Fecha última modificación */}
    <div className={styles.formGroup}>
      <label htmlFor="lastModificationDate">Fecha última modificación:</label>
      <input type="date" id="lastModificationDate" name="lastModificationDate" className={styles.input}/>
    </div>
  </>
            </div>
          )}
        </div>

        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('18')}>
            <span className={styles.accordionTitle}>Sección 18</span>
            <span className={styles.accordionArrow}>
              <FaChevronDown
              className={openSections['18'] ? styles.rotateArrow : ''}
              />
            </span>
          </div>
          {openSections['18'] && (
            <div className={styles.accordionContent}>
<button 
      type="submit" 
      className={styles.submitButton}
    >
      Guardar
    </button>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;