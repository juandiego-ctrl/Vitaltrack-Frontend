// src/api/pacientes.js
import api from "./api"; // tu instancia de Axios

export const fetchPacientes = async () => {
  const res = await api.get("/paciente");
  return res.data;
};

export const crearPaciente = async (paciente) => {
  console.log("📤 Enviando paciente al backend:", paciente);
  const res = await api.post("/paciente", paciente);
  console.log("📥 Respuesta backend:", res.data);
  return res.data;
};

export const crearPacienteManual = async (data) => {
  console.log("📤 Enviando paciente manual al backend:", data);
  const res = await api.post("/paciente/manual", data);
  console.log("📥 Respuesta backend:", res.data);
  return res.data;
};



export const actualizarPaciente = async (id, data) => {
  const res = await api.patch(`/paciente/${id}`, data);
  return res.data;
};

export const eliminarPaciente = async (id) => {
  const res = await api.delete(`/paciente/${id}`);
  return res.data;
};

export const fetchHistorial = async (id) => {
  const res = await api.get(`/paciente/historial/${id}`);
  return res.data;
};
