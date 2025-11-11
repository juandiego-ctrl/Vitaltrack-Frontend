import api from "./api";

export const fetchTtotrasplante = async () => {
  const res = await api.get("/ttotrasplante");
  return res.data;
};

export const crearTtotrasplante = async (tto) => {
  const res = await api.post("/ttotrasplante", tto);
  return res.data;
};
