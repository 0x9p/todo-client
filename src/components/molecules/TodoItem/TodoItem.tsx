import React, { useCallback } from 'react';

import styles from './TodoItem.module.scss';

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export interface TodoItemProps extends Todo {
  onStatusChange(id: string, status: boolean): void
  onDelete(id: string): void
}

function TodoItem(props: TodoItemProps) {
  const onStatusChangeCb = useCallback(() => {
    props.onStatusChange(props.id, !props.completed);
  }, [props])

  const onDeleteCb = useCallback(() => {
    props.onDelete(props.id);
  }, [props])

  return (
    <div className={styles.todoItem}>
      <input
        className={styles.status}
        type="checkbox"
        checked={props.completed}
        onChange={onStatusChangeCb}
      />
      <div className={styles.content}>{props.content}</div>
      <div className={styles.delete} onClick={onDeleteCb}>
        <img src="images/cross.svg" className={styles.deleteIcon} alt="delete" />
      </div>
    </div>
  );
}

export default TodoItem;
