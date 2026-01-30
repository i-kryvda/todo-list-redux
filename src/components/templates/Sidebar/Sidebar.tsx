import { useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";

import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import s from "./Sidebar.module.scss";
import { useTheme } from "@app/context/ThemeProvider/ThemeProvider";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

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

          <li className={s.sidebarItem}>
            <MdOutlineEventNote className={s.sidebarIcon} />
            <span className={s.sidebarText}>Activity</span>
          </li>

          <li className={s.sidebarItem}>
            <FaRegTrashAlt className={s.sidebarIcon} />
            <span className={s.sidebarText}>Trash</span>
          </li>

          <li className={s.sidebarItem}>
            <FaRegPlusSquare className={s.sidebarIcon} />
            <span className={s.sidebarText}> Create</span>
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
