// src/controllers/authController.js
const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    // 1. Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extrair dados do corpo da requisição
    const { name, email, password } = req.body;

    // 3. Chamar a service para registrar o usuário
    const result = await authService.registerUser(name, email, password);

    // 4. Retornar resposta de sucesso
    return res.status(201).json(result);

  } catch (error) {
    if (error.message === 'E-mail já cadastrado') {
        return res.status(409).json({ error: error.message });
      }

    // 5. Lidar com erros inesperados
    console.error('Erro no registro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      const result = await authService.loginUser(email, password);
  
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Usuário não encontrado' || error.message === 'Senha incorreta') {
        return res.status(401).json({ error: error.message });
      }
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
  register,
  login,
};
