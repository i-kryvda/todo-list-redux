import { useAppDispatch } from "@app/store/store";
import { deleteTodo, toggleTodo } from "@app/store/todos/todos-slice";
import { GoStar, GoStarFill } from "react-icons/go";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoItem.module.scss";

export function TodoItem({
  todo,
  onEdit,
}: {
  todo: TodoType;
  onEdit?: () => void;
}) {
  const dispatch = useAppDispatch();

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  return (
    <div className={s.item}>
      <div className={s.itemActions}>
        <button type="button" className={s.itemStarWrap}>
          <GoStar className={s.itemStarOutline} size={18} />
          <GoStarFill className={s.itemStarFill} size={18} />
        </button>

        <div className={s.itemButtonsWrap}>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonEdit}
            onClick={onEdit}
          >
            edit
          </button>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonDelete}
            onClick={() => dispatch(deleteTodo({ id: todo.id }))}
          >
            delete
          </button>
        </div>
      </div>
      <div className={s.itemBody}>
        <label className={s.itemLabel}>
          <input
            type="checkbox"
            className={s.nativeCheckbox}
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo({ id: todo.id }))}
          />
          <span className={s.customCheckbox} />
          <span className={s.itemTitle}>{todo.title}</span>
        </label>

        <p className={s.itemDescription}>{description}</p>
      </div>
    </div>
  );
}
