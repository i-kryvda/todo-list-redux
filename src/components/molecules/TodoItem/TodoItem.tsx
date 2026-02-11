import type { TodoType } from "@app/store/todos/todos-types";
import { useAppDispatch } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";
import { GoStar, GoStarFill } from "react-icons/go";
import s from "./TodoItem.module.scss";
import { useState } from "react";

export function TodoItem({
  todo,
  onClick,
}: {
  todo: TodoType;
  onClick?: () => void;
}) {
  const [completed, setCompleted] = useState(false);
  const dispatch = useAppDispatch();

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  return (
    <div className={s.item} key={todo.id}>
      <div className={s.itemActions}>
        <button type="button" className={s.itemStarWrap}>
          <GoStar className={s.itemStarOutline} size={18} />
          <GoStarFill className={s.itemStarFill} size={18} />
        </button>

        <div className={s.itemButtonsWrap}>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonEdit}
            onClick={onClick}
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
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span className={s.customCheckbox} />
          <span className={s.itemTitle}>{todo.title}</span>
        </label>

        <p className={s.itemDescription}>{description}</p>
      </div>
    </div>
  );
}
