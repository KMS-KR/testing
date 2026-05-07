import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching from:', API_URL);
      const response = await fetch(API_URL);
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data:', data);
      if (!Array.isArray(data)) {
        console.error('Expected array, got:', data);
        setError('서버에서 잘못된 데이터를 받았습니다.');
        return;
      }
      setTodos(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Todo를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      console.log('Adding todo:', text);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      console.log('Add response:', response);
      if (!response.ok) {
        throw new Error('Todo 추가에 실패했습니다.');
      }
      const newTodo = await response.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error('Add error:', err);
      setError('Todo 추가에 실패했습니다.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      console.log('Toggling todo:', id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
      });
      console.log('Toggle response:', response);
      if (!response.ok) {
        throw new Error('상태 변경에 실패했습니다.');
      }
      const updated = await response.json();
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      console.error('Toggle error:', err);
      setError('상태 변경에 실패했습니다.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log('Deleting todo:', id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      console.log('Delete response:', response);
      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError('삭제에 실패했습니다.');
    }
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
