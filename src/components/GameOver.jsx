import React from "react";
import "./GameOver.css";

const GameOver = ({ 
  totalQuestions, 
  onRestartGame, 
  onBackToMenu,
  faseId = null,
  acertouTodas = false,
  acertos = 0
}) => {
  const percentual = Math.round((acertos / totalQuestions) * 100);
  
  return (
    <div className="game-over-screen">
      {acertouTodas ? (
        <h2>✅ Fase {faseId} Concluída com 100%! 🎉</h2>
      ) : (
        <h2>⚠️ Fase {faseId} Incompleta ({percentual}%)</h2>
      )}
      
      <div className="final-stats">
        {acertouTodas ? (
          <p className="mensagem-sucesso">
            🏆 Parabéns! Você acertou todas as perguntas desta fase!
          </p>
        ) : (
          <p className="mensagem-alerta">
            💡 Continue tentando! Você precisa acertar 100% para concluir a fase.
          </p>
        )}
        
        <p>
          Questões acertadas: <strong>{acertos} de {totalQuestions}</strong>
        </p>
        <p>
          Performance: <strong className={acertouTodas ? "destaque-sucesso" : "destaque-alerta"}>{percentual}%</strong>
        </p>
      </div>
      
      <div className="game-over-actions">
        {acertouTodas ? (
          <>
            <button onClick={onBackToMenu} className="menu-button">
              ✓ Próxima Fase
            </button>
            <button onClick={onRestartGame} className="restart-button">
              🔄 Refazer Fase
            </button>
          </>
        ) : (
          <>
            <button onClick={onRestartGame} className="restart-button">
              Tentar Novamente
            </button>
            <button onClick={onBackToMenu} className="menu-button">
              Voltar às Fases
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameOver;