# FormularioCadastro

## Resumo
Componente de formulário de cadastro de novos usuários, com validação de campos, verificação de senha, e exibição de tela de sucesso após cadastro bem-sucedido. Gerencia estado interno para todos os campos do formulário e tratamento de erros.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| SwitchLogin | function | Função callback para alternar para a tela de login |

## Estado Interno

| Estado | Tipo | Descrição |
|--------|------|-----------|
| username | string | Nome de usuário escolhido |
| email | string | Endereço de e-mail do usuário |
| password | string | Senha escolhida (mínimo 8 caracteres) |
| confirmPassword | string | Confirmação da senha |
| error | string | Mensagem de erro a ser exibida |
| isLoading | boolean | Indica se está processando o cadastro |
| success | boolean | Indica se o cadastro foi concluído com sucesso |

## Validações
- Valida formato de e-mail
- Verifica se senha e confirmação são iguais
- Senha deve ter no mínimo 8 caracteres
- Exibe tela de sucesso após cadastro bem-sucedido com opção de ir para login
