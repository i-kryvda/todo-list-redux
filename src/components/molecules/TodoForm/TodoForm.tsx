// import { createTodo } from "@app/store/todos/todos-slice";
// import { useAppDispatch } from "@app/store/store";
import { useInput } from "@shared/hooks/useInput/useInput";
// --- STYLES ---
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, description });
    onResetTitle();
    onResetDescription();
  };

  return (
    <form className={s.editor} onSubmit={handleSubmit}>
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
          disabled={!title.trim()}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
