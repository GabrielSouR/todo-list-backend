// src/routes/auth.routes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');

// Rota de registro de usuário
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  ], 
  authController.register
);

router.post(
    '/login',
    [
      body('email').isEmail().withMessage('E-mail inválido'),
      body('password').notEmpty().withMessage('A senha é obrigatória'),
    ],
    authController.login
);

module.exports = router;
