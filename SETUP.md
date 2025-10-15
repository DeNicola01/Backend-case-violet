# Configuração do Sistema de Agricultores

## Pré-requisitos

- Node.js 18+ 
- Docker e Docker Compose
- Git

## Configuração Inicial

### 1. Instalar Dependências

Execute na raiz do projeto:
```bash
npm run install:all
```

### 2. Configurar MongoDB

Execute o MongoDB com Docker:
```bash
cd backend
docker-compose up -d
```

### 3. Configurar Frontend

Crie o arquivo de ambiente do frontend:
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3333" > .env.local
```

## Executando o Sistema

### Opção 1: Executar Tudo Junto
```bash
npm run dev
```

### Opção 2: Executar Separadamente

**Backend:**
```bash
npm run dev:backend
```

**Frontend:**
```bash
npm run dev:frontend
```

## URLs de Acesso

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3333
- **Documentação Swagger**: http://localhost:3333/api
- **MongoDB**: localhost:27017

## Estrutura do Projeto

```
├── backend/          # API NestJS
│   ├── src/
│   ├── package.json
│   └── docker-compose.yml
├── frontend/         # Interface Next.js
│   ├── src/
│   └── package.json
├── package.json      # Scripts principais
└── README.md
```

## Scripts Disponíveis

- `npm run dev` - Executa backend e frontend simultaneamente
- `npm run dev:backend` - Executa apenas o backend
- `npm run dev:frontend` - Executa apenas o frontend
- `npm run build` - Compila ambos os projetos
- `npm run install:all` - Instala dependências de ambos os projetos

## Funcionalidades

### Backend
- ✅ CRUD completo de agricultores
- ✅ Validação de CPF único e válido
- ✅ Regras de negócio implementadas
- ✅ Tratamento de erros
- ✅ Documentação Swagger

### Frontend
- ✅ Tabela responsiva de agricultores
- ✅ Menu de ações (editar, excluir, ativar/desativar)
- ✅ Modais de edição e confirmação
- ✅ Interface moderna

## Solução de Problemas

### Erro de Conexão com MongoDB
```bash
cd backend
docker-compose down
docker-compose up -d
```

### Erro de Porta em Uso
- Backend (3333): Pare outros serviços na porta 3333
- Frontend (3001): Pare outros serviços na porta 3001

### Erro de Dependências
```bash
npm run install:all
```

## Desenvolvimento

### Adicionando Novas Funcionalidades

1. **Backend**: Adicione Use Cases em `backend/src/farmers/application/use-cases/`
2. **Frontend**: Adicione componentes em `frontend/src/components/`

### Estrutura de Commits

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `refactor:` Refatoração
- `test:` Testes


