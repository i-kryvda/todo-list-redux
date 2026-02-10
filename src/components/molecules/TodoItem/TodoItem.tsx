import { useAppDispatch } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";
import type { TodoType } from "@app/store/todos/todos-types";

import { GoStar, GoStarFill } from "react-icons/go";

import s from "./TodoItem.module.scss";

export function TodoItem({ todo }: { todo: TodoType }) {
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
        <p className={s.itemTitle}>{todo.title}</p>
        <p className={s.itemDescription}>{description}</p>
      </div>
    </div>
  );
}
