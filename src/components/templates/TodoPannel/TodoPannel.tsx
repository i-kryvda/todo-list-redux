import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAppSelector } from "@app/store";
import { selectFilter } from "@app/store/todos";
import { CreateTodo } from "@components/organisms/add-todo/ui";

import s from "./TodoPannel.module.scss";

export function TodoPannel() {
  const [isOpen, setIsOpen] = useState(false);
  const filter = useAppSelector(selectFilter);

  if (filter === "completed") return null;

  return (
    <section className={s.editorSection} aria-labelledby="todo-editor-title">
      <h2 id="todo-editor-title" className="visually-hidden">
        Todo Editor
      </h2>

      {isOpen ? (
        <CreateTodo onClose={() => setIsOpen(false)} />
      ) : (
        <button
          className={s.editorSectionToggle}
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <FiPlus className={s.editorSectionToggleIcon} />
          <span>Create task</span>
        </button>
      )}
    </section>
  );
}
