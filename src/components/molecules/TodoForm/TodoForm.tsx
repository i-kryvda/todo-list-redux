import { MAX_TITLE_LENGTH, validateTitle } from "./lib";
import { useFieldError, useAutoResizeTextarea } from "./hook";
import { useInput } from "@shared/hooks/useInput/useInput";
import { useAutoFocus } from "@shared/hooks/useAutoFocus/useAutoFocus";

import s from "./TodoForm.module.scss";

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

  const {
    error: titleError,
    visibleError,
    hasError,
  } = useFieldError(title, validateTitle);

  const onSubmitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleError) return;

    const trimmedTitle = title.trim();
    onSubmit({ title: trimmedTitle, description });
    onResetTitle();
    onResetDescription();
  };

  const textareaRef = useAutoResizeTextarea(description);

  const inputRef = useAutoFocus<HTMLInputElement>();

  return (
    <form className={s.editor} onSubmit={onSubmitHendler}>
      <div className={s.editorTitleCounter}>
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
          aria-invalid={hasError}
          aria-describedby={hasError ? "todo-title-error" : undefined}
          type="text"
          id="todo-title"
          className={`${s.editorField} ${s.editorFieldTitle}`}
          placeholder="Title is required"
          value={title}
          onChange={onChangeTitle}
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
          value={description}
          onChange={onChangeDescription}
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
            opacity: hasError ? 1 : 0,
            transform: hasError
              ? "translateX(0) scale(1)"
              : "translateX(-200px) scale(0)",
          }}
        >
          {visibleError}
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
            disabled={hasError || !title.trim()}
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
}
