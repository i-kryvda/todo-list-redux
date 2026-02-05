import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoCardView.module.scss";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";

interface TodoListViewProps {
  todos: TodoType[];
}

export function TodoCardView({ todos }: TodoListViewProps) {
  return (
    <ul className={s.card}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
