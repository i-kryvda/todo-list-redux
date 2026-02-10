import { TodoForm } from "@components/molecules/TodoForm/TodoForm";
import { createTodo } from "@app/store/todos/todos-slice";
import { useAppDispatch } from "@app/store/store";

export function CreateTodo({ onClose }: { onClose?: () => void }) {
  const dispatch = useAppDispatch();

  return (
    <TodoForm
      submitText="Save"
      onSubmit={(data) => dispatch(createTodo(data.title, data.description))}
      onClose={onClose}
    />
  );
}
