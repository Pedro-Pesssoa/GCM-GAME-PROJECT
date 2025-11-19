import React, { useState, useEffect, useRef } from "react";
import "./QuizDaFase.css";
import FeedbackResposta from "./FeedbackResposta";
import GameOver from "./GameOver";
import { registrarFaseConcluida } from "../api";

const QuizDaFase = ({
  voltarFases,
  faseId,
  perguntas: perguntasRecebidas = [],
  onFaseConcluida,
}) => {
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isCorrect: false,
  });

  const acertosRef = useRef(0);

  const finalizarFase = async (acertosCount) => {
    setFaseConcluida(true);
    
    try {
      await registrarFaseConcluida(faseId, acertosCount, perguntas.length);
    } catch (error) {
      console.error("Erro ao registrar fase concluída:", error);
    }
    
    if (typeof onFaseConcluida === "function") {
      onFaseConcluida({
        acertos: acertosCount,
        total: perguntas.length,
        faseId,
        acertouTodas: acertosCount === perguntas.length,
      });
    }
  };

  useEffect(() => {
    if (perguntasRecebidas && perguntasRecebidas.length && !faseConcluida) {
      setPerguntas(perguntasRecebidas);
      setPerguntaAtualIndex(0);
      setAcertos(0);
      acertosRef.current = 0;
      setFeedback({ show: false, message: "", isCorrect: false });
    }
  }, [perguntasRecebidas]);

  const timeoutRef = useRef(null);

  const handleResponder = async (respostaSelecionadaId) => {
    if (feedback.show) return;

    const perguntaAtual = perguntas[perguntaAtualIndex];
    const isCorrect = respostaSelecionadaId === perguntaAtual.correctAnswerId;

    if (isCorrect) {
      acertosRef.current += 1;
      setAcertos((prev) => prev + 1);
      
      setFeedback({
        show: true,
        message: "Resposta Correta!",
        isCorrect: true,
      });
    } else {
      setFeedback({
        show: true,
        message: "Resposta Incorreta!",
        isCorrect: false,
      });
    }
  };

  const handleAvancarAgora = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const proximoIndex = perguntaAtualIndex + 1;

    if (proximoIndex < perguntas.length) {
      setPerguntaAtualIndex(proximoIndex);
      setFeedback({ show: false, message: "", isCorrect: false });
    } else {
      setFaseConcluida(true);
      finalizarFase(acertosRef.current);
    }

    setFeedback({ show: false, message: "", isCorrect: false });
  };

  if (perguntas.length === 0) return <div>Carregando fase ...</div>;
  if (faseConcluida) {
    const acertouTodas = acertos === perguntas.length;
    return (
      <GameOver
        score={acertos * 10}
        totalQuestions={perguntas.length}
        onRestartGame={() => {
          setPerguntaAtualIndex(0);
          setAcertos(0);
          acertosRef.current = 0; // Reseta o ref também
          setFaseConcluida(false);
          setFeedback({ show: false, message: "", isCorrect: false });
        }}
        onBackToMenu={() => voltarFases()}
        isFaseCompleta={acertouTodas}
        faseId={faseId}
        acertouTodas={acertouTodas}
        acertos={acertos}
      />
    );
  }

  const perguntaAtual = perguntas[perguntaAtualIndex];
  
  return (
    <div className="quiz-fase-container">
      <div className="quiz-title">
        <button 
          className="back-btn" 
          onClick={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            voltarFases();
          }}
        >
          Voltar Fases
        </button>
        <h2>
          Fase {faseId} - Pergunta {perguntaAtualIndex + 1} de{" "}
          {perguntas.length}
        </h2>
      </div>
      <div className="quiz-questao">
        <h3>{perguntaAtual.question}</h3>
        <div className="alternativas-container">
          {perguntaAtual.options.map((opt) => (
            <button
              key={opt.id}
              className="alternativa-btn"
              onClick={() => handleResponder(opt.id)}
              disabled={feedback.show}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      {feedback.show && (
        <FeedbackResposta
          isCorrect={feedback.isCorrect}
          explicacao={perguntaAtual?.explanation}
          score={null}
          onNext={handleAvancarAgora}
          isLast={perguntaAtualIndex === perguntas.length - 1}
        />
      )}
    </div>
  );
};

export default QuizDaFase;
