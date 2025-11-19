import React, { useState, useEffect } from "react";
// Componentes
import Header from "./components/Header";
import CardDev from "./components/CardDev";
import FormularioCadastro from "./components/FormularioCadastro";
import FormularioLogin from "./components/FormularioLogin";
import MenuGame from "./components/MenuGame";
import Playing from "./components/Playing";
import Introducao from "./components/Introducao";
import Floresta from "./components/Floresta";
import Fases from "./components/Fases";
import QuizDaFase from "./components/QuizDaFase";
import FeedbackResposta from "./components/FeedbackResposta";
import GameOver from "./components/GameOver";

// API
import { getPerguntas, getProgresso, registrarAcerto, registrarErro, resetarProgresso } from "./api";

// Constantes
const QUESTOESPORFASE = 3;

// Definição das telas do jogo
const GAME_SCREENS = {
  LOGIN: "login",
  MENU: "menu",
  PLAYING: "playing",
  INTRODUCAO: "introducao",
  FLORESTA: "floresta",
  FASES: "fases",
  QUIZ: "quiz",
  FEEDBACK: "feedback",
  GAME_OVER: "game_over",
  CREATE_ACCOUNT: "create_account",
};

function App() {
  // ------------------------------------
  // 1. Estados de Navegação e Jogo
  // ------------------------------------
  const [currentScreen, setCurrentScreen] = useState(GAME_SCREENS.LOGIN);
  const [currentFaseId, setCurrentFaseId] = useState(1);
  
  // ------------------------------------
  // 2. Estados de Perguntas (carregadas da API)
  // ------------------------------------
  const [perguntas, setPerguntas] = useState([]);
  const [isLoadingPerguntas, setIsLoadingPerguntas] = useState(true);
  const [errorPerguntas, setErrorPerguntas] = useState(null);
  
  // ------------------------------------
  // 2.1. Estados de Progresso (carregados da API)
  // ------------------------------------
  const [progresso, setProgresso] = useState(null);
  const [isLoadingProgresso, setIsLoadingProgresso] = useState(false);
  
  // ------------------------------------
  // 3. Estados do Quiz (Legado/Playing)
  // ------------------------------------
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null); // Feedback da resposta

  // ------------------------------------
  // 4. Estados de Pontuação e Progresso
  // ------------------------------------
  const [score, setScore] = useState(0);
  const [fasesCompletas, setFasesCompletas] = useState([]);
  const [jogoCompleto, setJogoCompleto] = useState(false);

  // ------------------------------------
  // 5. Carregamento das Perguntas da API
  // ------------------------------------
  useEffect(() => {
    const carregarPerguntas = async () => {
      try {
        setIsLoadingPerguntas(true);
        const data = await getPerguntas();
        setPerguntas(data);
        setErrorPerguntas(null);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setErrorPerguntas(error.message);
      } finally {
        setIsLoadingPerguntas(false);
      }
    };

    carregarPerguntas();
  }, []);

  // ------------------------------------
  // 5.1. Carregamento do Progresso após Login
  // ------------------------------------
  const carregarProgresso = async () => {
    try {
      setIsLoadingProgresso(true);
      const data = await getProgresso();
      setProgresso(data);
      // Atualiza estados locais com dados do backend
      setScore(data.total_acertos * 10);
      
      // Sincroniza fases completas com backend
      if (data.fases_concluidas) {
        const fasesIds = Object.keys(data.fases_concluidas).map(id => parseInt(id));
        setFasesCompletas(fasesIds);
      }
      return data;
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
      // Se não existir progresso, será criado no primeiro acerto/erro
    } finally {
      setIsLoadingProgresso(false);
    }
  };

  // ------------------------------------
  // 6. Variáveis Derivadas
  // ------------------------------------
  const mockData = perguntas; // Mantém compatibilidade com código existente
  const currentQuestion = mockData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockData.length - 1;

  // ------------------------------------
  // 7. Funções de Lógica do Jogo
  // ------------------------------------

  /**
   * Retorna as perguntas para uma fase específica.
   * @param {number} faseId - O ID da fase (1, 2, 3...).
   * @returns {Array} As perguntas correspondentes.
   */
  const getPerguntasFase = (faseId) => {
    const inicio = (faseId - 1) * QUESTOESPORFASE;
    const fim = inicio + QUESTOESPORFASE;
    return perguntas.slice(inicio, fim);
  };

  /**
   * Função de callback chamada após a conclusão de um QuizDaFase.
   * Atualiza a pontuação, o progresso das fases e a navegação.
   * @param {{acertos: number, faseId: number}} res - Objeto com acertos e ID da fase.
   */
  const handleFaseConcluida = async ({ acertos, total, faseId }) => {
    // Verifica se acertou TODAS as perguntas da fase (100%)
    const acertouTodas = acertos === total;
    
    // Marca fase como completa APENAS se acertar 100%
    if (acertouTodas && !fasesCompletas.includes(faseId)) {
      const novasFasesCompletas = [...fasesCompletas, faseId];
      setFasesCompletas(novasFasesCompletas);

      // Número total de fases
      const totalFases = Math.ceil(perguntas.length / QUESTOESPORFASE);

      // Verifica se completou o Jogo (todas as fases com 100%)
      if (novasFasesCompletas.length === totalFases) {
        setJogoCompleto(true);
      }
    }

    // Recarrega progresso do backend após fase concluída
    await carregarProgresso();

    // NÃO muda a tela - QuizDaFase já mostra o GameOver com os dados corretos
    // setCurrentScreen(GAME_SCREENS.GAME_OVER);
  };

  // Funções de resposta do modo 'Playing' (antigo) - Mantidas para compatibilidade.
  const handleAnswer = (selectedAnswerId) => {
    const correct = selectedAnswerId === currentQuestion.correctAnswerId;
    setIsCorrect(correct);
    setCurrentScreen(GAME_SCREENS.FEEDBACK);

    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setCurrentScreen(GAME_SCREENS.GAME_OVER);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentScreen(GAME_SCREENS.PLAYING);
    }
    setIsCorrect(null);
  };

  // ------------------------------------
  // 8. Funções de Navegação (Handlers)
  // ------------------------------------

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCorrect(null);
  };

  const handleBackToLogin = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.LOGIN);
  };

  const handleBackToMenu = async () => {
    resetState();
    await carregarProgresso();
    setCurrentScreen(GAME_SCREENS.MENU);
  };

  const handleCreatAccount = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.CREATE_ACCOUNT);
  };

  const handleNovoJogo = async () => {
    resetState();
    try {
      // Reseta o progresso no backend
      await resetarProgresso();
      // Reseta estados locais
      setFasesCompletas([]);
      setJogoCompleto(false);
      setProgresso(null);
    } catch (error) {
      console.error("Erro ao resetar progresso:", error);
    }
    setCurrentScreen(GAME_SCREENS.INTRODUCAO);
  };

  const handleCarregarJogo = async () => {
    resetState();
    try {
      // Carrega o progresso existente e usa o retorno para decidir fluxo
      const data = await carregarProgresso();
      // Se não houver progresso ou o jogo não foi iniciado, não faz nada
      if (!data || data.jogo_iniciado !== true) {
        return;
      }

      // Se já iniciou anteriormente, vai direto para a Floresta
      setCurrentScreen(GAME_SCREENS.FLORESTA);
    } catch (error) {
      console.error("Erro ao carregar jogo:", error);
    }
  };

  const handleIntroducao = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.INTRODUCAO);
  };

  const handleFloresta = async () => {
    resetState();
    await carregarProgresso();
    setCurrentScreen(GAME_SCREENS.FLORESTA);
  };

  /**
   * Navega para a tela de Seleção de Fases ou, se um ID for passado, para o Quiz da Fase.
   * @param {number} [selectedFaseId] - ID da fase selecionada.
   */
  const handleFases = (selectedFaseId) => {
    if (selectedFaseId) {
      setCurrentFaseId(selectedFaseId);
      setCurrentScreen(GAME_SCREENS.QUIZ);
    } else {
      setCurrentScreen(GAME_SCREENS.FASES);
    }
  };

  // Handler para fase concluída removido pois estava duplicado

  // Handler de Restart no GameOver (Ajustado para a lógica de fases)
  const handleGameOverRestart = () => {
    if (jogoCompleto) {
      setFasesCompletas([]);
      setJogoCompleto(false);
      handleBackToMenu();
    } else {
      // Reinicia a fase atual
      handleFases(currentFaseId);
    }
  };

  // Handler de Voltar ao Menu/Fases no GameOver (Ajustado)
  const handleGameOverBack = () => {
    if (jogoCompleto) {
      handleBackToMenu();
    } else {
      // Volta para a tela de seleção de fases
      setCurrentScreen(GAME_SCREENS.FASES);
    }
  };

  // ------------------------------------
  // 9. Renderização Condicional
  // ------------------------------------
  
  // Exibe loading enquanto carrega perguntas
  if (isLoadingPerguntas) {
    return (
      <div className="page">
        <Header />
        <div id="jogo" className="quiz-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Carregando perguntas...</h2>
            <p>Aguarde enquanto carregamos o conteúdo do jogo.</p>
          </div>
        </div>
      </div>
    );
  }

  // Exibe erro se houver problema ao carregar
  if (errorPerguntas) {
    return (
      <div className="page">
        <Header />
        <div id="jogo" className="quiz-container">
          <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            <h2>Erro ao carregar perguntas</h2>
            <p>{errorPerguntas}</p>
            <button onClick={() => window.location.reload()}>
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderGameContent = () => {
    switch (currentScreen) {
      case GAME_SCREENS.LOGIN:
        return (
          <FormularioLogin
            SwitchRegister={handleCreatAccount}
            handleStartGame={handleBackToMenu} // Assume que Login bem-sucedido leva ao Menu
          />
        );

      case GAME_SCREENS.CREATE_ACCOUNT:
        return <FormularioCadastro SwitchLogin={handleBackToLogin} />;

      case GAME_SCREENS.MENU:
        return (
          <MenuGame 
            novoJogo={handleNovoJogo} 
            carregarJogo={handleCarregarJogo}
            telaLogin={handleBackToLogin}
            jogoIniciado={progresso?.jogo_iniciado || false}
          />
        );

      case GAME_SCREENS.INTRODUCAO:
        return <Introducao Playing={handleFloresta} />;

      case GAME_SCREENS.FLORESTA:
        return (
          <Floresta
            arvoresAtuais={progresso?.arvores || 0}
            metaDeArvores={progresso?.meta_arvores || 25}
            voltarMenu={handleBackToMenu}
            irFases={handleFases}
            totalAcertos={progresso?.total_acertos || 0}
            totalErros={progresso?.total_erros || 0}
          />
        );

      case GAME_SCREENS.FASES:
        return (
          <Fases
            mockPerguntas={mockData}
            onFaseSelect={handleFases} // Prop crucial
            fasesCompletas={fasesCompletas}
            voltarMenu={() => setCurrentScreen(GAME_SCREENS.MENU)}
            voltarFloresta={() => setCurrentScreen(GAME_SCREENS.FLORESTA)}
          />
        );

      case GAME_SCREENS.QUIZ:
        const indiceInicial = (currentFaseId - 1) * QUESTOESPORFASE;
        const perguntasDaFase = mockData.slice(
          indiceInicial,
          indiceInicial + QUESTOESPORFASE
        );
        return (
          <QuizDaFase
            faseId={currentFaseId}
            perguntas={getPerguntasFase(currentFaseId)} // Passa as perguntas filtradas
            voltarFases={handleFases} // Volta para a lista de fases
            onFaseConcluida={handleFaseConcluida}
          />
        );

      case GAME_SCREENS.GAME_OVER:
        // Mensagem dinâmica baseada no estado do jogo
        const gameOverMessage = jogoCompleto
          ? "Parabéns! Você completou o jogo!"
          : `Fase ${currentFaseId} concluída!`;

        // Total de perguntas para exibição
        const totalQuestions = jogoCompleto
          ? perguntas.length
          : QUESTOESPORFASE;

        return (
          <GameOver
            score={score}
            totalQuestions={totalQuestions}
            onRestartGame={handleGameOverRestart}
            onBackToMenu={handleGameOverBack}
            isFaseCompleta={!jogoCompleto}
            faseId={currentFaseId}
            mensagem={gameOverMessage}
            fasesCompletas={fasesCompletas}
          />
        );

      case GAME_SCREENS.PLAYING:
      case GAME_SCREENS.FEEDBACK:
        // Renderiza o modo antigo/legado se necessário (embora QuizDaFase substitua isso)
        return currentScreen === GAME_SCREENS.PLAYING ? (
          <Playing
            handleBackToMenu={handleBackToMenu}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            score={score}
            mockData={mockData}
            handleAnswer={handleAnswer}
          />
        ) : (
          <FeedbackResposta
            isCorrect={isCorrect}
            explicacao={currentQuestion?.explanation}
            score={score}
            onNext={handleNextQuestion}
            isLast={isLastQuestion}
          />
        );

      default:
        return null;
    }
  };

  // ------------------------------------
  // 10. Template Principal
  // ------------------------------------
  return (
    <div className="page">
      <Header />
      <div id="jogo" className="quiz-container">
        {renderGameContent()}
      </div>

      {/* Seções informativas (Sobre, Tecnologias, Desenvolvedores) */}
      <div id="sobre-o-jogo" className="sobre">
        <h1>Sobre o jogo</h1>
        <div className="descricao">
          <h2>Bem-vindo ao QuizPlanet : Desafio ODS !</h2>
          <p>
            Este jogo é mais do que uma diversão: é uma ferramenta de
            aprendizado e conscientização sobre os **Objetivos de
            Desenvolvimento Sustentável (ODS)** da ONU. Criado como um projeto
            de engenharia de software, nosso objetivo é mostrar de forma
            interativa e acessível como a tecnologia pode ser uma aliada na
            educação e na construção de um futuro mais justo e sustentável.
          </p>
          <p>
            Acreditamos que, ao transformar o conhecimento sobre os ODS em um
            desafio divertido, podemos inspirar mais pessoas a entenderem e a
            agirem em prol de metas globais, como a erradicação da pobreza, a
            proteção do meio ambiente e a promoção da igualdade.
          </p>
          <p>
            Junte-se a nós nessa jornada. Descubra seu conhecimento, aprenda
            algo novo e ajude a espalhar a mensagem. O futuro do planeta está em
            nossas mãos!
          </p>
        </div>
      </div>

      <div id="tecnologias" className="tecnologias">
        <h1>Tecnologias Utilizadas</h1>
        <div className="descricao">
          <h2>Frontend ( Camada de Apresentação )</h2>
          <p>
            <strong>React</strong> : A interface do jogo foi desenvolvida com
            React, uma biblioteca JavaScript líder de mercado. Sua abordagem
            baseada em componentes permite a criação de uma interface de usuário
            dinâmica e modular, otimizando a navegação e a interatividade.
          </p>
          <h2>Backend ( Lógica e Dados )</h2>
          <p>
            <strong>Python</strong> : A lógica do servidor (backend) é
            inteiramente construída em Python, uma linguagem de programação
            versátil e poderosa. Sua sintaxe clara e vasto ecossistema de
            bibliotecas aceleraram o desenvolvimento.
          </p>
          <p>
            <strong>Django</strong> : Utilizamos Django, um framework web
            Python. Ele foi escolhido para gerenciar a complexidade do jogo,
            incluindo o ORM (Mapeamento Objeto-Relacional) para o banco de
            dados, a segurança, e a construção rápida da API REST para servir a
            lógica do jogo.
          </p>
        </div>
      </div>

      <div id="desenvolvedores" className="desenvolvedores">
        <h1>Desenvolvedores</h1>
        <div className="card-container">
          <CardDev
            nome={"Jefferson Bezerra da Gama"}
            especialidade={"Front-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/58535852?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/jefferson-bezerra-gama/"}
            githubUrl={"https://github.com/jeffersonbg"}
          />
          <CardDev
            nome={"Pedro Henrique Souza Pessoa"}
            especialidade={"Back-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/63820078?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/pedro-pesssoa/"}
            githubUrl={"https://github.com/Pedro-Pesssoa"}
          />
          <CardDev
            nome={"Thiago Luan Moreira Sousa"}
            especialidade={"Front-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/112329988?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/thiago-luan-28b55423a/"}
            githubUrl={"https://github.com/thiagoluann"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
