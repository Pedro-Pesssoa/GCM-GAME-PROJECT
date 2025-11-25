# GCM GAME PROJECT
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### Indice
- [QuizPlanet](#-quizplanet-desafio-ods)
- [Objetivos do projeto](#-objetivos-do-projeto)
- [Tecnologias utilizadas](#-como-executar-o-projeto)
- [Funcionalidades principais](#️-funcionalidades-principais)
- [Como executar o projeto](#-como-executar-o-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contribuidores](#-contribuidores)
- [Documentação](#-documentação)


---

### 🌳 QuizPlanet: Desafio ODS

O QuizPlanet é um jogo educativo interativo focado nos Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU), especificamente o ODS 15 (Vida Terrestre). O projeto combina aprendizado com uma mecânica de jogo envolvente de plantio e corte de árvores, onde cada acerto salva uma parte da floresta e cada erro a degrada.

---

### 🎯 Objetivos do Projeto

Este projeto foi desenvolvido como um projeto prático da disciplina de Gerenciamento de Configuração e Mudança (GCM) com os seguintes objetivos:

- **Conscientização**: Promover o conhecimento e a importância do ODS 15.

- **Modularidade**: Aplicar uma arquitetura em camadas para garantir a escalabilidade e a fácil manutenção do sistema.

- **Gamificação**: Utilizar mecânicas de jogo (plantio/corte de árvores) para engajar o usuário.

---

### 🛠️ Tecnologias Utilizadas

O projeto adota uma arquitetura full-stack moderna, com a seguinte separação de camadas:

| Camada                            | Tecnologia Principal | Frameworks/Bibliotecas  | Descrição                                                                                                     |
| --------------------------------- | -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| Apresentação (Frontend)           | React                | HTML, CSS, JavaScript   | Interface de usuário dinâmica, responsável por exibir as perguntas e interagir com o jogador.                 |
| Lógica e Acesso a Dados (Backend) | Python               | Django, Django ORM | Gerencia a lógica do jogo (pontuação, regras de árvores), validações de segurança, e a persistência de dados. |

---

### ⚙️ Funcionalidades Principais

O jogo implementa os seguintes Requisitos Funcionais (RFs) essenciais:

- **Cadastro e Login**: Os usuários podem se cadastrar e fazer login com segurança (senhas armazenadas criptografadas com bcrypt, e dados trafegando via HTTPS).

- **Mecânica da Floresta**: A cada 3 acertos consecutivos, uma árvore é plantada. A cada erro, uma árvore é cortada. O jogo termina se as árvores chegarem a zero (Derrota) ou se a meta for atingida (Vitória).

- **Perguntas Dinâmicas**: Apresentação de perguntas em formato de múltipla escolha ou Verdadeiro/Falso, focadas no ODS 15 (Vida Terrestre).

- **Persistência de Progresso**: O progresso do jogador (contagem de árvores, acertos, fase atual) é salvo automaticamente no banco de dados e recuperado ao fazer login.

---

### 🚀 Como Executar o Projeto

> 📘 **Para instruções detalhadas passo-a-passo, consulte o [SETUP.md](SETUP.md)**

#### Instalação Rápida (Recomendado)

**Linux/macOS**:
```bash
bash install.sh
```

**Windows**:
```bash
install.bat
```

Esses scripts instalarão automaticamente todas as dependências do frontend e backend.

---

#### Instalação Manual

Para rodar o projeto localmente, siga os passos abaixo para configurar o backend (Python) e o frontend (React).

1. Configuração do Backend (Python/Django)

   1. Navegue para a pasta do Backend:

      ```bash
      cd backend/
      ```

   2. Crie e Ative o Ambiente Virtual:

      ```bash
      python -m venv venv
      ```

      **Linux/macOS**

      ```bash
      source venv/bin/activate
      ```

      **Windows**

      ```bash
      .\venv\Scripts\activate
      ```

   3. Instale as Dependências:
      ```bash
      pip install -r requirements.txt
      ```
   4. Execute as migrações e o servidor Django:
      ```bash
      python manage.py migrate
      python manage.py runserver
      ```
      
      > 💡 As perguntas do quiz são inseridas automaticamente durante o `migrate`!

   O backend estará disponível em http://localhost:8000


 2. Configuração do Frontend (React)
    1. Navegue para a raiz do projeto GCM-GAME-PROJECT:
        ```bash
        cd GCM-GAME-PROJECT
        ```

    2. Instale as dependências do Node.js:
        ```bash
        npm install
        ```
        
        **Observação**: Este comando lê o arquivo `package.json` e instala todas as dependências necessárias automaticamente, similar ao `pip install -r requirements.txt` do Python.

    3. Execute o servidor de desenvolvimento:
        ```bash
        npm start
        ```

        A aplicação React será aberta automaticamente no seu navegador, geralmente em http://localhost:3000.

---

### 🔧 Solução de Problemas Comuns

#### Frontend não inicia ou faltam dependências

Se ao executar `npm start` você receber erros sobre módulos faltando:

1. **Limpe o cache do npm e reinstale**:
   ```bash
   rm -rf node_modules package-lock.json  # Linux/macOS
   # OU
   rmdir /s node_modules & del package-lock.json  # Windows
   
   npm install
   ```

2. **Verifique a versão do Node.js**:
   ```bash
   node --version
   npm --version
   ```
   Recomendado: Node.js v18 ou superior

3. **Se houver erros de permissão (Linux/macOS)**:
   ```bash
   sudo npm install -g npm@latest
   ```

#### Backend não conecta ao banco de dados

1. Certifique-se de que as migrações foram aplicadas:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

2. Crie um superusuário para acessar o admin do Django:
   ```bash
   python manage.py createsuperuser
   ```

#### CORS - Problema de comunicação Frontend/Backend

Se o frontend não conseguir se comunicar com o backend, verifique:
- Backend rodando em `http://localhost:8000`
- Frontend rodando em `http://localhost:3000`
- Configurações de CORS no arquivo `backend/core/settings.py`

---

### 📦 Estrutura de Dependências

**Frontend (package.json)**:
- React 19.1.1
- React Icons 5.5.0
- Axios 1.13.2
- Testing Library

**Backend (requirements.txt)**:
- Django
- Django REST Framework
- Django CORS Headers
- Outras dependências Python

Para atualizar dependências:
```bash
# Frontend
npm update

# Backend
pip install --upgrade -r requirements.txt
```


---

### 🤝 Contribuição
Contribuições são bem-vindas! Se você encontrou um bug ou tem uma sugestão de melhoria, sinta-se à vontade para abrir uma Issue ou enviar um Pull Request.

---

### 📄 Licença
Este projeto está sob a licença [ MIT License ](https://github.com/jeffersonbg/GCM-GAME-PROJECT?tab=MIT-1-ov-file).

---

### 🤝 Contribuidores 

- Jefferson Bezerra da Gama (Front-end) 
    - https://github.com/jeffersonbg

- Pedro Henrique Souza Pessoa (Back-end)
    - https://github.com/Pedro-Pesssoa

- Thiago Luan Moreira Sousa (Front-end)
    - https://github.com/thiagoluann


---

### 🔗 Documentação
- [Requisitos do jogo](https://docs.google.com/document/d/1lUXlBRyqNz9rVae9b8zsJsYV0vEYcgdMuAr1WiOTskY/edit?tab=t.0)
- [Diagrama de classe](https://docs.google.com/document/d/1yWixvAzlnHq2CHt0LwuWt3nCclA4Jcqk7iz9Stoy9oI/edit?tab=t.0)
- [Diagrama de caso de uso](https://docs.google.com/document/d/1N6QFBOHwAw0s4N8kH5zivTLoxWTyY_rW6iF1yUaWBU8/edit?tab=t.0)
- [Plano de teste](https://docs.google.com/document/d/1eKKqIHF77yxDSQ3RtKv5W5tHM_5xKljXWdFKDcMkQog/edit?usp=sharing)
- [Caso de teste](https://docs.google.com/document/d/1o3us2Y70kHfacvwnVPKKwn8vnCYAGLcyksNvyp1t9uE/edit?tab=t.0)
- [SonarQube](https://sonarcloud.io/summary/overall?id=Pedro-Pesssoa_GCM-GAME-PROJECT&branch=main)
