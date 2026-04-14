import { useAppDispatch } from "@app/store/store";
import { updateTodo } from "@app/store/todos/todos-slice";
import { TodoForm } from "@components/molecules/TodoForm/ui";

export function EditTodo({
  todo,
  onClose,
}: {
  todo: { id: string; title: string; description?: string };
  onClose?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleEditTodo = (data: { title: string; description?: string }) => {
    const update = {
      id: todo.id,
      ...data,
    };
    dispatch(updateTodo(update));
    onClose?.();
  };

  return (
    <TodoForm
      initialTitle={todo.title}
      initialDescription={todo.description}
      onClose={onClose}
      onSubmit={handleEditTodo}
    />
  );
}
