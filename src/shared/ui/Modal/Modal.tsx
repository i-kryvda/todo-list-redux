import style from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  return (
    <div className={style.modal}>
      <div className={style.modalOverlay} />
      <div
        tabIndex={-1}
        className={style.modalContent}
        role="dialog"
        aria-modal="true"
        aria-label="modal window"
      >
        {children}
      </div>
    </div>
  );
}
