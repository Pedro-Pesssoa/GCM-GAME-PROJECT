# 🔧 Correção: Erro "SECRET_KEY not found"

## 📋 Problema Identificado

Durante a instalação em uma nova máquina, o projeto estava falhando com o erro:

```
decouple.UndefinedValueError: SECRET_KEY not found. 
Declare it as envvar or define a default value.
```

**Causa**: O projeto usa `python-decouple` para gerenciar configurações sensíveis através de um arquivo `.env`, mas este arquivo não estava sendo criado automaticamente durante a instalação.

---

## ✅ Solução Implementada

### 1. Arquivo `.env.example` Criado
- Template com todas as configurações necessárias
- Valores padrão seguros para desenvolvimento
- Documentação inline sobre cada variável

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

# Configurações do PostgreSQL (opcional - SQLite por padrão)
# DB_NAME=quizplanet
# DB_USER=postgres
# DB_PASSWORD=sua_senha_aqui
# DB_HOST=localhost
# DB_PORT=5432
```

---

## ⚠️ Importante

1. **Desenvolvimento**: O `.env` criado automaticamente contém valores seguros para desenvolvimento local
2. **Produção**: Gere uma `SECRET_KEY` única em https://djecrety.ir/
3. **Segurança**: O arquivo `.env` está no `.gitignore` e **nunca** será comitado
4. **Banco de Dados**: Por padrão usa SQLite (`db.sqlite3`). Configure PostgreSQL se necessário

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
- ✅ `install.bat` → Atualizado (cria .env)
- ✅ `install.sh` → Atualizado (cria .env)
- ✅ `README.md` → Atualizado (documentação .env)
- ✅ `backend/README.md` → Atualizado (seção configuração)
- ✅ `CHECKLIST.md` → Atualizado (verificação .env)

---

**Data**: 1 de dezembro de 2025
**Status**: ✅ Resolvido
