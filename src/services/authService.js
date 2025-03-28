// src/services/authService.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, email, password) => {
  // 1. Verifica se o e-mail já está cadastrado
  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length > 0) {
    throw new Error('E-mail já cadastrado');
  }

  // 2. Gera o hash da senha
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3. Insere o novo usuário no banco
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  const userId = result.insertId;

  // 4. Gera o token JWT
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  // 5. Retorna os dados do usuário (sem a senha)
  return {
    id: userId,
    name,
    email,
    token,
  };
};

const loginUser = async (email, password) => {
    // 1. Busca o usuário pelo e-mail
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
    if (users.length === 0) {
      throw new Error('Usuário não encontrado');
    }
  
    const user = users[0];
  
    // 2. Compara a senha enviada com o hash no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Senha incorreta');
    }
  
    // 3. Gera um novo token JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
  
    // 4. Retorna os dados do usuário (sem a senha)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
};

module.exports = {
  registerUser,
  loginUser,
};
