function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button className="todo-toggle" onClick={() => onToggle(todo.id)}>
        {todo.completed ? '취소' : '완료'}
      </button>
      <div className="todo-content">
        <p>{todo.text}</p>
        <span>{new Date(todo.createdAt).toLocaleString('ko-KR')}</span>
      </div>
      <button className="button danger" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
