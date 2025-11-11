import api from "./api";

export const fetchTtort = async () => {
  const res = await api.get("/ttort");
  return res.data;
};

export const crearTtort = async (tto) => {
  const res = await api.post("/ttort", tto);
  return res.data;
};
