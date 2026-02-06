import { useState } from "react";
import { useAppSelector } from "@app/store/store";
import { TodoListView } from "../TodoListView/TodoListView";
import { TodoCardView } from "../TodoCardView/TodoCardView";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineViewList } from "react-icons/hi";

import s from "./TodoList.module.scss";

export function TodoList() {
  const [view, setView] = useState<"list" | "card">("list");
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <section className={s.todo} aria-labelledby="todo-section__title">
      <h2 className="todo-section__title visually-hidden">Your Todos List</h2>

      <div className={s.todoBody}>
        <button
          type="button"
          className={s.todoToggleViewButton}
          aria-label="Toggle todo view"
          onClick={() => setView((prev) => (prev === "list" ? "card" : "list"))}
        >
          <span>{view === "list" ? "Card view" : "List view"}</span>
          {view === "list" ? <HiOutlineViewGrid /> : <HiOutlineViewList />}
        </button>

        {view === "list" && <TodoListView todos={todos} />}
        {view === "card" && <TodoCardView todos={todos} />}
      </div>
    </section>
  );
}
