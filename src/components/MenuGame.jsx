import React, { useState } from "react";
import "./MenuGame.css";
import OdsImage from "../assets/ods15vidaterrestre.png";

const TELAS = {
  PRINCIPAL: "principal",
  CARREGAR_JOGO: "carregar_jogo",
};

const MenuGame = ({ novoJogo, carregarJogo, telaLogin, jogoIniciado }) => {
  const [telaAtual, setTelaAtual] = useState(TELAS.PRINCIPAL);

  const handleCarregarJogo = () => {
    if (jogoIniciado && carregarJogo) {
      carregarJogo();
    }
  };

  const handleVoltarPrincipal = () => {
    setTelaAtual(TELAS.PRINCIPAL);
  };

  const MenuPrincipal = (
    <div className="menu">
      <h2>Menu</h2>
      <h3 onClick={novoJogo}>Novo Jogo</h3>
      <h3 
        onClick={handleCarregarJogo}
        className={!jogoIniciado ? "disabled" : ""}
      >
        Continuar Jogo
      </h3>
      <h3 onClick={telaLogin}>Sair</h3>
    </div>
  );

  const CarregarJogo = (
    <div className="menu">
      <h2>Em Desenvolvimento</h2>
      <p className="mensagem-info">
        A funcionalidade de múltiplos slots de salvamento está em desenvolvimento.
      </p>
      <h3 onClick={handleVoltarPrincipal}>Voltar</h3>
    </div>
  );

  const renderizarTela = () => {
    switch (telaAtual) {
      case TELAS.PRINCIPAL:
        return MenuPrincipal;
      case TELAS.CARREGAR_JOGO:
        return CarregarJogo;
      default:
        return MenuPrincipal;
    }
  };

  return (
    <div className="container-menu">
      <div className="logo-menu">
        <img src={OdsImage} alt="ODS Vida Terrestre" />
      </div>
      {renderizarTela()}
    </div>
  );
};

export default MenuGame;
