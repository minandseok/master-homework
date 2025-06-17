import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  if (todos.length === 0) {
    return <p>등록된 할 일이 없습니다.</p>;
  }

  const sortedTodos = [...todos].sort((a, b) => b.id - a.id);

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList; 