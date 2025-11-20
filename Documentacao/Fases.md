# Fases

## Resumo
Componente de seleção de fases do jogo, exibindo todas as fases disponíveis calculadas automaticamente com base no número de perguntas. Mostra o status de conclusão de cada fase e permite navegação entre menu, floresta e seleção de fase.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| mockPerguntas | array | Array com todas as perguntas do jogo, usado para calcular o número de fases disponíveis |
| voltarMenu | function | Função callback para retornar ao menu principal |
| voltarFloresta | function | Função callback para retornar à tela da floresta |
| onFaseSelect | function | Função callback executada ao selecionar uma fase, recebe o ID da fase como parâmetro |
| fasesCompletas | array | Array de números representando os IDs das fases já concluídas pelo jogador |

## Observações
- Calcula automaticamente o número de fases baseado na constante QUESTOESPORFASE (3 perguntas por fase)
- Exibe indicador visual (✅) para fases já concluídas
