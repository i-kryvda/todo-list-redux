import { useState } from "react";
import { useAppSelector } from "@app/store/store";
import { TodoListView } from "../TodoListView/TodoListView";

export function TodoList() {
  const [view, setView] = useState<"list" | "card">("list");
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <section className="todo-section">
      <h2 className="todo-section__title visually-hidden">Your Todos</h2>

      <div className="todo-section__body">
        <button type="button">View mode</button>

        {view === "list" && <TodoListView todos={todos} />}
        {/* {view === "card" && <TodoCardView todos={todos} />} */}
      </div>
    </section>
  );
}
