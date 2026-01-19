import { useState } from "react";
import "./App.scss";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className={`sidebar ${isOpen ? " sidebar--open" : ""}`}>
        <button
          type="button"
          className="sidebar__container"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          sidebar
        </button>
      </aside>
      <div className="app">
        <header className="header">
          <div className="header__container">header</div>
        </header>
        <main className="main">
          <div className="main__container"></div>
        </main>
        <footer className="footer">
          <div className="footer__container">footer</div>
        </footer>
      </div>
    </>
  );
}

export default App;
