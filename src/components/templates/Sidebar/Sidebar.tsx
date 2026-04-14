import clsx from "clsx";
import { useTheme } from "@app/context/ThemeProvider/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { setFilter } from "@app/store/todos/todos-slice";
import { selectFilter } from "@app/store/todos/todos-selectors";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { CreateTodo } from "@components/organisms/add-todo/ui/CreateTodo";
import { Tooltip } from "@components/atoms/Tooltip/Tooltip";
import {
  BsLayoutSidebar,
  FaRegTrashAlt,
  FaPlus,
  MdOutlineEventNote,
  IoIosArrowBack,
  GiAtomicSlashes,
} from "@shared/assets/icons/react-icons";
import s from "./Sidebar.module.scss";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onCollapseToggle: () => void;
};

export function Sidebar({
  collapsed,
  mobileOpen,
  onMobileClose,
  onCollapseToggle,
}: SidebarProps) {
  const { toggleTheme } = useTheme();
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModalStack();

  const onCreateHandler = () => {
    openModal((modalId) => {
      const close = () => {
        closeModal(modalId);
      };
      const closeOnSuccess = () => {
        close();
        dispatch(setFilter("active"));
        onMobileClose();
      };

      return <CreateTodo onSubmitSuccess={closeOnSuccess} onClose={close} />;
    });
  };

  const onClickActive = () => {
    dispatch(setFilter("active"));
    onMobileClose();
  };

  const onClickCompleted = () => {
    dispatch(setFilter("completed"));
    onMobileClose();
  };

  return (
    <>
      {mobileOpen && <div className={s.overlay} onClick={onMobileClose} />}

      <aside
        className={clsx(
          s.sidebar,
          collapsed && s.sidebarCollapsed,
          mobileOpen && s.sidebarOpen,
        )}
      >
        <nav className={s.sidebarNav}>
          <ul className={s.sidebarList}>
            <li className={s.sidebarToggleItem} onClick={onCollapseToggle}>
              <span
                className={`${s.sidebarToggleLeft} ${s.sidebarToggleIconWrapper}`}
              >
                <GiAtomicSlashes
                  size={24}
                  className={`${s.sidebarToggleIcon} ${s.sidebarTogglePrimaryIcon}`}
                />

                <IoIosArrowBack
                  size={24}
                  className={`${s.sidebarToggleIcon} ${s.sidebarToggleHoverIcon}`}
                />
              </span>

              <span
                className={`${s.sidebarToggleRight} ${s.sidebarToggleIconWrapper}`}
              >
                <BsLayoutSidebar size={24} />
              </span>
            </li>

            <li
              className={`${s.sidebarItem} ${filter === "active" ? s.sidebarItemActive : ""}`}
              onClick={onClickActive}
            >
              <Tooltip
                content="Show active todos"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <MdOutlineEventNote className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Active</span>
            </li>

            <li
              className={`${s.sidebarItem} ${filter === "completed" ? s.sidebarItemActive : ""}`}
              onClick={onClickCompleted}
            >
              <Tooltip
                content="Show completed todos"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <FaRegTrashAlt className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Trash</span>
            </li>

            <li className={s.sidebarItem} onClick={onCreateHandler}>
              <Tooltip
                content="Create new todo"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <FaPlus className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Create</span>
            </li>
          </ul>
        </nav>

        <div className={s.theme}>
          <button
            type="button"
            aria-label="Toggle theme"
            className={s.themeSwitch}
            onClick={toggleTheme}
          >
            <span className={s.themeCircle} />
          </button>
        </div>
      </aside>
    </>
  );
}
