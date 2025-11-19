import React from "react";
import "./FeedbackResposta.css";

const FeedbackResposta = ({ isCorrect, explicacao, score, onNext, isLast }) => {
  return (
    <div className="feedback-screen">
      <h2>{isCorrect ? "🎉 Correto!" : "❌ Incorreto"}</h2>
      <div className="feedback-content">
        {explicacao && (
          <p>
            <strong>Explicação:</strong> {explicacao}
          </p>
        )}
        {typeof score === "number" && (
          <p>Sua pontuação atual: {score} pontos</p>
        )}
      </div>
      <button onClick={onNext} className="next-button">
        {isLast ? "Ver Resultado Final" : "Próxima Questão"}
      </button>
    </div>
  );
};

export default FeedbackResposta;
