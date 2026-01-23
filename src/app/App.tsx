import { useState } from "react";
import { TodoEditor } from "@components/organisms/TodoEditor/TodoEditor";
import { FiPlus } from "react-icons/fi";

import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { TodoList } from "@components/organisms/TodosList/TodosList";

import "./App.scss";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
        <header className="header">
          <div className="header__container">TODOLIST</div>
        </header>
        <main className="main">
          <div className="main__container">
            <section
              className="todo-editor-section"
              aria-labelledby="todo-editor-title"
            >
              <h2 id="todo-editor-title" className="visually-hidden">
                Todo Editor
              </h2>

              {isOpen ? (
                <button
                  className="todo-editor-section__open-btn"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <FiPlus className="icon" />
                  <span>start</span>
                </button>
              ) : (
                <TodoEditor onClose={() => setIsOpen(true)}></TodoEditor>
              )}
            </section>

            <section className="todo-section">
              <h2 className="todo-section__title visually-hidden">
                Your Todos
              </h2>

              <div className="todo-section__body">
                <TodoList></TodoList>
              </div>
            </section>
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
