# Arquitetura SOLID + DDD

## 🏗️ Estrutura da Aplicação

```
src/farmers/
├── domain/                          # Camada de Domínio (DDD)
│   ├── entities/                    # Entidades de Domínio
│   │   └── farmer.entity.ts
│   ├── value-objects/               # Value Objects
│   │   ├── cpf.vo.ts
│   │   ├── name.vo.ts
│   │   ├── phone.vo.ts
│   │   └── farmer-id.vo.ts
│   ├── repositories/                # Interfaces de Repositório (ISP)
│   │   ├── farmer-read.repository.ts
│   │   ├── farmer-write.repository.ts
│   │   └── farmer.repository.ts
│   ├── services/                    # Serviços de Domínio
│   │   └── farmer-domain.service.ts
│   ├── events/                      # Eventos de Domínio
│   │   ├── domain-event.ts
│   │   ├── farmer-created.event.ts
│   │   ├── farmer-updated.event.ts
│   │   └── farmer-deactivated.event.ts
│   └── factories/                   # Factories
│       └── farmer.factory.ts
├── application/                     # Camada de Aplicação
│   ├── use-cases/                   # Casos de Uso (SRP)
│   │   ├── create-farmer/
│   │   ├── update-farmer/
│   │   ├── delete-farmer/
│   │   ├── find-farmer-by-id/
│   │   ├── find-farmer-by-cpf/
│   │   ├── find-all-farmers/
│   │   ├── activate-farmer/
│   │   └── deactivate-farmer/
│   └── mappers/                     # Mappers
│       └── farmer.mapper.ts
├── infrastructure/                  # Camada de Infraestrutura
│   └── repositories/                # Implementações de Repositório
│       └── mongodb-farmer.repository.ts
├── dto/                            # Data Transfer Objects
│   ├── create-farmer.dto.ts
│   ├── update-farmer.dto.ts
│   └── farmer-response.dto.ts
├── schemas/                        # Schemas do MongoDB
│   └── farmer.schema.ts
├── farmers.controller.ts           # Controller (Interface)
└── farmers.module.ts              # Módulo NestJS
```

## 🎯 Princípios SOLID Aplicados

### **S - Single Responsibility Principle (SRP)**
- ✅ Cada Use Case tem uma única responsabilidade
- ✅ Value Objects encapsulam validações específicas
- ✅ Serviços de domínio focam em regras de negócio

### **O - Open/Closed Principle (OCP)**
- ✅ Entidades abertas para extensão, fechadas para modificação
- ✅ Repositórios podem ser estendidos sem modificar interfaces

### **L - Liskov Substitution Principle (LSP)**
- ✅ Implementações de repositório são substituíveis
- ✅ Value Objects mantêm contratos consistentes

### **I - Interface Segregation Principle (ISP)**
- ✅ Interfaces de repositório separadas (Read/Write)
- ✅ Cada interface tem métodos específicos

### **D - Dependency Inversion Principle (DIP)**
- ✅ Use Cases dependem de abstrações (interfaces)
- ✅ Implementações concretas injetadas via DI

## 🏛️ Padrões DDD Implementados

### **Value Objects**
- `CPF`: Validação e encapsulamento de CPF
- `Name`: Validação de nome
- `Phone`: Validação de telefone
- `FarmerId`: Identificador único

### **Entities**
- `Farmer`: Entidade principal com identidade e ciclo de vida

### **Domain Services**
- `FarmerDomainService`: Regras de negócio complexas

### **Repositories**
- Interfaces abstratas para persistência
- Implementação concreta para MongoDB

### **Domain Events**
- `FarmerCreatedEvent`
- `FarmerUpdatedEvent`
- `FarmerDeactivatedEvent`

### **Factories**
- `FarmerFactory`: Criação e atualização de entidades

## 🔄 Fluxo de Dados

```
Controller → Command → Use Case → Domain Service → Repository → Database
     ↓           ↓         ↓            ↓            ↓
   DTO → Command → Entity → Value Objects → Infrastructure
```

## 🎨 Benefícios da Arquitetura

### **Manutenibilidade**
- Código organizado em camadas bem definidas
- Responsabilidades claras e separadas

### **Testabilidade**
- Use Cases podem ser testados isoladamente
- Mocks fáceis de implementar com interfaces

### **Flexibilidade**
- Fácil troca de implementações (ex: MongoDB → PostgreSQL)
- Extensibilidade sem quebrar código existente

### **Escalabilidade**
- Novos casos de uso podem ser adicionados facilmente
- Regras de negócio centralizadas no domínio

### **Robustez**
- Validações encapsuladas em Value Objects
- Eventos de domínio para auditoria e integração

## 🚀 Como Usar

### **Criar um Agricultor**
```typescript
const command = new CreateFarmerCommand(name, cpf, birthDate, phone, isActive);
const farmer = await createFarmerUseCase.execute(command);
```

### **Atualizar um Agricultor**
```typescript
const command = new UpdateFarmerCommand(id, name, phone, isActive);
const farmer = await updateFarmerUseCase.execute(command);
```

### **Buscar por CPF**
```typescript
const command = new FindFarmerByCpfCommand(cpf);
const farmer = await findFarmerByCpfUseCase.execute(command);
```

## 📊 Métricas de Qualidade

- **Cobertura de Testes**: Alta (cada camada testável isoladamente)
- **Acoplamento**: Baixo (dependências via interfaces)
- **Coesão**: Alta (responsabilidades bem definidas)
- **Complexidade**: Baixa (código simples e direto)
