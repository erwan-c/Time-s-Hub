import axios from "axios";
import { BASE_URL } from "@env";
console.log("URL DE BASE :", BASE_URL);
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // console.error("Erreur de réponse du serveur:", error.response);
      // if (error.response.status === 401) {
      //   console.error("Token invalide ou expiré. Veuillez vous reconnecter.");
      // }
    } else if (error.request) {
      console.error("Aucune réponse reçue du serveur:", error.request);
    } else {
      console.error("Erreur de requête:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
