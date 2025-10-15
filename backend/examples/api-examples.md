# Exemplos de Requisições da API

## POST /farmers - Criar Agricultor

### Exemplo 1: Agricultor Completo
```json
{
  "fullName": "João Silva Santos",
  "cpf": "12345678901",
  "birthDate": "1990-05-15",
  "phone": "(11) 99999-9999",
  "isActive": true
}
```

### Exemplo 2: Agricultor Mínimo (apenas campos obrigatórios)
```json
{
  "fullName": "Maria Oliveira",
  "cpf": "98765432100"
}
```

### Exemplo 3: Agricultor com CPF Válido
```json
{
  "fullName": "Pedro Costa",
  "cpf": "11144477735",
  "birthDate": "1985-12-03",
  "phone": "(21) 88888-8888"
}
```

## PATCH /farmers/:id - Atualizar Agricultor

### Exemplo: Atualizar dados (CPF não pode ser alterado)
```json
{
  "fullName": "João Silva Santos Junior",
  "phone": "(11) 88888-8888",
  "isActive": false
}
```

**⚠️ Importante**: O campo `cpf` não pode ser alterado após a criação do agricultor.

## Comandos cURL para Teste

### Criar Agricultor
```bash
curl -X POST http://localhost:3333/farmers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva Santos",
    "cpf": "12345678901",
    "birthDate": "1990-05-15",
    "phone": "(11) 99999-9999",
    "isActive": true
  }'
```

### Listar Todos os Agricultores
```bash
curl -X GET http://localhost:3333/farmers
```

### Buscar por ID
```bash
curl -X GET http://localhost:3333/farmers/ID_DO_AGRICULTOR
```

### Buscar por CPF
```bash
curl -X GET http://localhost:3333/farmers/cpf/12345678901
```

### Atualizar Agricultor
```bash
curl -X PATCH http://localhost:3333/farmers/ID_DO_AGRICULTOR \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva Santos Junior",
    "phone": "(11) 88888-8888"
  }'
```

### Desativar Agricultor
```bash
curl -X PATCH http://localhost:3333/farmers/ID_DO_AGRICULTOR/deactivate
```

### Ativar Agricultor
```bash
curl -X PATCH http://localhost:3333/farmers/ID_DO_AGRICULTOR/activate
```

### Excluir Agricultor (apenas se inativo)
```bash
curl -X DELETE http://localhost:3333/farmers/ID_DO_AGRICULTOR
```

## CPFs Válidos para Teste

- `11144477735`
- `12345678901`
- `98765432100`
- `12345678909`
- `11111111111` (inválido - todos os dígitos iguais)

## Resposta de Sucesso

```json
{
  "id": "64f8b2c1a2b3c4d5e6f7g8h9",
  "fullName": "João Silva Santos",
  "cpf": "12345678901",
  "birthDate": "1990-05-15T00:00:00.000Z",
  "phone": "(11) 99999-9999",
  "isActive": true,
  "createdAt": "2025-10-15T21:30:00.000Z",
  "updatedAt": "2025-10-15T21:30:00.000Z"
}
```
