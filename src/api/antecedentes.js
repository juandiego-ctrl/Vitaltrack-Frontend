import api from "./api";

export const fetchAntecedentes = async () => {
  const res = await api.get("/antecedentes");
  return res.data;
};

export const crearAntecedente = async (antecedente) => {
  const res = await api.post("/antecedentes", antecedente);
  return res.data;
};
