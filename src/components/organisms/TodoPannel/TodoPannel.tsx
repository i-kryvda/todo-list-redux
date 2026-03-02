import { useState } from "react";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import { FiPlus } from "react-icons/fi";
import "./TodoPannel.scss";
import { useAppSelector } from "@app/store/store";
import { selectFilter } from "@app/store/todos/todos-selectors";

export function TodoPannel() {
  const [isOpen, setIsOpen] = useState(false);
  const filter = useAppSelector(selectFilter);

  if (filter === "completed") {
    return null; // не показуємо панель, якщо фільтр "completed"
  }

  return (
    <section
      className="todo-editor-section"
      aria-labelledby="todo-editor-title"
    >
      <h2 id="todo-editor-title" className="visually-hidden">
        Todo Editor
      </h2>

      {isOpen ? (
        <CreateTodo onClose={() => setIsOpen(false)} />
      ) : (
        <button
          className="todo-editor-section__open-btn"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <FiPlus className="icon" />
          <span>Create task</span>
        </button>
      )}
    </section>
  );
}
