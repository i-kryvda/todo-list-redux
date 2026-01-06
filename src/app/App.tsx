import {Counter} from "@components/molecules/Counter/Counter";
import {TodosList} from "@components/organisms/TodosList/TodosList.tsx";

import "./App.scss";


function App() {

    return (
        <>
            <header className="header">
                <div className="header__container">header</div>
            </header>
            <main className="main">
                <div className="main__container">
                    <Counter></Counter>
                    <TodosList></TodosList>
                </div>
            </main>
            <footer className="footer">
                <div className="footer__container">footer</div>
            </footer>
        </>
    );
}

export default App;
