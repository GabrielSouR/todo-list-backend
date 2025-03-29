<h1 align="center">📝 To-do List API</h1>

<p align="center">
  API REST segura e completa para gerenciamento de tarefas, com autenticação de usuários e CRUD completo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/MySQL-Banco%20de%20Dados-blue?logo=mysql" />
  <img src="https://img.shields.io/badge/Status-Concluído-brightgreen" />
</p>

---

## 🚀 Tecnologias Utilizadas

- Node.js + Express
- MySQL + mysql2
- JWT para autenticação
- Bcrypt para segurança de senhas
- Express-validator para validação
- Dotenv para variáveis de ambiente
- Nodemon para desenvolvimento

---

## 📦 Instalação

```bash
git clone https://github.com/GabrielSouR/todo-list-backend.git
cd todo-list-backend
npm install
```

Crie um arquivo `.env` com:

```env
PORT=3000

# Dados do MySQL (ajuste conforme seu ambiente)
DB_HOST=localhost
DB_USER=seu_user
DB_PASS=sua_senha
DB_NAME=to_do_list

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

---

## ▶️ Como executar

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

---

## 🔐 Autenticação

- **POST** `/api/auth/register` → Cadastra um novo usuário
- **POST** `/api/auth/login` → Retorna token JWT para autenticação

---

## 📋 Endpoints de Tarefas (requer token JWT)

- **POST** `/api/tasks` → Cria nova tarefa
- **GET** `/api/tasks` → Lista tarefas com:
  - Paginação: `?page=1&limit=5`
  - Filtros: `?completed=true`
  - Busca: `?search=termo`
- **PUT** `/api/tasks/:id` → Atualiza título e status
- **PATCH** `/api/tasks/:id` → Atualização parcial (ex: apenas `completed`)
- **DELETE** `/api/tasks/:id` → Remove tarefa

---

## 📁 Estrutura do Projeto

```
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── config/
└── app.js
```

---

## 🗃️ Estrutura do Banco de Dados

### 📌 Tabela `users`

| Campo        | Tipo           | Descrição                      |
|--------------|----------------|-------------------------------|
| `id`         | INT (PK)       | Identificador único           |
| `name`       | VARCHAR(100)   | Nome do usuário               |
| `email`      | VARCHAR(100)   | E-mail único                  |
| `password`   | VARCHAR(255)   | Senha (criptografada)         |
| `created_at` | TIMESTAMP      | Data de criação automática    |

---

### 📌 Tabela `tasks`

| Campo        | Tipo           | Descrição                                 |
|--------------|----------------|--------------------------------------------|
| `id`         | INT (PK)       | Identificador único da tarefa             |
| `user_id`    | INT (FK)       | ID do usuário dono da tarefa              |
| `title`      | VARCHAR(255)   | Título da tarefa                          |
| `completed`  | BOOLEAN        | Status de conclusão (`true` ou `false`)   |
| `created_at` | TIMESTAMP      | Data de criação automática                |

> A tabela `tasks` possui uma FOREIGN KEY (`user_id`) que referencia `users(id)`, com `ON DELETE CASCADE`.

---

## ✅ Funcionalidades

- ✅ Registro e login com JWT
- ✅ CRUD completo de tarefas
- ✅ Filtros por status e busca
- ✅ Paginação de resultados
- ✅ Edição parcial com PATCH
- ✅ Middleware de autenticação
- ✅ Organização em camadas

---

## 👨‍💻 Desenvolvido por

**Gabriel de Souza Ribeiro**  
Projeto criado como estudo prático de backend moderno, seguro e organizado com Node.js e MySQL.

---

<p align="center">
  Feito com 💻 e ☕
</p>
