import { useTheme } from "@app/context/ThemeProvider/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { setFilter } from "@app/store/todos/todos-slice";
import { selectFilter } from "@app/store/todos/todos-selectors";
import { useModalStack } from "@app/context/ModalProvider/ModalProvider";
import { CreateTodo } from "@components/organisms/CreateTodo/CreateTodo";

import { Tooltip } from "@components/atoms/Tooltip/Tooltip";

import s from "./Sidebar.module.scss";
import {
  BsLayoutSidebar,
  FaRegTrashAlt,
  FaPlus,
  MdOutlineEventNote,
  IoIosArrowBack,
  GiAtomicSlashes,
} from "@shared/assets/icons/react-icons";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleMenuOpen: () => void;
  toggleSidebar: () => void;
};

export function Sidebar({
  collapsed,
  toggleSidebar,
  mobileOpen,
  toggleMenuOpen,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModalStack();

  const handleCreate = () => {
    openModal((modalId) => {
      const close = () => {
        closeModal(modalId);
      };
      const closeOnSuccess = () => {
        close();
        dispatch(setFilter("active"));
        toggleMenuOpen();
      };

      return <CreateTodo onSubmitSuccess={closeOnSuccess} onClose={close} />;
    });
  };

  const handleActiveClick = () => {
    dispatch(setFilter("active"));
    toggleMenuOpen();
  };

  const handleCompletedClick = () => {
    dispatch(setFilter("completed"));
    toggleMenuOpen();
  };

  return (
    <>
      {/* {mobileOpen && <div className={s.overlay} onClick={toggleMenuOpen} />} */}

      <aside
        className={`${s.sidebar} ${collapsed ? s.sidebarCollapsed : ""} ${mobileOpen ? s.sidebarOpen : ""}`}
      >
        <nav className={s.sidebarNav}>
          <ul className={s.sidebarList}>
            <li className={s.sidebarToggleItem} onClick={toggleSidebar}>
              <span className={`${s.iconLeft} ${s.iconWrapper}`}>
                <GiAtomicSlashes
                  size={24}
                  className={`${s.icon} ${s.atomic}`}
                />
                <IoIosArrowBack size={24} className={`${s.icon} ${s.layout}`} />
              </span>

              <span className={`${s.iconRigth} ${s.iconWrapper}`}>
                <BsLayoutSidebar size={24} />
              </span>
            </li>

            <li
              className={`${s.sidebarItem} ${filter === "active" ? s.sidebarItemActive : ""}`}
              onClick={handleActiveClick}
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
              onClick={handleCompletedClick}
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

            <li className={s.sidebarItem} onClick={handleCreate}>
              <Tooltip
                content="Create new todo"
                placement="right"
                disabled={!collapsed}
              >
                <span>
                  <FaPlus className={s.sidebarIcon} />
                </span>
              </Tooltip>

              <span className={s.sidebarText}>Create </span>
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
