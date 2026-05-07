let todos = [];
let nextId = 1;

exports.getTodos = () => {
  return [...todos].sort((a, b) => b.createdAt - a.createdAt);
};

exports.createTodo = (text) => {
  const todo = {
    id: String(nextId++),
    text,
    completed: false,
    createdAt: Date.now(),
  };

  todos.push(todo);
  return todo;
};

exports.toggleTodo = (id) => {
  const todo = todos.find((item) => item.id === id);
  if (!todo) return null;

  todo.completed = !todo.completed;
  return todo;
};

exports.deleteTodo = (id) => {
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
};
