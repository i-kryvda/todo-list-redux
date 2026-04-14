import { TodoForm } from "@components/molecules/TodoForm/ui";
import { createTodo } from "@app/store/todos/todos-slice";
import { useAppDispatch } from "@app/store/store";

export function CreateTodo({
  onClose,
  onSubmitSuccess,
}: {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleCreateTodo = (data: { title: string; description?: string }) => {
    dispatch(createTodo(data));
    onSubmitSuccess?.();
  };

  return <TodoForm onSubmit={handleCreateTodo} onClose={onClose} />;
}
