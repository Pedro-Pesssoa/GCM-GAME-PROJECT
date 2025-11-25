# Backend - Django API

## 📁 Estrutura do Backend

```
backend/
├── manage.py                    # Gerenciador do Django
├── requirements.txt             # Dependências Python
├── populate_perguntas.py        # Script opcional para popular DB manualmente
├── pytest.ini                   # Configuração de testes
├── db.sqlite3                   # Banco de dados SQLite (criado após migrate)
├── venv/                        # Ambiente virtual (não versionado)
│
├── core/                        # Configurações principais do Django
│   ├── settings.py              # Configurações do projeto
│   ├── urls.py                  # URLs principais
│   ├── wsgi.py                  # Configuração WSGI
│   └── asgi.py                  # Configuração ASGI
│
├── accounts/                    # App de autenticação e usuários
│   ├── models/                  # Modelos de usuário customizados
│   ├── serializers/             # Serializers para API
│   ├── views/                   # Views da API
│   ├── urls.py                  # URLs do app
│   └── migrations/              # Migrações do banco
│
├── pergunta/                    # App de perguntas do quiz
│   ├── models.py                # Modelos: Pergunta, Alternativa
│   ├── serializers.py           # Serializers para API
│   ├── views.py                 # Views da API
│   ├── urls.py                  # URLs do app
│   ├── admin.py                 # Configuração do admin
│   └── migrations/              # Migrações do banco
│       ├── 0001_initial.py      # Cria tabelas
│       ├── 0002_alter_...py     # Ajustes nos models
│       └── 0003_popular_perguntas.py  # ✨ Insere 25 perguntas automaticamente
│
└── progresso/                   # App de progresso do jogador
    ├── models.py                # Modelo: Progresso
    ├── serializers.py           # Serializers para API
    ├── views.py                 # Views da API
    ├── urls.py                  # URLs do app
    └── migrations/              # Migrações do banco
```

---

## 🗄️ Banco de Dados

### Models Principais

#### 1. **Pergunta** (pergunta/models.py)
```python
class Pergunta:
    - id: ID único
    - texto: Enunciado da pergunta
    - resposta_correta_id: ID da alternativa correta ('a', 'b', 'c', 'd')
    - explicacao: Explicação da resposta correta
    - criado_em: Data de criação
    - atualizado_em: Data da última atualização
```

#### 2. **Alternativa** (pergunta/models.py)
```python
class Alternativa:
    - id: ID único
    - pergunta: ForeignKey para Pergunta
    - identificador: Letra da alternativa ('a', 'b', 'c', 'd')
    - texto: Texto da alternativa
```

#### 3. **Progresso** (progresso/models.py)
```python
class Progresso:
    - user: ForeignKey para User
    - total_acertos: Total de acertos do jogador
    - total_erros: Total de erros do jogador
    - arvores: Número de árvores plantadas
    - meta_arvores: Meta total de árvores (padrão: 25)
    - jogo_iniciado: Se o jogador já iniciou o jogo
    - fases_concluidas: JSON com fases concluídas e estatísticas
    - atualizado_em: Última atualização
```

---

## 🔄 Migrações Automáticas

### ✨ Inserção Automática de Perguntas

A migração `0003_popular_perguntas.py` insere **automaticamente** as 25 perguntas do quiz quando você executa:

```bash
python manage.py migrate
```

**Perguntas incluídas**:
- 25 perguntas sobre ODS 15 (Vida Terrestre)
- Cada pergunta tem 4 alternativas
- Incluem explicações educativas
- Cobertura de tópicos: florestas, biodiversidade, desertificação, conservação, etc.

**Você NÃO precisa**:
- Executar `populate_perguntas.py` manualmente
- Inserir perguntas via admin do Django
- Fazer nada além do `migrate`

### Verificar Perguntas no Banco

```bash
# Via Django Shell
python manage.py shell

>>> from pergunta.models import Pergunta
>>> Pergunta.objects.count()
25
>>> Pergunta.objects.first().texto
'Qual o principal objetivo do ODS 15?'
```

---

## 🚀 API Endpoints

### Autenticação
```
POST /api/accounts/register/          # Cadastro de usuário
POST /api/accounts/login/             # Login (retorna JWT tokens)
POST /api/accounts/token/refresh/     # Refresh token
```

### Perguntas
```
GET  /api/perguntas/                  # Lista todas as perguntas
GET  /api/perguntas/<id>/             # Detalhe de uma pergunta
```

### Progresso
```
GET  /api/progresso/                  # Progresso do usuário logado
POST /api/progresso/registrar-acerto/ # Registra acerto
POST /api/progresso/registrar-erro/   # Registra erro
POST /api/progresso/fase-concluida/   # Marca fase como concluída
POST /api/progresso/resetar/          # Reseta progresso
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` (opcional):

```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### CORS

O backend está configurado para aceitar requisições do frontend em:
- http://localhost:3000
- http://127.0.0.1:3000

Configurado em: `core/settings.py`

---

## 🧪 Testes

Execute os testes com:

```bash
# Todos os testes
python manage.py test

# Testes de um app específico
python manage.py test pergunta
python manage.py test accounts
python manage.py test progresso

# Com pytest (se instalado)
pytest
```

---

## 🔧 Comandos Úteis

### Gerenciamento do Banco

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Reverter última migração
python manage.py migrate <app_name> <migration_name>

# Ver status das migrações
python manage.py showmigrations

# Limpar banco e recriar
rm db.sqlite3
python manage.py migrate
```

### Admin Django

```bash
# Criar superusuário
python manage.py createsuperuser

# Acessar admin
# http://localhost:8000/admin
```

### Shell Interativo

```bash
# Django shell
python manage.py shell

# Django shell com IPython (se instalado)
python manage.py shell -i ipython
```

### Popular/Resetar Dados

```bash
# Popular perguntas manualmente (opcional, já é feito via migrate)
python populate_perguntas.py

# Limpar todas as perguntas
python manage.py shell
>>> from pergunta.models import Pergunta, Alternativa
>>> Alternativa.objects.all().delete()
>>> Pergunta.objects.all().delete()
>>> exit()

# Re-popular
python manage.py migrate pergunta zero  # Reverte migrações
python manage.py migrate                # Aplica novamente (re-insere perguntas)
```

---

## 📦 Dependências (requirements.txt)

```
Django>=4.2.0
djangorestframework
django-cors-headers
djangorestframework-simplejwt
```

Instale com:
```bash
pip install -r requirements.txt
```

---

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT (JSON Web Tokens)
- CORS configurado apenas para origens permitidas
- Secret key deve ser mantida em segredo (use .env)
- DEBUG=False em produção

---

## 🐛 Troubleshooting

### "No such table: pergunta_pergunta"
**Solução**: Execute as migrações
```bash
python manage.py migrate
```

### "Nenhuma pergunta encontrada"
**Solução**: Verifique se a migração 0003 foi aplicada
```bash
python manage.py showmigrations pergunta
# Deve mostrar [X] em 0003_popular_perguntas
```

### "CORS error" no frontend
**Solução**: Verifique `CORS_ALLOWED_ORIGINS` em `settings.py`

### "Secret key not found"
**Solução**: Django gera uma automaticamente, mas é recomendado usar .env

---

## 📚 Documentação Adicional

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [JWT Authentication](https://django-rest-framework-simplejwt.readthedocs.io/)

---

**Última atualização**: Novembro 2025
