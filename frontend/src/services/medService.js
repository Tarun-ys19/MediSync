import api from "./api";

export const getMedications = async () => {
  try {
    const res = await api.get("/medications");
    return res.data;
  } catch (err) {
    console.error("Error fetching medications:", err);
    throw err;
  }
};

export const addMedication = async (data) => {
  try {
    const res = await api.post("/medications", data);
    return res.data;
  } catch (err) {
    console.error("Error adding medication:", err);
    throw err;
  }
};

export const updateAdherence = async (id, data) => {
  try {
    const res = await api.put(`/medications/${id}/adherence`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating adherence:", err);
    throw err;
  }
};

export const deleteMedication = async (id) => {
  try {
    const res = await api.delete(`/medications/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting medication:", err);
    throw err;
  }
};
