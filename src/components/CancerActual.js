import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegación
import styles from '../styles/CancerActual.module.css';

const CancerActual = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = () => {
    // Datos ficticios de ejemplo para la tabla
    const exampleData = [
      {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        idType: "CC",
        idNumber: "123456789",
        birthDate: "1980-01-01",
        gender: "M",
        cieCode: "C500",
        cieGroup: "CAC Mama",
        creationMethod: "Formulario",
        recordValidation: "Validado",
        supports: "Completos",
        createdBy: "admin1",
        lastModifiedBy: "user2",
        canceled: "No",
        state: "Bloqueado",
        alertsCount: 2,
      },
      {
        id: 2,
        firstName: "María",
        lastName: "Gómez",
        idType: "TI",
        idNumber: "987654321",
        birthDate: "1995-07-15",
        gender: "F",
        cieCode: "C501",
        cieGroup: "CAC Cérvix",
        creationMethod: "Carga masiva",
        recordValidation: "Sin validar",
        supports: "Sin soportes",
        createdBy: "admin2",
        lastModifiedBy: "user3",
        canceled: "Sí",
        state: "Desbloqueado",
        alertsCount: 1,
      },
    ];

    setSearchResults(exampleData); // Agregamos los resultados simulados
  };
  
  const handleDoubleClick = () => {
    navigate('/home/cancer-actual/patient/');
  };

  const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  const municipios = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Santa Marta', 'Soledad', 'Villavicencio', 'Armenia', 'Montería', 'Valledupar', 'Pasto', 'Buenaventura', 'Neiva', 'Sincelejo'
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cáncer Actual</h1>

      <div className={styles.buttonsContainer}>
        <button className={styles.filterButton} onClick={toggleFilters}>
          {showFilters ? '-' : '+'}
        </button>
        <button className={styles.button}>Editar</button>
        <button className={styles.button} onClick={handleSearch}>Buscar</button>
        <button className={styles.button}>Exportar registros</button>
        <button className={styles.button}>Exportar registros completos</button>
        <button className={styles.button}>Exportar registros relacionados</button>
        <button
          className={styles.helpButton}
          onClick={() => window.open('https://procex.co/archivos/manuales/CAC/MODULO/CAC_CANCER_MODULO.pdf', '_blank')}
        >
          Ayuda
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersContainer}>
          <div className={styles.filterRow}>
            <label>5. Tipo de Identificación del usuario:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>RC. Registro Civil</option>
              <option>TI. Tarjeta de Identidad</option>
              <option>CC. Cédula de Ciudadanía</option>
              <option>CE. Cédula de Extranjería</option>
              <option>PA. Pasaporte</option>
              <option>MS. Menor sin Identificación</option>
              <option>AS. Adulto sin Identificación</option>
              <option>CD. Carnet Diplomático</option>
              <option>SC. Salvoconducto de permanencia</option>
              <option>PE. Permiso Especial</option>
              <option>PT. Permiso por Protección temporal</option>
              <option>SI. Sin Identifición</option>
            </select>

            <label>6. Número de Identificación del paciente:</label>
            <input type="text" className={styles.input} />

            <label>17. Código CIE-10:</label>
            <input type="text" className={styles.input} />
          </div>

          <div className={styles.filterRow}>
            <label>Agrupador:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>1. CAC Mama</option>
              <option>2. CAC Próstata</option>
              <option>3. CAC Cérvix</option>
              <option>4. CAC Colorectal</option>
              <option>5. CAC Estómago</option>
              <option>6. CAC Melanoma</option>
              <option>7. CAC Pulmón</option>
              <option>8. CAC Linfoma Hodgkin</option>
              <option>9. CAC Linfoma No Hodgkin</option>
              <option>10. CAC Leucemia Linfocitica Aguda</option>
              <option>11. CAC Leucemia Mielocitica Aguda</option>
              <option>12. Labio, cavidad bucal y faringe</option>
              <option>13. Otros órganos digestivos</option>
              <option>14. Otros órganos respiratorios e intratorácicos</option>
              <option>15. Huesos y cartílagos articulares</option>
              <option>16. Otros tumores de la piel</option>
              <option>17. Tejidos mesoteliales y blandos</option>
              <option>18. Otros órganos genitales femeninos</option>
              <option>19. Otros órganos genitales masculinos</option>
              <option>20. Vías urinarias</option>
              <option>21. Ojo, encéfalo, y sistema nervioso</option>
              <option>22. Glándulas tiroides y endocrinas</option>
              <option>23. Otros sitios</option>
              <option>24. Tumores del tejido linfático</option>
              <option>25. Tumores secundarios</option>
            </select>

            <label>Soportes:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>1. Sin soportes</option>
              <option>2. Soportes incompletos</option>
              <option>3. Soportes completos</option>
            </select>

            <label>Validación registro:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>S. Registro validado</option>
              <option>N. Sin validar</option>
              <option>V. Sin validar por validación masiva</option>
            </select>
          </div>

          <div className={styles.filterRow}>
            <label>Categorización:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>1. Incidente</option>
              <option>2. Prevalente</option>
            </select>

            <label>Usuario creación:</label>
            <input type="text" className={styles.input} />

            <label>Usuario última modificación:</label>
            <input type="text" className={styles.input} />

            <label>Anulado:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>Todos</option>
              <option>Si</option>
              <option>No</option>
            </select>
          </div>

          <div className={styles.filterRow}>
            <label>Método creación:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>Formulario</option>
              <option>Carga masiva</option>
            </select>
            <label>Radicado:</label>
            <input type="text" className={styles.input} />

            <label>Estado:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>Bloqueado</option>
              <option>Desbloqueado</option>
            </select>
          </div>

          <div className={styles.filterRow}>
            <label>Nautcli:</label>
            <input type="text" className={styles.input} />

            <label>Alertas:</label>
            <select className={styles.input}>
              <option>Seleccionar</option>
              <option>1. Pendiente</option>
              <option>2. Aceptado</option>
              <option>3. Rechazado</option>
            </select>

            <label>Regional:</label>
            <input type="text" className={styles.input} />

            <label>Departamento:</label>
            <select className={styles.input}>
              {departamentos.map((dpto, index) => (
                <option key={index}>{dpto}</option>
              ))}
            </select>

            <label>Municipio:</label>
            <select className={styles.input}>
              {municipios.map((muni, index) => (
                <option key={index}>{muni}</option>
              ))}
            </select>
          </div>
        </div>
      )}
            {/* Tabla de resultados */}
            {searchResults.length > 0 && (
        <div className={styles.resultsContainer}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>ID Único</th>
                <th>1. Primer nombre</th>
                <th>3. Primer apellido</th>
                <th>5. Tipo de identificación</th>
                <th>6. Número de identificación</th>
                <th>7. Fecha de nacimiento</th>
                <th>8. Sexo</th>
                <th>17. Código CIE-10</th>
                <th>Agrupador CIE-10</th>
                <th>Método de creación</th>
                <th>Validación registro</th>
                <th>Soportes</th>
                <th>Usuario creación</th>
                <th>Usuario última modificación</th>
                <th>Anulado</th>
                <th>Estado</th>
                <th>Cantidad alertas</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id} onDoubleClick={handleDoubleClick}>
                  <td>{result.id}</td>
                  <td>{result.firstName}</td>
                  <td>{result.lastName}</td>
                  <td>{result.idType}</td>
                  <td>{result.idNumber}</td>
                  <td>{result.birthDate}</td>
                  <td>{result.gender}</td>
                  <td>{result.cieCode}</td>
                  <td>{result.cieGroup}</td>
                  <td>{result.creationMethod}</td>
                  <td>{result.recordValidation}</td>
                  <td>{result.supports}</td>
                  <td>{result.createdBy}</td>
                  <td>{result.lastModifiedBy}</td>
                  <td>{result.canceled}</td>
                  <td>{result.state}</td>
                  <td>{result.alertsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CancerActual;