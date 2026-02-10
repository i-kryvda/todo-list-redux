import { useState } from "react";
import { CreateTodo } from "@components/organisms/CreateTodo/CreateTodo";
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
        <CreateTodo onClose={() => setIsOpen(false)} />
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
