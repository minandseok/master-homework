import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import TodoContainer from './components/TodoContainer';

export default function App() {
  return (
    <ErrorBoundary>
      <TodoContainer />
    </ErrorBoundary>
  );
} 