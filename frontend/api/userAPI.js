import axiosInstance from "../axiosInstance";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  console.log('yo')

  const response = await axiosInstance.post("/users/login", data);
  console.log(response)
  return response.data;
};

export const updateUser = async (data) => {
  const response = await axiosInstance.put("/users/update", data);
  return response.data;
};

export const deleteUser = async () => {
  const response = await axiosInstance.delete("/users/delete");
  return response.data;
};
