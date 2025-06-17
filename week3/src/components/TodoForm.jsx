import React, { useState } from 'react';
import TodoInput from './TodoInput';

const TodoForm = ({ todos, setTodos, setIsError }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setIsError(true);
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.length < 1) {
      alert("내용을 입력해주세요.");
      return;
    }
    setTodos([...todos, { title: input, id: Math.random() * 10000 }]);
    setInput("");
    setIsError(false);
  };

  return (
    <div>
      <TodoInput
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TodoForm; 