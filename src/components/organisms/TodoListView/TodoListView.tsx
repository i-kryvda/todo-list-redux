import { TodoItemView } from "../TodoItemView/TodoItemView";
import type { TodoType } from "@app/store/todos/todos-types";

import s from "./TodoListView.module.scss";

interface TodoListViewProps {
  todos: TodoType[];
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
