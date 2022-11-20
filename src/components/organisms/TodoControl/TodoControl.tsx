import React, { useCallback, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import styles from './TodoControl.module.scss';

import TextField from "../../atoms/TextField";
import Panel from "../../atoms/Panel";
import TodoList from "../../molecules/TodoList";
import Button from "../../atoms/Button";

const GET_TODOS = gql`
  query GetTodos($filter: TodoFilter, $order: TodoOrder) {
    todos(filter: $filter, order: $order) {
      id
      content
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($draftTodo: DraftTodo!) {
    createTodo(draftTodo: $draftTodo) {
      id
      content
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      content
      completed
    }
  }
`;

const CHANGE_TODO_STATUS = gql`
  mutation ChangeTodoStatus($id: String!, $status: Boolean!) {
    changeTodoStatus(id: $id, status: $status) {
      id
      content
      completed
    }
  }
`;

type TodoFilter = {
  completed?: boolean;
};

enum TodoFilters {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  INCOMPLETED = "INCOMPLETED",
}

const todoFilters: Record<TodoFilters, TodoFilter | null> = {
  [TodoFilters.ALL]: null,
  [TodoFilters.COMPLETED]: { completed: true },
  [TodoFilters.INCOMPLETED]: { completed: false },
};

function TodoControl() {
  const [todoFilter, setTodoFilter] = useState<TodoFilters>(TodoFilters.ALL);

  const { loading, data } = useQuery(GET_TODOS, {
    variables: {
      filter: todoFilters[todoFilter],
      order: { field: 'createdAt', mode: 'DESC' }
    },
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [
      { query: GET_TODOS },
      'GetTodos'
    ],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
      { query: GET_TODOS },
      'GetTodos'
    ],
  });

  const [changeTodoStatus] = useMutation(CHANGE_TODO_STATUS);

  const createTodoCb = useCallback(async (content: string) => {
    await createTodo({ variables: { draftTodo: { content } } });
  }, [createTodo]);

  const deleteTodoCb = useCallback(async (id: string) => {
    await deleteTodo({ variables: { id } });
  }, [deleteTodo]);

  const changeTodoStatusCb = useCallback(async (id: string, status: boolean) => {
    await changeTodoStatus({ variables: { id, status } });
  }, [changeTodoStatus]);

  const allTodoFilter = useCallback(async () => {
    setTodoFilter(TodoFilters.ALL);
  }, [setTodoFilter]);

  const completedTodoFilter = useCallback(async () => {
    setTodoFilter(TodoFilters.COMPLETED);
  }, [setTodoFilter]);

  const incompletedTodoFilter = useCallback(async () => {
    setTodoFilter(TodoFilters.INCOMPLETED);
  }, [setTodoFilter]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className={styles.todoControl}>
      <Panel>
        <div className={styles.logo}>
          <img src="images/logo.svg" alt="logo" />
        </div>
        <div className={styles.title}>
          <span>{"Todo List"}</span>
        </div>
        <TextField
          placeholder="Add a new todo"
          onUpdate={createTodoCb}
        />
        <TodoList
          todos={data.todos}
          onStatusChange={changeTodoStatusCb}
          onDelete={deleteTodoCb}
        />
        <div className={styles.filterControl}>
          <span className={styles.show}>Show:</span>
          <Button
            text="All"
            onClick={allTodoFilter}
            active={todoFilter === TodoFilters.ALL}
          />
          <Button
            text="Completed"
            onClick={completedTodoFilter}
            active={todoFilter === TodoFilters.COMPLETED}
          />
          <Button
            text="Incompleted"
            onClick={incompletedTodoFilter}
            active={todoFilter === TodoFilters.INCOMPLETED}
          />
        </div>
      </Panel>
    </div>
  );
}

export default TodoControl;
