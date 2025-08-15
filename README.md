# Loja Online

Este repositório contém uma aplicação de loja online com frontend em React + TypeScript + Vite e backend em Node.js + Express + Sequelize.

## Estrutura do Projeto

```
client/   # Frontend React + Vite
server/   # Backend Node.js + Express + Sequelize
```

---

## Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Vite, Redux, SCSS, React Router, React Icons, React Toastify
- **Backend:** Node.js, Express, Sequelize, MySQL, dotenv, cors

---

## Como rodar o projeto

### Pré-requisitos

- Node.js (v18+ recomendado)
- MySQL

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configuração do Backend

1. Acesse a pasta do servidor:
    ```sh
    cd server
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure o arquivo `.env` com as variáveis do banco de dados:
    ```
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=nome_do_banco
    DB_HOST=localhost
    DB_DIALECT=mysql
    PORT=3001
    ```
4. Execute as migrations para criar as tabelas:
    ```sh
    npx sequelize-cli db:migrate
    ```
5. Inicie o servidor:
    ```sh
    npm run dev
    ```
    O backend estará rodando em `http://localhost:3001`.

---

### 3. Configuração do Frontend

1. Acesse a pasta do client:
    ```sh
    cd ../client
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Inicie o frontend:
    ```sh
    npm run dev
    ```
    O frontend estará rodando em `http://localhost:5173` (ou porta informada pelo Vite).

---

## Funcionalidades

- Listagem de produtos por categoria
- Visualização de detalhes do produto
- Carrinho de compras com persistência no localStorage
- Modal de login/cadastro (UI)
- Modal de formas de pagamento
- Integração com backend para produtos, anúncios e categorias

---

## Estrutura das Pastas

- `client/src/Pages/` — Páginas principais da aplicação
- `client/src/Components/` — Componentes reutilizáveis (Navbar, Carousel, Card, Modais, etc)
- `client/src/contexts/` — Contextos React para gerenciamento de estado global
- `client/src/redux/` — Slices e store do Redux
- `server/models/` — Modelos Sequelize
- `server/routes/` — Rotas da API
- `server/migrations/` — Migrations do banco de dados

---

## Observações

- O projeto ainda não possui autenticação real de usuários.
- Para rodar em produção, configure as variáveis de ambiente corretamente e utilize um banco de dados seguro.

---

## Licença

Este projeto está sob a licença MIT.
