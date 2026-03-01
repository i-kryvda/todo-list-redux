import { createContext, useContext, useState } from "react";
import { Modal } from "@shared/ui/Modal/Modal";

type ModalContextType = {
  openModal: (render: (id: string) => React.ReactNode) => string;
  closeModal: (id: string) => void;
};

type ModalType = {
  id: string;
  content: React.ReactNode;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalStack() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalStack have a problem");
  }
  return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalType[]>([]);

  const openModal = (render: (id: string) => React.ReactNode) => {
    const id = crypto.randomUUID();
    setModals((prev) => [...prev, { id, content: render(id) }]);
    return id;
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Modal key={modal.id}>{modal.content}</Modal>
      ))}
    </ModalContext.Provider>
  );
}
