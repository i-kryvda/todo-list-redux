import { useAppDispatch } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoListView.module.scss";

interface TodoListViewProps {
  todos: TodoType[];
}

export function TodoListView({ todos }: TodoListViewProps) {
  // const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  return (
    <ul className={s.list}>
      {todos.map((todo) => {
        const description = todo.description?.trim()
          ? todo.description
          : "description is empty";

        return (
          <li className={s.listItem} key={todo.id}>
            <div className={s.listActions}>
              <button
                type="button"
                className={s.listButton + " " + s.listButtonComplete}
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                complete
              </button>

              <button
                type="button"
                className={s.listButton + " " + s.listButtonEdit}
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                edit
              </button>
              <button
                type="button"
                className={s.listButton + " " + s.listButtonDelete}
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                delete
              </button>
            </div>
            <div className={s.listBody}>
              <p className={s.listTitle}>{todo.title}</p>
              <p className={s.listDescription}>{description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
