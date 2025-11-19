import React, { useState } from "react";
import "./FormularioCadastro.css";
import { registerUser } from "../api";
import OdsImage from "../assets/ods15vidaterrestre.png";
import FolhagemBackground from "../assets/folhagem-e-plantas-exoticas.jpg";

const FormularioCadastro = ({ SwitchLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Formato de e-mail inválido.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({ username, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="form-container form-container-centered"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FolhagemBackground})`,
        }}
      >
        <div className="form-content">
          <h2 className="form-title">Cadastro realizado!</h2>
          <p className="mensagem-sucesso">Sua conta foi criada com sucesso.</p>
          <button onClick={SwitchLogin} className="form-button">
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FolhagemBackground})`,
      }}
    >
      <div className="form-image">
        <img src={OdsImage} alt="ODS Vida Terrestre" />
      </div>

      <div className="form-wrapper">
        <form className="form-content" onSubmit={handleSubmit}>
          <h2 className="form-title">Criar Conta</h2>

          <div className="form-group">
            <input className="inputs" type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="inputs" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputs" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="inputs" type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Conta"}
          </button>

          <div className="form-switch">
            <label onClick={SwitchLogin}>
              Já tem uma conta? Faça login
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastro;