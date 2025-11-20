# GameOver

## Resumo
Componente de tela de conclusão de fase, exibindo o desempenho do jogador, mensagens motivacionais baseadas na pontuação, e opções para reiniciar a fase ou voltar ao menu. Mostra estatísticas detalhadas de acertos e percentual de aproveitamento.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| totalQuestions | number | Número total de perguntas da fase |
| onRestartGame | function | Função callback para reiniciar a fase atual |
| onBackToMenu | function | Função callback para retornar ao menu de fases |
| faseId | number | Identificador numérico da fase concluída |
| acertouTodas | boolean | Indica se o jogador acertou todas as perguntas (100%) |
| acertos | number | Número de respostas corretas do jogador |

## Funcionalidades
- Calcula e exibe percentual de aproveitamento
- Mensagens diferentes para 100% de acerto vs aproveitamento parcial
- Estatísticas detalhadas (acertos, erros, percentual)
- Botões de navegação para reiniciar ou voltar ao menu
