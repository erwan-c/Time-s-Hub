import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/userAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (data) => {
    const userData = await loginUser(data);
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (data) => {
    const userData = await registerUser(data);
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
