# 🔧 Correção: Erro "SECRET_KEY not found"

## 📋 Problemas Identificados

### Problema 1: SECRET_KEY not found
Durante a instalação em uma nova máquina, o projeto estava falhando com o erro:

```
decouple.UndefinedValueError: SECRET_KEY not found. 
Declare it as envvar or define a default value.
```

**Causa**: O projeto usa `python-decouple` para gerenciar configurações sensíveis através de um arquivo `.env`, mas este arquivo não estava sendo criado automaticamente durante a instalação.

### Problema 2: DB_NAME not found
Após corrigir o problema da SECRET_KEY, surgia outro erro:

```
decouple.UndefinedValueError: DB_NAME not found.
Declare it as envvar or define a default value.
```

**Causa**: O `settings.py` estava configurado para **obrigatoriamente** usar PostgreSQL, exigindo variáveis de banco que não existiam no `.env` padrão.

---

## ✅ Soluções Implementadas

### 1. Arquivo `.env.example` Criado
- Template com todas as configurações necessárias
- Valores padrão seguros para desenvolvimento
- Documentação inline sobre cada variável
- Configuração de banco de dados comentada (SQLite por padrão)

### 1.1. Configuração do Banco de Dados no `settings.py`
- Alterado para usar **SQLite por padrão** (sem configuração necessária)
- PostgreSQL agora é **opcional** (ativado via `USE_POSTGRESQL=True`)
- Valores padrão para todas as variáveis de banco PostgreSQL
- Elimina erro "DB_NAME not found" em instalações novas

### 2. Scripts de Instalação Atualizados
- `install.bat` (Windows) agora copia `.env.example` para `.env` automaticamente
- `install.sh` (Linux/macOS) agora copia `.env.example` para `.env` automaticamente
- Verificação se o arquivo já existe antes de copiar

### 3. Documentação Atualizada
- `README.md`: Seção sobre configuração do `.env`
- `backend/README.md`: Explicação detalhada sobre variáveis de ambiente
- `CHECKLIST.md`: Verificação da existência do `.env`
- Nova seção de troubleshooting para erro "SECRET_KEY not found"

### 4. `.gitignore` Atualizado
- `.env` adicionado ao `.gitignore` (root e backend)
- Garantia de que configurações sensíveis não sejam versionadas

---

## 🚀 Como Usar (Nova Instalação)

### Instalação Automática (Recomendado)
```bash
# Windows
install.bat

# Linux/macOS
bash install.sh
```

O arquivo `.env` será criado automaticamente! ✨

### Instalação Manual
```bash
cd backend

# Copie o arquivo de exemplo
copy .env.example .env  # Windows
cp .env.example .env    # Linux/macOS

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações
python manage.py migrate
```

---

## 📄 Conteúdo do .env

```env
# Chave secreta do Django
SECRET_KEY=django-insecure-dev-key-change-in-production-a8f7g9h2j4k6l8m0n2p4q6r8s0t2u4v6w8x0y2z4

# Modo de debug
DEBUG=True

# Banco de Dados (SQLite por padrão - NÃO requer configuração)
# Para usar PostgreSQL, descomente:
# USE_POSTGRESQL=True
# DB_NAME=quizplanet
# DB_USER=postgres
# DB_PASSWORD=sua_senha_aqui
# DB_HOST=localhost
# DB_PORT=5432
```

### 🗄️ Banco de Dados Padrão: SQLite
- ✅ **Sem configuração necessária** no `.env`
- ✅ Arquivo único `db.sqlite3` criado automaticamente
- ✅ Ideal para desenvolvimento e testes
- ✅ Instalação mais rápida e simples

---

## ⚠️ Importante

1. **Desenvolvimento**: O `.env` criado automaticamente contém valores seguros para desenvolvimento local
2. **Produção**: Gere uma `SECRET_KEY` única em https://djecrety.ir/
3. **Segurança**: O arquivo `.env` está no `.gitignore` e **nunca** será comitado
4. **Banco de Dados**: 
   - ✅ **SQLite** é usado por padrão (sem configuração)
   - 🔧 **PostgreSQL** é opcional (configure `USE_POSTGRESQL=True` no `.env`)
   - 📦 Para PostgreSQL, instale: `pip install -r requirements-postgres.txt`
   - ⚡ `psycopg2-binary` removido das dependências obrigatórias

---

## 🧪 Testar a Correção

1. Baixe o projeto em uma nova pasta
2. Execute o script de instalação
3. Verifique se o arquivo `backend/.env` foi criado
4. Execute `python manage.py migrate` → Deve funcionar sem erros!

---

## 📂 Arquivos Modificados/Criados

- ✅ `backend/.env.example` → Criado (template)
- ✅ `backend/.env` → Atualizado (desenvolvimento)
- ✅ `backend/.gitignore` → Criado
- ✅ `backend/core/settings.py` → **Atualizado (SQLite por padrão)**
- ✅ `backend/requirements.txt` → **Atualizado (removido psycopg2-binary)**
- ✅ `backend/requirements-postgres.txt` → **Criado (dependências PostgreSQL)**
- ✅ `install.bat` → Atualizado (cria .env)
- ✅ `install.sh` → Atualizado (cria .env)
- ✅ `README.md` → Atualizado (documentação .env e banco)
- ✅ `backend/README.md` → Atualizado (seção configuração)
- ✅ `CHECKLIST.md` → Atualizado (verificação .env)
- ✅ `CORRECAO_SECRET_KEY.md` → Este arquivo (documentação)

---

**Data**: 1 de dezembro de 2025
**Status**: ✅ Resolvido
