import { GoStar, GoStarFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { deleteTodo, pinTodo, toggleTodo } from "@app/store/todos/todos-slice";
import { selectPinnedCount } from "@app/store/todos/todos-selectors";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { ConfirmDeleteModal } from "@components/molecules/ConfirmDeleteModal/ConfirmDeleteModal";
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
  const pinnedCount = useAppSelector(selectPinnedCount);
  const isLimitExceeded = !todo.pinned && pinnedCount >= 3;

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  const handleDelete = (id: number) => {
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
        <button
          type="button"
          disabled={isLimitExceeded}
          className={`${s.itemStarWrap} ${todo.pinned ? s.itemStarWrapPinned : ""}`}
          onClick={() => dispatch(pinTodo({ id: todo.id }))}
        >
          <GoStar className={s.itemStarOutline} size={18} />
          <GoStarFill className={s.itemStarFill} size={18} />

          <span className={s.itemPinnedCount}>{pinnedCount}/3</span>
        </button>

        <div className={s.itemButtonsWrap}>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonEdit}
            onClick={onEdit}
          >
            edit
          </button>
          <button
            type="button"
            className={s.itemButton + " " + s.itemButtonDelete}
            onClick={() => handleDelete(todo.id)}
          >
            delete
          </button>
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
