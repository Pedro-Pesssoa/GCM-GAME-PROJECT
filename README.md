# 🌳 QuizPlanet - Desafio ODS 15
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## 📑 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Tecnologias](#️-tecnologias-utilizadas)
- [Funcionalidades](#️-funcionalidades-principais)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação Rápida](#-instalação-rápida)
- [Instalação Passo-a-Passo](#-instalação-passo-a-passo)
- [Testando a Aplicação](#-testando-a-aplicação)
- [Solução de Problemas](#-solução-de-problemas)
- [Comandos Úteis](#-comandos-úteis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Documentação](#-documentação)

---

## 🎮 Sobre o Projeto

O **QuizPlanet** é um jogo educativo interativo focado nos **Objetivos de Desenvolvimento Sustentável (ODS)** da Organização das Nações Unidas (ONU), especificamente o **ODS 15 - Vida Terrestre**. 

O projeto combina aprendizado com uma mecânica de jogo envolvente onde:
- ✅ Cada acerto planta árvores e protege a floresta
- 🌲 Meta: Restaurar 100% da floresta através do conhecimento!

---

## 🎯 Objetivos

Este projeto foi desenvolvido como prática da disciplina de **Gerenciamento de Configuração e Mudança (GCM)** com foco em:

- 🌍 **Conscientização**: Promover conhecimento sobre o ODS 15 e sustentabilidade
- 🏗️ **Modularidade**: Arquitetura em camadas escalável e manutenível
- 🎯 **Gamificação**: Mecânicas envolventes para engajar o aprendizado
- 💻 **Boas Práticas**: Aplicação de padrões de desenvolvimento e versionamento

---

## 🛠️ Tecnologias Utilizadas

### Arquitetura Full-Stack

| Camada | Tecnologia | Frameworks/Bibliotecas | Descrição |
|--------|-----------|----------------------|-----------|
| **Frontend** | React 19.1.1 | React Icons, Axios | Interface dinâmica e responsiva |
| **Backend** | Python 3.8+ | Django 4.2, DRF | API REST e lógica de negócio |
| **Banco de Dados** | SQLite | Django ORM | Persistência de dados |
| **Autenticação** | JWT | SimpleJWT | Segurança e controle de acesso |

---

## ⚙️ Funcionalidades Principais

- 🔐 **Autenticação Segura**: Cadastro e login com JWT e senhas criptografadas
- 🌲 **Mecânica da Floresta**: Sistema de plantio/corte de árvores baseado em acertos
- 📊 **Sistema de Fases**: Progressão por fases com 3 perguntas cada
- 💾 **Progresso Persistente**: Salvamento automático no banco de dados
- 📝 **25 Perguntas**: Conteúdo educativo sobre biodiversidade e conservação
- 📈 **Estatísticas**: Acompanhamento de acertos, erros e taxa de sucesso
- 🎨 **Interface Responsiva**: Design adaptável para diferentes dispositivos

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatório
- **Node.js** v18+ → [Download](https://nodejs.org/)
- **Python** v3.8+ → [Download](https://www.python.org/downloads/)
- **Git** → [Download](https://git-scm.com/downloads)

### Opcional (Recomendado)
- **Visual Studio Code** → [Download](https://code.visualstudio.com/)
- **Postman** (testar API) → [Download](https://www.postman.com/downloads/)

### Verificar Instalação
```bash
node --version  # v18.0.0 ou superior
python --version  # Python 3.8 ou superior
git --version
```

---

## 🚀 Instalação Rápida

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/jeffersonbg/GCM-GAME-PROJECT.git
cd GCM-GAME-PROJECT
```

### 2️⃣ Execute o Script de Instalação

**Linux/macOS**:
```bash
bash install.sh
```

**Windows**:
```bash
install.bat
```

O script irá:
- ✅ Verificar pré-requisitos
- ✅ Instalar dependências do frontend (npm install)
- ✅ Criar ambiente virtual Python
- ✅ Instalar dependências do backend (pip install)
- ✅ Criar arquivo `.env` com configurações padrão
- ✅ Executar migrações do banco de dados
- ✅ Inserir 25 perguntas automaticamente

### 3️⃣ Inicie os Servidores

**Terminal 1 - Backend**:
```bash
cd backend
source venv/bin/activate  # Linux/macOS
# OU
.\venv\Scripts\activate  # Windows

python manage.py runserver
```

**Terminal 2 - Frontend**:
```bash
npm start
```

🎉 **Pronto!** Acesse http://localhost:3000

---

## 📖 Instalação Passo-a-Passo

### 🐍 Backend (Python/Django)

#### 1. Navegue para o backend
```bash
cd backend
```

#### 2. Crie o ambiente virtual

**Windows**:
```bash
python -m venv venv
```

**Linux/macOS**:
```bash
python3 -m venv venv
```

#### 3. Ative o ambiente virtual

**Windows (PowerShell)**:
```bash
.\venv\Scripts\Activate.ps1
```

**Windows (CMD)**:
```bash
.\venv\Scripts\activate.bat
```

**Linux/macOS**:
```bash
source venv/bin/activate
```

> 💡 Quando ativo, você verá `(venv)` no início da linha de comando

#### 4. Instale as dependências
```bash
pip install -r requirements.txt
```

#### 5. Configure o arquivo .env

**Se usou o script de instalação**, o arquivo `.env` já foi criado automaticamente.

**Se está instalando manualmente**:
```bash
# Copie o arquivo de exemplo
cp .env.example .env  # Linux/macOS
copy .env.example .env  # Windows
```

O arquivo `.env` contém:
- `SECRET_KEY`: Chave secreta do Django (já configurada para desenvolvimento)
- `DEBUG`: Modo debug (True para desenvolvimento)
- `USE_POSTGRESQL`: Define se usa PostgreSQL (False = SQLite por padrão)

> ✨ **Banco de Dados**: Por padrão o projeto usa **SQLite** (sem configuração necessária)
> ⚠️ **Produção**: Gere uma SECRET_KEY única em https://djecrety.ir/

#### 6. Configure o banco de dados
```bash
python manage.py makemigrations
python manage.py migrate
```

> ✨ **As 25 perguntas são inseridas automaticamente durante o migrate!**

#### 7. (Opcional) Crie um superusuário
```bash
python manage.py createsuperuser
```

#### 8. Inicie o servidor
```bash
python manage.py runserver
```

✅ Backend rodando em: **http://localhost:8000**  
✅ Admin Django: **http://localhost:8000/admin**

---

### ⚛️ Frontend (React)

#### 1. Abra um NOVO terminal
> ⚠️ Mantenha o backend rodando!

#### 2. Volte para a raiz do projeto
```bash
cd GCM-GAME-PROJECT
```

#### 3. Verifique as versões
```bash
node --version  # v18+
npm --version   # v9+
```

#### 4. Instale as dependências
```bash
npm install
```

Este comando:
- 📦 Lê o `package.json`
- 📥 Baixa todas as dependências
- 📁 Cria a pasta `node_modules`
- 🔒 Gera o `package-lock.json`

⏱️ Tempo estimado: 2-5 minutos

#### 5. Inicie o servidor
```bash
npm start
```

✅ Frontend em: **http://localhost:3000**

---

## 🧪 Testando a Aplicação

### Verifique os Servidores

Você deve ter **2 terminais ativos**:

**Terminal 1 - Backend**:
```
(venv) backend> python manage.py runserver
Starting development server at http://127.0.0.1:8000/
```

**Terminal 2 - Frontend**:
```
Compiled successfully!
You can now view ods-game in the browser.
  Local:            http://localhost:3000
```

### Teste a Aplicação

1. Acesse http://localhost:3000
2. Crie uma conta (cadastro)
3. Faça login
4. Inicie um novo jogo
5. Responda as perguntas
6. Acompanhe o progresso da floresta

🎉 **Tudo funcionando? Você está pronto!**

---

## 🔧 Solução de Problemas

### ❌ "npm: command not found"

**Causa**: Node.js não instalado ou não está no PATH

**Solução**:
1. Instale o Node.js: https://nodejs.org/
2. Reinicie o terminal
3. Verifique: `node --version`

---

### ❌ "module not found" (React)

**Causa**: Dependências não instaladas corretamente

**Solução**:
```bash
# Limpe o cache
rm -rf node_modules package-lock.json  # Linux/macOS
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstale
npm install
```

---

### ❌ "Port 3000 already in use"

**Causa**: Outra aplicação usando a porta 3000

**Solução 1 - Feche a outra aplicação**

**Solução 2 - Use outra porta**:
```bash
PORT=3001 npm start  # Linux/macOS
set PORT=3001 && npm start  # Windows
```

---

### ❌ "python: command not found" (Linux/macOS)

**Solução**: Use `python3`:
```bash
python3 -m venv venv
python3 manage.py runserver
```

---

### ❌ Erro de CORS

**Causa**: Frontend não conecta ao backend

**Solução**: Verifique em `backend/core/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

---

### ❌ "SECRET_KEY not found" ou "DB_NAME not found"

**Causa**: Arquivo `.env` não existe ou está configurado incorretamente

**Solução**:
```bash
cd backend

# Crie o arquivo .env a partir do exemplo
copy .env.example .env  # Windows
cp .env.example .env    # Linux/macOS

# O arquivo .env padrão usa SQLite (sem necessidade de configurar DB)
# Conteúdo mínimo:
# DEBUG=True
# SECRET_KEY=django-insecure-dev-key-change-in-production-a8f7g9h2j4k6l8m0n2p4q6r8s0t2u4v6w8x0y2z4

# Execute as migrações novamente
python manage.py migrate
```

> 💡 **Dica**: O projeto usa SQLite por padrão. Só configure PostgreSQL se realmente precisar!

---

### ❌ "No module named 'django'"

**Causa**: Ambiente virtual não ativado

**Solução**:
```bash
cd backend
source venv/bin/activate  # Linux/macOS
.\venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

---

### ❌ "No such table: pergunta_pergunta"

**Causa**: Migrações não aplicadas

**Solução**:
```bash
cd backend
python manage.py migrate
```

---

### ❌ Nenhuma pergunta no jogo

**Verificação**:
```bash
python manage.py shell
>>> from pergunta.models import Pergunta
>>> Pergunta.objects.count()
25  # Deve retornar 25
>>> exit()
```

**Se retornar 0, rode novamente**:
```bash
python manage.py migrate pergunta zero
python manage.py migrate
```

---

## 📚 Comandos Úteis

### Frontend (React)
```bash
npm install          # Instala dependências
npm start            # Inicia servidor dev
npm run build        # Build de produção
npm test             # Executa testes
npm update           # Atualiza dependências
```

### Backend (Django)
```bash
pip install -r requirements.txt     # Instala dependências
python manage.py runserver          # Inicia servidor
python manage.py makemigrations     # Cria migrações
python manage.py migrate            # Aplica migrações
python manage.py createsuperuser    # Cria admin
python manage.py test               # Executa testes
python manage.py shell              # Shell interativo
```

### Limpeza e Reset
```bash
# Limpar banco de dados
rm backend/db.sqlite3
python manage.py migrate

# Limpar cache do npm
rm -rf node_modules package-lock.json
npm install

# Resetar progresso do usuário (via API)
# POST http://localhost:8000/api/progresso/resetar/
```

---

## 📂 Estrutura do Projeto

```
GCM-GAME-PROJECT/
├── 📁 backend/                      # Backend Django
│   ├── 📁 venv/                     # Ambiente virtual (ignorado)
│   ├── 📄 manage.py                 # CLI do Django
│   ├── 📄 requirements.txt          # Dependências Python
│   ├── 📄 .env                      # Configurações (ignorado) ⚠️
│   ├── 📄 .env.example              # Modelo de configurações
│   ├── 📄 db.sqlite3                # Banco de dados (gerado)
│   ├── 📁 accounts/                 # App de autenticação
│   ├── 📁 pergunta/                 # App de perguntas
│   │   └── 📁 migrations/
│   │       └── 0003_popular_perguntas.py  # ✨ Insere perguntas
│   ├── 📁 progresso/                # App de progresso
│   └── 📁 core/                     # Configurações Django
│
├── 📁 src/                          # Frontend React
│   ├── 📁 components/               # Componentes React
│   │   ├── Header.jsx
│   │   ├── Introducao.jsx
│   │   ├── MenuGame.jsx
│   │   ├── Fases.jsx
│   │   ├── QuizDaFase.jsx
│   │   ├── FeedbackResposta.jsx
│   │   ├── Floresta.jsx
│   │   ├── GameOver.jsx
│   │   ├── FormularioLogin.jsx
│   │   ├── FormularioCadastro.jsx
│   │   └── CardDev.jsx
│   ├── 📁 assets/                   # Imagens e fontes
│   ├── 📄 api.js                    # Integração com backend
│   └── 📄 App.js                    # Componente principal
│
├── 📁 public/                       # Arquivos públicos
├── 📁 node_modules/                 # Dependências Node (ignorado)
├── 📁 Documentacao/                 # Docs dos componentes
├── 📄 package.json                  # Dependências do projeto
├── 📄 package-lock.json             # Lock de versões
├── 📄 .gitignore                    # Arquivos ignorados
├── 📄 install.sh                    # Script instalação Linux/macOS
├── 📄 install.bat                   # Script instalação Windows
├── 📄 CHECKLIST.md                  # Checklist pós-instalação
└── 📄 README.md                     # Este arquivo
```

---

## 💡 Dicas Importantes

1. ✅ **Sempre ative o ambiente virtual** antes de trabalhar no backend
2. ✅ **Mantenha 2 terminais abertos**: backend + frontend
3. ✅ **Não comite** `node_modules/`, `venv/`, `db.sqlite3` ou `.env`
4. ✅ **Execute `npm install`** após fazer pull de novas mudanças
5. ✅ **Execute migrações** após atualizar models do Django
6. ✅ **Consulte o CHECKLIST.md** para verificação pós-instalação
7. ✅ **Arquivo `.env` é criado automaticamente** pelos scripts de instalação

---

## 📦 Dependências

### Frontend (package.json)
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-icons": "^5.5.0",
  "axios": "^1.13.2",
  "react-scripts": "5.0.1"
}
```

### Backend (requirements.txt)
- Django >= 4.2.0
- djangorestframework
- django-cors-headers
- djangorestframework-simplejwt

### Atualizar Dependências
```bash
# Frontend
npm update

# Backend
pip install --upgrade -r requirements.txt
```

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! 

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Reportar Bugs

Encontrou um bug? [Abra uma issue](https://github.com/jeffersonbg/GCM-GAME-PROJECT/issues) com:
- Descrição do problema
- Passos para reproduzir
- Comportamento esperado
- Screenshots (se aplicável)

---

## 📄 Licença

Este projeto está sob a licença **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Contribuidores

| Desenvolvedor | Área | GitHub |
|--------------|------|--------|
| **Jefferson Bezerra da Gama** | Frontend | [@jeffersonbg](https://github.com/jeffersonbg) |
| **Pedro Henrique Souza Pessoa** | Backend | [@Pedro-Pesssoa](https://github.com/Pedro-Pesssoa) |
| **Thiago Luan Moreira Sousa** | Frontend | [@thiagoluann](https://github.com/thiagoluann) |

---

## 🔗 Documentação

### Documentação do Projeto
- 📖 [Artigo](https://drive.google.com/file/d/1fGxIGSKp6kLdH702CRtlAZQq0yfDs3b2/view?usp=sharing)
- 📋 [Requisitos do Jogo](https://docs.google.com/document/d/1lUXlBRyqNz9rVae9b8zsJsYV0vEYcgdMuAr1WiOTskY/edit?tab=t.0)
- 🏗️ [Diagrama de Classes](https://docs.google.com/document/d/1yWixvAzlnHq2CHt0LwuWt3nCclA4Jcqk7iz9Stoy9oI/edit?tab=t.0)
- 👤 [Diagrama de Caso de Uso](https://docs.google.com/document/d/1N6QFBOHwAw0s4N8kH5zivTLoxWTyY_rW6iF1yUaWBU8/edit?tab=t.0)
- 🧪 [Plano de Testes](https://docs.google.com/document/d/1eKKqIHF77yxDSQ3RtKv5W5tHM_5xKljXWdFKDcMkQog/edit?usp=sharing)
- ✅ [Casos de Teste](https://docs.google.com/document/d/1o3us2Y70kHfacvwnVPKKwn8vnCYAGLcyksNvyp1t9uE/edit?tab=t.0)
- 📊 [Análise SonarQube](https://sonarcloud.io/summary/overall?id=Pedro-Pesssoa_GCM-GAME-PROJECT&branch=main)

### Documentação Técnica
- 📚 [Documentação dos Componentes](Documentacao/)
- 🔧 [Backend README](backend/README.md)
- ✔️ [Checklist de Instalação](CHECKLIST.md)

---

## 🆘 Precisa de Ajuda?

- 💬 [Abra uma Issue](https://github.com/jeffersonbg/GCM-GAME-PROJECT/issues)
- 📧 Entre em contato com os [contribuidores](#-contribuidores)
- 📖 Consulte a [documentação completa](#-documentação)

---

<div align="center">

**Desenvolvido com ❤️ para a disciplina de Gerenciamento de Configuração e Mudança**

[⬆ Voltar ao topo](#-quizplanet---desafio-ods-15)

</div>
