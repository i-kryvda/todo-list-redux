// import { useAppDispatch } from "@app/store/store";
import { useState } from "react";
import type { TodoType } from "@app/store/todos/todos-types";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";
// import { TodoEditor } from "../TodoEditor/TodoEditor";

import s from "./TodoListView.module.scss";
import { EditTodo } from "../EditTodo/EditTodo";

interface TodoListViewProps {
  todos: TodoType[];
}

function TodoItemView({ todo }: { todo: TodoType }) {
  const [isEditing, setIsEditing] = useState(false);

  const onOpen = () => setIsEditing(true);
  const onClose = () => setIsEditing(false);

  return (
    <>
      {isEditing ? (
        <EditTodo todo={todo} onClose={onClose} />
      ) : (
        <TodoItem todo={todo} onClick={onOpen} />
      )}
    </>
  );
}

export function TodoListView({ todos }: TodoListViewProps) {
  return (
    <ul className={s.list}>
      {todos.map((item) => (
        <li key={item.id} className={s.listItem}>
          <TodoItemView todo={item} />
        </li>
      ))}
    </ul>
  );
}

// <TodoEdit {...item} />
