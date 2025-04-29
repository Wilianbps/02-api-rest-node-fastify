# Aplicação de Transações Financeiras

Esta é uma API simples construída com Node.js que permite criar, listar e consultar transações bancárias de usuários, além de exibir um resumo com o saldo total da conta.

🚀 Funcionalidades
- Criar uma nova transação (POST /transactions)
- Listar todas as transações (GET /transactions)
- Consultar uma transação por ID (GET /transactions/:id)
- Obter o resumo (saldo total) da conta (GET /transactions/summary)

📦 Instalação
- git clone https://github.com/Wilianbps/02-api-rest-node-fastify.git
- cd 02-api-rest-node-fastify
- npm install

▶️ Executando a aplicação
- npm run dev

📘 Endpoints
## POST /transactions
Cria uma nova transação.

## Corpo da requisição:

{
  "title": "Salário",
  "amount": 2500,
  "type": "credit"
}

### GET /transactions
Retorna a lista de todas as transações cadastradas.

### GET /transactions/:id
Busca uma transação específica pelo seu ID.

### GET /transactions/summary
Retorna um resumo com o saldo total da conta considerando todos os créditos e débitos.

### Tipos possíveis:

- credit: adiciona ao saldo
- debit: subtrai do saldo

### 🛠️ Tecnologias utilizadas
- Node.js
- Fastify
- Knex
- Sqlite/PostgreSQL

