import { useState } from "react";

import { EditTodo } from "@components/organisms/EditTodo/EditTodo";
import { TodoItem } from "@components/molecules/TodoItem/TodoItem";
import type { TodoType } from "@app/store/todos/todos-types";

// TodoItemBox | TodoItemController | TodoItemContainer
export function TodoItemView({ todo }: { todo: TodoType }) {
  const [isEditing, setIsEditing] = useState(false);

  const onOpen = () => setIsEditing(true);
  const onClose = () => setIsEditing(false);

  return (
    <>
      {isEditing ? (
        <EditTodo todo={todo} onClose={onClose} />
      ) : (
        <TodoItem todo={todo} onClick={onOpen} />
        // <TodoItem todo={todo} onEdit={() => setIsEditing(true)} />
      )}
    </>
  );
}
