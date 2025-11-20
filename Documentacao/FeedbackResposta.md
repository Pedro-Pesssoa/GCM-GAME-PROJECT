# FeedbackResposta

## Resumo
Componente de overlay que exibe feedback ao jogador após responder uma pergunta, mostrando se a resposta estava correta ou incorreta, a explicação da resposta, e um botão para avançar para a próxima pergunta.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| isCorrect | boolean | Indica se a resposta do jogador estava correta (true) ou incorreta (false) |
| explicacao | string | Texto explicativo sobre a resposta correta da pergunta |
| score | number | Pontuação atual do jogador (pode ser null) |
| onNext | function | Função callback executada ao clicar no botão de avançar |
| isLast | boolean | Indica se é a última pergunta da fase (altera o texto do botão) |

## Observações
- O texto do botão muda de "Próxima Pergunta" para "Finalizar" quando isLast é true
- Exibe diferentes estilos visuais dependendo se a resposta foi correta ou incorreta
