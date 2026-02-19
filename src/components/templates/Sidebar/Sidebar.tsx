import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";

// import { FaRegPlusSquare } from "react-icons/fa";
// import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";

import { MdDoneOutline } from "react-icons/md";

import s from "./Sidebar.module.scss";
import { useTheme } from "@app/context/ThemeProvider/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { setFilter } from "@app/store/todos/todos-slice";
import { selectFilter } from "@app/store/todos/todos-selectors";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });
  const { theme, toggleTheme } = useTheme();
  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <aside className={s.sidebar + (collapsed ? ` ${s.sidebarCollapsed}` : "")}>
      <button className={s.sidebarToggle} onClick={toggleSidebar}>
        <span className={s.sidebarToggleText}>Todo</span>
        <BsLayoutSidebar />
      </button>

      <nav className={s.sidebarNav}>
        <ul className={s.sidebarList}>
          <li className={s.sidebarItem}>
            <IoSearch className={s.sidebarIcon} />
            <span className={s.sidebarText}>Search </span>
          </li>

          <li
            className={`${s.sidebarItem} ${filter === "active" ? s.sidebarItemActive : ""}`}
            onClick={() => dispatch(setFilter("active"))}
          >
            <MdOutlineEventNote className={s.sidebarIcon} />
            <span className={s.sidebarText}>Activity</span>
          </li>

          <li
            className={`${s.sidebarItem} ${filter === "completed" ? s.sidebarItemActive : ""}`}
            onClick={() => dispatch(setFilter("completed"))}
          >
            <MdDoneOutline className={s.sidebarIcon} />
            <span className={s.sidebarText}>Completed</span>
          </li>

          <li className={s.sidebarItem}>
            <FaPlus className={s.sidebarIcon} />
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
  );
}
