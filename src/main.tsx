import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./stores/index.ts";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

