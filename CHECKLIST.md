# ✅ Checklist de Verificação Pós-Instalação

Use este checklist para garantir que tudo foi instalado corretamente.

## 📋 Pré-requisitos Instalados

- [ ] Node.js (v18+) instalado - `node --version`
- [ ] npm (v9+) instalado - `npm --version`
- [ ] Python (v3.8+) instalado - `python --version` ou `python3 --version`
- [ ] Git instalado - `git --version`

---

## 📦 Dependências do Frontend

- [ ] Arquivo `package.json` existe na raiz do projeto
- [ ] Pasta `node_modules` foi criada após `npm install`
- [ ] Arquivo `package-lock.json` foi criado
- [ ] Não há erros ao executar `npm install`

**Verificação**:
```bash
# Deve listar todas as dependências instaladas
npm list --depth=0
```

Dependências esperadas:
- [ ] react (19.1.1)
- [ ] react-dom (19.1.1)
- [ ] react-icons (5.5.0)
- [ ] axios (1.13.2)
- [ ] react-scripts (5.0.1)

---

## 🐍 Dependências do Backend

- [ ] Ambiente virtual `venv` foi criado em `backend/`
- [ ] Ambiente virtual foi ativado (aparece `(venv)` no terminal)
- [ ] Arquivo `requirements.txt` existe em `backend/`
- [ ] Todas as dependências foram instaladas com `pip install -r requirements.txt`

**Verificação**:
```bash
cd backend
source venv/bin/activate  # Linux/macOS
# OU
.\venv\Scripts\activate   # Windows

pip list
```

Dependências esperadas:
- [ ] Django
- [ ] djangorestframework
- [ ] django-cors-headers
- [ ] Outras dependências listadas em requirements.txt

---

## 🗄️ Banco de Dados

- [ ] Migrações foram criadas: `python manage.py makemigrations`
- [ ] Migrações foram aplicadas: `python manage.py migrate`
- [ ] Arquivo `db.sqlite3` existe em `backend/`
- [ ] ✨ Perguntas foram inseridas automaticamente (25 perguntas via migration)

**Verificação**:
```bash
cd backend
python manage.py showmigrations
```

Todos os apps devem mostrar `[X]` nas migrações, incluindo:
- `pergunta.0003_popular_perguntas` ✓ (insere as 25 perguntas automaticamente)

**Verificar se perguntas existem**:
```bash
python manage.py shell
>>> from pergunta.models import Pergunta
>>> Pergunta.objects.count()
25
>>> exit()
```

---

## 🚀 Servidores Funcionando

### Backend
- [ ] Servidor Django inicia sem erros
- [ ] Acesso a http://localhost:8000 funciona
- [ ] Acesso a http://localhost:8000/admin funciona
- [ ] API responde em http://localhost:8000/api/

**Comando**:
```bash
cd backend
source venv/bin/activate  # Linux/macOS
python manage.py runserver
```

**Mensagem esperada**:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Frontend
- [ ] Servidor React inicia sem erros
- [ ] Navegador abre automaticamente em http://localhost:3000
- [ ] Página inicial carrega sem erros no console
- [ ] Não há erros de módulos faltando

**Comando**:
```bash
npm start
```

**Mensagem esperada**:
```
Compiled successfully!
You can now view ods-game in the browser.
```

---

## 🔗 Integração Frontend ↔ Backend

- [ ] Frontend consegue fazer requisições ao backend
- [ ] Não há erros de CORS no console do navegador
- [ ] Login/Cadastro funciona (se testado)
- [ ] Perguntas são carregadas do backend

**Teste**:
1. Acesse http://localhost:3000
2. Abra o Console do navegador (F12)
3. Tente fazer login/cadastro
4. Verifique se não há erros de rede

---

## 🎮 Funcionalidades do Jogo

- [ ] Tela de login é exibida
- [ ] Cadastro de novo usuário funciona
- [ ] Login com credenciais funciona
- [ ] Menu do jogo é exibido após login
- [ ] Novo jogo pode ser iniciado
- [ ] Tela de introdução aparece
- [ ] Floresta é exibida com árvores
- [ ] Fases são listadas
- [ ] Quiz da fase funciona
- [ ] Perguntas são exibidas
- [ ] Feedback de resposta funciona
- [ ] Pontuação é atualizada
- [ ] Tela de game over aparece ao concluir fase

---

## 📁 Estrutura de Arquivos

Verifique se os seguintes arquivos/pastas existem:

### Raiz do Projeto
- [ ] `package.json`
- [ ] `package-lock.json` (após npm install)
- [ ] `node_modules/` (após npm install)
- [ ] `.gitignore`
- [ ] `README.md`
- [ ] `SETUP.md`
- [ ] `install.sh` (Linux/macOS)
- [ ] `install.bat` (Windows)

### Frontend
- [ ] `src/`
- [ ] `src/components/`
- [ ] `src/App.js`
- [ ] `src/api.js`
- [ ] `public/`

### Backend
- [ ] `backend/venv/` (após criar ambiente virtual)
- [ ] `backend/requirements.txt`
- [ ] `backend/manage.py`
- [ ] `backend/db.sqlite3` (após migrate)
- [ ] `backend/accounts/`
- [ ] `backend/pergunta/`
- [ ] `backend/progresso/`
- [ ] `backend/core/`

---

## 🧪 Testes (Opcional)

### Frontend
```bash
npm test
```
- [ ] Testes executam sem erros

### Backend
```bash
cd backend
python manage.py test
```
- [ ] Testes executam sem erros

---

## 🔍 Verificação de Erros Comuns

### ❌ "Module not found"
- [ ] Executou `npm install` na raiz do projeto?
- [ ] Executou `pip install -r requirements.txt` no backend?
- [ ] Ambiente virtual está ativado?

### ❌ "Port already in use"
- [ ] Fechou outras instâncias do servidor?
- [ ] Tentou outra porta? `PORT=3001 npm start`

### ❌ CORS errors
- [ ] Backend está rodando?
- [ ] Backend está em http://localhost:8000?
- [ ] Verificou configurações de CORS em `backend/core/settings.py`?

### ❌ Database errors
- [ ] Executou as migrações?
- [ ] Banco de dados existe?
- [ ] Arquivo `db.sqlite3` tem permissões corretas?

---

## 📊 Resumo Final

Marque todos os itens acima. Se tudo estiver ✅, sua instalação está completa!

**Total de checks**: ___ de 50+

Se houver problemas, consulte:
- 📘 [SETUP.md](SETUP.md) - Guia detalhado
- 🔧 [README.md](README.md) - Seção de troubleshooting
- 🆘 [Issues do GitHub](https://github.com/jeffersonbg/GCM-GAME-PROJECT/issues)

---

**Última atualização**: Novembro 2025
