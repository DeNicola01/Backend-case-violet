# Farmer Backend API

API para gerenciamento de agricultores desenvolvida com NestJS e MongoDB.

## Requisitos

- Node.js (versão 16 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Certifique-se de que o MongoDB está rodando na porta padrão (27017)

4. Execute a aplicação:
```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

## Documentação da API

A documentação interativa da API está disponível em `http://localhost:3000/api` (Swagger)

## Endpoints

### Agricultores

- `POST /farmers` - Criar um novo agricultor
- `GET /farmers` - Listar todos os agricultores
- `GET /farmers/:id` - Buscar agricultor por ID
- `GET /farmers/cpf/:cpf` - Buscar agricultor por CPF
- `PATCH /farmers/:id` - Atualizar dados do agricultor
- `PATCH /farmers/:id/activate` - Ativar agricultor
- `PATCH /farmers/:id/deactivate` - Desativar agricultor
- `DELETE /farmers/:id` - Excluir agricultor

## Regras de Negócio

### Criação de Agricultor
- `fullName`: Obrigatório (string)
- `cpf`: Obrigatório, único e válido (string)
- `birthDate`: Opcional (date)
- `phone`: Opcional (string)
- `isActive`: Default true (boolean)

### Atualização de Agricultor
- Todos os campos podem ser alterados, exceto o CPF
- O CPF não pode ser modificado após a criação

### Exclusão de Agricultor
- Só é possível excluir agricultores com `isActive = false`
- Para excluir um agricultor ativo, primeiro desative-o

### Validação de CPF
- Implementa algoritmo completo de validação de CPF brasileiro
- Verifica dígitos verificadores
- Rejeita CPFs com todos os dígitos iguais

## Estrutura do Projeto

```
src/
├── farmers/
│   ├── domain/                          # 🏛️ Camada de Domínio
│   │   ├── entities/                    # Entidades de Domínio
│   │   │   └── farmer.entity.ts
│   │   ├── value-objects/               # Value Objects
│   │   │   ├── cpf.vo.ts
│   │   │   ├── name.vo.ts
│   │   │   ├── phone.vo.ts
│   │   │   └── farmer-id.vo.ts
│   │   ├── repositories/                # Interfaces de Repositório
│   │   │   ├── farmer-read.repository.ts
│   │   │   ├── farmer-write.repository.ts
│   │   │   └── farmer.repository.ts
│   │   ├── services/                    # Serviços de Domínio
│   │   │   └── farmer-domain.service.ts
│   │   ├── events/                      # Eventos de Domínio
│   │   │   ├── domain-event.ts
│   │   │   ├── farmer-created.event.ts
│   │   │   ├── farmer-updated.event.ts
│   │   │   └── farmer-deactivated.event.ts
│   │   └── factories/                   # Factories
│   │       └── farmer.factory.ts
│   ├── application/                     # 🎯 Camada de Aplicação
│   │   ├── use-cases/                   # Casos de Uso
│   │   │   ├── create-farmer/
│   │   │   ├── update-farmer/
│   │   │   ├── delete-farmer/
│   │   │   ├── find-farmer-by-id/
│   │   │   ├── find-farmer-by-cpf/
│   │   │   ├── find-all-farmers/
│   │   │   ├── activate-farmer/
│   │   │   └── deactivate-farmer/
│   │   └── mappers/                     # Mappers
│   │       └── farmer.mapper.ts
│   ├── infrastructure/                  # 🔧 Camada de Infraestrutura
│   │   └── repositories/                # Implementações de Repositório
│   │       └── mongodb-farmer.repository.ts
│   ├── dto/                            # 📦 Data Transfer Objects
│   │   ├── create-farmer.dto.ts
│   │   ├── update-farmer.dto.ts
│   │   └── farmer-response.dto.ts
│   ├── schemas/                        # 🗄️ Schemas do MongoDB
│   │   └── farmer.schema.ts
│   ├── farmers.controller.ts           # 🎮 Controller
│   └── farmers.module.ts              # 📦 Módulo NestJS
├── app.module.ts
└── main.ts
```

## Arquitetura

O projeto utiliza **SOLID + DDD (Domain-Driven Design)** com as seguintes camadas:

### **🏛️ Camadas da Aplicação**

- **Domain**: Entidades, Value Objects, Serviços de Domínio e Eventos
- **Application**: Use Cases, Commands e Mappers
- **Infrastructure**: Implementações de repositório e persistência
- **Presentation**: Controllers, DTOs e Schemas

### **🎯 Princípios SOLID**

- **SRP**: Cada Use Case tem uma única responsabilidade
- **OCP**: Aberto para extensão, fechado para modificação
- **LSP**: Implementações substituíveis via interfaces
- **ISP**: Interfaces segregadas por responsabilidade
- **DIP**: Dependências invertidas via injeção

### **📋 Padrões DDD**

- **Value Objects**: CPF, Name, Phone, FarmerId
- **Entities**: Farmer com identidade e ciclo de vida
- **Domain Services**: Regras de negócio complexas
- **Repositories**: Abstrações para persistência
- **Domain Events**: Eventos para auditoria e integração
- **Factories**: Criação e atualização de entidades

Para mais detalhes, consulte:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura detalhada
- [FUNCTIONS.md](./FUNCTIONS.md) - Documentação das funções

## Exemplos de Uso

### Criar um agricultor
```bash
curl -X POST http://localhost:3000/farmers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva",
    "cpf": "12345678901",
    "birthDate": "1990-01-01",
    "phone": "(11) 99999-9999"
  }'
```

### Atualizar um agricultor
```bash
curl -X PATCH http://localhost:3000/farmers/ID_DO_AGRICULTOR \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva Santos",
    "phone": "(11) 88888-8888"
  }'
```

### Desativar um agricultor
```bash
curl -X PATCH http://localhost:3000/farmers/ID_DO_AGRICULTOR/deactivate
```

### Excluir um agricultor (apenas se inativo)
```bash
curl -X DELETE http://localhost:3000/farmers/ID_DO_AGRICULTOR
```
