import { useAutoFocus } from "@shared/hooks/useAutoFocus/useAutoFocus";
import { MAX_TITLE_LENGTH, validateTitle } from "../lib/utils";
import {
  useAutoResizeTextarea,
  useFieldError,
  useTodoForm,
} from "../lib/hooks";

import s from "./TodoForm.module.scss";

type TodoFormProps = {
  onClose?: () => void;
  onSubmit: (data: { title: string; description?: string }) => void;
  initialTitle?: string;
  initialDescription?: string;
};

export function TodoForm({
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
}: TodoFormProps) {
  const { title, description } = useTodoForm(initialTitle, initialDescription);

  const titleField = useFieldError(title.value, validateTitle);

  const onSubmitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleField.error) return;

    const data = {
      title: title.value.trim(),
      description: description.value,
    };

    onSubmit(data);
    title.onReset();
    description.onReset();
  };

  const textareaRef = useAutoResizeTextarea(description.value);
  const inputRef = useAutoFocus<HTMLInputElement>();

  return (
    <form className={s.editor} onSubmit={onSubmitHendler}>
      <div className={s.editorTitleCounter}>
        {title.value.length} / {MAX_TITLE_LENGTH}
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
          aria-invalid={titleField.hasError}
          aria-describedby={
            titleField.hasError ? "todo-title-error" : undefined
          }
          type="text"
          id="todo-title"
          className={`${s.editorField} ${s.editorFieldTitle}`}
          placeholder="Title is required"
          value={title.value}
          onChange={title.onChange}
          ref={inputRef}
        />

        <label
          htmlFor="todo-description"
          className="todo-editor__label visually-hidden"
        >
          Description
        </label>

        <textarea
          id="todo-description"
          className={`${s.editorField} ${s.editorFieldDescription}`}
          placeholder="Optional description..."
          value={description.value}
          onChange={description.onChange}
          ref={textareaRef}
          rows={1}
        />
      </div>

      <div className={s.editorFooter}>
        <p
          id="todo-title-error"
          role="alert"
          className={s.editorTitleError}
          style={{
            opacity: titleField.hasError ? 1 : 0,
            transform: titleField.hasError
              ? "translateX(0) scale(1)"
              : "translateX(-200px) scale(0)",
          }}
        >
          {titleField.error}
        </p>

        <div className={s.editorButtons}>
          <button
            type="button"
            className={`${s.editorBtn} ${s.editorBtnCancel}`}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`${s.editorBtn} ${s.editorBtnSave}`}
            disabled={titleField.hasError || !title.value.trim()}
          >
            save
          </button>
        </div>
      </div>
    </form>
  );
}
