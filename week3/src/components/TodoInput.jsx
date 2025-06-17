import React from 'react';

const TodoInput = ({ input, onInputChange, onSubmit }) => {
  return (
    <div>
      <p>추가하고 싶은 할 일을 입력하신 후, 아래 버튼을 눌러주세요.</p>
      <input
        onChange={onInputChange}
        value={input}
        placeholder="예: 프레젠테이션 준비하기"
        style={{ padding: "4px", marginRight: "8px", width: "60%" }}
      />
      <button onClick={onSubmit}>할 일 추가</button>
    </div>
  );
};

export default TodoInput; 