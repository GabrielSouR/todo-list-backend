const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');

const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { title } = req.body;

    const task = await taskService.createTask(userId, title);

    return res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const list = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const { page = 1, limit = 10, completed, search } = req.query;
  
      const result = await taskService.getUserTasksWithFilters(
        userId,
        Number(page),
        Number(limit),
        completed,
        search
      );
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao listar tarefas com filtros:', error);
      return res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
};

const update = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const userId = req.user.id;
      const taskId = req.params.id;
      const { title, completed } = req.body;
  
      const updated = await taskService.updateTask(taskId, userId, { title, completed });
  
      if (!updated) {
        return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado' });
      }
  
      return res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};

const remove = async (req, res) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
  
      const deleted = await taskService.deleteTask(taskId, userId);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado' });
      }
  
      return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
};

const partialUpdate = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const userId = req.user.id
    const taskId = req.params.id
    const { title, completed } = req.body

    const updated = await taskService.updateTask(taskId, userId, { title, completed })

    if (!updated) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado' })
    }

    const updatedTask = await taskService.getTaskById(taskId, userId)

    return res.status(200).json(updatedTask)
  } catch (error) {
    console.error('Erro ao atualizar parcialmente:', error)
    return res.status(500).json({ error: 'Erro ao atualizar tarefa' })
  }
}

module.exports = {
    create,
    list,
    update,
    remove,
    partialUpdate
};

