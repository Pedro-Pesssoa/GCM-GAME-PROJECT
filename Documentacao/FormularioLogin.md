# FormularioLogin

## Resumo
Componente de formulário de autenticação de usuários, incluindo opções de login com e-mail/senha e login social (Google, GitHub, Facebook). Integra com a API backend para validação e armazenamento de tokens JWT no localStorage.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| SwitchRegister | function | Função callback para alternar para a tela de cadastro |
| handleStartGame | function | Função callback executada após login bem-sucedido para iniciar o jogo |

## Estado Interno

| Estado | Tipo | Descrição |
|--------|------|-----------|
| email | string | Endereço de e-mail do usuário |
| senha | string | Senha do usuário |
| erro | string | Mensagem de erro a ser exibida |
| isLoading | boolean | Indica se está processando o login |

## Funcionalidades
- Login com credenciais (e-mail e senha)
- Integração com API backend via função loginUser
- Armazenamento de tokens JWT (access e refresh) no localStorage
- Opções de login social (Google, GitHub, Facebook) - em desenvolvimento
- Tratamento de erros com mensagens amigáveis
