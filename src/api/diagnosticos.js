// src/api/diagnosticos.js
import api from "./api";

export const fetchDiagnosticos = async (pacienteId) => {
  const response = await api.get(`/diagnostico?pacienteId=${pacienteId}`);
  return response.data;
};

export const crearDiagnostico = async (diagnostico) => {
  const response = await api.post("/diagnostico", diagnostico);
  return response.data;
};

export const eliminarDiagnostico = async (id) => {
  const response = await api.delete(`/diagnostico/${id}`);
  return response.data;
};
