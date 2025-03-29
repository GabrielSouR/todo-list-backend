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

const getUserTasksWithFilters = async (userId, page, limit, completed, search) => {
    const offset = (page - 1) * limit;
  
    let query = 'SELECT id, title, completed, created_at FROM tasks WHERE user_id = ?';
    const params = [userId];
  
    if (completed !== undefined) {
      query += ' AND completed = ?';
      params.push(completed === 'true');
    }
  
    if (search) {
      query += ' AND title LIKE ?';
      params.push(`%${search}%`);
    }
  
    const countQuery = query.replace('SELECT id, title, completed, created_at', 'SELECT COUNT(*) as total');
  
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
  
    const [[{ total }]] = await db.query(countQuery, params.slice(0, params.length - 2));
    const [tasks] = await db.query(query, params);
  
    return {
      page,
      limit,
      total,
      tasks
    };
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  getUserTasksWithFilters
};
