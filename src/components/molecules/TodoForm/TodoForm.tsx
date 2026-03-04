// import { createTodo } from "@app/store/todos/todos-slice";
// import { useAppDispatch } from "@app/store/store";
import { useInput } from "@shared/hooks/useInput/useInput";
// --- STYLES ---
import s from "./TodoForm.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  MAX_TITLE_LENGTH,
  truncateDescription,
  validateTitle,
} from "./lib/validateTodo";

type TodoFormProps = {
  onClose?: () => void;
  onSubmit: (data: { title: string; description?: string }) => void;
  initialTitle?: string;
  submitText?: string;
  initialDescription?: string;
};

export function TodoForm({
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  submitText = "Save",
}: TodoFormProps) {
  const ref = useRef<HTMLInputElement>(null);

  const {
    value: title,
    onChange: onChangeTitle,
    onReset: onResetTitle,
  } = useInput(initialTitle);
  const {
    value: description,
    onChange: onChangeDescription,
    onReset: onResetDescription,
  } = useInput(initialDescription);

  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateTitle(title);
    setTitleError(error);
    if (error) return;

    const trimmedTitle = title.trim();
    const trimmedDescription = truncateDescription(description);

    onSubmit({ title: trimmedTitle, description: trimmedDescription });
    onResetTitle();
    onResetDescription();
    // onClose?.();
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    setTitleError(validateTitle(title));
  }, [title]);

  return (
    <form className={s.editor} onSubmit={handleSubmit}>
      {titleError && <p className={s.error}>{titleError}</p>}
      <div className={s.editorBody}>
        <label
          htmlFor="todo-title"
          className="todo-editor__label visually-hidden"
        >
          Title
        </label>

        <input
          required
          type="text"
          id="todo-title"
          className={`${s.editorField} ${s.editorFieldTitle}`}
          placeholder="Create title..."
          value={title}
          onChange={onChangeTitle}
          ref={ref}
        />

        <label
          htmlFor="todo-description"
          className="todo-editor__label visually-hidden"
        >
          Description
        </label>

        <input
          type="text"
          id="todo-description"
          className={`${s.editorField} ${s.editorFieldDescription}`}
          placeholder="Optional description..."
          value={description}
          onChange={onChangeDescription}
        />
      </div>

      <div className={s.editorFooter}>
        <div className={s.counter}>
          {title.length} / {MAX_TITLE_LENGTH}
        </div>
        <button
          type="button"
          className={`${s.editorBtn} ${s.editorBtnSecondary}`}
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`${s.editorBtn} ${s.editorBtnPrimary}`}
          disabled={!!titleError}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
