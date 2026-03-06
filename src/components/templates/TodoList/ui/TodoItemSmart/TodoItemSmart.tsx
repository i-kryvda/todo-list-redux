import { useState } from "react";
import { useAppDispatch } from "@app/store/store";
import { deleteTodo } from "@app/store/todos/todos-slice";
import type { TodoType } from "@app/store/todos/todos-types";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { EditTodo } from "@components/organisms/EditTodo/EditTodo";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";
import { ConfirmDeleteModal } from "@components/organisms/ConfirmDeleteModal/ConfirmDeleteModal";

export function TodoItemSmart({ todo }: { todo: TodoType }) {
  const [isEditing, setEditing] = useState(false);
  const { openModal, closeModal } = useModalStack();
  const dispatch = useAppDispatch();

  const confirmDelete = (id: string) => dispatch(deleteTodo({ id }));

  const handleDelete = (id: string) => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => confirmDelete(id)}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  return (
    <>
      {isEditing ? (
        <EditTodo todo={todo} onClose={() => setEditing(false)} />
      ) : (
        <TodoItem
          todo={todo}
          onEdit={() => setEditing(true)}
          onDelete={(id) => handleDelete(id)}
        />
      )}
    </>
  );
}
