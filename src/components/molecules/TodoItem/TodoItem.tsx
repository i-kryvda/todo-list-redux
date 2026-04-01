import { GoStar, GoStarFill } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { deleteTodo, pinTodo, toggleTodo } from "@app/store/todos/todos-slice";
import { selectTodoLimitExceeded } from "@app/store/todos/todos-selectors";
// import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
// import { ConfirmDeleteModal } from "@components/organisms/ConfirmDeleteModal/ConfirmDeleteModal";
import { MdOutlineEdit } from "react-icons/md";
// import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from "@components/atoms/Tooltip/Tooltip";
import { truncate } from "./lib/truncate";
import type { TodoType } from "@app/store/todos/todos-types";
import s from "./TodoItem.module.scss";
import { useState } from "react";

export function TodoItem({
  todo,
  onEdit,
  onDelete,
}: {
  todo: TodoType;
  onEdit?: () => void;
  onDelete: (id: string) => void;
}) {
  // const { openModal, closeModal } = useModalStack();

  // const confirmDelete = (id: string) => dispatch(deleteTodo({ id }));

  // const handleDelete = (id: string) => {
  //   openModal((modalId) => (
  //     <ConfirmDeleteModal
  //       onConfirm={() => confirmDelete(id)}
  //       onClose={() => closeModal(modalId)}
  //     />
  //   ));
  // };
  const [isCompleting, setIsCompleting] = useState(false);
  const dispatch = useAppDispatch();
  const LimitExceeded = useAppSelector(selectTodoLimitExceeded);

  const onChangeHandle = () => {
    setIsCompleting(true);

    setTimeout(() => {
      dispatch(toggleTodo({ id: todo.id }));
      setIsCompleting(false);
    }, 300); // 150–300мс ідеально
  };

  const description = todo.description?.trim()
    ? todo.description
    : "description is empty";

  const trimmedDescription = truncate(description, 250);

  return (
    <div className={`${s.item} ${isCompleting ? s.completing : ""}`}>
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
            >
              <MdOutlineEdit />
            </button>
          </Tooltip>

          <Tooltip content="DELETE">
            <button
              type="button"
              className={s.itemButton + " " + s.itemButtonDelete}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete todo"
            >
              <RxCross2 />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className={s.itemBody}>
        <label className={s.itemLabel}>
          <input
            type="checkbox"
            className={s.nativeCheckbox}
            checked={todo.completed}
            onChange={onChangeHandle}
          />
          <span className={s.customCheckbox} />
          <span className={s.itemTitle}>{todo.title}</span>
        </label>

        <p className={s.itemDescription}>{trimmedDescription}</p>
      </div>
    </div>
  );
}
