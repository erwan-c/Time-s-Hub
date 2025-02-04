import axiosInstance from "../axiosInstance";

export const generateWords = async (data) => {
  const response = await axiosInstance.post("/chatgpt", data);
  return response.data;
};
