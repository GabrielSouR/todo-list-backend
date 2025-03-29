const db = require('../config/db');

const createTask = async (userId, title) => {
  const [result] = await db.query(
    'INSERT INTO tasks (user_id, title) VALUES (?, ?)',
    [userId, title]
  );

  return {
    id: result.insertId,
    user_id: userId,
    title,
    completed: false
  };
};

const getUserTasks = async (userId) => {
    const [rows] = await db.query(
      'SELECT id, title, completed, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
  
    return rows;
};

const updateTask = async (taskId, userId, data) => {
    // Verifica se a tarefa pertence ao usuário
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );
  
    if (rows.length === 0) {
      return false;
    }
  
    const campos = [];
    const valores = [];
  
    if (data.title !== undefined) {
      campos.push('title = ?');
      valores.push(data.title);
    }
  
    if (data.completed !== undefined) {
      campos.push('completed = ?');
      valores.push(data.completed);
    }
  
    if (campos.length === 0) return false;
  
    valores.push(taskId, userId);
  
    await db.query(
      `UPDATE tasks SET ${campos.join(', ')} WHERE id = ? AND user_id = ?`,
      valores
    );
  
    return true;
};

const deleteTask = async (taskId, userId) => {
    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );
  
    return result.affectedRows > 0;
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask
};
