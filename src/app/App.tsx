import { useState } from "react";
import { TodoEditor } from "@components/organisms/TodoEditor/TodoEditor";
import { FiPlus } from "react-icons/fi";
import { useAppSelector } from "./store/store";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";

import "./App.scss";
import { TodoList } from "@components/organisms/TodoList/TodoList";

function TodoPannel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="todo-editor-section"
      aria-labelledby="todo-editor-title"
    >
      <h2 id="todo-editor-title" className="visually-hidden">
        Todo Editor
      </h2>

      {isOpen ? (
        <TodoEditor onClose={() => setIsOpen(false)} />
      ) : (
        <button
          className="todo-editor-section__open-btn"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <FiPlus className="icon" />
          <span>Create task</span>
        </button>
      )}
    </section>
  );
}

export default function App() {
  const [view, setView] = useState<"list" | "card">("list");
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
        <header className="header">
          <div className="header__container">
            {/* <a href="http://">Todo</a> */}
            <div>USA</div>
          </div>
        </header>
        <main className="main">
          <div className="main__container">
            <TodoPannel />
            {todos.length > 0 && <TodoList />}
          </div>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}

// import { IoAdd } from "react-icons/io5";
// <button
//                 type="button"
//                 className="todo-action__add-btn"
//                 aria-label="open todo editor"
//                 onClick={() => setIsOpen(!isOpen)}
//               >
//                 <IoAdd className="icon" /> <span>Create a task</span>
//               </button>
