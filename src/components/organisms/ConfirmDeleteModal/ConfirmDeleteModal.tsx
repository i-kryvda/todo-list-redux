import style from "./ConfirmDeleteModal.module.scss";

type ConfirmDeleteModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={style.confirmDeleteModal}>
      <h2 className={style.confirmDeleteModalTitle}>Are you sure?</h2>

      <div className={style.confirmDeleteModalButtons}>
        <button
          autoFocus
          type="button"
          onClick={handleConfirm}
          className={
            style.confirmDeleteModalButton +
            " " +
            style.confirmDeleteModalButtonConfirm
          }
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onClose()}
          className={style.confirmDeleteModalButton}
        >
          No
        </button>
      </div>
    </div>
  );
}
