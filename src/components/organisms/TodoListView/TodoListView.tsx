// import { useAppDispatch } from "@app/store/store";
import { useState } from "react";
import type { TodoType } from "@app/store/todos/todos-types";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";
// import { TodoEditor } from "../TodoEditor/TodoEditor";

import s from "./TodoListView.module.scss";

interface TodoListViewProps {
  todos: TodoType[];
}

export function TodoListView({ todos }: TodoListViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ul className={s.list}>
      {todos.map((item) => (
        <li key={item.id} className={s.listItem}>
          {/* {item.isEditing ? <TodoEditor /> : <TodoItem todo={item} />} */}

          {isEditing ? (
            <p>Editing mode is enabled</p>
          ) : (
            <TodoItem todo={item} />
          )}
        </li>
      ))}
    </ul>
  );
}

// <TodoEdit {...item} />
