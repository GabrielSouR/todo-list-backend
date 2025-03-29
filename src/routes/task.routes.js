const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Aplica o middleware a todas as rotas abaixo
router.use(authMiddleware);

// Rota para criar tarefa
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('O título é obrigatório')
  ],
  taskController.create
);

router.get(
    '/', 
    taskController.list
);

router.put(
    '/:id',
    [
      body('title').optional().notEmpty().withMessage('O título não pode estar vazio'),
      body('completed').optional().isBoolean().withMessage('O campo completed deve ser true ou false')
    ],
    taskController.update
);

router.delete(
    '/:id', 
    taskController.remove
);

module.exports = router;
