# QuizDaFase

## Resumo
Componente principal de execução do quiz de uma fase, gerenciando perguntas, respostas, feedback, pontuação e conclusão da fase. Integra com a API backend para registrar fases concluídas e controla o fluxo completo de uma fase do jogo.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| voltarFases | function | Função callback para retornar à tela de seleção de fases |
| faseId | number | Identificador numérico da fase sendo jogada |
| perguntas | array | Array de objetos com as perguntas da fase (padrão: []) |
| onFaseConcluida | function | Função callback executada ao concluir a fase, recebe objeto com acertos, total, faseId e acertouTodas |

## Estado Interno

| Estado | Tipo | Descrição |
|--------|------|-----------|
| perguntas | array | Lista de perguntas da fase atual |
| perguntaAtualIndex | number | Índice da pergunta atual sendo exibida |
| acertos | number | Número de respostas corretas |
| faseConcluida | boolean | Indica se a fase foi concluída |
| feedback | object | Objeto contendo: show (boolean), message (string), isCorrect (boolean) |

## Funcionalidades
- Exibe perguntas sequencialmente com alternativas
- Valida respostas e exibe feedback imediato (correto/incorreto)
- Mostra explicação da resposta através do componente FeedbackResposta
- Registra conclusão da fase na API backend (função registrarFaseConcluida)
- Controla progresso da fase (pergunta X de Y)
- Permite reiniciar a fase ou voltar ao menu através do componente GameOver
- Usa useRef para garantir contagem precisa de acertos
- Gerencia timeouts para transições entre perguntas
- Desabilita alternativas após seleção de resposta

## Integração com Outros Componentes
- FeedbackResposta: Exibe feedback após cada resposta
- GameOver: Exibe tela final ao concluir a fase
