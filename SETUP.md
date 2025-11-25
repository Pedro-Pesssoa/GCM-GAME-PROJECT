# 🚀 Guia Completo de Instalação - QuizPlanet

Este guia fornece instruções detalhadas para configurar o projeto em uma nova máquina.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatório
- **Node.js** (v18 ou superior): [Download](https://nodejs.org/)
- **Python** (v3.8 ou superior): [Download](https://www.python.org/downloads/)
- **Git**: [Download](https://git-scm.com/downloads)

### Opcional (Recomendado)
- **Visual Studio Code**: [Download](https://code.visualstudio.com/)
- **Postman** (para testar a API): [Download](https://www.postman.com/downloads/)

---

## 📥 1. Clone o Repositório

```bash
git clone https://github.com/jeffersonbg/GCM-GAME-PROJECT.git
cd GCM-GAME-PROJECT
```

---

## 🐍 2. Configuração do Backend (Python/Django)

### 2.1. Navegue para a pasta do backend
```bash
cd backend
```

### 2.2. Crie o ambiente virtual

**Windows (PowerShell/CMD)**:
```bash
python -m venv venv
```

**Linux/macOS**:
```bash
python3 -m venv venv
```

### 2.3. Ative o ambiente virtual

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

> 💡 **Dica**: Você saberá que o ambiente está ativo quando ver `(venv)` no início da linha de comando.

### 2.4. Instale as dependências Python
```bash
pip install -r requirements.txt
```

### 2.5. Configure o banco de dados
```bash
python manage.py makemigrations
python manage.py migrate
```

> 💡 **Importante**: As 25 perguntas do quiz serão inseridas **automaticamente** durante o `migrate`!

### 2.6. (Opcional) Crie um superusuário
```bash
python manage.py createsuperuser
```

### 2.7. Inicie o servidor Django
```bash
python manage.py runserver
```

✅ O backend estará rodando em: **http://localhost:8000**

Para acessar o admin Django: **http://localhost:8000/admin**

---

## ⚛️ 3. Configuração do Frontend (React)

### 3.1. Abra um NOVO terminal (mantenha o backend rodando)

### 3.2. Navegue para a raiz do projeto
```bash
cd GCM-GAME-PROJECT
```
> ⚠️ **Atenção**: Saia da pasta `backend` antes de executar os comandos npm!

### 3.3. Verifique as versões do Node e npm
```bash
node --version
npm --version
```

Versões recomendadas:
- Node.js: v18 ou superior
- npm: v9 ou superior

### 3.4. Instale as dependências do Node.js
```bash
npm install
```

Este comando irá:
- Ler o arquivo `package.json`
- Baixar e instalar todas as dependências listadas
- Criar a pasta `node_modules` (não versionada no Git)
- Criar o arquivo `package-lock.json` (trava as versões)

⏱️ **Tempo estimado**: 2-5 minutos dependendo da conexão

### 3.5. Inicie o servidor de desenvolvimento
```bash
npm start
```

✅ O frontend abrirá automaticamente em: **http://localhost:3000**

---

## 🧪 4. Testando a Aplicação

### 4.1. Verifique se ambos servidores estão rodando

Você deve ter **2 terminais abertos**:

1. **Terminal 1 (Backend)**: 
   ```
   (venv) backend> python manage.py runserver
   ✓ Django rodando em http://localhost:8000
   ```

2. **Terminal 2 (Frontend)**:
   ```
   frontend> npm start
   ✓ React rodando em http://localhost:3000
   ```

### 4.2. Teste a conexão

1. Abra o navegador em: http://localhost:3000
2. Tente fazer cadastro/login
3. Se funcionar, está tudo certo! 🎉

---

## 🔧 5. Solução de Problemas

### ❌ Erro: "npm: command not found"
**Causa**: Node.js não está instalado ou não está no PATH.

**Solução**:
1. Instale o Node.js: https://nodejs.org/
2. Reinicie o terminal após a instalação
3. Verifique: `node --version`

---

### ❌ Erro: "module not found" no React
**Causa**: Dependências não foram instaladas corretamente.

**Solução**:
```bash
# Remova node_modules e package-lock.json
rm -rf node_modules package-lock.json  # Linux/macOS
# OU
rmdir /s node_modules  # Windows CMD
del package-lock.json  # Windows CMD

# Reinstale
npm install
```

---

### ❌ Erro: "Port 3000 already in use"
**Causa**: Outra aplicação está usando a porta 3000.

**Solução**:
1. Feche a aplicação que está usando a porta
2. **OU** execute em outra porta:
   ```bash
   PORT=3001 npm start  # Linux/macOS
   set PORT=3001 && npm start  # Windows CMD
   ```

---

### ❌ Erro: "python: command not found" (macOS/Linux)
**Solução**: Use `python3` ao invés de `python`:
```bash
python3 -m venv venv
python3 manage.py runserver
```

---

### ❌ Erro de CORS no navegador
**Causa**: Frontend não consegue se conectar ao backend.

**Solução**:
1. Verifique se o backend está rodando em http://localhost:8000
2. Verifique o arquivo `backend/core/settings.py`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
   ]
   ```

---

### ❌ Erro: "No module named 'django'"
**Causa**: Ambiente virtual não está ativado ou dependências não foram instaladas.

**Solução**:
```bash
# 1. Ative o ambiente virtual
cd backend
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/macOS

# 2. Instale as dependências
pip install -r requirements.txt
```

---

## 📚 6. Comandos Úteis

### Frontend (React)
```bash
npm install          # Instala dependências
npm start            # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
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
```

---

## 📂 7. Estrutura do Projeto

```
GCM-GAME-PROJECT/
├── backend/                 # Backend Django
│   ├── venv/               # Ambiente virtual (não versionado)
│   ├── manage.py           # Gerenciador Django
│   ├── requirements.txt    # Dependências Python
│   ├── accounts/           # App de autenticação
│   ├── pergunta/           # App de perguntas
│   ├── progresso/          # App de progresso
│   └── core/               # Configurações Django
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── assets/             # Imagens e fontes
│   └── App.js              # Componente principal
├── public/                 # Arquivos públicos
├── node_modules/           # Dependências Node (não versionado)
├── package.json            # Dependências do projeto
├── package-lock.json       # Lock de versões (gerado)
└── README.md               # Documentação principal
```

---

## 🎯 8. Próximos Passos

Após configurar o ambiente:

1. ✅ Leia o [README.md](README.md) principal
2. ✅ Explore a documentação dos componentes em `/Documentacao`
3. ✅ Teste todas as funcionalidades do jogo
4. ✅ Verifique o [Plano de Testes](https://docs.google.com/document/d/1eKKqIHF77yxDSQ3RtKv5W5tHM_5xKljXWdFKDcMkQog/edit?usp=sharing)

---

## 💡 Dicas Importantes

1. **Sempre ative o ambiente virtual** antes de trabalhar no backend
2. **Mantenha 2 terminais abertos**: um para backend, outro para frontend
3. **Não comite node_modules ou venv**: estão no .gitignore
4. **Use npm install** após fazer pull de novas mudanças
5. **Execute migrações** após atualizar os models do Django

---

## 🆘 Precisa de Ajuda?

- 📧 Abra uma [Issue no GitHub](https://github.com/jeffersonbg/GCM-GAME-PROJECT/issues)
- 📖 Consulte a [Documentação](https://github.com/jeffersonbg/GCM-GAME-PROJECT#-documenta%C3%A7%C3%A3o)
- 👥 Entre em contato com os [Contribuidores](https://github.com/jeffersonbg/GCM-GAME-PROJECT#-contribuidores)

---

**Desenvolvido com ❤️ para a disciplina de GCM**
