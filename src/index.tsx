import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Create a client for React Query
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={3000}
        limit={5}
        style={{ width: "100%", maxWidth: "450px", margin: "2px 3px" }}
        pauseOnFocusLoss={false}
      />
      <BrowserRouter basename="/">
        <Provider store={appStore}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
