import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@app/context/ThemeProvider/ThemeProvider.tsx";
import store from "@app/store/store.tsx";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
