import { TodoPannel } from "@components/organisms/TodoPannel/TodoPannel";
import { TodoList } from "@components/organisms/TodoList/TodoList";
import { Sidebar } from "@components/templates/Sidebar/Sidebar";
import { Header } from "@components/templates/Header/Header";
import { Footer } from "@components/templates/Footer/Footer";
import "./App.scss";

export default function App() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="app">
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
