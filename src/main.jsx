import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./AuthConfig";
import "./index.css";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authConfig={authConfig} loading={<div>Loading...</div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
