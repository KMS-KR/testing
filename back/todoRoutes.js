const express = require('express');
const {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} = require('./todoController');

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', toggleTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
