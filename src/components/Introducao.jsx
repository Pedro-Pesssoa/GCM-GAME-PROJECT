import React from "react";
import "./Introducao.css";
import TerraTexture from "../assets/terratexture.png";
import Arvore from "../assets/pngwing.png";

const Introducao = ({ Playing }) => {
  return (
    <div className="intro">
      <h2 className="titulo">Bem-vindo ao QuizPlanet</h2>

      <div className="container-descricao">
        <div className="descricao-game">
          <h3>Missão: Proteger e restaurar a vida terrestre!</h3>
          <p>
            Este não é um quiz comum. Seus conhecimentos têm um impacto imediato
            em uma floresta virtual que você deve proteger. Ao responder
            corretamente às perguntas, você planta árvores com base na
            quantidade de respostas corretas.
          </p>
        </div>
        <img src={TerraTexture} alt="Textura de Terra" />
      </div>

      <div className="container-descricao-2">
        <img src={Arvore} alt="Árvore" />
        <div className="descricao-game">
          <p>
            As perguntas serão apresentadas em formato de <strong>Verdadeiro/Falso</strong> ou
            com 4 alternativas. Use seu conhecimento sobre a conservação, o
            combate à desertificação e a proteção da biodiversidade para
            avançar.
          </p>
          <p>
            Lembre-se: Seu progresso será salvo automaticamente a cada ação. Ao
            retornar, você continuará exatamente de onde parou.
          </p>
          <p>
            Pronto para aceitar o desafio e provar que o conhecimento salva o
            planeta? Clique em 'Iniciar Jogo' e comece a plantar!
          </p>
        </div>
      </div>

      <button className="iniciar-jogo" onClick={Playing}>
        Iniciar Jogo
      </button>
    </div>
  );
};

export default Introducao;
