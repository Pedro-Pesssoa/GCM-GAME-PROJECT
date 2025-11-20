# Floresta

## Resumo
Componente de visualização da floresta virtual do jogador, exibindo árvores plantadas baseadas nos acertos, progresso percentual, estatísticas de desempenho e mensagens de vitória. Representa visualmente o impacto do conhecimento do jogador na restauração ambiental.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| arvoresAtuais | number | Número de árvores já plantadas pelo jogador (corresponde aos acertos) |
| metaDeArvores | number | Número total de árvores que podem ser plantadas na floresta |
| voltarMenu | function | Função callback para retornar ao menu principal |
| irFases | function | Função callback para navegar até a tela de seleção de fases |
| totalAcertos | number | Total de acertos do jogador (padrão: 0) |
| totalErros | number | Total de erros do jogador (padrão: 0) |

## Funcionalidades
- Visualização da floresta com slots para árvores (plantadas ou vazias)
- Cálculo de progresso percentual (árvores plantadas / meta)
- Meta de vitória: 80% da floresta (exibe alerta de vitória)
- Alerta especial para 100% de completude
- Estatísticas detalhadas: árvores plantadas, meta de vitória, acertos, erros e taxa de acerto
- Imagens dinâmicas: árvore para slots preenchidos, terreno vazio para slots disponíveis
- Botões de navegação para voltar ao menu ou ir para fases

## Observações
- A meta de vitória é calculada como 80% da meta total de árvores
- Taxa de acerto é calculada como: (acertos / (acertos + erros)) * 100%
