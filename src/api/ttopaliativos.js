import api from "./api";

export const fetchTtopaliativos = async () => {
  const res = await api.get("/ttopaliativos");
  return res.data;
};

export const crearTtopaliativos = async (tto) => {
  const res = await api.post("/ttopaliativos", tto);
  return res.data;
};
