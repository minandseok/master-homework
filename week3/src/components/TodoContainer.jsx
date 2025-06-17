import React, { useState, Suspense, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { todoApi, createResource } from '../api/todoApi';

// 초기 리소스 생성
const initialResource = createResource(todoApi.getTodos);

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [isError, setIsError] = useState(false);

  // 초기 데이터 로딩을 위한 컴포넌트
  const InitialDataLoader = () => {
    const data = initialResource.read();
    useEffect(() => {
      setTodos(data);
    }, [data]);
    return <TodoList todos={data} />;
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ color: isError ? "red" : "blue" }}>할 일 목록 관리 애플리케이션</h1>
      <TodoForm
        todos={todos}
        setTodos={setTodos}
        setIsError={setIsError}
      />
      <hr />
      <Suspense fallback={<p>잠시만 기다려 주세요. 데이터를 불러오고 있습니다...</p>}>
        <InitialDataLoader />
      </Suspense>
      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
        <small>버전 0.1 - 실습용으로 간단히 구현된 예제입니다.</small>
      </footer>
    </div>
  );
};

export default TodoContainer; 