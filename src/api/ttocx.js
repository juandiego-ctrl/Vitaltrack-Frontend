import api from "./api";

export const fetchTtocx = async () => {
  const res = await api.get("/ttocx");
  return res.data;
};

export const crearTtocx = async (ttocx) => {
  const res = await api.post("/ttocx", ttocx);
  return res.data;
};
