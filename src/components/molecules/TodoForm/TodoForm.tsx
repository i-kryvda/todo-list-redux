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
import { Tooltip } from "@components/atoms/Tooltip/Tooltip";

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
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateTitle(title);
    setTitleError(error);
    if (error) return;

    const trimmedTitle = title.trim();
    // const trimmedDescription = truncateDescription(description);

    onSubmit({ title: trimmedTitle, description });
    onResetTitle();
    onResetDescription();
    setTitleError("");
    setTouched(false);
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (!touched) return;
    setTitleError(validateTitle(title));
  }, [title, touched]);

  const [visibleError, setVisibleError] = useState("");
  useEffect(() => {
    if (titleError) {
      setVisibleError(titleError);
    } else {
      // даємо анімації завершитись
      const timer = setTimeout(() => {
        setVisibleError("");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [titleError]);

  return (
    <form className={s.editor} onSubmit={handleSubmit}>
      <div className={s.titleCounter}>
        {title.length} / {MAX_TITLE_LENGTH}
      </div>

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
          placeholder="Title is required"
          value={title}
          onChange={onChangeTitle}
          onBlur={() => setTouched(true)}
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
        <p
          className={s.error}
          style={{
            opacity: titleError ? 1 : 0,
            transform: titleError ? "translateX(0)" : "translateX(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {visibleError}
        </p>

        <div className={s.editorButtons}>
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
      </div>
    </form>
  );
}
