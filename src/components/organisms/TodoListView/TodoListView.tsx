// import { useAppDispatch } from "@app/store/store";

import type { TodoType } from "@app/store/todos/todos-types";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";

import s from "./TodoListView.module.scss";

interface TodoListViewProps {
  todos: TodoType[];
}

export function TodoListView({ todos }: TodoListViewProps) {
  return (
    <ul className={s.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
