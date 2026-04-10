import { useEffect, useRef, useState } from "react";
import {
  selectHasCompleted,
  selectFilter,
  selectSearchTodos,
} from "@app/store/todos/todos-selectors";
import { clearCompleted } from "@app/store/todos/todos-slice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { EmptyState } from "@components/atoms/EmptyState/EmptyState";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import s from "./TodoList.module.scss";
import { ConfirmDeleteModal } from "@components/organisms/ConfirmDeleteModal/ConfirmDeleteModal";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { TodoItemSmart } from "./ui/TodoItemSmart";

type View = "list" | "card";
const LOAD_MORE = 10;

export function TodoList() {
  const [view, setView] = useState<View>("list");
  const [visibleCount, setVisibleCount] = useState({
    active: LOAD_MORE,
    completed: LOAD_MORE,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const todos = useAppSelector(selectSearchTodos);
  const hasCompleted = useAppSelector(selectHasCompleted);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModalStack();
  const visibleTodos = todos.slice(0, visibleCount[filter]);

  const newItemsRef = useRef<HTMLLIElement | null>(null);
  const prevCountRef = useRef(visibleCount[filter]);

  const prevFilterRef = useRef(filter);

  const handleCompletedClear = () => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => dispatch(clearCompleted())}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  const handleLoadMore = () => {
    prevCountRef.current = visibleCount[filter];

    setVisibleCount((prev) => ({
      ...prev,
      [filter]: prev[filter] + LOAD_MORE,
    }));
  };

  useEffect(() => {
    if (filter !== prevFilterRef.current) {
      prevFilterRef.current = filter;
      prevCountRef.current = visibleCount[filter];
      const id = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
      return () => clearTimeout(id);
    }

    if (visibleCount[filter] > prevCountRef.current) {
      newItemsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    prevCountRef.current = visibleCount[filter];
  }, [visibleCount, filter]);

  return (
    <section className={s.todo} aria-labelledby="todo-section__title">
      <h2 className="todo-section__title visually-hidden">Your Todos List</h2>

      <div className={s.todoHeader}>
        <button
          type="button"
          className={`${s.todoButton} ${view === "list" ? s.active : ""} ${s.todoToggleViewButton}`}
          aria-label="Toggle todo view"
          disabled={todos.length <= 1}
          onClick={() => setView((prev) => (prev === "list" ? "card" : "list"))}
        >
          <span>{view === "list" ? "Card view" : "List view"}</span>
          {view === "list" ? <HiOutlineViewGrid /> : <HiOutlineViewList />}
        </button>

        {filter === "completed" && (
          <button
            type="button"
            className={s.todoButton}
            disabled={!hasCompleted}
            aria-label="Clear completed todos"
            style={{ border: "none" }}
            onClick={handleCompletedClear}
          >
            <span>clear up</span>
            <AiOutlineClear style={{ transform: "rotate(25deg)" }} />
          </button>
        )}
      </div>

      <div className={s.todoBody}>
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className={view === "list" ? s.list : s.card}>
            {visibleTodos.map((item, index) => {
              const isFirstNew = index === prevCountRef.current;

              return (
                <li
                  key={item.id}
                  className={s.item}
                  ref={isFirstNew ? newItemsRef : null}
                >
                  <TodoItemSmart
                    todo={item}
                    isEditing={editingId === item.id}
                    onEdit={() => setEditingId(item.id)}
                    onCloseEdit={() => setEditingId(null)}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {visibleCount[filter] < todos.length && (
          <div className={s.todoActions}>
            <button onClick={handleLoadMore} className={s.todoLoadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
