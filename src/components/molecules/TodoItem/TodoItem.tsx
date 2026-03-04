import { GoStar, GoStarFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { deleteTodo, pinTodo, toggleTodo } from "@app/store/todos/todos-slice";
import { selectTodoLimitExceeded } from "@app/store/todos/todos-selectors";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { ConfirmDeleteModal } from "@components/molecules/ConfirmDeleteModal/ConfirmDeleteModal";
import { Tooltip } from "@components/atoms/Tooltip/Tooltip";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoItem.module.scss";

export function TodoItem({
  todo,
  onEdit,
}: {
  todo: TodoType;
  onEdit?: () => void;
}) {
  const { openModal, closeModal } = useModalStack();
  const dispatch = useAppDispatch();
  const LimitExceeded = useAppSelector(selectTodoLimitExceeded);

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  const handleDelete = (id: string) => {
    openModal((modalId) => (
      <ConfirmDeleteModal
        onConfirm={() => dispatch(deleteTodo({ id }))}
        onClose={() => closeModal(modalId)}
      />
    ));
  };

  return (
    <div className={s.item}>
      <div className={s.itemActions}>
        <Tooltip content="PIN">
          <button
            type="button"
            disabled={todo.completed || (!todo.pinned && LimitExceeded)}
            className={`${s.itemStarWrap} ${todo.pinned ? s.itemStarWrapPinned : ""}`}
            onClick={() => dispatch(pinTodo({ id: todo.id }))}
          >
            <GoStar className={s.itemStarOutline} size={18} />
            <GoStarFill className={s.itemStarFill} size={18} />
          </button>
        </Tooltip>

        <div className={s.itemButtonsWrap}>
          <Tooltip content="EDIT">
            <button
              type="button"
              className={s.itemButton + " " + s.itemButtonEdit}
              onClick={onEdit}
              aria-label="Edit todo"
            />
          </Tooltip>

          <Tooltip content="DELETE">
            <button
              type="button"
              className={s.itemButton + " " + s.itemButtonDelete}
              onClick={() => handleDelete(todo.id)}
              aria-label="Delete todo"
            />
          </Tooltip>
        </div>
      </div>
      <div className={s.itemBody}>
        <label className={s.itemLabel}>
          <input
            type="checkbox"
            className={s.nativeCheckbox}
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo({ id: todo.id }))}
          />
          <span className={s.customCheckbox} />
          <span className={s.itemTitle}>{todo.title}</span>
        </label>

        <p className={s.itemDescription}>{description}</p>
      </div>
    </div>
  );
}
