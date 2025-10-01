# README.md

# Brev.ly - Projeto de Encurtador de URLs

Este projeto é composto por duas aplicações principais:

- **server/**: Backend em Node.js com Fastify, Drizzle ORM e integração com PostgreSQL e Cloudflare R2.
- **web/**: Frontend em React com Vite, TailwindCSS e React Query.

## Tecnologias Utilizadas

### Backend (`server/`)
- **Node.js 20**
- **Fastify**: Framework web rápido para Node.js.
- **Drizzle ORM**: ORM para integração com PostgreSQL.
- **Vitest**: Testes unitários.
- **Cloudflare R2**: Armazenamento de arquivos.
- **Docker**: Ambiente de desenvolvimento e produção.
- **TypeScript**: Tipagem estática.
- **Zod**: Validação de variáveis de ambiente.
- **Drizzle Kit**: Migrations e geração de schemas.

### Frontend (`web/`)
- **React 19**
- **Vite**: Bundler moderno e rápido.
- **TailwindCSS**: Estilização utilitária.
- **React Query**: Gerenciamento de dados assíncronos.
- **React Hook Form**: Manipulação de formulários.
- **Radix UI**: Componentes acessíveis.
- **TypeScript**: Tipagem estática.

## Pré-requisitos

- **Node.js 20+**
- **pnpm** (gerenciador de pacotes)
- **Docker** (opcional, recomendado para rodar o backend)
- **PostgreSQL** (caso não utilize Docker)

## Como rodar o projeto localmente

### 1. Clonar o repositório

```sh
git clone <url-do-repositório>
cd ftr-360-desafio-fase-1
```

### 2. Configurar variáveis de ambiente

#### Backend (`server/`)
Copie o arquivo de exemplo (.env.example) e preencha com suas configurações:

```sh
cp server/.env.example server/.env
```

Preencha os campos do `server/.env` com os dados do seu banco PostgreSQL e credenciais do Cloudflare R2.

#### Frontend (`web/`)
Copie o arquivo de exemplo (.env.example) e preencha com as URLs corretas:

```sh
cp web/.env.example web/.env
```

Preencha `VITE_FRONTEND_URL` e `VITE_BACKEND_URL` conforme seu ambiente.

### 3. Instalar dependências

```sh
pnpm install --filter ./server
pnpm install --filter ./web
```

### 4. Rodar o Backend

#### Usando Docker (recomendado)

```sh
cd server
docker-compose up
```

#### Sem Docker

- Certifique-se que o PostgreSQL está rodando e acessível.
- Execute as migrations:

```sh
pnpm run db:migrate
```

- Inicie o servidor:

```sh
pnpm dev
```

### 5. Rodar o Frontend

```sh
cd web
pnpm dev
```

Acesse [http://localhost:5173](http://localhost:5173) para visualizar a aplicação.

## Scripts Úteis

### Backend

- `pnpm dev`: Inicia o servidor em modo desenvolvimento.
- `pnpm build`: Compila o projeto para produção.
- `pnpm test`: Executa os testes unitários.
- `pnpm run db:migrate`: Executa as migrations do banco.
- `pnpm run db:studio`: Abre o Drizzle Studio para visualizar o banco.

### Frontend

- `pnpm dev`: Inicia o frontend em modo desenvolvimento.
- `pnpm build`: Compila o frontend para produção.

## Estrutura de Pastas

```
.github/           # Configurações de CI/CD
server/            # Backend (Node.js, Fastify, Drizzle)
web/               # Frontend (React, Vite, TailwindCSS)
```

## Observações

- O projeto utiliza o **pnpm** para gerenciamento de pacotes.
- O backend expõe a porta **3333** por padrão.
- O frontend utiliza a porta **5173** por padrão.
- As migrations do banco são gerenciadas pelo Drizzle Kit.