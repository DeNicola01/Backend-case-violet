# Sistema de Gerenciamento de Agricultores

Sistema completo para gerenciamento de agricultores com backend em NestJS e frontend em Next.js.

## Estrutura do Projeto

```
├── backend/          # API NestJS com MongoDB
├── frontend/         # Interface Next.js
└── README.md         # Este arquivo
```

## Tecnologias

### Backend
- NestJS
- MongoDB com Mongoose
- TypeScript
- Clean Architecture + DDD
- Swagger para documentação

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Heroicons

## Funcionalidades

### Backend
- ✅ CRUD completo de agricultores
- ✅ Validação de CPF único e válido
- ✅ Regras de negócio (não permite excluir agricultor ativo)
- ✅ Arquitetura Clean + DDD
- ✅ Tratamento de erros com mensagens descritivas
- ✅ Documentação Swagger

### Frontend
- ✅ Tabela responsiva de agricultores
- ✅ Menu de ações (editar, excluir, ativar/desativar)
- ✅ Modais de edição e confirmação
- ✅ Validação de regras de negócio
- ✅ Interface moderna com Tailwind CSS

## Como Executar

### Backend

1. Navegue para a pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o MongoDB:
```bash
docker-compose up -d
```

4. Execute o backend:
```bash
npm run start:dev
```

O backend estará disponível em `http://localhost:3333`
Documentação Swagger: `http://localhost:3333/api`

### Frontend

1. Navegue para a pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
Crie um arquivo `.env.local` com:
```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

4. Execute o frontend:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3001`

## Regras de Negócio

1. **CPF Único**: Não pode haver dois agricultores com o mesmo CPF
2. **CPF Válido**: O CPF deve ser válido conforme algoritmo oficial
3. **Exclusão**: Só é possível excluir agricultores inativos
4. **Edição**: CPF não pode ser alterado após criação
5. **Status**: Agricultores podem ser ativados/desativados

## API Endpoints

### Agricultores
- `GET /farmers` - Lista todos os agricultores
- `GET /farmers/:id` - Busca agricultor por ID
- `GET /farmers/cpf/:cpf` - Busca agricultor por CPF
- `POST /farmers` - Cria novo agricultor
- `PATCH /farmers/:id` - Atualiza agricultor
- `DELETE /farmers/:id` - Exclui agricultor
- `PATCH /farmers/:id/activate` - Ativa agricultor
- `PATCH /farmers/:id/deactivate` - Desativa agricultor

## Arquitetura

### Backend (Clean Architecture + DDD)
```
src/
├── farmers/
│   ├── domain/           # Entidades, Value Objects, Serviços
│   ├── application/      # Use Cases
│   ├── infrastructure/   # Repositórios, Schemas
│   └── dto/             # Data Transfer Objects
└── common/              # Filtros, Utilitários
```

### Frontend (Component-Based)
```
src/
├── app/                 # Páginas Next.js
├── components/          # Componentes React
├── services/            # Comunicação com API
└── types/              # Tipos TypeScript
```

## Desenvolvimento

### Backend
- Use Cases para cada operação
- Repository Pattern para acesso a dados
- Domain Services para regras de negócio
- Value Objects para validações
- Tratamento global de exceções

### Frontend
- Componentes reutilizáveis
- Hooks para gerenciamento de estado
- Serviços para comunicação com API
- Modais para ações complexas
- Validação de formulários

## Próximas Funcionalidades

- [ ] Autenticação e autorização
- [ ] Filtros e busca avançada
- [ ] Paginação
- [ ] Exportação de dados
- [ ] Dashboard com estatísticas
- [ ] Notificações em tempo real


