import React from "react";
import "./Floresta.css";
import imagemArvore from "../assets/pngwing.png";
import imagemTerreno from "../assets/terratexture.png";

const Floresta = ({ 
  arvoresAtuais, 
  metaDeArvores, 
  voltarMenu, 
  irFases,
  totalAcertos = 0,
  totalErros = 0
}) => {
  const slotsDaFloresta = Array.from({ length: metaDeArvores });
  const metaVitoria = Math.floor(metaDeArvores * 0.8);
  const progressoPercentual = Math.round((arvoresAtuais / metaDeArvores) * 100);
  
  const atingiuVitoria = arvoresAtuais >= metaVitoria;
  const completouTudo = arvoresAtuais >= metaDeArvores;
  
  const acertosReais = arvoresAtuais;
  const taxaAcerto = acertosReais + totalErros > 0 
    ? Math.round((acertosReais / (acertosReais + totalErros)) * 100) 
    : 0;
  
  return (
    <div className="container-floresta">
      <h2>Sua Floresta</h2>
      
      {completouTudo && (
        <div className="alerta alerta-perfeito">
          <h3>🏆 PERFEITO! Você completou 100% da floresta!</h3>
        </div>
      )}
      
      {atingiuVitoria && !completouTudo && (
        <div className="alerta alerta-vitoria">
          <h3>🎉 VITÓRIA! Você atingiu {progressoPercentual}% da floresta!</h3>
          <p>Continue jogando para completar os 100%!</p>
        </div>
      )}
      
      <div className="estatisticas">
        <p>Árvores Plantadas: {arvoresAtuais} / {metaDeArvores} ({progressoPercentual}%)</p>
        <p>Meta de Vitória: {metaVitoria} árvores (80%) {atingiuVitoria ? '✅' : '🎯'}</p>
        <p>Acertos: {acertosReais} | Erros: {totalErros} | Taxa: {taxaAcerto}%</p>
      </div>

      <div className="buttons-floresta">
        <button onClick={voltarMenu}>Voltar Menu</button>
        <button onClick={() => irFases(null)}>Fases</button>
      </div>

      <div className="slots-container">
        {slotsDaFloresta.map((_, index) => (
          <div key={index} className="slot-arvore">
            <img 
              src={index < arvoresAtuais ? imagemArvore : imagemTerreno} 
              alt={index < arvoresAtuais ? "Árvore Plantada" : "Terreno Vazio"} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Floresta;
