import api from "./api";

export const getReportData = async () => {
  const res = await api.get("/report");
  return res.data;
};

export const downloadReportPDF = async () => {
  const res = await api.get("/report/pdf/download", { responseType: "blob" });
  return res.data;
};

export const viewReportPDF = async () => {
  const res = await api.get("/report/pdf/view", { responseType: "blob" });
  return res.data;
};

export const emailReportPDF = async () => {
  const res = await api.post("/report/pdf/email");
  return res.data;
};
