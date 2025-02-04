import axiosInstance from "../axiosInstance";

export const addGameHistory = async (data) => {
  const response = await axiosInstance.post("/gameHistory/add", data);
  return response.data;
};

export const getUserGameHistory = async () => {
  const response = await axiosInstance.get("/gameHistory/user");
  return response.data;
};
