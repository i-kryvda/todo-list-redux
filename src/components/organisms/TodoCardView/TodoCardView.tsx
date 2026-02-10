import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoCardView.module.scss";
import { TodoItemView } from "../TodoItemView/TodoItemView";

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
