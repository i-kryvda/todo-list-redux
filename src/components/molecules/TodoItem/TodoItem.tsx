import { GoStar, GoStarFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { pinTodo, toggleTodo } from "@app/store/todos/todos-slice";
import { selectTodoLimitExceeded } from "@app/store/todos/todos-selectors";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { truncate } from "./lib/truncate";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoItem.module.scss";
import { useState } from "react";

export function TodoItem({
  todo,
  onEdit,
  onDelete,
}: {
  todo: TodoType;
  onEdit?: () => void;
  onDelete: (id: string) => void;
}) {
  const [isCompleting, setIsCompleting] = useState(false);
  const dispatch = useAppDispatch();
  const LimitExceeded = useAppSelector(selectTodoLimitExceeded);

  const onChangeHandle = () => {
    setIsCompleting(true);

    setTimeout(() => {
      dispatch(toggleTodo({ id: todo.id }));
      setIsCompleting(false);
    }, 300);
  };

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  const trimmedDescription = truncate(description, 200);

  return (
    <div className={`${s.item} ${isCompleting ? s.completing : ""}`}>
      <div className={s.itemActions}>
        <button
          type="button"
          aria-label="Pin task"
          disabled={todo.completed || (!todo.pinned && LimitExceeded)}
          className={`${s.itemStarWrap} ${todo.pinned ? s.itemStarWrapPinned : ""}`}
          onClick={() => dispatch(pinTodo({ id: todo.id }))}
        >
          <GoStar className={s.itemStarOutline} size={18} />
          <GoStarFill className={s.itemStarFill} size={18} />
        </button>

        <div className={s.itemButtonsWrap}>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonEdit}
            onClick={onEdit}
            aria-label="Edit todo"
          >
            <MdOutlineEdit />
          </button>

          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonDelete}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            <RxCross2 />
          </button>
        </div>
      </div>
      <div className={s.itemBody}>
        <label className={s.itemLabel}>
          <input
            type="checkbox"
            className={s.nativeCheckbox}
            checked={todo.completed}
            onChange={onChangeHandle}
          />
          <span className={s.customCheckbox} />
          <span className={s.itemTitle}>{todo.title}</span>
        </label>

        <p className={s.itemDescription}>{trimmedDescription}</p>
      </div>
    </div>
  );
}
