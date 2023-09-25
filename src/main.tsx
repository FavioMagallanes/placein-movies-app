import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MovieProvider } from "./context/movies/movies-context";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MovieProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MovieProvider>
  </React.StrictMode>
);
