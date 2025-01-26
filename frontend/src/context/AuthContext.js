// src/context/AuthContext.js
import React from "react"
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setUser(res.data);
  };

  const register = async (username, email, password) => {
    await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
