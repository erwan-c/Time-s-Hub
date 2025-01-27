import axios from "axios";

const API_URL = "http://192.168.43.111:5000/api/users"; // URL de ton backend

// Enregistrer un utilisateur
export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// Connecter un utilisateur
export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

// Mettre à jour les informations d'un utilisateur
export const updateUser = async (token, data) => {
  const response = await axios.put(`${API_URL}/update`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Supprimer un compte utilisateur
export const deleteUser = async (token) => {
  const response = await axios.delete(`${API_URL}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
