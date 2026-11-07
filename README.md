# Vacation Planner

Sistema web para **organização e escolha de períodos de férias**. A aplicação permite que usuários consultem os períodos já selecionados e registrem suas próprias preferências, enquanto uma área administrativa oferece controles sobre a etapa de escolha e a ordem dos usuários.

O repositório reúne as duas partes da aplicação: um frontend em Vue.js e uma API em Node.js/Express, com persistência em MongoDB.

## ✨ Funcionalidades

### Para usuários

- Acesso à aplicação por meio do fluxo de autenticação integrado ao backend.
- Consulta da própria escolha de férias.
- Seleção de um período de férias quando a etapa de escolha está habilitada.
- Visualização das escolhas registradas por outros usuários.
- Consulta de períodos e datas indisponíveis calculados a partir das escolhas existentes.

### Para administradores

- Consulta dos usuários organizados por posição.
- Reordenação da sequência de usuários.
- Ativação ou desativação do período de escolha de férias.
- Acompanhamento das escolhas já registradas.

O backend também considera a ordem dos usuários no fluxo de seleção, aplicando regras para controlar quando cada pessoa pode registrar sua escolha.

## 🧰 Tecnologias

### Frontend

- **Vue 3**
- JavaScript
- Vue Router
- Axios
- Vite
- Vue Datepicker
- Vue Draggable

### Backend

- **Node.js**
- **Express 4**
- **MongoDB**
- **Mongoose**
- Nodemailer
- CORS

## 🗂️ Estrutura do repositório

```
vacations/
├── vacations-vue/       # Interface web em Vue.js
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── services/
└── vacations-express/   # API e regras de negócio
    ├── models/
    ├── routes/
    ├── services/
    └── app.js
```

## ▶️ Como executar localmente

### Pré-requisitos

- Node.js e npm.
- MongoDB em execução local ou acessível por uma URI de conexão.
- Dois terminais para executar frontend e backend.

### 1. Backend

```bash
cd vacations-express
npm install
npm start
```

A configuração atual do backend utiliza, por padrão, o banco local `vacations_express_db`, com URI `mongodb://localhost:27017/vacations_express_db`. Verifique a disponibilidade do MongoDB e ajuste a configuração em `app.js` caso utilize outra instância.

### 2. Frontend

Em outro terminal, a partir da raiz do repositório:

```bash
cd vacations-vue
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a interface.

Confira a configuração de comunicação com a API em `vacations-vue/src/services/apiCalls.js` antes de executar o frontend, garantindo que a URL corresponda ao endereço do backend.

## 📌 Observações

- O frontend e o backend são projetos separados e precisam estar em execução para que a aplicação completa funcione.
- O envio de mensagens por e-mail depende de configuração válida do serviço de e-mail utilizado pelo backend.
- Não compartilhe credenciais de banco de dados ou de e-mail no controle de versão.

---

Projeto de desenvolvimento web com foco na organização de preferências de férias, integração entre frontend e backend e persistência de dados.
