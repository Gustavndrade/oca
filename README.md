# OCA Flow

**SaaS de gestão de propriedades hoteleiras** — Hotéis, Pousadas e Casas de Temporada.

Monorepo com **pnpm workspaces** + **TypeScript**.

---

## Estrutura do Projeto

```
oca_flow/
│
├── apps/
│   ├── api/                          # Backend — Fastify + Prisma
│   │   ├── src/                      # Código-fonte da API
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                          # Frontend — Next.js 15 (App Router)
│       ├── src/                      # Código-fonte do frontend
│       ├── public/                   # Assets estáticos
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── config/                       # Configurações compartilhadas
│   ├── eslint/
│   │   └── base.js              # ESLint flat config base
│   ├── typescript/
│   │   ├── base.json            # TS config base (strict, ES2022)
│   │   ├── node.json            # TS config para Node.js (API)
│   │   └── nextjs.json          # TS config para Next.js (Web)
│   └── package.json
│
├── types/                        # @oca/types — Tipos do domínio
│   ├── src/
│   │   ├── index.ts             # Barrel export
│   │   ├── organization.ts      # Organization
│   │   ├── user.ts              # User, Role, Auth
│   │   ├── property.ts          # Property, PropertyType
│   │   ├── unit.ts              # Unit (quarto/suíte/casa)
│   │   ├── reservation.ts       # Reservation, ReservationStatus
│   │   ├── guest.ts             # Guest, DocumentType
│   │   ├── payment.ts           # Payment, PaymentType, PaymentStatus
│   │   ├── financial.ts         # FinancialCategory, FinancialTransaction
│   │   └── api.ts              # ApiResponse, PaginatedResponse
│   ├── package.json
│   └── tsconfig.json
│
├── utils/                        # @oca/utils — Funções utilitárias
│   ├── src/                      # Formatação, validação
│   ├── package.json
│   └── tsconfig.json
│
├── database/                     # @oca/database — Prisma ORM
│   ├── prisma/
│   │   └── schema.prisma         # Schema do banco de dados
│   ├── src/                      # Re-export do PrismaClient
│   ├── package.json
│   └── tsconfig.json
│
├── .github/workflows/ci.yml          # GitHub Actions CI
├── .gitignore
├── .npmrc                            # Configuração do pnpm
├── package.json                      # Root — scripts globais
├── pnpm-workspace.yaml               # Definição dos workspaces
└── tsconfig.json                     # TypeScript config raiz
```

---

## Como funciona

### Visão geral

O OCA Flow é organizado como um **monorepo** com 2 aplicações e 4 pacotes compartilhados:

```
┌─────────────────────────────────────────────────┐
│                    Monorepo                     │
│                                                 │
│  ┌──────────┐    ┌──────────┐                   │
│  │  API      │    │  Web     │    ← apps        │
│  │ (Fastify) │    │ (Next.js)│                  │
│  └────┬──┬──┘    └──┬───┬──┘                    │
│       │  │          │   │                       │
│  ┌────▼──▼──────────▼───▼──┐                    │
│  │     Pacotes compartilhados                   │
│  │  ┌────────┐ ┌─────┐ ┌──────────┐ ┌───────┐   │
│  │  │ types  │ │utils│ │ database │ │config │   │
│  │  └────────┘ └─────┘ └──────────┘ └───────┘   │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Pacotes

| Pacote | Nome npm | Descrição |
|--------|----------|-----------|
| `types` | `@oca/types` | Tipos TypeScript do domínio, compartilhados entre API e Web |
| `utils` | `@oca/utils` | Funções utilitárias (formatação BRL, validação CPF/CNPJ, datas) |
| `database` | `@oca/database` | Schema Prisma e re-export do PrismaClient |
| `config` | `@oca/config` | Configurações de TypeScript e ESLint compartilhadas |

### Modelo de dados

O sistema é **multi-tenant** com a seguinte hierarquia:

```
Organization (empresa)
  └── Property (hotel, pousada ou casa de temporada)
        ├── Unit (quarto, suíte, acomodação)
        ├── Reservation (reserva vinculada a unit + guest)
        │     ├── Payment (pagamentos da reserva)
        │     └── ReservationGuests (hóspedes da reserva)
        ├── FinancialCategory (categorias de receita/despesa)
        └── FinancialTransaction (transações financeiras)
```

**Permissões:**
- `UserOrganization` — vincula um usuário a uma organização com papel (`ADMIN`, `MANAGER`, `STAFF`)
- `UserProperty` — vincula um usuário a uma propriedade específica

**Autenticação** é feita por **CPF ou CNPJ** + senha (não por email).

---

## Como iniciar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- [PostgreSQL](https://www.postgresql.org/) rodando localmente ou em nuvem

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/oca_flow.git
cd oca_flow
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `apps/api/.env`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/oca_flow?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-com-pelo-menos-32-caracteres"
JWT_EXPIRES_IN="7d"

# Server
PORT=3333
HOST=0.0.0.0
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

Crie o arquivo `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

### 4. Configure o banco de dados

```bash
# Gerar o Prisma Client
pnpm db:generate

# Criar as tabelas no banco (push direto, sem migration)
pnpm db:push

# Ou usar migrations (recomendado para produção)
pnpm --filter @oca/database db:migrate
```

---

## Como rodar

### Desenvolvimento (todos os apps em paralelo)

```bash
pnpm dev
```

Isso usa o **concurrently** para iniciar simultaneamente:
- **API**: `http://localhost:3333`
- **Web**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3333/docs`

### Rodar apenas um app

```bash
# Só a API
pnpm --filter @oca/api dev

# Só o Web
pnpm --filter @oca/web dev
```

### Build de produção

```bash
pnpm build
```

### Outros comandos

| Comando           | Descrição                                           |
|-------------------|-----------------------------------------------------|
| `pnpm dev`        | Inicia todos os apps em modo desenvolvimento        |
| `pnpm build`      | Build de produção de todos os workspaces            |
| `pnpm lint`       | Roda ESLint em todos os workspaces                  |
| `pnpm typecheck`  | Verificação de tipos TypeScript                     |
| `pnpm format`     | Formata código com Prettier                         |
| `pnpm clean`      | Remove `node_modules`, `dist`, `.next`              |
| `pnpm db:generate`| Gera o Prisma Client                                |
| `pnpm db:push`    | Sincroniza schema com o banco                       |
| `pnpm db:studio`  | Abre o Prisma Studio (GUI do banco)                 |


##  Stack Tecnológica

| Camada             | Tecnologia                         |
|--------------------|------------------------------------|
| **Monorepo**       | pnpm workspaces                    |
| **Linguagem**      | TypeScript 5.x (strict mode)       |
| **Backend**        | NestJS 11                          |
| **ORM**            | Prisma 6 (PostgreSQL)              |
| **Validação**      | Zod                                |
| **Auth**           | JWT                                |
| **Docs API**       | Swagger                            |
| **Frontend**       | Next.js 15 (App Router) + React 19 |
| **CI/CD**          | GitHub Actions                     |

---

##  Importando pacotes internos

Os pacotes compartilhados são importados via `workspace:*`:

```typescript
// Na API ou no Web
import type { Reservation, Guest } from "@oca/types";
import { formatCurrency, isValidCPF } from "@oca/utils";
import { PrismaClient } from "@oca/database";
```

---

## Licença

Privado — todos os direitos reservados.
