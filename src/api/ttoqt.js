import api from "./api";

export const fetchTtoqt = async () => {
  const res = await api.get("/ttoqt");
  return res.data;
};

export const crearTtoqt = async (tto) => {
  const res = await api.post("/ttoqt", tto);
  return res.data;
};
