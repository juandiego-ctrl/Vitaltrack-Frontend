import api from "./api";

export const fetchArchivos = async () => {
  const res = await api.get("/archivospacientes");
  return res.data;
};

export const crearArchivo = async (archivo) => {
  const res = await api.post("/archivospacientes", archivo);
  return res.data;
};
