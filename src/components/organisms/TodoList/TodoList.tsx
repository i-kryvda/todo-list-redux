import { useState } from "react";
import { useAppSelector } from "@app/store/store";
import { TodoListView } from "../TodoListView/TodoListView";
import s from "./TodoList.module.scss";
import { TodoCardView } from "../TodoCardView/TodoCardView";

export function TodoList() {
  const [view, setView] = useState<"list" | "card">("list");
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <section className={s.todo}>
      {/* <h2 className="todo-section__title visually-hidden">Your Todos</h2> */}

      <div className={s.todoBody}>
        <button
          type="button"
          onClick={() => setView(view === "list" ? "card" : "list")}
        >
          Toggle View
        </button>

        {view === "list" && <TodoListView todos={todos} />}
        {view === "card" && <TodoCardView todos={todos} />}
      </div>
    </section>
  );
}
