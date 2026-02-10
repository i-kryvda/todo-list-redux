import { useAppDispatch } from "@app/store/store";
import { updateTodo } from "@app/store/todos/todos-slice";
import { TodoForm } from "@components/molecules/TodoForm/TodoForm";

export function EditTodo({
  todo,
}: {
  todo: { id: number; title: string; description?: string };
}) {
  const dispatch = useAppDispatch();

  return (
    <TodoForm
      onSubmit={({ title, description }) =>
        dispatch(
          updateTodo({
            id: todo.id,
            title: title,
            description: description,
          }),
        )
      }
    />
  );
}

// export function EditTodo({ todo, onClose }) {
//   const dispatch = useAppDispatch();

//   return (
//     <TodoForm
//       initialTitle={todo.title}
//       initialDescription={todo.description}
//       submitText="Save changes"
//       onClose={onClose}
//       onSubmit={({ title, description }) => {
//         dispatch(updateTodo({ id: todo.id, title, description }));
//         onClose?.();
//       }}
//     />
//   );
// }
