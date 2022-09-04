import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./app/components/pages/styles/index.css";
import { Provider } from "react-redux";
import { setupStore } from "./app/components/store/setupStore";
import history from "./app/components/utils/history";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
