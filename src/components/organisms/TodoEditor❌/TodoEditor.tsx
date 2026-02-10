import { createTodo } from "@app/store/todos/todos-slice";
import { useAppDispatch } from "@app/store/store";
import { useInput } from "@shared/hooks/useInput/useInput";
// --- STYLES ---
import s from "./TodoEditor.module.scss";

type TodoEditorProps = {
  onClose?: () => void;
};

export function TodoEditor({ onClose }: TodoEditorProps) {
  const dispatch = useAppDispatch();

  const {
    value: text,
    onChange: onChangeText,
    onReset: onResetText,
  } = useInput("");
  const {
    value: description,
    onChange: onChangeDescription,
    onReset: onResetDescription,
  } = useInput("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTodo(text, description));
    onResetText();
    onResetDescription();
  };

  return (
    <form className={s.editor} onSubmit={onSubmit}>
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
          value={text}
          onChange={onChangeText}
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
          disabled={!text.trim()}
        >
          Add task
        </button>
      </div>
    </form>
  );
}
