import { useAppDispatch, useAppSelector } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";

export function TodoList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const description = todo.description?.trim()
          ? todo.description
          : "empty description";

        return (
          <li className="todo-list__item">
            <div className="todo-list__body">
              <p className="todo-list__title">{todo.title}</p>
              <p className="todo-list__description">{description}</p>
            </div>
            <div className="todo-list__actions">
              <button
                type="button"
                className="todo-list__button"
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
