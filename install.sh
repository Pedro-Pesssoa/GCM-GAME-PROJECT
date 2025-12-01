#!/bin/bash
# Script de instalação automática para Linux/macOS
# Execute com: bash install.sh

echo "======================================"
echo "🌳 QuizPlanet - Instalação Automática"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica Node.js
echo "🔍 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado!${NC}"
    echo "📥 Instale em: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version) encontrado${NC}"

# Verifica Python
echo "🔍 Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 não encontrado!${NC}"
    echo "📥 Instale em: https://www.python.org/downloads/"
    exit 1
fi
echo -e "${GREEN}✅ Python $(python3 --version) encontrado${NC}"
echo ""

# Instalação do Frontend
echo "======================================"
echo "⚛️  Instalando Frontend (React)"
echo "======================================"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend instalado com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro ao instalar frontend${NC}"
    exit 1
fi
echo ""

# Instalação do Backend
echo "======================================"
echo "🐍 Instalando Backend (Django)"
echo "======================================"
cd backend

# Cria ambiente virtual
echo "📦 Criando ambiente virtual..."
python3 -m venv venv
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Ambiente virtual criado${NC}"
else
    echo -e "${RED}❌ Erro ao criar ambiente virtual${NC}"
    exit 1
fi

# Ativa ambiente virtual
echo "🔌 Ativando ambiente virtual..."
source venv/bin/activate

# Instala dependências
echo "📥 Instalando dependências Python..."
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependências Python instaladas${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências Python${NC}"
    exit 1
fi

# Cria arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "📄 Criando arquivo .env..."
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado com configurações padrão${NC}"
else
    echo -e "${GREEN}✅ Arquivo .env já existe${NC}"
fi

# Executa migrações
echo "🗄️  Executando migrações do banco de dados..."
python manage.py makemigrations
python manage.py migrate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrações executadas com sucesso${NC}"
    echo -e "${GREEN}✅ Perguntas inseridas automaticamente via migration${NC}"
else
    echo -e "${RED}❌ Erro ao executar migrações${NC}"
    exit 1
fi

cd ..
echo ""
echo "======================================"
echo -e "${GREEN}🎉 Instalação concluída com sucesso!${NC}"
echo "======================================"
echo ""
echo "Para iniciar o projeto:"
echo ""
echo "1️⃣  Backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python manage.py runserver"
echo ""
echo "2️⃣  Frontend (Terminal 2):"
echo "   npm start"
echo ""
echo "======================================"
