// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API To-do List funcionando!');
});

module.exports = app;
