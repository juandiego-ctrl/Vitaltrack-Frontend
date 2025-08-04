import React from 'react';  // Importa React para que el código funcione como una aplicación React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Importa los componentes necesarios de React Router para el enrutamiento de la aplicación
import './styles/App.css';  // Importa el archivo de estilos CSS para la aplicación
import Login from './components/Login';  // Importa el componente Login
import ForgotPassword from './components/ForgotPassword';  // Importa el componente ForgotPassword
import RequestUser from './components/RotatingText';  // Importa el componente RequestUser
import AuthenticatedLayout from './components/AuthenticatedLayout';  // Importa el componente AuthenticatedLayout para rutas protegidas
import Home from './components/Home';  // Importa el componente Home
import CargueCancer from './components/CargueCancer';  // Importa el componente CargueCancer
import PatientForm from './components/PatientForm'; // Importa el componente PatientForm
import CancerActual from './components/CancerActual';  // Importa el componente CancerActual


// Definición del componente principal de la aplicación
function App() {
  return (
    <Router>  {/* El componente Router envuelve toda la aplicación para habilitar el enrutamiento */}
      <div className="app">  {/* Contenedor principal de la aplicación con clase 'app' */}
        <Routes>  {/* Componente Routes que se encarga de gestionar las rutas de la aplicación */}

          {/* Rutas públicas */}
          <Route path="/" element={<Login fullScreem />} />  {/* Ruta pública para la página de login */}
          <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Ruta pública para la página de recuperación de contraseña */}
          <Route path="/request-username" element={<RequestUser />} />  {/* Ruta pública para la página de solicitud de nombre de usuario */}

          {/* Rutas protegidas */}
          <Route path="/home" element={<AuthenticatedLayout />}>  {/* Ruta para el Home que está protegida por autenticación */}
            <Route path="/home" element={<Home />} />  {/* Subruta para el componente Home dentro del layout protegido */}
            <Route path="/home/cargue-cancer" element={<CargueCancer />} />  {/* Subruta para CargueCancer dentro del layout protegido */}
            <Route path="/home/cancer-actual" element={<CancerActual />} />  {/* Subruta para CancerActual dentro del layout protegido */}
            <Route path="/home/cancer-actual/patient/" element={<PatientForm />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" />} />  {/* Si la ruta no coincide con ninguna de las anteriores, redirige a la página de Login */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;  // Exporta el componente App como el componente principal de la aplicación