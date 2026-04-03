import { useState } from "react";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { Footer } from "@components/templates/Footer/Footer";
import { Header } from "@components/templates/Header/Header";
import { TodoList } from "@components/templates/TodoList/TodoList";
import { TodoPannel } from "@components/templates/TodoPannel/TodoPannel";

export function TodoPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
    setIsSidebarCollapsed(false);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      <Sidebar
        collapsed={isSidebarCollapsed}
        mobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
        onCollapseToggle={toggleSidebarCollapse}
      />

      <div className={`app ${isSidebarCollapsed ? "appCollapsed" : ""}`}>
        <Header onMobileMenuOpen={openMobileSidebar} />
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
