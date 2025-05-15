import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:5000"; // URL do backend

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users`);
    return response.data; // Retorna os dados dos usuários
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.response || error.message);
    return [];
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user`, userData);
    return response.data; // O backend retorna o resultado diretamente
  } catch (error) {
    console.error("Erro ao criar usuário:", error.response || error.message);
    return null;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/pass/${email}`);
    console.log("Resposta do backend:", response.data); // Log para depuração
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error.response || error.message);
    return null;
  }
};

export const verifyToken = async (email, code) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/pass`, { email, code });
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar token:", error.response || error.message);
    return null;
  }
};

export const updatePassword = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/pass/new`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar senha:", error.response || error.message);
    return null;
  }
};