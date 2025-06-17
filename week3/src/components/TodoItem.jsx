import React from 'react';

const TodoItem = ({ id, title, completed }) => {
  return (
    <li style={{ background: id % 2 === 0 ? "#eef" : "#fee", padding: "4px", marginBottom: "4px" }}>
      {title || "제목 없음"} {completed ? "✅ 완료됨" : ""}
    </li>
  );
};

export default TodoItem; 