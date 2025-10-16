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


