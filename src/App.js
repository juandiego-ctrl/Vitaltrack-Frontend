import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import RequestUser from './components/RequestUser';

// Layouts
import MedicoLayout from './components/MedicoLayout';
import AuxiliarLayout from './components/AuxiliarLayout';

// Componentes médicos
import Home from './components/Home';
import CargueCancer from './components/CargueCancer';
import PatientForm from './components/PatientForm';
import CancerActual from './components/CancerActual';
import CrearUsuario from './components/CrearUsuario';
import PacientesDashboard from './components/PacientesDashboard'; // ✅ correcto

// Componentes auxiliares
import AgendarCitas from './components/AgendarCitas';
import Medicamentos from './components/Medicamentos'; 
import RecordatoriosCitas from './components/RecordatoriosCitas';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>

          {/* Rutas públicas */}
          <Route path="/" element={<Login fullScreem />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/request-username" element={<RequestUser />} />

          {/* Rutas de médicos */}
          <Route path="/home" element={<MedicoLayout />}>
            <Route index element={<Home />} />
            <Route path="cargue-cancer" element={<CargueCancer />} />
            <Route path="cancer-actual" element={<CancerActual />} />
            <Route path="cancer-actual/patient" element={<PatientForm />} />
            <Route path="crear-usuario" element={<CrearUsuario />} />
            <Route path="pacientes" element={<PacientesDashboard />} /> {/* ✅ solo uno */}
          </Route>

          {/* Rutas de auxiliares */}
          <Route path="/auxiliar" element={<AuxiliarLayout />}>
            <Route index element={<AgendarCitas />} />
            <Route path="medicamentos" element={<Medicamentos />} /> 
            <Route path="recordatorios" element={<RecordatoriosCitas />} /> 
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
