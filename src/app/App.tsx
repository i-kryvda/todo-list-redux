import { TodoPannel } from "@components/organisms/TodoPannel/TodoPannel";
import { TodoList } from "@components/organisms/TodoList/TodoList";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { Header } from "@components/templates/Header/Header";
import { Footer } from "@components/templates/Footer/Footer";
import "./App.scss";
import { useEffect, useState } from "react";

export default function App() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) return saved === "true";
    // return window.innerWidth < 768; // мобільне за замовчуванням закрите
    return true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed((p) => !p)}
      />
      <div className={`app ${collapsed ? "appCollapsed" : ""}`}>
        <Header />
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
