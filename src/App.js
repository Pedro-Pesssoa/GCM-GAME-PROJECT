import React, { useState, useEffect } from "react";
// Componentes
import Header from "./components/Header";
import CardDev from "./components/CardDev";
import FormularioCadastro from "./components/FormularioCadastro";
import FormularioLogin from "./components/FormularioLogin";
import MenuGame from "./components/MenuGame";
import Introducao from "./components/Introducao";
import Floresta from "./components/Floresta";
import Fases from "./components/Fases";
import QuizDaFase from "./components/QuizDaFase";
import GameOver from "./components/GameOver";

// Prints das telas
import QP01 from "./screens/QP01_Login.png";
import QP02 from "./screens/QP02_Criar_conta.png";
import QP03 from "./screens/QP03_Menu.png";
import QP04 from "./screens/QP04_Introducao.png";
import QP05 from "./screens/QP05_Floresta.png";
import QP06 from "./screens/QP06_Fases.png";
import QP07 from "./screens/QP07_Pergunta.png";
import QP08 from "./screens/QP08_Fase_concluida.png";
import QP09 from "./screens/QP09_Estatisticas.png";

// API
import {
  getPerguntas,
  getProgresso,
  registrarAcerto,
  registrarErro,
  resetarProgresso,
} from "./api";

// Constantes
const QUESTOESPORFASE = 3;

// Definição das telas do jogo
const GAME_SCREENS = {
  LOGIN: "login",
  MENU: "menu",
  INTRODUCAO: "introducao",
  FLORESTA: "floresta",
  FASES: "fases",
  QUIZ: "quiz",
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
  // 3. Estados de Pontuação e Progresso
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
        const fasesIds = Object.keys(data.fases_concluidas).map((id) =>
          parseInt(id)
        );
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

  // ------------------------------------
  // 8. Funções de Navegação (Handlers)
  // ------------------------------------

  const resetState = () => {
    setScore(0);
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
          <div style={{ textAlign: "center", padding: "50px" }}>
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
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
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

      <div id="interface-do-jogo" className="interface">
        <h1>Interface do Jogo</h1>
        <div className="descricao">
          <h3>Login e Cadastro</h3>
          <div className="game-screen">
            <img src={QP01} alt="Tela de Login" />
            <img src={QP02} alt="Tela de Cadastro" />
          </div>
          <p>
            O jogo inicia com uma tela de login intuitiva onde jogadores já
            cadastrados podem acessar suas contas. Para novos jogadores, há a
            opção de criar uma conta através da tela de cadastro, onde é
            possível registrar informações básicas e criar um perfil
            personalizado. O sistema garante segurança e facilidade no acesso ao
            jogo.
          </p>
          <h3>Menu</h3>
          <div className="game-screen">
            <img src={QP03} alt="Tela de Menu" />
          </div>
          <p>
            O menu principal apresenta todas as opções disponíveis ao jogador de
            forma organizada e acessível. Aqui é possível iniciar uma nova
            partida, continuar uma partida já iniciada anteriormente e sair. A
            interface foi projetada para proporcionar uma navegação fluida e
            intuitiva entre as diferentes funcionalidades do jogo.
          </p>
          <h3>Introdução e Floresta</h3>
          <div className="game-screen">
            <img src={QP04} alt="Tela de Introdução" />
            <img src={QP05} alt="Tela de Floresta" />
          </div>
          <p>
            O jogo começa com uma tela de introdução que dá as boas-vindas ao
            jogador e apresenta sua missão: ajudar a recuperar uma floresta
            virtual usando conhecimentos sobre conservação ambiental. Nessa
            tela, o jogador conhece as mecânicas básicas, perguntas de
            Verdadeiro/Falso e múltipla escolha sobre temas como biodiversidade
            e desertificação, e é informado de que o progresso será salvo
            automaticamente. Um botão “Iniciar Jogo” convida a começar a
            aventura ecológica.
          </p>
          <p>
            A segunda tela mostra a floresta do jogador em seu estado inicial:
            totalmente desmatada, com 25 espaços vazios. No topo, um painel
            exibe estatísticas importantes, como o número de árvores plantadas,
            a meta para vencer e o desempenho nas respostas. Botões como “Voltar
            Menu” e “Fases” permitem navegar facilmente entre outras partes do
            jogo.
          </p>
          <h3>Fases e Perguntas</h3>
          <div className="game-screen">
            <img src={QP06} alt="Tela de Fases" />
            <img src={QP07} alt="Tela de Perguntas" />
          </div>
          <p>
            O menu de seleção de fases exibe as 9 etapas do jogo organizadas em
            uma grade 3x3, cada uma representada por um botão que o jogador pode
            clicar para entrar na fase desejada. Na parte superior, a barra de
            navegação mantém opções como “Voltar Menu”, o título “Fases” e um
            atalho para retornar à tela da floresta.
          </p>
          <p>
            Já a tela de gameplay mostra uma pergunta sobre os Objetivos de
            Desenvolvimento Sustentável, especificamente o ODS 15. O jogador
            deve escolher uma entre quatro alternativas. Depois de responder,
            aparece um feedback dizendo “CORRETO!” junto de uma explicação
            educativa. Um botão “Próxima Questão” permite continuar, enquanto um
            indicador no topo mostra o progresso: “Fase 1 – Pergunta 1 de 3”.
          </p>
          <h3>Fase concluida e Estatísticas</h3>
          <div className="game-screen">
            <img src={QP08} alt="Tela de Fase concluída" />
            <img src={QP09} alt="Tela de Estatisticas" />
          </div>
          <p>
            A tela de resultado comemora a conclusão da Fase 1 com 100% de
            acertos. Ela parabeniza o jogador, mostra o desempenho, 3 de 3
            questões respondidas corretamente, e oferece duas escolhas: seguir
            para a próxima fase ou refazer a atual para manter ou melhorar a
            pontuação.
          </p>
          <p>
            A segunda tela mostra a floresta atualizada após esse progresso.
            Agora, 3 das 25 árvores foram plantadas, representando 12% de
            recuperação do ambiente. As estatísticas também refletem o bom
            desempenho: 3 acertos, nenhum erro e taxa de 100%. Esse avanço
            visual incentiva o jogador a continuar respondendo corretamente para
            restaurar toda a floresta virtual.
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
