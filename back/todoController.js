const todoService = require('./todoService');

exports.getTodos = (req, res) => {
  const todos = todoService.getTodos();
  res.json(todos);
};

exports.createTodo = (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Task text is required.' });
  }

  const todo = todoService.createTodo(text.trim());
  res.status(201).json(todo);
};

exports.toggleTodo = (req, res) => {
  const { id } = req.params;
  const updated = todoService.toggleTodo(id);

  if (!updated) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  res.json(updated);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const deleted = todoService.deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  res.status(204).send();
};
