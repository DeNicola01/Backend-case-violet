# Documentação das Funções

## 🎯 Use Cases

### **CreateFarmerUseCase**

**Descrição**: Cria um novo agricultor no sistema

**Parâmetros**:
- `name: string` - Nome completo do agricultor
- `cpf: string` - CPF único e válido do agricultor
- `birthDate?: string` - Data de nascimento (opcional)
- `phone?: string` - Telefone do agricultor (opcional)
- `isActive: boolean = true` - Status ativo do agricultor (default: true)

**Retorno**: `Promise<Farmer>` - Agricultor criado

**Exceções**:
- `Error` - Se CPF já existir ou for inválido

**Exemplo**:
```typescript
const farmer = await createFarmerUseCase.execute(
  "João Silva",
  "12345678901",
  "1990-05-15",
  "(11) 99999-9999",
  true
);
```

---

### **UpdateFarmerUseCase**

**Descrição**: Atualiza os dados de um agricultor existente

**Parâmetros**:
- `id: string` - ID do agricultor a ser atualizado
- `name?: string` - Novo nome (opcional)
- `birthDate?: string` - Nova data de nascimento (opcional)
- `phone?: string` - Novo telefone (opcional)
- `isActive?: boolean` - Novo status ativo (opcional)

**Retorno**: `Promise<Farmer>` - Agricultor atualizado

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado

**Exemplo**:
```typescript
const farmer = await updateFarmerUseCase.execute(
  "64f8b2c1a2b3c4d5e6f7g8h9",
  "João Silva Santos",
  undefined,
  "(11) 88888-8888",
  false
);
```

---

### **DeleteFarmerUseCase**

**Descrição**: Exclui um agricultor do sistema

**Parâmetros**:
- `id: string` - ID do agricultor a ser excluído

**Retorno**: `Promise<void>`

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado
- `BadRequestException` - Se agricultor estiver ativo

**Exemplo**:
```typescript
await deleteFarmerUseCase.execute("64f8b2c1a2b3c4d5e6f7g8h9");
```

---

### **FindFarmerByIdUseCase**

**Descrição**: Busca um agricultor pelo ID

**Parâmetros**:
- `id: string` - ID do agricultor

**Retorno**: `Promise<Farmer>` - Agricultor encontrado

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado

**Exemplo**:
```typescript
const farmer = await findFarmerByIdUseCase.execute("64f8b2c1a2b3c4d5e6f7g8h9");
```

---

### **FindAllFarmersUseCase**

**Descrição**: Lista todos os agricultores cadastrados

**Parâmetros**: Nenhum

**Retorno**: `Promise<Farmer[]>` - Lista de agricultores

**Exemplo**:
```typescript
const farmers = await findAllFarmersUseCase.execute();
```

---

### **FindFarmerByCpfUseCase**

**Descrição**: Busca um agricultor pelo CPF

**Parâmetros**:
- `cpf: string` - CPF do agricultor

**Retorno**: `Promise<Farmer>` - Agricultor encontrado

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado

**Exemplo**:
```typescript
const farmer = await findFarmerByCpfUseCase.execute("12345678901");
```

---

### **ActivateFarmerUseCase**

**Descrição**: Ativa um agricultor

**Parâmetros**:
- `id: string` - ID do agricultor a ser ativado

**Retorno**: `Promise<Farmer>` - Agricultor ativado

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado

**Exemplo**:
```typescript
const farmer = await activateFarmerUseCase.execute("64f8b2c1a2b3c4d5e6f7g8h9");
```

---

### **DeactivateFarmerUseCase**

**Descrição**: Desativa um agricultor

**Parâmetros**:
- `id: string` - ID do agricultor a ser desativado

**Retorno**: `Promise<Farmer>` - Agricultor desativado

**Exceções**:
- `NotFoundException` - Se agricultor não for encontrado

**Exemplo**:
```typescript
const farmer = await deactivateFarmerUseCase.execute("64f8b2c1a2b3c4d5e6f7g8h9");
```

---

## 🏛️ Serviços de Domínio

### **FarmerDomainService**

#### **ensureCpfIsUnique(cpf: CPF, excludeFarmerId?: string): Promise<void>**

**Descrição**: Garante que o CPF seja único no sistema

**Parâmetros**:
- `cpf: CPF` - Value Object CPF
- `excludeFarmerId?: string` - ID do agricultor a ser excluído da verificação (opcional)

**Retorno**: `Promise<void>`

**Exceções**:
- `Error` - Se CPF já existir

---

#### **canDeleteFarmer(farmer: Farmer): boolean**

**Descrição**: Verifica se um agricultor pode ser excluído

**Parâmetros**:
- `farmer: Farmer` - Entidade Farmer

**Retorno**: `boolean` - true se pode ser excluído

---

#### **validateFarmerForDeletion(farmer: Farmer): void**

**Descrição**: Valida se um agricultor pode ser excluído

**Parâmetros**:
- `farmer: Farmer` - Entidade Farmer

**Retorno**: `void`

**Exceções**:
- `Error` - Se agricultor estiver ativo

---

## 🏭 Factories

### **FarmerFactory**

#### **create(data: CreateFarmerData, id?: string): Farmer**

**Descrição**: Cria uma nova entidade Farmer

**Parâmetros**:
- `data: CreateFarmerData` - Dados para criação
- `id?: string` - ID opcional (gerado automaticamente se não fornecido)

**Retorno**: `Farmer` - Nova entidade Farmer

---

#### **update(farmer: Farmer, data: UpdateFarmerData): Farmer**

**Descrição**: Atualiza uma entidade Farmer existente

**Parâmetros**:
- `farmer: Farmer` - Entidade Farmer existente
- `data: UpdateFarmerData` - Dados para atualização

**Retorno**: `Farmer` - Entidade Farmer atualizada

---

## 🗄️ Repositórios

### **FarmerRepository**

#### **save(farmer: Farmer): Promise<Farmer>**
**Descrição**: Salva um agricultor no banco de dados

#### **update(farmer: Farmer): Promise<Farmer>**
**Descrição**: Atualiza um agricultor no banco de dados

#### **delete(id: FarmerId): Promise<void>**
**Descrição**: Exclui um agricultor do banco de dados

#### **findById(id: FarmerId): Promise<Farmer | null>**
**Descrição**: Busca um agricultor pelo ID

#### **findByCpf(cpf: CPF): Promise<Farmer | null>**
**Descrição**: Busca um agricultor pelo CPF

#### **findAll(): Promise<Farmer[]>**
**Descrição**: Lista todos os agricultores

#### **existsByCpf(cpf: CPF): Promise<boolean>**
**Descrição**: Verifica se existe um agricultor com o CPF

---

## 🔄 Mappers

### **FarmerMapper**

#### **toResponseDto(farmer: Farmer): FarmerResponseDto**

**Descrição**: Converte uma entidade Farmer para FarmerResponseDto

**Parâmetros**:
- `farmer: Farmer` - Entidade Farmer do domínio

**Retorno**: `FarmerResponseDto` - DTO de resposta

---

#### **toResponseDtoArray(farmers: Farmer[]): FarmerResponseDto[]**

**Descrição**: Converte um array de entidades Farmer para array de FarmerResponseDto

**Parâmetros**:
- `farmers: Farmer[]` - Array de entidades Farmer

**Retorno**: `FarmerResponseDto[]` - Array de DTOs de resposta

---

## 🎮 Controller

### **FarmersController**

#### **POST /farmers**
**Descrição**: Cria um novo agricultor
**Body**: `CreateFarmerDto`
**Retorno**: `FarmerResponseDto`

#### **GET /farmers**
**Descrição**: Lista todos os agricultores
**Retorno**: `FarmerResponseDto[]`

#### **GET /farmers/:id**
**Descrição**: Busca agricultor por ID
**Parâmetros**: `id` (string)
**Retorno**: `FarmerResponseDto`

#### **GET /farmers/cpf/:cpf**
**Descrição**: Busca agricultor por CPF
**Parâmetros**: `cpf` (string)
**Retorno**: `FarmerResponseDto`

#### **PATCH /farmers/:id**
**Descrição**: Atualiza dados do agricultor
**Parâmetros**: `id` (string)
**Body**: `UpdateFarmerDto`
**Retorno**: `FarmerResponseDto`

#### **PATCH /farmers/:id/activate**
**Descrição**: Ativa um agricultor
**Parâmetros**: `id` (string)
**Retorno**: `FarmerResponseDto`

#### **PATCH /farmers/:id/deactivate**
**Descrição**: Desativa um agricultor
**Parâmetros**: `id` (string)
**Retorno**: `FarmerResponseDto`

#### **DELETE /farmers/:id**
**Descrição**: Exclui um agricultor
**Parâmetros**: `id` (string)
**Retorno**: `void` (204 No Content)

---

## 📋 Value Objects

### **CPF**
- Validação completa de CPF brasileiro
- Métodos: `getValue()`, `equals()`, `toString()`

### **Name**
- Validação de nome obrigatório
- Métodos: `getValue()`, `equals()`, `toString()`

### **Phone**
- Validação de telefone opcional
- Métodos: `getValue()`, `hasValue()`, `equals()`, `toString()`

### **FarmerId**
- Identificador único
- Métodos: `getValue()`, `equals()`, `toString()`, `generate()`

---

## 🎯 Entidades

### **Farmer**
- Entidade principal com identidade e ciclo de vida
- Métodos de negócio: `activate()`, `deactivate()`, `canBeDeleted()`
- Eventos de domínio para auditoria
- Métodos: `updateName()`, `updateBirthDate()`, `updatePhone()`
