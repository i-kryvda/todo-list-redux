import { TodoList } from "@components/templates/TodoList/TodoList";
import { TodoPannel } from "@components/templates/TodoPannel/TodoPannel";
import { Footer } from "@components/templates/Footer/Footer";
import { Header } from "@components/templates/Header/Header";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { useEffect, useState } from "react";

import "./TodoPage.scss";

export function TodoPage() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setCollapsed(false);
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={isMenuOpen}
        toggleMenuOpen={toggleMenu}
        toggleSidebar={toggleSidebar}
      />

      <div className={`app ${collapsed ? "appCollapsed" : ""}`}>
        <Header toggleMenuOpen={toggleMenu} />
        <main className="main">
          <div className="main__container">
            <TodoPannel />
            <TodoList />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
