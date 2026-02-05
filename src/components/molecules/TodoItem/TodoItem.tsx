import { useAppDispatch } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoItem.module.scss";

export function TodoItem({ todo }: { todo: TodoType }) {
  const dispatch = useAppDispatch();

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  return (
    <li className={s.item} key={todo.id}>
      <div className={s.itemActions}>
        <button
          type="button"
          className={s.itemButton + " " + s.itemButtonComplete}
          onClick={() => dispatch(deleteTodo({ id: todo.id }))}
        >
          complete
        </button>

        <button
          type="button"
          className={s.itemButton + " " + s.itemButtonEdit}
          onClick={() => dispatch(deleteTodo({ id: todo.id }))}
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
      <div className={s.itemBody}>
        <p className={s.itemTitle}>{todo.title}</p>
        <p className={s.itemDescription}>{description}</p>
      </div>
    </li>
  );
}
