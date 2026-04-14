import { useAppDispatch } from "@app/store";
import { deleteTodo } from "@app/store/todos";
import type { TodoType } from "@app/store/todos";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { EditTodo } from "@components/organisms/edit-todo/ui";
import { TodoItem } from "@components/molecules/TodoItem/ui";
import { ConfirmDeleteModal } from "@components/organisms/delete-todo/ui";

type Props = {
  todo: TodoType;
  isEditing: boolean;
  onEdit: () => void;
  onCloseEdit: () => void;
};

export function TodoItemSmart({ todo, isEditing, onEdit, onCloseEdit }: Props) {
  const { openModal, closeModal } = useModalStack();
  const dispatch = useAppDispatch();

  const confirmDelete = (id: string) => dispatch(deleteTodo({ id }));

  const handleDeleteTodo = (id: string) => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => confirmDelete(id)}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  return (
    <>
      {isEditing && <EditTodo todo={todo} onClose={onCloseEdit} />}

      {!isEditing && (
        <TodoItem todo={todo} onEdit={onEdit} onDelete={handleDeleteTodo} />
      )}
    </>
  );
}
