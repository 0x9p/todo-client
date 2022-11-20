import React from 'react';

import TodoItem, { Todo } from "../TodoItem/TodoItem";

export interface TodoListProps {
  todos: Todo[];
  onStatusChange(id: string, status: boolean): void
  onDelete(id: string): void
}

function TodoList(props: TodoListProps) {
  return (
    <>
      {props.todos.map(todo => (
        <TodoItem
          {...todo}
          key={todo.id}
          onStatusChange={props.onStatusChange}
          onDelete={props.onDelete}
        />
      ))}
    </>
  );
}

export default TodoList;
