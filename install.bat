@echo off
REM Script de instalacao automatica para Windows
REM Execute com: install.bat

echo ======================================
echo   QuizPlanet - Instalacao Automatica
echo ======================================
echo.

REM Verifica Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale em: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js encontrado
node --version

REM Verifica Python
echo Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Python nao encontrado!
    echo Instale em: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [OK] Python encontrado
python --version
echo.

REM Instalacao do Frontend
echo ======================================
echo   Instalando Frontend (React)
echo ======================================
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar frontend
    pause
    exit /b 1
)
echo [OK] Frontend instalado com sucesso!
echo.

REM Instalacao do Backend
echo ======================================
echo   Instalando Backend (Django)
echo ======================================
cd backend

REM Cria ambiente virtual
echo Criando ambiente virtual...
python -m venv venv
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao criar ambiente virtual
    pause
    exit /b 1
)
echo [OK] Ambiente virtual criado

REM Ativa ambiente virtual
echo Ativando ambiente virtual...
call venv\Scripts\activate.bat

REM Instala dependencias
echo Instalando dependencias Python...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias Python
    pause
    exit /b 1
)
echo [OK] Dependencias Python instaladas

REM Cria arquivo .env se nao existir
if not exist ".env" (
    echo Criando arquivo .env...
    copy .env.example .env >nul 2>&1
    echo [OK] Arquivo .env criado com configuracoes padrao
) else (
    echo [OK] Arquivo .env ja existe
)

REM Executa migracoes
echo Executando migracoes do banco de dados...
python manage.py makemigrations
python manage.py migrate
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao executar migracoes
    pause
    exit /b 1
)
echo [OK] Migracoes executadas com sucesso
echo [OK] Perguntas inseridas automaticamente via migration

cd ..
echo.
echo ======================================
echo   Instalacao concluida com sucesso!
echo ======================================
echo.
echo Para iniciar o projeto:
echo.
echo 1. Backend (Terminal 1):
echo    cd backend
echo    venv\Scripts\activate
echo    python manage.py runserver
echo.
echo 2. Frontend (Terminal 2):
echo    npm start
echo.
echo ======================================
pause
