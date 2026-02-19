import { useEffect, useState } from "react";
// import { GiCrossMark } from "react-icons/gi";

import { useAppDispatch, useAppSelector } from "@app/store/store";
import {
  selectHasCompleted,
  selectFilter,
  selectSortedTodos,
} from "@app/store/todos/todos-selectors";

import { TodoListView } from "../TodoListView/TodoListView";
import { TodoCardView } from "../TodoCardView/TodoCardView";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineViewList } from "react-icons/hi";
// import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

import s from "./TodoList.module.scss";
import { clearCompleted } from "@app/store/todos/todos-slice";
import { EmptyState } from "@components/atoms/EmptyState/EmptyState";

export function TodoList() {
  const [view, setView] = useState<"list" | "card">("list");
  const todos = useAppSelector(selectSortedTodos);

  const filter = useAppSelector(selectFilter);
  const hasCompleted = useAppSelector(selectHasCompleted);
  const dispatch = useAppDispatch();
  const canClearCompleted = filter === "completed";
  // filter === "completed" || (!hasCompleted && filter !== "active");

  // useEffect(() => {
  //   if (filter === "completed" && !hasCompleted) {
  //     dispatch(setFilter("active"));
  //   }
  // }, [filter, hasCompleted, dispatch]);

  return (
    <section className={s.todo} aria-labelledby="todo-section__title">
      <h2 className="todo-section__title visually-hidden">Your Todos List</h2>

      <div className={s.todoHeader}>
        <button
          type="button"
          className={s.todoToggleViewButton}
          aria-label="Toggle todo view"
          disabled={todos.length === 0}
          onClick={() => setView((prev) => (prev === "list" ? "card" : "list"))}
        >
          <span>{view === "list" ? "Card view" : "List view"}</span>
          {view === "list" ? <HiOutlineViewGrid /> : <HiOutlineViewList />}
        </button>

        {canClearCompleted && (
          <button
            type="button"
            className={s.todoToggleViewButton}
            disabled={!hasCompleted}
            aria-label="Clear completed todos"
            style={{
              border: "none",
            }}
            // style={{ padding: 15, border: "1px solid white" }}
            onClick={() => dispatch(clearCompleted())}
          >
            <span>clear {filter}</span>
            <AiOutlineClear style={{ transform: "rotate(25deg)" }} />
          </button>
        )}
      </div>

      <div className={s.todoBody}>
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {view === "list" && <TodoListView todos={todos} />}
            {view === "card" && <TodoCardView todos={todos} />}
          </>
        )}
      </div>
    </section>
  );
}
