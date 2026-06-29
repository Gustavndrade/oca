# Timeline de Implementação — Autenticação (Back-end)

> Stack: NestJS + TypeScript + Prisma + PostgreSQL (Supabase)  
> Estratégia: JWT com Access Token (15min) + Refresh Token (7 dias) em cookies httpOnly

---

## Passo 1 — Cadastro de usuário (`POST /auth/register`)

- [ ] 1.1. Criar `RegisterDto` com validação dos campos (`name`, `document`, `password`)
- [ ] 1.2. No `UsersService.create()`, buscar se já existe usuário com o mesmo `document`
- [ ] 1.3. Se existir, lançar `ConflictException` com mensagem genérica
- [ ] 1.4. Gerar hash da senha com `bcrypt.hash(password, 10)`
- [ ] 1.5. Salvar usuário no banco via `prisma.user.create()` com a senha já em hash
- [ ] 1.6. Gerar access token e refresh token
- [ ] 1.7. Retornar dados do usuário (sem o campo `password`) + tokens

---

## Passo 2 — Login (`POST /auth/login`)

- [ ] 2.1. Criar `LoginDto` com validação dos campos (`document`, `password`)
- [ ] 2.2. Buscar usuário pelo `document` no banco via `UsersService.findByDocument()`
- [ ] 2.3. Verificar se o usuário existe e se `isActive` é `true`
- [ ] 2.4. Comparar senha enviada com o hash salvo usando `bcrypt.compare()`
- [ ] 2.5. Se inválido (usuário não encontrado, inativo ou senha errada), lançar `UnauthorizedException` com mensagem genérica — nunca revelar qual dos dois campos está errado
- [ ] 2.6. Se válido, gerar access token e refresh token
- [ ] 2.7. Retornar dados do usuário (sem o campo `password`) + tokens

---

## Passo 3 — Emissão de tokens (`AuthService.generateTokens()`)

- [ ] 3.1. Definir payload do JWT com `sub` (userId) e `document`
- [ ] 3.2. Assinar access token com `JWT_ACCESS_SECRET` e expiração de `15m`
- [ ] 3.3. Assinar refresh token com `JWT_REFRESH_SECRET` e expiração de `7d`
- [ ] 3.4. Usar secrets **diferentes** para cada token (se um vazar, o outro continua seguro)
- [ ] 3.5. Gerar os dois tokens em paralelo com `Promise.all()`

---

## Passo 4 — Entrega dos tokens ao cliente (cookies httpOnly)

- [ ] 4.1. Instalar e configurar `cookie-parser` no `main.ts`
- [ ] 4.2. Ativar `ValidationPipe` global no `main.ts`
- [ ] 4.3. No `AuthController`, após login/registro bem-sucedido, setar os cookies via `res.cookie()`:
  - `access_token` → httpOnly, secure, sameSite: strict, maxAge: 15min
  - `refresh_token` → httpOnly, secure, sameSite: strict, maxAge: 7 dias
- [ ] 4.4. Não retornar os tokens no body da resposta — apenas nos cookies

---

## Passo 5 — Proteção de rotas (JWT Access)

- [ ] 5.1. Criar `JwtAccessStrategy` (Passport) lendo o token do cookie `access_token`
- [ ] 5.2. Validar assinatura com `JWT_ACCESS_SECRET`
- [ ] 5.3. Criar `JwtAccessGuard` usando essa strategy
- [ ] 5.4. Aplicar o guard nas rotas que exigem autenticação com `@UseGuards(JwtAccessGuard)`

---

## Passo 6 — Renovação de sessão (`POST /auth/refresh`)

- [ ] 6.1. Criar `JwtRefreshStrategy` (Passport) lendo o token do cookie `refresh_token`
- [ ] 6.2. Validar assinatura com `JWT_REFRESH_SECRET`
- [ ] 6.3. Criar `JwtRefreshGuard` usando essa strategy
- [ ] 6.4. Rota `/auth/refresh` protegida pelo `JwtRefreshGuard`
- [ ] 6.5. Se refresh válido, gerar novo access token e setar novo cookie
- [ ] 6.6. (Opcional) Rotacionar também o refresh token a cada uso (mais seguro)

---

## Passo 7 — Logout (`POST /auth/logout`)

- [ ] 7.1. Rota `/auth/logout` protegida pelo `JwtAccessGuard`
- [ ] 7.2. Limpar os cookies `access_token` e `refresh_token` via `res.clearCookie()`
- [ ] 7.3. Retornar `200 OK`

---

## Passo 8 — Dados do usuário logado (`GET /auth/me`)

- [ ] 8.1. Criar decorator `@CurrentUser()` para extrair o payload do JWT do request
- [ ] 8.2. Rota `/auth/me` protegida pelo `JwtAccessGuard`
- [ ] 8.3. Buscar usuário completo no banco pelo `sub` do token
- [ ] 8.4. Retornar dados do usuário sem o campo `password`

---

## Arquitetura de arquivos

```
apps/api/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── strategies/
│   │   ├── jwt-access.strategy.ts
│   │   └── jwt-refresh.strategy.ts
│   ├── guards/
│   │   ├── jwt-access.guard.ts
│   │   └── jwt-refresh.guard.ts
│   └── decorators/
│       └── current-user.decorator.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── users/
    ├── users.module.ts
    └── users.service.ts
```

---

## Variáveis de ambiente necessárias

```env
JWT_ACCESS_SECRET=uma_chave_bem_aleatoria_aqui
JWT_REFRESH_SECRET=outra_chave_bem_aleatoria_diferente
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

---

## Dependências necessárias

```bash
pnpm add @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt cookie-parser
pnpm add -D @types/passport-jwt @types/bcrypt @types/cookie-parser
```