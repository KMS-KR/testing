import { useState } from 'react';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError('할 일을 입력해주세요.');
      return;
    }

    try {
      await onAdd(trimmed);
      setText('');
      setError('');
    } catch (err) {
      setError('추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form className="todo-input-card" onSubmit={handleSubmit}>
      <label className="todo-label" htmlFor="todo-input">
        새 할 일
      </label>
      <div className="todo-input-row">
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="오늘 해야 할 일을 입력하세요"
        />
        <button type="submit" className="button primary">
          추가
        </button>
      </div>
      {error && <div className="field-error">{error}</div>}
    </form>
  );
}

export default TodoInput;
