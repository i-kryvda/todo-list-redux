import { TodoItemView } from "../TodoItemView/TodoItemView";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoCardView.module.scss";

interface TodoListViewProps {
  todos: TodoType[];
}

export function TodoCardView({ todos }: TodoListViewProps) {
  return (
    <ul className={s.card}>
      {todos.map((todo) => (
        <TodoItemView key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
