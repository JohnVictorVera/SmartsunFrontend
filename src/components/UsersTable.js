import React, { useEffect, useState } from "react";
import { getUsers, createUser, resetPassword, verifyToken, updatePassword } from "../services/api";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log("Usuários recebidos:", data); // Verifique os dados recebidos
    setUsers(data);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await createUser(newUser);
    if (response) {
      alert("Usuário cadastrado com sucesso!");
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log("E-mail para redefinição:", resetEmail); // Log para depuração
    const response = await resetPassword(resetEmail);
    if (response && response.code) {
      alert(`Código de redefinição enviado: ${response.code}`);
    } else {
      alert("Erro ao solicitar redefinição de senha.");
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    const response = await verifyToken(resetEmail, resetCode);
    if (response && response.message === "O token está correto") {
      alert("Token verificado com sucesso!");
    } else {
      alert("Token inválido.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const response = await updatePassword(resetEmail, newPassword);
    if (response && response.message === "Senha atualizada") {
      alert("Senha atualizada com sucesso!");
      setResetEmail("");
      setResetCode("");
      setNewPassword("");
    } else {
      alert("Erro ao atualizar senha.");
    }
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Cadastrar Novo Usuário</h3>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Redefinir Senha</h3>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
        <button type="submit">Solicitar Redefinição</button>
      </form>

      <h3>Verificar Token</h3>
      <form onSubmit={handleVerifyToken}>
        <input
          type="text"
          placeholder="Código"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <button type="submit">Verificar Token</button>
      </form>

      <h3>Atualizar Senha</h3>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="Nova Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Atualizar Senha</button>
      </form>
    </div>
  );
};

export default UsersTable;