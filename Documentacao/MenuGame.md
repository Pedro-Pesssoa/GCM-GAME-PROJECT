# MenuGame

## Resumo
Componente de menu principal do jogo, oferecendo opções para iniciar novo jogo, carregar jogo existente (se disponível) e sair. Gerencia navegação entre telas de menu com estados internos.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| novoJogo | function | Função callback para iniciar um novo jogo |
| carregarJogo | function | Função callback para carregar um jogo salvo |
| telaLogin | function | Função callback para sair do jogo e voltar à tela de login |
| jogoIniciado | boolean | Indica se existe um jogo em andamento, habilitando/desabilitando a opção "Carregar Jogo" |

## Estado Interno

| Estado | Tipo | Descrição |
|--------|------|-----------|
| telaAtual | string | Controla qual tela do menu está sendo exibida (valores: "principal", "carregar_jogo") |

## Funcionalidades
- Menu principal com três opções: Novo Jogo, Carregar Jogo, Sair
- Opção "Carregar Jogo" desabilitada se não houver jogo iniciado
- Tela secundária "Em Desenvolvimento" para funcionalidade de múltiplos slots de salvamento
- Logo da ODS 15 (Vida Terrestre) exibida no menu
- Navegação entre telas do menu
