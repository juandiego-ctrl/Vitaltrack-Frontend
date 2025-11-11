import api from "./api";

export const fetchTtocxReconst = async () => {
  const res = await api.get("/ttocxreconstructiva");
  return res.data;
};

export const crearTtocxReconst = async (ttocx) => {
  const res = await api.post("/ttocxreconstructiva", ttocx);
  return res.data;
};
