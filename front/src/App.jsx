import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = 'http://localhost:4000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError('Todo를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Todo 추가에 실패했습니다.');
    }

    const newTodo = await response.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('상태 변경에 실패했습니다.');
    }

    const updated = await response.json();
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('삭제에 실패했습니다.');
    }

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <div>
            <p className="eyebrow">Checklist</p>
            <h1>할 일 관리</h1>
          </div>
        </header>

        <TodoInput onAdd={addTodo} />

        {error && <div className="toast error">{error}</div>}
        {loading ? (
          <div className="empty-state">로딩 중...</div>
        ) : (
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  );
}

export default App;
