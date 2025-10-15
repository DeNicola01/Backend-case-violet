# Frontend - Sistema de Agricultores

Frontend desenvolvido em Next.js para gerenciamento de agricultores.

## Funcionalidades

- ✅ Listagem de agricultores em tabela
- ✅ Criação de novos agricultores
- ✅ Menu de ações com opções de editar, excluir e ativar/desativar
- ✅ Modal de criação de agricultores
- ✅ Modal de edição de agricultores
- ✅ Modal de confirmação para exclusão
- ✅ Validação de regras de negócio (não permite excluir agricultor ativo)
- ✅ Formatação automática de CPF e telefone
- ✅ Interface responsiva com Tailwind CSS

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Heroicons

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL da API:
Crie um arquivo `.env.local` na raiz do projeto com:
```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

3. Execute o projeto:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3001`

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   └── layout.tsx        # Layout da aplicação
├── components/
│   ├── FarmersTable.tsx      # Tabela de agricultores
│   ├── CreateFarmerModal.tsx # Modal de criação
│   ├── EditFarmerModal.tsx   # Modal de edição
│   └── DeleteConfirmModal.tsx # Modal de confirmação
├── services/
│   └── api.ts            # Serviço de comunicação com API
└── types/
    └── farmer.ts         # Tipos TypeScript
```

## Funcionalidades Implementadas

### Tabela de Agricultores
- Exibe todos os agricultores cadastrados
- Formatação de CPF, telefone e datas
- Indicador visual de status (ativo/inativo)
- Menu de ações com três pontos

### Modal de Criação
- Formulário para criar novos agricultores
- Formatação automática de CPF e telefone
- Validação de campos obrigatórios
- Checkbox para definir status ativo

### Menu de Ações
- **Editar**: Abre modal para edição dos dados
- **Ativar/Desativar**: Altera o status do agricultor
- **Excluir**: Abre modal de confirmação

### Validações
- Não permite excluir agricultor ativo
- Exibe mensagens de erro da API
- Validação de campos obrigatórios
- Formatação automática de CPF e telefone

## Próximas Funcionalidades

- [ ] Filtros e busca na tabela
- [ ] Paginação
- [ ] Exportação de dados
- [ ] Validação de CPF no frontend