// 1. 수정 버튼을 클릭한 경우에만 `input`이 보이도록 코드를 작성해보세요.
// 2. 할일 완료상태를 체크할 수 있는 요소를 추가해보세요.
// 3. Todo 앱의 제목을 표시하는 헤더를 추가해보세요.
// 4. 작성된 Todo-App의 레이아웃을 정렬해보세요. (flex/grid 권장)
// 5. 수정/추가/삭제 버튼을 디자인 해보세요.
// 6. 자유롭게 적용해보고 싶은 CSS를 작성해보세요

import { useState } from "react";
import "./App.css";



function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="app-container">
      {/* 3. Todo 앱 제목 헤더 */}
      <h1>📝 My Todo App</h1>

      {/* Todo 목록 렌더링 */}
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />

      {/* Todo 입력 폼 */}
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), content: inputValue.trim(), done: false };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="새 할 일을 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>추가하기</button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const handleEditClick = () => {
    if (isEditing && inputValue.trim()) {
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, content: inputValue.trim() } : el
        )
      );
    }
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
  };

  const toggleDone = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, done: !el.done } : el
      )
    );
  };

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}> 
      

      {isEditing ? (
        <input
          className="edit-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className="todo-content">{todo.content}</span>
      )}

      <button onClick={handleEditClick} className="edit-btn">
        {isEditing ? '저장' : '수정'}
      </button>
      <button onClick={handleDelete} className="delete-btn">삭제</button>

      <input
        type="checkbox"
        checked={todo.done}
        onChange={toggleDone}
        className="checkbox"
      />
    </li>
  );
}

export default App;
